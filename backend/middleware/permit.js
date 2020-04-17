const permit = (...roles) => {
  return (req, res, next) => {
    const user = req.user;

    if(!user) return res.status(401).send({message: 'User not found'});
    if(!roles.includes(user.role)) return res.status(403).send({message: 'User not authorized'});

    return next();
  }
};

module.exports = permit;