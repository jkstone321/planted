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
    res.status(400).json({ msg: "something went wrong" });
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
    res.status(400).json({ msg: "something went wrong" });
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

//====MYLIST ROUTERS, NEED TO MOVE TO OWN ROUTER====//
router.get('/mylist', async (req, res) => {
  try {
    const listDataRaw = await User.findOne({ where: { id: req.session.user_id } });
    if (!listDataRaw) console.log('no list data');
    let listDataAtts = listDataRaw.chosen_plant
    console.log(listDataAtts);
    res.status(200).json(listDataAtts)
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.post('/mylist', async (req, res) => {
  try {
    let fuckAnArray = JSON.stringify(req.body)
    console.log('myListBody:', req.body)
    const newChosenPlants = await User.update({ chosen_plant: fuckAnArray }, { where: { id: req.session.user_id } });
    console.log('chosenPlants', newChosenPlants)
    res.status(200).json(newChosenPlants);
  } catch (err) {
    console.log('myListErr:', err)
    res.status(400).json({ msg: "something went wrong, in the post route to /mylist" });
  }
});


//====MYGRID ROUTERS, NEED TO MOVE TO OWN ROUTER====//
router.get('/mygridinfo', async (req, res) => {
  try {
    const gridDataRaw = await User.findOne({ where: { id: req.session.user_id } });
    if (!gridDataRaw) console.log('no grid data in DB, err @ rouert.get /mygrid');
    let gridDataAtts = gridDataRaw.personal_grid
    res.status(200).json(gridDataAtts)
  } catch (err) {
    console.log(err)
    console.log("getting an error in the router.get /mygrid, but the raw data is there")
    res.status(500).json(err);
  }
});
router.get('/mygridsize', async (req, res) => {
  try {
    const gridSizeRaw = await User.findOne({ where: { id: req.session.user_id } });
    if (!gridSizeRaw) console.log('no grid data in DB, err @ rouert.get /mygrid');
    let gridSizeAtts = gridSizeRaw.grid_size
    res.status(200).json(gridSizeAtts)
  } catch (err) {
    console.log(err)
    console.log("getting an error in the router.get /mygrid, but the raw data is there")
    res.status(500).json(err);
  }
});

router.put('/mygridinfo', async (req, res) => {
  try {
    let fuckAnArray = JSON.stringify(req.body)
    const newGridData = await User.update({ personal_grid: fuckAnArray }, { where: { id: req.session.user_id } });
    res.status(200).json(newGridData);
  } catch (err) {
    console.log(err)
    res.status(400).json({ msg: "something went wrong, in the post route to /mygridinfo" });
  }
});

router.put('/mygridsize', async (req, res) => {
  try {
    let fuckAnArray = JSON.stringify(req.body)
    const newGridSize = await User.update({ grid_size: fuckAnArray }, { where: { id: req.session.user_id } });
    res.status(200).json(newGridSize);
  } catch (err) {
    console.log(err)
    res.status(400).json({ msg: "something went wrong, in the post route to /mygridinfo" });
  }
});

module.exports = router;
