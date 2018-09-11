const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const mDirector = require('../models/MDirector');

//POST method
router.post('/', (req, res, next) =>{
    const director = new mDirector(req.body);
    const promise = director.save();
    
    promise.then((data) =>{
      res.json(data);
    }).catch((err) =>{
      res.json(err);
    });
  });
  //movies ve directors join yapmak
router.get('/', (req, res, next) =>{
    const promise = mDirector.aggregate([
        {
            $lookup:{
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id:{
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ]);
    promise.then((data) =>{
        res.json(data);
    }).catch((err) =>{
        res.json(err);
    });
  });
  // id ile yönetmen çekmek
router.get('/:director_id', (req, res, next) =>{
    const promise = mDirector.aggregate([
        {
            $match: {
                '_id': mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup:{
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id:{
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ]);
    promise.then((data) =>{
        res.json(data);
    }).catch((err) =>{
        res.json(err);
    });
  });
  //güncellemek
router.put('/:director_id', (req, res, next) =>{
    const promise = mDirector.findByIdAndUpdate(req.params.director_id, req.body, {new: true});
    promise.then((director) =>{
      if(!director)
        next({ message: 'The director wasnt find!' });
      res.json(director);
    }).catch((err) =>{
      res.json(err);
    });
  });
  // id bazlı silmek
router.delete('/:director_id', (req, res, next) =>{
    const promise = mDirector.findByIdAndRemove(req.params.director_id);
    promise.then((director) =>{
      if(!director)
        next({ message: 'The director wasnt find!' });
      res.json(movie);
    }).catch((err) =>{
      res.json(err);
    });
  });




module.exports = router;