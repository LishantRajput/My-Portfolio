const express = require("express");
const projectModel = require("../schema/project");

const router = express.Router();

// GET method use karo
router.get("/render/project/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await projectModel.findById(id);

    if (!result) {
      return res.status(404).send({
        success: false,
        message: "Project not found"
      });
    }

    res.send({
      success: true,
      message: "Project fetched successfully",
      result
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server error",
      error
    });
  }
});

router.post("/find/project", async (req, res) => {
  const { projectType } = req.body; // ✅ body use karo

  try {
    const result = await projectModel.find({ projectType });

    res.send({
      success: true,
      message: result.length ? "data found" : "no data found",
      result
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "server error",
      error
    });
  }
});

module.exports = router;