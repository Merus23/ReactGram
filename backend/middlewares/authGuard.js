const User = require('../models/User');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
    const  authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.status(401).json({error: ['Accesso negado!']});

    try {
        const verified = jwt.verify(token, jwtSecret);
        req.user = await User.findById(verified.id).select('-password');
        next();
    }catch(err){
        res.status(401).json({error: ['Token expirado ou inválido']});
    }

};

module.exports = authGuard;