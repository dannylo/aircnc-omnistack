const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    technologies: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }


},
//habilita a exposição de virtualizações no modelo. 
{
    toJSON: {
        virtuals: true,
    }
});
//define um atributo virtual para o modelo, criando o campo responsável por direcionar
//o thumbnail para a pasta de arquivos no servidor.
SpotSchema.virtual('thumbnail_url').get(function(){
    return `http://192.168.1.102:3333/files/${this.thumbnail}`;
});

module.exports = mongoose.model('Spot', SpotSchema);