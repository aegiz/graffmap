const env = process.env.NODE_ENV || 'development';

console.log("NODE_ENV:" + process.env.NODE_ENV);
console.log("HOSTNAME:" + process.env.HOSTNAME);

const config = {
	development: {
		bdd: "graff_dev",
		user: "user",
		server: {
			port: process.env.PORT || 6000,
			hostname: process.env.HOSTNAME || 'localhost'
		},
		apiKey: ""
	},
	test: {
		bdd: "graff",
		user: "user",
		server: {
			port: process.env.PORT || 6100,
			hostname: process.env.HOSTNAME || 'localhost'
		},
		apiKey: ""
	},
	production: {
		bdd: "graff",
		user: "user",
		server: {
			port: process.env.PORT || 6200,
			hostname: process.env.HOSTNAME || 'localhost'
		},
		apiKey: ""
	}
};

config[env].isDev = env === 'development';
config[env].isTest = env === 'test';
config[env].isProd = env === 'production';

module.exports = config[env];