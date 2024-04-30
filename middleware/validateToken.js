const jwt = require('jsonwebtoken');
var env = require("dotenv");
env.config();

class ValidateToken{
    async validateJwt(req, res, next){
        console.log(req.headers.authorization);
        console.log(process.env.JWT_ACCESS_SECRET);
        jwt.verify(req.headers.authorization, process.env.JWT_ACCESS_SECRET, function(err, result){
            if(err){
                console.log(err)
                return res.status(401).json({status: false, message: "Access Token Expired"})
            }else{
                req.decoded = result;
                next();
            }
        });
    }
}
module.exports = new ValidateToken();