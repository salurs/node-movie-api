const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, ' `{PATH}` ALANI ZORUNLUDUR.'],
        minlength : [4, ' `{PATH}` ALANI {VALUE},  {MINLENGTH} KARAKTERDEN BÜYÜK OLMAMALI'],
        maxlength : [20, ' `{PATH}` ALANI {VALUE},  {MAXLENGTH} KARAKTERDEN KÜÇÜK OLMAMALI'],
    },
    
    //title: String,
    category: String,
    country: String,
    year: Number,
    imdb: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie', MovieSchema);