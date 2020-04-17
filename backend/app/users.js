const express = require('express');
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const {nanoid} = require('nanoid');

const config = require('../config');
const User = require('../models/User');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath + '/avatars')
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname))
  }
});

const upload = multer({storage});

router.post('/facebook', async (req, res) => {
  try{
    const inputToken = req.body.accessToken;
    const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;
    const url = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

    const response = await axios.get(url);

    if(response.data.data.error) return res.status(401).send({message: 'Facebook token incorrect'});
    if(response.data.data.user_id !== req.body.id) return res.status(401).send({message: 'Incorrect user ID'});

    let user = await User.findOne({facebookId: req.body.id});

    if(!user){
      user = new User({
        username: req.body.id,
        facebookId: req.body.id,
        password: nanoid(),
        displayName: req.body.name,
      });
    }

    user.generateToken();
    await user.save();

    return res.send(user);
  }catch(error){
    return res.status(400).send(error);
  }
});

router.post('/', upload.single('avatar') ,async (req, res) => {
  try {
    const userData = {
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
    };

    if(req.file){
      userData.avatar = req.file.filename
    }

    const user = new User(userData);

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post('/sessions', async (req, res) => {
  try{
    const user = await User.findOne({username: req.body.username});
    if (!user) return res.status(400).send({error: 'Username or password not correct!'});

    const isMatch = await user.comparePasswords(req.body.password);
    if (!isMatch) return res.status(400).send({error: 'Username or password not correct!'});

    user.generateToken();
    await user.save();

    return res.send(user);
  }catch(error){
    return res.status(400).send(error);
  }
});

router.delete('/sessions', async (req, res) => {
  const success = {message: 'Success'};

  try{
    const token = req.get('Authorization').split(' ')[1];
    if(!token) return res.send(success);

    const user = await User.findOne({token});
    if(!user) return res.send(success);

    user.generateToken();
    await user.save();

    return res.send(success);
  }catch(e){
    return res.send(success);
  }
});

module.exports = router;