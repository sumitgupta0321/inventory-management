const userModel = require('../models/user');


class authService {
    async signup(req, res, next) {
        try {
        const findUser = userModel.findOne({email: req.body.email});
        if(findUser){
            return res.status(200).json({ status: true, message: 'User already registered' });
        }

          await userModel.create(req.body);
          return res.status(200).json({ status: true, message: 'User registered successfully' });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ status: false, message: 'Internal server error' });
        }
      }   
      
      async login(req, res, next) {
        try {
        const findUser = userModel.findOne({email: req.body.email, password: req.body.password});
        if(!findUser){
            return res.status(200).json({ status: true, message: 'inncorrect username or password' });
        }
          return res.status(200).json({ status: true, message: 'login successfully' });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ status: false, message: 'Internal server error' });
        }
      }
}
module.exports = new authService();
