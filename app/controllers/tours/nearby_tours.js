const Tours = require('../../models/tours/tours');
const geolib = require('geolib');

exports.nearbyTours = async (req, res) => {
    const { lat, lng } = req.params;
    const usersLocation = { latitude: parseFloat(lat), longitude: parseFloat(lng) };

    try {
        const allTours = await Tours.find();
        
        const sortedTours = allTours.map(tour => {
            
            if (Array.isArray(tour.location) && tour.location.length > 0) {
                const location = tour.location[0];
                const distance = geolib.getDistance(usersLocation, {
                    latitude: location.coordinates[1],
                    longitude: location.coordinates[0]
                });
                return {
                    ...tour.toObject(),
                    distance: distance
                };
            } else {
                return null;
            }
        })
        .filter(tour => tour !== null) 
        .sort((a, b) => a.distance - b.distance);

        res.status(200).json({ sortedTours });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'fail',
            message: 'Failed to retrieve nearby tours'
        });
    }
};
