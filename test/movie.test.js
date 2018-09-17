const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

//let token;
 let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbHVyc3MiLCJpYXQiOjE1MzcxOTEzMjMsImV4cCI6MTUzNzE5MjA0M30.mbudv4BAGAM75mNul1HPH28F4wVwSt4VOOHc_ryI1yM';

describe('/api/movies tests', () =>{
    before((done) =>{
        chai.request(server)
        .post('/authenticate')
        .send({username : 'salurs', password : '12345678'})
        .end((err, res) =>{
            token = res.body.token;
            console.log(token);
            done();
        });
    });
    describe('/GET movies', () =>{
        it('it should GET all the movies', (done) =>{
           chai.request(server)
           .get('/api/movies')
           .set('x-access-token', token)
           .end((err, res) =>{
               res.should.have.status(200);
               res.body.should.be.a('array');
               done();
           });
        });
    });
    describe('/POST movie', () =>{
        it('it should POST a movie', (done) =>{
            const movie = {
                title : 'udemy',
                director_id : '5b8ec3c923d44b0a10a0d191',
                category : 'Bilim-Kurgu',
                country : 'USA',
                year : 1989,
                imdb : 8.3
            };
            chai.request(server)
            .post('/api/movies')
            .send(movie)
            .set('x-access-token', token)
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.should.have.property('title');
                res.body.should.have.property('director_id');
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('year');
                res.body.should.have.property('imdb');
                done();
            });
        });
    });
    describe('/GET/:movie_id movie', () =>{
        it('it should GEt a movie by the given id', () =>{
            chai.request(server)
            .get('/aoi/movies/' + movieId)
            .set('x-access-token', token)
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.have.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('director_id');
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('year');
                res.body.should.have.property('imdb');
                res.body.should.have.property('_id').egl(movieId);
                done();
            });
        });
    });
    describe('/PUT/: movie_id movie', () =>{
        it('it should UPDATE a movie by id', (done) =>{
            const movie = {
                title : 'udemy',
                director_id : '5b8ec3c923d44b0a10a0d191',
                category : 'Bilim-Kurgu',
                country : 'USA',
                year : 1989,
                imdb : 8.3
            };
            chai.request(server)
            .put('/api/movies/' + movieId)
            .send(movie)
            .set('x-access-token', token)
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title').eql(movie.title);
                res.body.should.have.property('director_id').eql(movie.director_id);
                res.body.should.have.property('category').eql(movie.category);
                res.body.should.have.property('country').eql(movie.country);
                res.body.should.have.property('year').eql(movie.year);
                res.body.should.have.property('imdb').eql(movie.imdb);
                done();
            });
        });
    });
    describe('/DELETE/: movie_id movie', () =>{
        it('it should DELETE a movie by id', (done) =>{
            chai.request(server)
            .delete('/api/movies/' + movieId)
            .set('x-access-token', token)
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(1);
                done();
            });
        });
    });
});