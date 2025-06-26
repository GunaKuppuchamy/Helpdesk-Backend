const mongoose = require('mongoose');

exports.healthCheck = (req, res) => {
  const dbState = mongoose.connection.readyState;

  const dbStatus = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  }[dbState];

  const status = {
    status: dbState === 1 ? 'UP' : 'DOWN',
    db: dbStatus,
    timestamp: Date.now()
  };

  const code = dbState === 1 ? 200 : 503;
  res.status(code).json(status);
};
