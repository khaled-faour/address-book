const { Router } = require('express');
const { getUser, getUserWithContacts, getUsers, getUsersWithContacts, updateUser, deleteUser } = require('../controller/user');
const router = Router();


router.get('/', getUsers);
router.get('/contacts', getUsersWithContacts);
router.get('/:id', getUser);
router.get('/contacts/:id', getUserWithContacts);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


module.exports = router;