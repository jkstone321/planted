const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');
const { color_options } = require('../utils/helpers');
router.get('/', (req, res) => {
  res.render('homepage', { logged_in: req.session.logged_in });
});

// router.get('/project/:id', async (req, res) => {
//   try {
//     cdonst projectData = await Project.finByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const project = projectData.get({ plain: true });

//     res.render('project', {
//       ...project,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Project }],
//     });

//     const user = userData.map((user) => user.get({ plain: true }));

//     res.render('profile', {
//       ...user,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/mygarden', withAuth, async (req, res) => {
  try {
    //fetch to users getting user by primary key = req.session.user_id
    //get all chosen plants as an array .map to plain text
    //pass those plants to homepages
    //so we can do the each

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });
    const colors = color_options();
    console.log(colors);
    const user = userData.get({ plain: true });
    const unparsedPlants = user.chosen_plant;
    console.log(user);
    const chosen_plants = JSON.parse(unparsedPlants);
    console.log(user.chosen_plant);
    res.render('mygarden', {
      chosen_plants,
      user,
      colors,
      layout: 'gardenview',
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/about', (req, res) => {
  res.render('aboutus', { logged_in: req.session.logged_in });
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/mygarden');
    return;
  }

  res.render('login', { logged_in: req.session.logged_in });
});

module.exports = router;
