const mongoose = require('mongoose');

exports.healthCheck = (req, res) => {
  const dbState = mongoose.connection.readyState;

  // once the dbstate is fetched, we can map it to a string
  const dbStatus = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  }[dbState]; //defining a set of key value pairs and then accessing the value using the dbState as key


  // process is a global object in Node.js that provides information about the current Node.js process. 
 const memory = process.memoryUsage();
 const cpu = process.cpuUsage();
 const uptime = process.uptime();


  const status = {
    status: dbState === 1 ? 'UP' : 'DOWN',
    db: dbStatus,
    timestamp: Date.now(),
    uptime: `${Math.floor(uptime)} seconds`,
    memory: {
      rss: memory.rss, //resident set size- (Its the total memory used by node.js process in RAM)
      heapUsed: memory.heapUsed //memory currently used by your app's variables and objects
    },
    cpu: {
      user: cpu.user, // micro sec spent for running js code (user CPU time)
      system: cpu.system // micro sec spent for system/kernel operations (system CPU time)
    }
  };

  const code = dbState === 1 ? 200 : 503;
  res.status(code).json(status);
};
