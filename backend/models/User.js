const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {nanoid} = require('nanoid');

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function(value){
        if(!this.isModified('password')) return true;

        const user = await User.findOne({username: value});
        if(user) throw new Error('This user already exists')
      }
    }
  },
  password: {
    type: String,
    required: true,
  },
  facebookId: {
    type: String,
    default: '',
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'admin'],
  },
  displayName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'noAvatar.jpg'
  }
});

UserSchema.methods.generateToken = function(){
  this.token = nanoid();
};

UserSchema.methods.comparePasswords = function(password){
  return bcrypt.compare(password, this.password)
};

UserSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
  next();
});

UserSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;