const fs = require('fs');
const path = require('path');
const homedir = require('os').homedir();
const home = process.env.HOME || homedir;
const dbpath = path.join(home, '.todo');
const db = {
	read(path = dbpath) {
		return new Promise((resolve, reject) => {
			fs.readFile(path, {flag: 'a+'}, (error, data) => {
				if (error) return reject(error);
				let list;
				try {
					list = JSON.parse(data.toString());
				} catch (e) {
					list = [];
				}
				resolve(list);
			});
		});
	},
	write(list, path = dbpath) {
		return new Promise((resolve, reject) => {
			const string = JSON.stringify(list);
			fs.writeFile(path, string, (error) => {
				if (error) return reject(error);
				resolve();
			});
		});

	}
};

module.exports = db;