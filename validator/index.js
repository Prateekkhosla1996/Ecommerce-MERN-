exports.userSignupValidator=(req,res,next)=>{
    req.check('name','name is required').notEmpty()
    req.check('email','email is required and must be in between 3 to 32 characters')
    .matches(/.+\@.+\..+/)
    .withMessage('email must contain @')
    .isLength({
        min:4,
        max:32
    });
    req.check('password','password is required').notEmpty()
    req.check('password')
    .isLength({min:6})
    .withMessage('password must contain 6 characters')
    .matches(/\d/)
    .withMessage("password must contain  a number")
    const errors = req.validationErrors()
    if(errors){
        const firsterr=errors.map(error=>error.msg)[0]
        return res.status(400).json({error:firsterr});
    }
    next();

}