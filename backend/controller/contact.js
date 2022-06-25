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
                user: req.user.user_id,
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
        const contacts = await Contact.find({user: req.user.user_id});
        return res.status(200).json({contacts});
    }catch(err){
        res.status(500).json({error: err})
    }
}

const getContactsWithUser = async (req, res) =>{
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
        const contact = await Contact.findById(id)
        return res.status(200).json({contact});
    }catch(err){
        res.status(500).json({error: err})
    }
}

const getContactWithUser = async (req, res) =>{
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
        const { _id,
            first_name,
            last_name,
            email,
            phone,
            relation,
            location } = req.body;
    
            const contact = await Contact.findByIdAndUpdate(_id, {
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
    getContactWithUser,
    getContacts,
    getContactsWithUser,
    updateContact,
    deleteContact
}