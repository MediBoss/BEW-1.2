const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Post = require('../models/post');

chai.use(chaiHttp);

// DUMMY CHARITY DATA USED FOR TESTING  EDIT, UPDATE, DELETE ROUTES
const newPost = {
    title: 'post title',
    url: 'https://www.google.com',
    summary: 'post summary',
};

describe('Charities', () => {
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
            .post('/posts')
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
//
//     // TESTING ROUTE : EDIT POST
//     it('should give the user the ability to edit a post /posts/:id GET', (done) => {
//         let post = new POST(newPost);
//         post.save( (error, data) => {
//             chai.request(server)
//                 .get(`/posts/${data._id}/edit`)
//                 .end( (error, response) => {
//                     response.should.have.status(200);
//                     response.should.be.html;
//                     done();
//                 });
//         });
//     });
//
//     // TEST ROUTE : UPDATE CHARITY
//     it('should update the edited post /charities/:id PUT', (done) => {
//         let post = new Post(newPost);
//         post.save( (error, data) => {
//             chai.request(server)
//                 .put(`/posts/${data._id}?_method=PUT`)
//                 .send({"name": "updating post name"})
//                 .end( (error, response) => {
//                     response.should.have.status(200);
//                     response.should.be.html;
//                     done();
//                 });
//         });
//     });
//
//     // TEST ROUTE : DELETE CHARITY
//     it('should delete the selected post /charities/:id DELETE', (done) => {
//         let post = new Post(newPost);
//         charity.save( (error, data) => {
//             chai.request(server)
//                 .delete(`/posts/${data._id}?_method=DELTE`)
//                 .end( (error, response) => {
//                     response.should.have.status(200);
//                     response.should.be.html;
//                     done();
//                 });
//         });
//     });
//
});
