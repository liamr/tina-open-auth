require('dotenv').config()

module.exports = {
	env: {
		GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
		REPO_FULL_NAME: process.env.REPO_FULL_NAME,
		BASE_BRANCH: process.env.BASE_BRANCH,
		MEDIA_BASE_URL: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/`
	},
	trailingSlash: true,
	exportPathMap: async function() {
    return {}
  },
	// ...
}
