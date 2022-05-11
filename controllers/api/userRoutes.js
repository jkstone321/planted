const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({msg:"something went wrong"});
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.log(err)
    res.status(400).json({msg: "something went wrong"});
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get('/mylist', async (req, res) => {
  try {
    const listData = await User.findOne({ where: { id: 1 }});
  //  let chosen_plants = listData.chosen_plants; // pulls comma seperated string from object recieved
 //  let chosen_plants_array = chosen_plants.split(',') // creates an array from string with split
    res.status(200).json(listData)
  } catch (err) {
    console.log(err)
    res.status(500).json({msg: "something went wrong"});
  }
});

router.put('/mylist', async (req, res) => {
  try {
    let fuckAnArray = JSON.stringify(req.body)
    const newChosenPlants = await User.update({chosen_plant:fuckAnArray},{where:{id:1}});

    res.status(200).json(newChosenPlants);
  } catch (err) {
    console.log(err)
    res.status(400).json({msg: "something went wrong"});
  }
});

module.exports = router;
