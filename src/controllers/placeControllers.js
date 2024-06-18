import Places from '../models/Places.js';

async function getPlacesByLocationId(req, res) {
  const location_id = req.params.location_id;

  try {
    const places = await Places.findAll({
      attributes: ['place_id', 'description', 'category', 'coordinate'],
      where: {
          fk_location: location_id
      }
    });

    if (places.length == 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Error getting places within location.'
      });
    }

    const placesWithUrls = places.map(place => {
      const coordinates = JSON.parse(place.coordinate.replace(/'/g, '"'));
      const urlMapsTemplate = 'https://www.google.com/maps/@{latitude},{longitude},15z';
      const urlMaps = urlMapsTemplate.replace('{latitude}', coordinates.lat).replace('{longitude}', coordinates.lng);

      return {          
        place_id: place.place_id,
        description: place.description,
        category: place.category,
        maps: urlMaps
      };
    });

    return res.status(200).json({ 
      status: "success",
      message: "Getting places within location successful.",
      data: {
        places: placesWithUrls 
      }
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error.'
    });
  }
}

async function getPlaceById(req, res) {
  const place_id = req.params.place_id;

  try {
    const place = await Places.findByPk(req.params.place_id, {
      include: 'location'
  });

    if (!place) {
      return res.status(400).json({
        status: 'fail',
        message: 'Error getting place.'
      });
    }

    const coordinates = JSON.parse(place.coordinate.replace(/'/g, '"'));
    const urlMapsTemplate = 'https://www.google.com/maps/@{latitude},{longitude},15z';
    const urlMaps = urlMapsTemplate.replace('{latitude}', coordinates.lat).replace('{longitude}', coordinates.lng);

    res.status(200).json({
      status: 'success',
      message: 'Getting place successful.',
      data: {
        name: place.name,
        description: place.description,
        category: place.category,
        location_id: place.fk_location,
        location_name: place.location.name,
        maps: urlMaps
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error.'
    });
  }
}

export default { getPlaceById, getPlacesByLocationId };