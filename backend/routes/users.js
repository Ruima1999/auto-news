const router = require('express').Router();
let User = require('../models/user.model');
const fs = require('fs');

router.route('/').get((req, res) => {
  User.find()
    .then(users => fs.writeFileSync('../email1.txt', JSON.stringify(users)))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const email = req.body.email;
  const username = req.body.username;

  const newUser = new User({email,username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
      .then(User => res.json(User))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  
  router.route('/:id').delete((req, res) => {
    User.findOneAndDelete({email: req.params.id})
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
module.exports = router;