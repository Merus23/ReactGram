const {body} = require('express-validator');

const userCreateValidation = () => {
    return [
        body('name').isString().withMessage('O nome é obrigatório').isLength({min: 3}).withMessage('O nome deve ter no mínimo 3 caracteres'),
        body('email').isString().withMessage('O email é obrigatório').isEmail().withMessage('Insira um e-mail adequado'),
        body('password').isString().withMessage('A senha é obrigatória').isLength({min: 6}).withMessage('A senha deve ter no mínimo 6 caracteres'),
        body('confirmPassword').isString().withMessage('A confirmação de senha é obrigatória').isLength({min: 6}).withMessage('A confirmação de senha deve ter no mínimo 6 caracteres').custom((value, {req}) => { if(value != req.body.password){
            throw new Error('As senhas não são iguais');}return true;
         }),
    ];
}

const loginValidation = () => {
    return [
        body('email').isString().withMessage('O email é obrigatório').isEmail().withMessage('Insira um e-mail adequado'),
        body('password').isString().withMessage('A senha é obrigatória').isLength({min: 6}).withMessage('A senha deve ter no mínimo 6 caracteres'),
    ];
}


const userUpdateValidation = () => {
    return [
        
        body('name').optional().isLength({min:3}).withMessage('O nome deve ter no mínimo 3 caracteres'),
        body('password').optional().isLength({min: 6}).withMessage('A senha deve ter no mínimo 6 caracteres'),
    ];
}

module.exports = {userCreateValidation, loginValidation, userUpdateValidation};