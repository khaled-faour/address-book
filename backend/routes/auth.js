const { Router } = require('express');
const { register, login, verify } = require('../controller/auth');
const router = Router();


router.post('/register', register);
router.post('/login', login);
router.post('/verify', verify);



module.exports = router;