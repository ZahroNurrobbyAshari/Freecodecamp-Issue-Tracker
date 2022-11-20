const mongoose = require("mongoose");
const { Schema } = mongoose;

// Declare the Schema of the Mongo model
var IssueSchema = new Schema({
  assigned_to: String,
  status_text: String,
  open: Boolean,
  issue_title: {
    type: String,
    required: true,
  },
  issue_text: {
    type: String,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
  created_on: Date,
  updated_on: Date,
});

//Export the model
const Issue = mongoose.model("Issue", IssueSchema);

// Declare the Schema of the Mongo model
var ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  issues: {
    IssueSchema,
  },
});
const Project = mongoose.model("Project", ProjectSchema);

exports.Issue = Issue;
exports.Project = Project;
