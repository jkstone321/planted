const router = require('express').Router();
const { Garden } = require('../../models');
const withAuth = require('../../utils/auth');

//========GETS ALL GARDENS(PLANTS)========//
router.get('/', async (req, res) => {
    try {
      const gardendata = await Garden.findAll({include: Product});
      res.status(200).json(gardendata)
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //========UPDATES A GARDEN(PLANT) BY ID========//
router.put('/:id', async (req, res) => {
    try{
    const gardendata = await Garden.update({
      tag_name: req.body.tag_name
    },
      {
        where:
        {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(gardendata);
    }catch(err){
      res.status(400).json(err);
    }
  });
  

//========DELETES A GARDEN(PLANT)========//
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const gardenData = await Garden.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!gardenData) {
      res.status(404).json({ message: 'No garden found with this id!' });
      return;
    }

    res.status(200).json(gardenData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//========POSTS NEW DATA========//
router.post('/', withAuth, async (req, res) => {
    try {
      const newgarden = await Garden.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newgarden);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  
module.exports = router;