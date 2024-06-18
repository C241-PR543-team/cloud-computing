import Locations from '../models/Locations.js';
import { Sequelize } from 'sequelize';

async function getAllLocations(req, res) {
  try{
    const locations = await Locations.findAll({
      attributes: ['location_id', 'name', 'description', 'photo'],
      where: {
        location_id: {
            [Sequelize.Op.not]: 0
        }
    }
    });

    res.status(200).json({
        status: 'success',
        data: locations
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error.',
    });
  }
}

async function getLocationById(req, res) {
  const location_id = req.params.location_id;

  try {
    const location = await Locations.findOne({ where: { location_id }});
    
    if (!location) {
      return res.status(400).json({
        status: 'fail',
        message: 'Error getting location.'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Getting location successful.',
      data: {
        name: location.name,
        description: location.description,
        photo: location.photo,
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error.',
    });
  }
}

export default { getLocationById, getAllLocations }