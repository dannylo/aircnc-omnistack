const Booking = require('../models/Booking');

module.exports = {
    async store(req,res){
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;
        
        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date
        });

        const bookingPopulate = await booking
            .populate('spot')
            .populate('user')
            .execPopulate();

        console.log(bookingPopulate);
        const ownerSocket = req.connectedUsers[bookingPopulate.spot.user];
        if(ownerSocket){
            console.log('request emited')
            req.io.to(ownerSocket).emit('booking_request', bookingPopulate);
        }
        return res.json(bookingPopulate);
    }
};