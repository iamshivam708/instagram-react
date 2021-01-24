const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('uploads'));

const Routes = require('./routes')
app.use('/api',Routes);

app.listen(process.env.PORT || 5000, function(){
    console.log('server running on port 5000');
})