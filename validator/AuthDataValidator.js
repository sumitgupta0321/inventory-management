const { STRING_CONSTANTS } = require('../constants/message');
const { REGEXS } = require('../constants/regex');
class AuthDataValidator {
  


  // validateSignupUser(req, res, next) {
  //   const schema = Yup.object().shape({
  //     email: Yup.string().required('Email is required').email('Invalid Email'),
  //     password: Yup.string()
  //       .trim()
  //       .required('Password is required')
  //       .matches(
  //         /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+}{"':;?/>.<,]).{8,}$/,
  //         'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long'
  //       ),
  //     mobile: Yup.number()
  //       .integer('Mobile must be an integer')
  //       .required('Mobile is required'),
  //   });
  //   schema.validate(req.body, { abortEarly: false })
  //     .then((response) => {
  //       next();
  //     })
  //     .catch((err) => {
  //       const errors = err.inner.map((e) => ({ field: e.path, message: e.message }));
  //       res.status(400).json({ status: false, errors });
  //     });
  // }
  signup(req, res, next) {

    try {
      const { email, password, mobile} = req.body;
      if(!email){
        return res.status(200).json({ status: true, message: STRING_CONSTANTS.EMAIL_REQUIRED});
      }
      email.match(VALID_EMAIL)
        if(VALID_EMAIL){
          return res.status(200).json({ status: true, message: 'please enter a valid email'});
        }
    } catch (error) {
    }
  }
  //   const { email, password, mobile} = req.body
  
  //     password: Yup.string()
  //       .trim()
  //       .required('Password is required')
  //       .matches(
  //         /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+}{"':;?/>.<,]).{8,}$/,
  //         'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long'
  //       ),
  //     mobile: Yup.number()
  //       .integer('Mobile must be an integer')
  //       .required('Mobile is required'),
  //   });
  //   schema.validate(req.body, { abortEarly: false })
  //     .then((response) => {
  //       next();
  //     })
  //     .catch((err) => {
  //       const errors = err.inner.map((e) => ({ field: e.path, message: e.message }));
  //       res.status(400).json({ status: false, errors });
  //     });
  // }

  login(req, res, next) {
		const schema = Yup.object().shape({
			email: Yup.string().required('Email is required').email('Invalid Email'),
      password: Yup.string()
      .trim()
      .required('Password is required')
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+}{"':;?/>.<,]).{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long'
      ),
		});
    schema.validate(req.body, { abortEarly: false })
    .then((response) => {
      next();
    })
			.catch((err) => {
        const errors = err.inner.map((e) => ({ field: e.path, message: e.message }));
        res.status(400).json({ status: false, errors });
			});
}
  forgetPassword(req, res, next) {
		const schema = Yup.object().shape({
			email: Yup.string().required('Email is required').email('Invalid Email'),
		});
    schema.validate(req.body, { abortEarly: false })
    .then((response) => {
      next();
    })
			.catch((err) => {
        const errors = err.inner.map((e) => ({ field: e.path, message: e.message }));
        res.status(400).json({ status: false, errors });
			});
	}
  otpVerification(req, res, next) {
		const schema = Yup.object().shape({
			email: Yup.string().required('Email is required').email('Invalid Email'),
      otp: Yup.string().required('OTP is required').matches(/^\d{6}$/, 'OTP must be a 6-digit number'),
		});
    schema.validate(req.body, { abortEarly: false })
    .then((response) => {
      next();
    })
			.catch((err) => {
        const errors = err.inner.map((e) => ({ field: e.path, message: e.message }));
        res.status(400).json({ status: false, errors });
			});
	}
}


module.exports = new AuthDataValidator();
