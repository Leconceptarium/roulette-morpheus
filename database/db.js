const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'reviews.db');
let db;

/**
 * Initialise la base de données et crée les tables nécessaires
 */
function initialize() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        return reject(err);
      }

      // Table pour tracker les clics sur le lien d'avis
      db.run(`
        CREATE TABLE IF NOT EXISTS clicks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
          ip_address TEXT,
          user_agent TEXT,
          referrer TEXT
        )
      `, (err) => {
        if (err) return reject(err);
      });

      // Table pour les demandes d'avis par SMS
      db.run(`
        CREATE TABLE IF NOT EXISTS sms_requests (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          phone_number TEXT NOT NULL,
          customer_name TEXT,
          sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          status TEXT DEFAULT 'sent',
          sms_sid TEXT,
          clicked BOOLEAN DEFAULT 0,
          clicked_at DATETIME
        )
      `, (err) => {
        if (err) return reject(err);
      });

      // Table pour les statistiques quotidiennes
      db.run(`
        CREATE TABLE IF NOT EXISTS daily_stats (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          date DATE UNIQUE,
          total_clicks INTEGER DEFAULT 0,
          total_sms_sent INTEGER DEFAULT 0,
          conversion_rate REAL DEFAULT 0.0
        )
      `, (err) => {
        if (err) return reject(err);
      });

      // Table pour les prix gagnés à la roue
      db.run(`
        CREATE TABLE IF NOT EXISTS wheel_prizes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          prize TEXT NOT NULL,
          promo_code TEXT NOT NULL,
          ip_address TEXT,
          won_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          used BOOLEAN DEFAULT 0,
          used_at DATETIME
        )
      `, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  });
}

/**
 * Enregistre un clic sur le lien d'avis
 */
function recordClick(ipAddress, userAgent, referrer) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`
      INSERT INTO clicks (ip_address, user_agent, referrer)
      VALUES (?, ?, ?)
    `);
    
    stmt.run(ipAddress, userAgent, referrer, function(err) {
      if (err) return reject(err);
      resolve(this.lastID);
    });
    
    stmt.finalize();
  });
}

/**
 * Enregistre une demande d'avis par SMS
 */
function recordSMSRequest(phoneNumber, customerName, smsSid) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`
      INSERT INTO sms_requests (phone_number, customer_name, sms_sid, status)
      VALUES (?, ?, ?, ?)
    `);
    
    stmt.run(phoneNumber, customerName, smsSid, 'sent', function(err) {
      if (err) return reject(err);
      resolve(this.lastID);
    });
    
    stmt.finalize();
  });
}

/**
 * Met à jour le statut d'une demande SMS
 */
function updateSMSStatus(id, status, clicked = false) {
  return new Promise((resolve, reject) => {
    const clickedAt = clicked ? new Date().toISOString() : null;
    
    const stmt = db.prepare(`
      UPDATE sms_requests 
      SET status = ?, clicked = ?, clicked_at = ?
      WHERE id = ?
    `);
    
    stmt.run(status, clicked ? 1 : 0, clickedAt, id, function(err) {
      if (err) return reject(err);
      resolve(this.changes);
    });
    
    stmt.finalize();
  });
}

/**
 * Récupère les statistiques globales
 */
function getStats() {
  return new Promise((resolve, reject) => {
    const stats = {};
    
    // Total de clics
    db.get('SELECT COUNT(*) as total FROM clicks', (err, row) => {
      if (err) return reject(err);
      stats.totalClicks = row.total;
      
      // Total de SMS envoyés
      db.get('SELECT COUNT(*) as total FROM sms_requests', (err, row) => {
        if (err) return reject(err);
        stats.totalSMS = row.total;
        
        // SMS cliqués
        db.get('SELECT COUNT(*) as total FROM sms_requests WHERE clicked = 1', (err, row) => {
          if (err) return reject(err);
          stats.smsClicked = row.total;
          stats.conversionRate = stats.totalSMS > 0 
            ? ((stats.smsClicked / stats.totalSMS) * 100).toFixed(2)
            : 0;
          
          // Clics des 7 derniers jours
          db.get(`
            SELECT COUNT(*) as total 
            FROM clicks 
            WHERE timestamp >= datetime('now', '-7 days')
          `, (err, row) => {
            if (err) return reject(err);
            stats.clicksLast7Days = row.total;
            
            resolve(stats);
          });
        });
      });
    });
  });
}

/**
 * Récupère les statistiques par jour (30 derniers jours)
 */
function getDailyStats(days = 30) {
  return new Promise((resolve, reject) => {
    db.all(`
      SELECT 
        DATE(timestamp) as date,
        COUNT(*) as clicks
      FROM clicks
      WHERE timestamp >= datetime('now', '-${days} days')
      GROUP BY DATE(timestamp)
      ORDER BY date DESC
    `, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

/**
 * Récupère les dernières demandes SMS
 */
function getRecentSMSRequests(limit = 50) {
  return new Promise((resolve, reject) => {
    db.all(`
      SELECT *
      FROM sms_requests
      ORDER BY sent_at DESC
      LIMIT ?
    `, [limit], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

/**
 * Enregistre un prix gagné à la roue
 */
function recordWheelPrize(prize, code, ipAddress, timestamp) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`
      INSERT INTO wheel_prizes (prize, promo_code, ip_address, won_at, used)
      VALUES (?, ?, ?, ?, 0)
    `);
    
    stmt.run(prize, code, ipAddress, timestamp, function(err) {
      if (err) return reject(err);
      resolve(this.lastID);
    });
    
    stmt.finalize();
  });
}

/**
 * Récupère les statistiques de la roue
 */
function getWheelStats() {
  return new Promise((resolve, reject) => {
    const stats = {};
    
    // Total de prix gagnés
    db.get('SELECT COUNT(*) as total FROM wheel_prizes', (err, row) => {
      if (err) return reject(err);
      stats.totalPrizes = row.total;
      
      // Codes utilisés
      db.get('SELECT COUNT(*) as total FROM wheel_prizes WHERE used = 1', (err, row) => {
        if (err) return reject(err);
        stats.codesUsed = row.total;
        
        // Taux d'utilisation
        stats.usageRate = stats.totalPrizes > 0 
          ? ((stats.codesUsed / stats.totalPrizes) * 100).toFixed(2)
          : 0;
        
        // Répartition des prix
        db.all(`
          SELECT prize, COUNT(*) as count 
          FROM wheel_prizes 
          GROUP BY prize 
          ORDER BY count DESC
        `, (err, rows) => {
          if (err) return reject(err);
          stats.prizeDistribution = rows;
          
          resolve(stats);
        });
      });
    });
  });
}

/**
 * Valide un code promo
 */
function validatePromoCode(code) {
  return new Promise((resolve, reject) => {
    db.get(`
      SELECT * FROM wheel_prizes 
      WHERE promo_code = ? AND used = 0
      LIMIT 1
    `, [code], (err, row) => {
      if (err) return reject(err);
      resolve(!!row);
    });
  });
}

/**
 * Marque un code promo comme utilisé
 */
function usePromoCode(code) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`
      UPDATE wheel_prizes 
      SET used = 1, used_at = datetime('now')
      WHERE promo_code = ? AND used = 0
    `);
    
    stmt.run(code, function(err) {
      if (err) return reject(err);
      resolve(this.changes);
    });
    
    stmt.finalize();
  });
}

/**
 * Récupère les prix récents de la roue
 */
function getRecentWheelPrizes(limit = 50) {
  return new Promise((resolve, reject) => {
    db.all(`
      SELECT *
      FROM wheel_prizes
      ORDER BY won_at DESC
      LIMIT ?
    `, [limit], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

/**
 * Ferme la connexion à la base de données
 */
function close() {
  if (db) {
    db.close((err) => {
      if (err) {
        console.error('Erreur lors de la fermeture de la DB:', err);
      } else {
        console.log('✓ Base de données fermée');
      }
    });
  }
}

module.exports = {
  initialize,
  recordClick,
  recordSMSRequest,
  updateSMSStatus,
  getStats,
  getDailyStats,
  getRecentSMSRequests,
  recordWheelPrize,
  getWheelStats,
  validatePromoCode,
  usePromoCode,
  getRecentWheelPrizes,
  close
};
