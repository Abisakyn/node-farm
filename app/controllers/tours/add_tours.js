const Tours = require('../../models/tours/tours');

exports.AddTours = async (req, res, next) => {
    const { name } = req.body; // Destructure the name property from req.body
    try {
        const tour = await Tours.findOne({ name: name });
        if (tour) {
            return res.status(400).json({ message: 'Tour already exists' });
        }
        const newTour = new Tours({
            name: name
        });
        await newTour.save();
        return res.status(200).json({
            message: 'Tour added successfully',
            data: {
                newTour: newTour
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};