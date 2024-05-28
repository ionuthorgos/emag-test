var express = require('express');
var router = express.Router();

let users= [
  { id: 1, name: 'john doe' },
  { id: 2, name: 'anna boe' }
]

/* GET users listing. */
router.get('/users', function (req, res, next) {
  const response = {
    message: 'Here is the list of users',
    users: users
  }
  res.json(response);
});

router.get('/redirect', function (req, res, next) {

  res.redirect(301, 'https://emagtest.com');
});

/* POST new user. */
router.post('/users', function (req, res, next) {
  try {
    const newUser = req.body;
    console.log('New User:', newUser); // Log the new user data

    if (newUser && newUser.id && newUser.name) {
      users.push(newUser);
      res.status(201).json({
        message: 'User added successfully',
        user: newUser,
        users: users
      });
    } else {
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Error adding user:', error); // Log the error
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
