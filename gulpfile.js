const gulp = require("gulp");
const nodemon = require("gulp-nodemon");
const browserSync = require("browser-sync");
const sass = require("gulp-sass");
const notify = require("gulp-notify");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const mainBowerFiles = require("main-bower-files");
const gconcat = require("gulp-concat");
const uglify = require("gulp-uglify");

const reload = browserSync.reload;
const config = require("./config/config");

const fs = require("fs");
const prettier = require("prettier");

// Prettify the files
function runPrettier (file, opts, task) {
	if (file.path && file.type === "changed") {
		const content = fs.readFileSync(file.path, "utf8");
		const formattedContent = prettier.format(content, opts);
		fs.writeFile(file.path, formattedContent, function(err) {
			if (err) {
				return console.log(err);
			} else {
				console.log("Prettify the JS!");
				gulp.start(task);
			}
		});
	}
}

// Handle CLI erros
function handleError(err) {
	console.log(err.toString());
	this.emit("end");
}

gulp.task("images", function() {
	return gulp
		.src(["src/images/**/*", "!src/images/graffs/**/*"])
		.pipe(imagemin())
		.pipe(gulp.dest("public/img"))
		.pipe(reload({ stream: true }));
});

gulp.task("sass", function() {
	return gulp
		.src("src/sass/**/*.scss")
		.pipe(sass())
		.on("error", notify.onError("Error: <%= error.message %>"))
		.on("error", handleError)
		.pipe(
			autoprefixer(
				"last 2 version",
				"ie 9",
				"opera 12.1",
				"ios 7",
				"android 6"
			)
		)
		.pipe(cleanCSS())
		.pipe(gulp.dest("public/css"))
		.pipe(reload({ stream: true }));
});

gulp.task("script", function() {
	var files = mainBowerFiles()
		.concat("src/scripts/lib/*.js")
		.concat("src/scripts/!(index)*.js")
		.concat("src/scripts/index.js");
	return (gulp
			.src(files)
			.pipe(gconcat("all.js"))
			//.pipe(uglify())
			.pipe(gulp.dest("public/js"))
			.pipe(reload({ stream: true })) );
});

gulp.task("watch", () => {
	gulp.watch("src/sass/*.scss", function(file) {
		runPrettier(file, {
			tabWidth: 3,
			useTabs: true,
			singleQuote: true,
			parser: "scss"
		},"sass");
	});
	gulp.watch("src/scripts/*.js", function(file) {
		runPrettier(file, {
			tabWidth: 3,
			useTabs: true,
			singleQuote: true,
			parser: "babylon"
		}, "script");
	});
	gulp.watch(["src/images/**/*", "!src/images/graffs/**/*"], ["images"]);
});

gulp.task("browser-sync", ["nodemon"], () => {
	browserSync.init(null, {
		proxy: `http://localhost:${config.server.port}`,
		files: ["public/**/*.*", "**.js"],
		browser: "google chrome",
		port: 7000
	});
});

gulp.task("nodemon", cb =>
	nodemon({
		exec: "node --debug",
		script: "app.js",
		ext: "js pug",
		ignore: ["public/js/*.js", "src/scripts/*.js"],
		env: { NODE_ENV: "development", DEBUG: "myapp:*" }
	})
	.once("start", cb)
	.on("restart", () => {
		setTimeout(() => {
			browserSync.reload({ stream: false });
		}, 500);
	})
);

gulp.task("default", ["nodemon", "watch", "browser-sync"]);

gulp.task("build", ["sass", "script", "images"]);
