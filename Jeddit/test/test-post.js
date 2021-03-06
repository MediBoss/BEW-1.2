const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Post = require('../models/post');
const agent = chai.request.agent(app);

chai.use(chaiHttp);

// DUMMY Post DATA USED FOR TESTING  EDIT, UPDATE, DELETE ROUTES
const newPost = {
    title: 'post title',
    url: 'https://www.google.com',
    summary: 'post summary',
}

const user = {
    username: 'poststest',
    password: 'testposts'
};

before(function (done) {
  agent
    .post('/sign-up')
    .set("content-type", "application/x-www-form-urlencoded")
    .send(user)
    .then(function (res) {
      done();
    })
    .catch(function (err) {
      done(err);
    });
});

describe('Posts', () => {
  after(() => {
      Post.deleteMany({title: "post title"}).exec( (error, posts) => {

      });
  });

    // TESTING ROUTE : INDEX POST
    it('should index ALL posts on /posts GET', (done) => {
        chai.request(server)
            .get('/posts')
            .end( (error, response) => {
                response.should.have.status(200);
                response.should.be.html;
                done();
            });
    });

    // TESTING ROUTE : NEW POST
    it('should display new form on /posts/new GET', (done) => {
        chai.request(server)
            .get('/posts/new')
            .end( (error, response) => {
                response.should.have.status(200);
                response.should.be.html;
                done();
            });
    });

    // TESTING ROUTE : CREATE POST
    it('should return the created post object /posts POST', (done) => {
        chai.request(server)
            .post('/posts/new')
            .end( (error, response) => {
                response.should.have.status(200);
                response.should.be.html;
                done();
            });
    });

    // TESTING ROUTE : SHOW POST
    it('should display the clicked /posts/:id GET', (done) => {
        let post = new Post(newPost);
        post.save( (error, data) => {
            chai.request(server)
                .get(`/posts/${data._id}`)
                .end( (error, response) => {
                    response.should.have.status(200);
                    response.should.be.html;
                    done();
                });
        });
    });

    // Cleaning up dummy data after testing and closing agent
    after(function (done) {
      Post.findOneAndDelete(newPost)
      .then(function (res) {
          agent.close()

          User.findOneAndDelete({
              username: user.username
          })
            .then(function (res) {
                done()
            })
            .catch(function (err) {
                done(err);
            });
      })
      .catch(function (err) {
          done(err);
      });
    });
});
