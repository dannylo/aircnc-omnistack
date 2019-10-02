const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();

//conectando ao cluster no atlas.
mongoose.connect('mongodb+srv://aircnc-user:aircncuser@aircnc-upwvj.mongodb.net/aircnc-bd?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//plugin 
app.use(express.json());
app.use(routes);


app.listen(3333);