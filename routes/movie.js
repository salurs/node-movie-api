const express = require('express');
const router = express.Router();

//Model dosyaları
const mMovie = require('../models/MMovie');


router.post('/', (req, res, next) =>{
  const movie = new mMovie(req.body);
  const promise = movie.save();

  promise.then((data) =>{
    res.json(data);
  }).catch((err) =>{
    res.json(err);
  });
});

/*
router.post('/', (req, res, next) =>{
  const movies = new mMovie({
      title: "Scarface",
      category: "Suç/Gerilim",
      country: "ABD",
      year: 1983,
      imdb: 8.3,
      date: Date.now()
  });
  movies.save((err, data) =>{
      if(err) console.log(err);
      res.json(data);
  });
});
*/


module.exports = router;
