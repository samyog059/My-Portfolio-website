const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sql = require('mssql');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SQL Server Connection Configuration
const sqlConfig = {
  server: process.env.DB_SERVER || 'localhost',
  port: parseInt(process.env.DB_PORT) || 1433,
  database: process.env.DB_NAME || 'portfolio',
  authentication: {
    type: 'default',
    options: {
      userName: process.env.DB_USER || 'sa',
      password: process.env.DB_PASSWORD || '',
    }
  },
  options: {
    trustServerCertificate: true,
    encrypt: false,
    enableKeepAlive: true,
    enableArithAbort: true,
    connectionTimeout: 30000,
    requestTimeout: 30000,
  }
};

// Connection pool
let pool;

// Connect to SQL Server
async function connectDatabase() {
  try {
    console.log('🔍 SQL SERVER DIAGNOSTICS');
    console.log('========================');
    console.log('Server:', sqlConfig.server);
    console.log('Port:', sqlConfig.port);
    console.log('Database:', sqlConfig.database);
    console.log('User:', sqlConfig.authentication.options.userName);
    console.log('========================\n');
    
    console.log('📡 Connecting to SQL Server...');
    pool = new sql.ConnectionPool(sqlConfig);
    
    pool.on('error', err => {
      console.error('❌ Pool connection error:', err.message);
    });

    await pool.connect();
    console.log('✅ SQL Server connected successfully!');

    // Create Messages table if it doesn't exist
    await createMessagesTable();
  } catch (err) {
    console.error('❌ SQL Server connection failed:');
    console.error('   Error:', err.message);
    
    if (err.message.includes('Failed to connect')) {
      console.error('   → Check if SQL Server is running');
      console.error('   → Verify server name and port');
    } else if (err.message.includes('login failed')) {
      console.error('   → Check username and password');
      console.error('   → Ensure user has database access');
    } else if (err.message.includes('Cannot open database')) {
      console.error('   → Database does not exist');
      console.error('   → It will be created automatically');
    }
    
    console.log('⏳ Retrying in 5 seconds...\n');
    setTimeout(connectDatabase, 5000);
  }
}

// Create Messages table
async function createMessagesTable() {
  try {
    const request = pool.request();
    
    const createTableQuery = `
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Messages' AND xtype='U')
      BEGIN
        CREATE TABLE Messages (
          id INT PRIMARY KEY IDENTITY(1,1),
          name NVARCHAR(100) NOT NULL,
          email NVARCHAR(100) NOT NULL,
          subject NVARCHAR(200) NOT NULL,
          message NVARCHAR(MAX) NOT NULL,
          status NVARCHAR(20) DEFAULT 'new',
          timestamp DATETIME DEFAULT GETDATE()
        );
        PRINT 'Messages table created successfully';
      END
      ELSE
      BEGIN
        PRINT 'Messages table already exists';
      END
    `;
    
    await request.query(createTableQuery);
    console.log('📊 Messages table ready');
  } catch (err) {
    console.error('Error creating messages table:', err.message);
  }
}

// Initialize database connection
connectDatabase();


// ============ API ENDPOINTS ============

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running', domain: 'samyogpangeni.com.np' });
});

// POST contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    // Insert into database
    const request = pool.request();
    request.input('name', sql.NVarChar, name);
    request.input('email', sql.NVarChar, email);
    request.input('subject', sql.NVarChar, subject);
    request.input('message', sql.NVarChar, message);

    const query = `
      INSERT INTO Messages (name, email, subject, message, status, timestamp)
      VALUES (@name, @email, @subject, @message, 'new', GETDATE());
    `;

    await request.query(query);

    res.json({
      success: true,
      message: 'Message received! I will get back to you soon.',
    });

    console.log(`📧 New message from ${name} (${email})`);
  } catch (err) {
    console.error('Error saving message:', err.message);
    res.status(500).json({
      success: false,
      message: 'Error saving message. Please try again.',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

// GET all messages (admin endpoint)
app.get('/api/messages', async (req, res) => {
  try {
    if (!pool) {
      return res.status(503).json({
        success: false,
        message: 'Database connection not established',
      });
    }

    const request = pool.request();
    const result = await request.query('SELECT * FROM Messages ORDER BY timestamp DESC');

    res.json({
      success: true,
      count: result.recordset.length,
      data: result.recordset,
    });
  } catch (err) {
    console.error('Error fetching messages:', err.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching messages',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

// GET message by ID
app.get('/api/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!pool) {
      return res.status(503).json({
        success: false,
        message: 'Database connection not established',
      });
    }

    const request = pool.request();
    request.input('id', sql.Int, id);
    const result = await request.query('SELECT * FROM Messages WHERE id = @id');

    if (result.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    res.json({
      success: true,
      data: result.recordset[0],
    });
  } catch (err) {
    console.error('Error fetching message:', err.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching message',
    });
  }
});

// UPDATE message status
app.put('/api/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'read', 'responded'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }

    if (!pool) {
      return res.status(503).json({
        success: false,
        message: 'Database connection not established',
      });
    }

    const request = pool.request();
    request.input('id', sql.Int, id);
    request.input('status', sql.NVarChar, status);

    const result = await request.query('UPDATE Messages SET status = @status WHERE id = @id');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    res.json({
      success: true,
      message: 'Message status updated',
    });
  } catch (err) {
    console.error('Error updating message:', err.message);
    res.status(500).json({
      success: false,
      message: 'Error updating message',
    });
  }
});

// DELETE message
app.delete('/api/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!pool) {
      return res.status(503).json({
        success: false,
        message: 'Database connection not established',
      });
    }

    const request = pool.request();
    request.input('id', sql.Int, id);

    const result = await request.query('DELETE FROM Messages WHERE id = @id');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    res.json({
      success: true,
      message: 'Message deleted',
    });
  } catch (err) {
    console.error('Error deleting message:', err.message);
    res.status(500).json({
      success: false,
      message: 'Error deleting message',
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Backend server running on port ${PORT}`);
  console.log(`📍 Domain: samyogpangeni.com.np`);
  console.log(`🔗 API: https://my-portfolio-website-wbz1.onrender.com`);
  console.log(`\nEndpoints:`);
  console.log(`  POST   /api/contact       - Submit contact form`);
  console.log(`  GET    /api/messages      - Get all messages`);
  console.log(`  GET    /api/messages/:id  - Get specific message`);
  console.log(`  PUT    /api/messages/:id  - Update message status`);
  console.log(`  DELETE /api/messages/:id  - Delete message\n`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down...');
  if (pool) {
    await pool.close();
    console.log('✓ Database connection closed');
  }
  process.exit(0);
});
