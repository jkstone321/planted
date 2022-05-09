const router = require('express').Router();
const userRoutes = require('./userRoutes');
const plantRoutes = require('./plantRoutes');

router.use('/users', userRoutes);
router.use('/plants', plantRoutes);

module.exports = router;
