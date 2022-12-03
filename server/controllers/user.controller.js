const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const cryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

const read = async (req, res) => {
  return res.status(req.status).json({
    'message': req.message,
    'user': req.user,
  })
}

const update = async (req, res) => {
  const userDetails = req.body;
  const user = await User.findOne({ email: userDetails.email });
  if(user){
    const response = await user.updataDetails(userDetails);
    if(response==1){
      return res.status(200).json({
        "message": 'User is updated successfully',
        success: true,    
      });
    }else{
      return res.status(400).json({
        "message": 'Internal Error Occurred! Try again...',
        success: false,    
      });
    }
  }else{
      return res.status(400).json({
        "message": 'Internal Error Occurred! Try again...',
        success: false,    
      });
    }
}

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
        const token = await user.generateAuthToken();
        if (token === -1) {
          return res.status(400).json({ 
            "message": 'Internal error! Try again', 
            success: false,
          });
        }
        const Day30 = 25892000000;
        res.cookie("token", token, {
            expires: new Date(Date.now() + Day30),
        });
        res.cookie("email", user.email, {
            expires: new Date(Date.now() + Day30),
        })
        res.status(200).json({ 
          "message": 'Login is successful', 
          success: true,
        });
      }else{
        return res.status(400).json({
          "message": 'Invalid Credentials',
          success: false,    
        });
      }
    }else{
      return res.status(400).json({
        "message": 'Invalid Credentials',
        success: false,    
      });
    }
  } catch (error) {
  console.log("Error in login : ",error);
  return res.status(400).json({ 
      "message": 'Internal error! Try again', 
      success: false,
    });
  }
}

const visualizer = async (req, res) => {
  try{
    const user = req.user;
    let totalScore = 0, totalQuestions = 0;
    let accuracyData = [];
    for(let id = 0; id < user.quiz.length; id++){
      let accuracy = Number(((user.quiz[id].correctAnswers * 100) / user.quiz[id].totalQuestions).toFixed(3));
      accuracyData.push([accuracy, user.quiz[id].time])
    }
    console.log(accuracyData);
    return res.status(req.status).json({
      'message' : req.message,
      'accuracy' : accuracyData,
    })
  }catch(err){
    return res.status(req.status).json({
      'message' : req.message,
    })
  }

}

module.exports = {
  register,
  login,
  read,
  update,
  visualizer,
};