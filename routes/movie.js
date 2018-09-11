const express = require('express');
const router = express.Router();

//Model dosyaları
const mMovie = require('../models/MMovie');
//Tüm filmleri listelemek
/*
router.get('/', (req, res) =>{
  const promise = mMovie.find({ });
  promise.then((data) =>{
    res.json(data);
  }).catch((err) =>{
    res.json(err);
  });
});
*/
// tüm filmleri yönetmen bilgisi ile listelemek
router.get('/', (req, res) =>{
  const promise = mMovie.aggregate([
    {
      $lookup : {
        from : 'directors',
        localField : 'director_id',
        foreignField : '_id',
        as : 'director'
      }
    },
    {
      $unwind : '$director'
    }
  ]);
  promise.then((data) =>{
    res.json(data);
  }).catch((err) =>{
    res.json(err);
  });
});
//top 10 listesi yapmak
router.get('/top10', (req, res, next) =>{
  const promise = mMovie.find({ }).limit(10).sort({imdb: -1});
  promise.then((movie) =>{
    if(!movie)
      next({ message: 'The movie wasnt find!' });
    res.json(movie);
  }).catch((err) =>{
    res.json(err);
  });
});

//id bazlı film listelemek
router.get('/:movie_id', (req, res, next) =>{
  const promise = mMovie.findById(req.params.movie_id);
  promise.then((movie) =>{
    if(!movie)
      next({ message: 'The movie wasnt find!' });
    res.json(movie);
  }).catch((err) =>{
    res.json(err);
  });
});
//film kaydetmek
router.post('/', (req, res, next) =>{
  const movie = new mMovie(req.body);
  const promise = movie.save();
  
  promise.then((data) =>{
    res.json(data);
  }).catch((err) =>{
    res.json(err);
  });
});

//güncellemek
router.put('/:movie_id', (req, res, next) =>{
  const promise = mMovie.findByIdAndUpdate(req.params.movie_id, req.body, {new: true});
  promise.then((movie) =>{
    if(!movie)
      next({ message: 'The movie wasnt find!' });
    res.json(movie);
  }).catch((err) =>{
    res.json(err);
  });
});
// id bazlı silmek
router.delete('/:movie_id', (req, res, next) =>{
  const promise = mMovie.findByIdAndRemove(req.params.movie_id);
  promise.then((movie) =>{
    if(!movie)
      next({ message: 'The movie wasnt find!' });
    res.json(movie);
  }).catch((err) =>{
    res.json(err);
  });
});
// between; iki tarih arasındaki kayıtları listelemek
// $gte(>=) ve $lte(<=) ifade eder.
// $gt(>) ve $lt(<) ifade eder.
router.get('/between/:start_year/:end_year', (req, res) =>{
  const {start_year, end_year} = req.params;
  const promise = mMovie.find(
    {
      year: { '$gte': parseInt(start_year), '$lte': parseInt(end_year) } 
  });
  promise.then((data) =>{
    res.json(data);
  }).catch((err) =>{
    res.json(err);
  });
});

module.exports = router;
