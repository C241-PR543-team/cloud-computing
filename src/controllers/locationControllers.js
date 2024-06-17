import locations from '../models/Locations.js';
import { Sequelize } from 'sequelize';

async function locationDetails(req, res) {
  const location_id = req.params.location_id;

  try {
    const location = await locations.findOne({ where: { location_id }});
    
    if (!location) {
      return res.status(400).json({
        status: 'fail',
        message: 'Error getting location.'
      })
    }

    res.status(200).json({
      status: 'success',
      message: 'Getting location successful',
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

export default { locationDetails }