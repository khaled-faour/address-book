const Contact = require('../model/Contact');

const addContact = async (req, res) =>{
    try{
        const { user,
            first_name,
            last_name,
            email,
            phone,
            relation,
            location} = req.body;
    
            const contact = await Contact.create({
                user,
                first_name,
                last_name,
                email: email.toLowerCase(),
                phone,
                relation,
                location
            });
            return res.status(200).json({contact});
    }catch(err){
        res.status(500).json({error: err})
    }
}

const getContacts = async (req, res) =>{
    try{
        const contacts = await Contact.find().populate('user');
        return res.status(200).json({contacts});
    }catch(err){
        res.status(500).json({error: err})
    }
}

const getContact = async (req, res) =>{
    try{
        const {id} = req.params;
        const contact = await Contact.findById(id).populate('user');
        return res.status(200).json({contact});
    }catch(err){
        res.status(500).json({error: err})
    }
}
const updateContact = async (req, res) => {
    try{
        const {id} = req.params
        const { first_name,
            last_name,
            email,
            phone,
            relation,
            location } = req.body;
    
            const contact = await Contact.findByIdAndUpdate(id, {
                first_name,
                last_name,
                email: email.toLowerCase(),
                phone,
                relation,
                location
            });
            return res.status(200).json({contact});
    }catch(err){
        res.status(500).json({error: err})
    }
}
const deleteContact = async (req, res) =>{
    try{
        const {id} = req.params;
        const contact = await Contact.findByIdAndDelete(id);
        return res.status(200).json({contact});
    }catch(err){
        res.status(500).json({error: err})
    }
}

module.exports ={
    addContact,
    getContact,
    getContacts,
    updateContact,
    deleteContact
}