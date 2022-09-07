const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const cryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};


const register = async (req, res) => {
  try {
      const userDetails = {
        email: req.body.email,
        password: await cryptPassword(req.body.password),
      }
      const response = await User.findOne({ email: userDetails.email });
      if (response){ 
        return res.status(400).json({
          "message": 'User already exist',
          success: false,    
        });
      }
      const user = new User(userDetails);
      await user.save();
      return res.status(200).json({ 
        "message": 'Registration is successful', 
        success: true,
      });
  } catch (error) {
    console.log("Error in registraion : ",error);
    return res.status(400).json({ 
      "message": 'Internal error! Try again', 
      success: false,
    });
  }
}

const login = async (req, res) => {
  try {
    const userDetails = {
      email: req.body.email,
      password: req.body.password,
    }
    const user = await User.findOne({ email: userDetails.email });
    if (user){ 
      const isMatch = await bcrypt.compare(userDetails.password, user.password);
      if(isMatch){
        return res.status(200).json({ 
          "message": 'Login is successful', 
          success: true,
        });
      }
    }
    return res.status(400).json({
      "message": 'Invalid Credentials',
      success: false,    
    });
  } catch (error) {
  console.log("Error in login : ",error);
  return res.status(400).json({ 
      "message": 'Internal error! Try again', 
      success: false,
    });
  }
}

module.exports = {
  register,
  login,
};