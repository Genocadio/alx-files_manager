const { countUsers, countFiles } = require('../utils/db');
const { checkRedis } = require('../utils/redis');

const AppController = {
  getStatus: async (req, res) => {
    try {
      const redisStatus = await checkRedis();
      const dbStatus = await countUsers() && await countFiles();
      const status = {
        redis: redisStatus,
        db: dbStatus,
      };
      res.status(200).json(status);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getStats: async (req, res) => {
    try {
      const userCount = await countUsers();
      const fileCount = await countFiles();
      const stats = {
        users: userCount,
        files: fileCount,
      };
      res.status(200).json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = AppController;
