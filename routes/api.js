"use strict";

const mongoose = require("mongoose");
const IssueModel = require("../models");
const ProjectModel = require("../models");

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      let project = req.params.project;
    })

    .post(function (req, res) {
      let project = req.params.project;

      const { issue_title, issue_text, created_by, assigned_to, status_text } =
        req.body;

      if ((!issue_title, !issue_text, !created_by)) {
        res.json({ error: "required field(s) missing" });
        return;
      }

      const newIssue = new IssueModel.Issue({
        assigned_to: assigned_to || "",
        status_text: status_text || "",
        open: true,
        issue_title: issue_title || "",
        issue_text: issue_text || "",
        created_by: created_by || "",
        created_on: new Date(),
        updated_on: new Date(),
      });

      console.log(ProjectModel);

      ProjectModel.findOne(
        {
          name: project,
        },
        (err, projectdata) => {
          if (!projectdata) {
            const newProject = new ProjectModel({ project });
            console.log(newProject);
            newProject.save((err, data) => {
              err || data
                ? res.send("There was an error saving in post")
                : res.json(newIssue);
            });
          } else {
            projectdata.issues.push(newIssue);
            projectdata.save((err, data) => [
              err || data
                ? res.send("There was an error saving in post")
                : res.json(newIssue),
            ]);
          }
        }
      );
    })

    .put(function (req, res) {
      let project = req.params.project;
    })

    .delete(function (req, res) {
      let project = req.params.project;
    });
};
