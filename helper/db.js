const mongoose = require('mongoose');
module.exports = () =>{
    mongoose.connect('mongodb://movie_user:yao.1234@ds143242.mlab.com:43242/movie_api', {useNewUrlParser: true});
    mongoose.connection.on('open', () =>{
        console.log('MongoDB: Connected');
    });
    mongoose.connection.on('error', (err) =>{
        console.log('MongoDB: Error', err);
    });

    
    mongoose.Promise = global.Promise;
};

