const Booking = require('../models/Booking');

module.exports = {
    async store(req, res) {
        const { booking_id } = req.params;
        const booking = await Booking.findById(booking_id).populate('spot');
        booking.approved = false;
        await booking.save();
        
        //enviando uma mensagem para o usuário interessado na reserva
        const userBookingSocket = req.connectedUsers[booking.user];
        if (userBookingSocket) {
            req.io.to(userBookingSocket).emit('booking_response', booking);
        }

        return res.json(booking);
    }
}