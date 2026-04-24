
const fs = require("fs");
const axios = require("axios");
const getFileSha = require("./getFileSha");
require("dotenv").config

const uploadToGithub = async (filePath, fileName) => {
  try {
    const content = fs.readFileSync(filePath, { encoding: "base64" });

    const sha = await getFileSha(fileName);
    const response = await axios.put(
      `https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/contents/${fileName}`,
      {
        message: "upload file",
        content: content,
        ...(sha && { sha }) //  only if exists
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return response.data.content;
  } catch (err) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    console.log("line no 25 uploadtogithub \n");
    console.log("GitHub Error:", err.response?.data || err.message);
    return false
  }

}

module.exports = uploadToGithub