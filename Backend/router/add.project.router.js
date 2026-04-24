const express = require("express");
const projectModel = require("../schema/project");
const upload = require("../midileWare/multer");
const fs = require("fs");
const path = require("path");

const { uploadFileOnCloud, deleteoncloud } = require("../utils/uploadfileoncloud");
const uploadToGithub = require("../utils/uploadToGithub");

const router = express.Router();
router.post("/add/htmlcss/project",
  upload.fields([
    { name: "uiTemplate", maxCount: 1 },
    { name: "htmlCode", maxCount: 1 },
    { name: "cssCode", maxCount: 1 },
  ]),
  async (req, res) => {
    console.log("line no 18")
    try {
      if (!req.files?.uiTemplate || !req.files?.htmlCode || !req.files?.cssCode) {
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
      console.log("line no 30")

      const uiTemplateLocalPath = req.files.uiTemplate[0].path;
      const htmlCodeLocalPath = req.files.htmlCode[0].path
      const cssCodeLocalPath = req.files.cssCode[0].path
      console.log("Line no 37", uiTemplateLocalPath, htmlCodeLocalPath, cssCodeLocalPath)

      const cloudResult = await uploadFileOnCloud(uiTemplateLocalPath);

      console.log("Line no 41", cloudResult)
      if (!cloudResult) {
        return res.status(500).json({
          success: false,
          message: "Cloud upload failed",
        });
      }
      const uniqueName = Date.now()
      const gitHtmlres = await uploadToGithub(htmlCodeLocalPath, uniqueName + "_" + req.files.htmlCode[0].originalname)
      console.log("line no 50", gitHtmlres)
      if (!gitHtmlres) {
        await deleteoncloud(cloudResult.public_id);

        if (fs.existsSync(htmlCodeLocalPath)) {
          fs.unlinkSync(htmlCodeLocalPath);
        }
        return res.status(500).json({
          success: false,
          message: "GitHub Html upload failed",
        });
      }
      const htmlCode = gitHtmlres.download_url
      const gitCssres = await uploadToGithub(cssCodeLocalPath, uniqueName + "_" + req.files.cssCode[0].originalname)
      console.log("line no 63", gitCssres)
      if (!gitCssres) {
        await deleteoncloud(cloudResult.public_id);

        if (fs.existsSync(htmlCodeLocalPath)) {
          fs.unlinkSync(htmlCodeLocalPath);
        }
        return res.status(500).json({
          success: false,
          message: "GitHub Css upload failed",
        });
      }
      const cssCode = gitCssres.download_url

      const project = await projectModel.create({
        projectType: "Html-Css",
        uiTemplate: cloudResult.url,
        htmlCode: htmlCode,
        cssCode: cssCode
      });

      return res.json({
        success: true,
        message: "Uploaded successfully",
        project

      });
    } catch (error) {
      console.log(error)
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      })
    }

  });

router.post("/add/js/project",
  upload.fields([
    { name: "uiTemplate", maxCount: 1 },
    { name: "htmlCode", maxCount: 1 },
    { name: "jsCode", maxCount: 1 },
  ]),
  async (req, res) => {
    console.log("line no 18")
    try {
      if (!req.files?.uiTemplate || !req.files?.htmlCode || !req.files?.jsCode) {
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

      const uiTemplateLocalPath = req.files.uiTemplate[0].path;
      const htmlCodeLocalPath = req.files.htmlCode[0].path
      const jsCodeLocalPath = req.files.jsCode[0].path
        console.log("Line no 126", uiTemplateLocalPath, htmlCodeLocalPath, jsCodeLocalPath)

      const cloudResult = await uploadFileOnCloud(uiTemplateLocalPath);

        console.log("Line no 130", cloudResult)
      if (!cloudResult) {
        return res.status(500).json({
          success: false,
          message: "Cloud upload failed",
        });
      }
      const uniqueName = Date.now()
      const gitHtmlres = await uploadToGithub(htmlCodeLocalPath, uniqueName + "_" + req.files.htmlCode[0].originalname)
      //   console.log("line no 50", gitHtmlres)
      if (!gitHtmlres) {
        await deleteoncloud(cloudResult.public_id);

        if (fs.existsSync(htmlCodeLocalPath)) {
          fs.unlinkSync(htmlCodeLocalPath);
        }
        return res.status(500).json({
          success: false,
          message: "GitHub Html upload failed",
        });
      }
      const htmlCode = gitHtmlres.download_url
      const gitjsres = await uploadToGithub(jsCodeLocalPath, uniqueName + "_" + req.files.jsCode[0].originalname)
      console.log("line no 63", gitjsres)
      if (!gitjsres) {
        await deleteoncloud(cloudResult.public_id);

        if (fs.existsSync(htmlCodeLocalPath)) {
          fs.unlinkSync(htmlCodeLocalPath);
        }
        if (fs.existsSync(jsCodeLocalPath)) {
          fs.unlinkSync(jsCodeLocalPath);
        }
        return res.status(500).json({
          success: false,
          message: "GitHub js upload failed",
        });
      }
      const jsCode = gitjsres.download_url

      const project = await projectModel.create({
        projectType: "jsProject",
        uiTemplate: cloudResult.url,
        htmlCode: htmlCode,
        jsCode: jsCode
      });

      return res.json({
        success: true,
        message: "Uploaded successfully",
        project

      });
    } catch (error) {
      console.log(error)
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      })
    }

  });


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


      //  File paths
      const uiTemplatePath = req.files.uiTemplate[0].path;
      const jsxFilePath = req.files.jsxCode[0].path;

      //  Upload UI image to Cloudinary
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

      const jsxGitUrl = gitRes.download_url;

      //Save to DB
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