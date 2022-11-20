const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("POST /api/issues/{project}", () => {
    test("issue with every field", (done) => {
      chai
        .request(server)
        .post("/api/issues/projects")
        .set("content-type", "application/json")
        .send({
          issue_title: "title 1",
          issue_text: "text 1",
          created_by: "created_by 1",
          assigned_to: "assigned to 1",
          status_text: "status 1",
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isNotNull(res.body._id);
          assert.isNotNull(res.body.created_on);
          assert.isNotNull(res.body.updated_on);
          assert.equal(res.body.open, true);
          assert.equal(res.body.issue_title, "title 1");
          assert.equal(res.body.issue_text, "text 1");
          assert.equal(res.body.created_by, "created_by 1");
          assert.equal(res.body.assigned_to, "assigned to 1");
          assert.equal(res.body.status_text, "status 1");
        });
      done();
    });

    test("issue with only required fields", (done) => {
      chai
        .request(server)
        .post("/api/issues/projects")
        .set("content-type", "application/json")
        .send({
          issue_title: "title 2",
          issue_text: "text 2",
          created_by: "created_by 2",
          assigned_to: "",
          status_text: "",
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isNotNull(res.body._id);
          assert.isNotNull(res.body.created_on);
          assert.isNotNull(res.body.updated_on);
          assert.equal(res.body.open, true);
          assert.equal(res.body.issue_title, "title 2");
          assert.equal(res.body.issue_text, "text 2");
          assert.equal(res.body.created_by, "created_by 2");
          assert.equal(res.body.assigned_to, "");
          assert.equal(res.body.status_text, "");
        });
      done();
    });

    test("issue with missing required fields", (done) => {
      chai
        .request(server)
        .post("/api/issues/projects")
        .set("content-type", "application/json")
        .send({
          issue_title: "",
          issue_text: "",
          created_by: "",
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "required field(s) missing");
        });
      done();
    });
  });

  suite("GET /api/issues/projects", () => {
    test("View issues on a project", (done) => {
      chai
        .request(server)
        .get("/api/issues/projects")
        .end((err, res) => {
          assert.equal(res.status, 200);
        });
      done();
    });
  });
});
