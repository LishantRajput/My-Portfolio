const express = require("express");
const projectModel = require("../schema/project");
const upload = require("../midileWare/multer");
const fs = require("fs");
const path = require("path");

const { uploadFileOnCloud, deleteoncloud } = require("../utils/uploadfileoncloud");
const uploadToGithub = require("../utils/uploadToGithub");

const router = express.Router();

router.post("/add/jsx/project",
  upload.fields([
    { name: "uiTemplate", maxCount: 1 },
    { name: "jsxCode", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      //  Required fields check
      if (!req.files?.uiTemplate || !req.files?.jsxCode) {
        if (req.files) {
          Object.values(req.files).forEach((fileArray) => {
            fileArray.forEach((file) => fs.unlinkSync(file.path));
          });
        }

        return res.status(400).json({
          success: false,
          message: "All files are required",
        });
      }

      if (path.extname(req.files.jsxCode[0].originalname) !== ".jsx") {
        Object.values(req.files).forEach((fileArray) => {
          fileArray.forEach((file) => fs.unlinkSync(file.path));
        });

        return res.status(400).json({
          success: false,
          message: "Invalid JSX file",
        });
      }

      //  File paths
      const uiTemplatePath = req.files.uiTemplate[0].path;
      const jsxFilePath = req.files.jsxCode[0].path;

      // ✅ Upload UI image to Cloudinary
      const cloudResult = await uploadFileOnCloud(uiTemplatePath);

      if (!cloudResult) {
        return res.status(500).json({
          success: false,
          message: "Cloud upload failed",
        });
      }

      //  Upload JSX to GitHub
      const fileName = Date.now() + "-" + req.files.jsxCode[0].originalname;
      const gitRes = await uploadToGithub(jsxFilePath, fileName);

      if (!gitRes) {
        await deleteoncloud(cloudResult.public_id);

        if (fs.existsSync(jsxFilePath)) {
          fs.unlinkSync(jsxFilePath);
        }

        return res.status(500).json({
          success: false,
          message: "GitHub upload failed",
        });
      }

      //  Delete local file after upload
      if (fs.existsSync(jsxFilePath)) {
        fs.unlinkSync(jsxFilePath);
      }

      const jsxGitUrl = gitRes.content.download_url;

      // ✅ Save to DB
      const project = await projectModel.create({
        projectType: "React",
        uiTemplate: cloudResult.url,
        jsxCode: jsxGitUrl,
      });

      return res.json({
        success: true,
        message: "Uploaded successfully",
        project,
      });

    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

module.exports = router;