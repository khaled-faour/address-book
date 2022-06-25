const jwt = require("jsonwebtoken");

const {TOKEN_KEY} = process.env;

const verifyToken = (req, res, next)=>{
    const token = req.body.token || req.query.token || req.headers["authorization"];

    if(!token){
        return res.status(401).send("Unauthenticated!");
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Unauthenticated!");
    }

    return next();
}

module.exports = verifyToken;