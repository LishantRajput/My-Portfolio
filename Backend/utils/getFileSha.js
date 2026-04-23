const getFileSha = async (fileName) => {
    try {
        const res = await axios.get(
            `https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/contents/${fileName}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                },
            }
        );

        return res.data.sha;
    } catch (err) {
        return null; // file exist nahi karti
    }
};
module.exports = getFileSha

