const router = require('express').Router();
const { Plant } = require('../../models');
const withAuth = require('../../utils/auth');

//********SET UP AUTHOTIZATION********//


//========GETS ALL PLANTS========//
router.get('/', async (req, res) => {
  try {
    const plantData = await Plant.findAll();
    res.status(200).json(plantData);
  } catch (err) {
    console.log(err)
    res.status(500).json({msg: "Something went wrong"});
  }
});

//========GETS ONLY PLANT NAMES========//
router.get('/name', async (req, res) => {
  try {
    const plantData = await Plant.findAll({ attributes: ['name'] });
    const plantNames = plantData.map((p) => p.name);
    res.status(200).json(plantNames);
  } catch (err) {
    console.log(err)
    res.status(500).json({msg: "something went wrong"});
  }
});

//========GETS PLANTS BY ID========//
router.get('/:id', async (req, res) => {
  try {
    const plantData = await Plant.findOne({ where: { id: req.params.id } });
    res.status(200).json(plantData);
  } catch (err) {
    console.log(err)
    res.status(500).json({msg: "something went wrong"});
  }
});

//========UPDATES A PLANT BY ID========//
router.put('/:id', async (req, res) => {
  try {
    const plantData = await Plant.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(plantData);
  } catch (err) {
    console.log(err);
    res.status(400).json({msg: "something went wrong"});
  }
});

//========DELETES A PLANT========//
router.delete('/:id', async (req, res) => {
  try {
    const plantData = await Plant.destroy({ where: { id: req.params.id } });

    if (!plantData) {
      res.status(404).json({ message: 'No garden found with this id!' });
      return;
    }

    res.status(200).json(plantData);
  } catch (err) {
    console.log(err);
    res.status(500).json({msg: "something went wrong"});
  }
});

//========POSTS A NEW PLANT========//
router.post('/', async (req, res) => {
  try {
    const newPlant = await Plant.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPlant);
  } catch (err) {
    console.log(err)
    res.status(400).json({msg: "something went wrong"});
  }
});

module.exports = router;
