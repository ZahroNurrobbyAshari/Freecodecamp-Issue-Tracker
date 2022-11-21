const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

// Create an issue with every field: POST request to /api/issues/{project}
// Create an issue with only required fields: POST request to /api/issues/{project}
// Create an issue with missing required fields: POST request to /api/issues/{project}
// View issues on a project: GET request to /api/issues/{project}
// View issues on a project with one filter: GET request to /api/issues/{project}
// View issues on a project with multiple filters: GET request to /api/issues/{project}
// Update one field on an issue: PUT request to /api/issues/{project}
// Update multiple fields on an issue: PUT request to /api/issues/{project}
// Update an issue with missing _id: PUT request to /api/issues/{project}
// Update an issue with no fields to update: PUT request to /api/issues/{project}
// Update an issue with an invalid _id: PUT request to /api/issues/{project}
// Delete an issue: DELETE request to /api/issues/{project}
// Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
// Delete an issue with missing _id: DELETE request to /api/issues/{project}

suite("Functional Tests", function () {
  suite("POST /api/issues/{project}", () => {
    test("Create an issue with every field: POST request to /api/issues/{project}", (done) => {
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

    test("Create an issue with only required fields: POST request to /api/issues/{project}", (done) => {
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

    test("Create an issue with missing required fields: POST request to /api/issues/{project}", (done) => {
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
    test("View issues on a project: GET request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .get("/api/issues/test")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.length, 2);
          done();
        });
    });

    test("View issues on a project with one filter: GET request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .get("/api/issues/test")
        .query({ _id: "637af6ef2bcac7c102ce0497" })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body[0], {
            _id: "637af6ef2bcac7c102ce0497",
            updated_on: "2022-11-21T03:56:31.639Z",
            created_on: "2022-11-21T03:56:31.639Z",
            created_by: "anjas",
            issue_text: "oke",
            issue_title: "test",
            open: true,
            status_text: "",
            assigned_to: "",
          });
          done();
        });
    });

    test("View issues on a project with multiple filters: GET request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .get("/api/issues/test")
        .query({ issue_title: "test", issue_tex: "oke" })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body[0], {
            _id: "637af6ef2bcac7c102ce0497",
            updated_on: "2022-11-21T03:56:31.639Z",
            created_on: "2022-11-21T03:56:31.639Z",
            created_by: "anjas",
            issue_text: "oke",
            issue_title: "test",
            open: true,
            status_text: "",
            assigned_to: "",
          });
          done();
        });
    });
  });
});
