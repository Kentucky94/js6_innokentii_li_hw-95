const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');

const Cocktail = require('../models/Cocktail');
const config = require('../config');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath + '/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname))
  }
});

const upload = multer({storage});

const router = express.Router();

router.post('/', [auth, permit('user', 'admin'), upload.single('image')], async (req, res) => {
  try{
    const cocktailData = {
      user: req.user._id,
      name: req.body.name,
      recipe: req.body.recipe,
      ingredients: JSON.parse(req.body.ingredients)
    };

    if(req.file){
      cocktailData.image = req.file.filename;
    }

    const cocktail = new Cocktail(cocktailData);

    await cocktail.save();

    return res.send(cocktail);
  }catch(error){
    return res.status(400).send(error);
  }
});

router.get('/', [auth, permit('user', 'admin')], async (req, res) => {
  try{
    let cocktails = [];

    switch(req.user.role){
      case 'admin':
        cocktails = await Cocktail.find().populate({path: 'user', select: ['displayName']});
        break;
      case 'user':
        cocktails = await Cocktail.find({user: req.user._id}).populate({path: 'user', select: ['displayName']});
        break;
      default:
        return res.status(400).send({error: 'User not found'})
    }

    return res.send(cocktails);
  }catch(error){
    return res.status(400).send(error);
  }
});

router.get('/published', async (req, res) => {
  try{
    const cocktails = await Cocktail.find({isPublished: true}).populate({path: 'user', select: ['displayName']});

    return res.send(cocktails);
  }catch(error){
    return res.status(400).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try{
    const cocktail = await Cocktail.findOne({_id: req.params.id});

    return res.send(cocktail);
  }catch(error){
    return res.status(400).send(error);
  }
});

router.post('/publish/:id', [auth, permit('admin')], async (req, res) => {
  try{
    const cocktail = await Cocktail.findOne({_id: req.params.id});

    cocktail.publish();

    await cocktail.save();

    return res.send(cocktail);
  }catch(error){
    return res.status(400).send(error);
  }
});

router.delete('/delete/:cocktailId', [auth, permit('admin')], async (req, res) => {
  try{
    await Cocktail.deleteOne({_id: req.params.cocktailId});

    return res.send({message: 'Cocktail has been deleted'});
  }catch(error){
    return res.status(400).send(error);
  }
});

module.exports = router;

