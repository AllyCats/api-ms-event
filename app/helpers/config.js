const config = {
	jwt: {
		secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : "SuperSecretKey"
	}
}
module.exports = config;