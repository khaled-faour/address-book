const { Router } = require('express');
const { getContact, getContacts, updateContact, deleteContact } = require('../controller/user');
const router = Router();


router.get('/', getContacts);
router.get('/:id', getContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);


module.exports = router;