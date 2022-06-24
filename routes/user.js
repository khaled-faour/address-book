const { Router } = require('express');
const { getUser, getUsers, updateUser, deleteUser } = require('../controller/user');
const router = Router();


router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


module.exports = router;