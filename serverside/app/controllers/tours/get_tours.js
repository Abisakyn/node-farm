const Tours = require ('../../models/tours/tours')

exports.getAllTours = async (req, res, next) => {
    try {
        const tours = await Tours.find();
        res.status(200).json({
            status:'success',
            results:tours.length,
            data:{
                tours
            }
        })
    } catch (err) {
        res.status(500).json({
            status:'error',
            message:'Something went wrong'
        })
    }
}