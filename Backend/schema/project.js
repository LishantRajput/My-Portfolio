const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectType: {
    type: String,
    required: true,
  },

  uiTemplate: {   // ✅ correct name everywhere
    type: String,
    required: true,
  },

  htmlCode: {
    type: String,
  },

  cssCode: {
    type: String,
  },

  jsxCode: {
    type: String,
  },

  jsCode: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const projectModel = mongoose.model("Project", projectSchema);
module.exports = projectModel;