const { Router } = require('express');
const { addContact, getContact, getContactWithUser, getContacts, getContactsWithUser, updateContact, deleteContact } = require('../controller/contact');
const router = Router();


router.post('/', addContact)
router.get('/', getContacts);
router.get('/user', getContactsWithUser);
router.get('/:id', getContact);
router.get('/user/:id', getContactWithUser);
router.put('/', updateContact);
router.delete('/:id', deleteContact);


module.exports = router;