const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const should = chai.should();
const User = require("../models/user");
chai.use(chaiHttp);

const agent = chai.request.agent(server);

describe("User", function() {

  after(function () {
    agent.close()
  });

  // testing sign in
  it("should not be able to login if they have not registered", function(done) {
  agent.post("/sign-in", { email: "wrong@wrong.com", password: "password" }).end(function(err, res) {
    res.status.should.be.equal(401);
    done()
  })
})


// testing signup
it("should be able to signup", function(done) {
  User.findOneAndRemove({ username: "testone" }, function() {
    agent
      .post("/sign-up")
      .send({ firstname: 'dummy1', lastname: 'dummy2', username: "testone", password: "password" })
      .end(function(err, res) {
        console.log(res.body);
        res.should.have.status(200);
        agent.should.have.cookie("nToken");
        done();
      });
  });
});
})
