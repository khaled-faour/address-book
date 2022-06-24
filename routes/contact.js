const { Router } = require('express');
const { addContact, getContact, getContacts, updateContact, deleteContact } = require('../controller/contact');
const router = Router();


router.post('/', addContact)
router.get('/', getContacts);
router.get('/:id', getContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);


module.exports = router;