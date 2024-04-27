const {authService} = require('../services');

class authController{
    async signup(req, res, next){
        try {
            await authService.signup(req, res, next);
        } catch (error) {
            console.log(error)
            return res.status(409).json({status: false, message: 'Internal server error'});
        }
    }
    async login(req, res, next){
        try {
            await authService.login(req, res, next);
        } catch (error) {
            console.log(error)
            return res.status(409).json({status: false, message: 'Internal server error'});
        }
    }
}
module.exports = new authController();
