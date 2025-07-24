const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

//Routers===========================================

//GET (home page)
router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);// Look up user from req.session

    res.render('applications/index.ejs', {// Render index.ejs, passing in all of current user's applications as data in context object.
      applications: currentUser.applications,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


//GET /new
router.get('/new', async (req, res) => {
  res.render('applications/new.ejs');
});

//POST (form)
router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);// Look up user from req.session

    currentUser.applications.push(req.body);//Push req.body (new form data object) to apps array of current user

    await currentUser.save();// Save changes to user

    res.redirect(`/users/${currentUser._id}/applications`);// Redirect back to apps index view

  } catch (error) {// If any errors, log and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

//GET (show page)
router.get('/:applicationId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);//Find application by applicationId supplied from req.params

    const application = currentUser.applications.id(req.params.applicationId);//Render show view, passing application data in context object

    res.render('applications/show.ejs', {
      application: application,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});




module.exports = router;
