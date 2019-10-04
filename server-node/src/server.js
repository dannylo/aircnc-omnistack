const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

//conectando ao cluster no atlas.
mongoose.connect('mongodb+srv://aircnc-user:aircncuser@aircnc-upwvj.mongodb.net/aircnc-bd?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//plugin 
app.use(cors());
app.use(express.json());
//define a rota estática direcionando ela para a página de uploads.
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);


app.listen(3333);