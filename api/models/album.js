'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = Shema({
    title: String,
    description: String,
    year: Number,
    image: String, 
    artist: {type: mongoose.Schema.ObjectId, ref: 'Artist'}
});

module.exports=mongoose.model('Album', AlbumSchema);