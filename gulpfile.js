var gulp = require("gulp");
var stylus = require("gulp-stylus");
var jade = require("gulp-jade");
var notifier = require("node-notifier");
var browserSync = require("browser-sync");

gulp.task("server", function (){
	browserSync({
		server:{
			baseDir: 'dist'
		},
		notify: false
	});
});

gulp.task("reload", function() {
	browserSync.reload();
});

gulp.task("compile", function(){
	try{
		gulp.src("src/stylus/**/*.styl")
		.pipe(stylus().on('error', function (error) {
			notifier.notify("Error on stylus!");
			console.error('' + error);
		}))
		.pipe(gulp.dest("dist/css"));

		gulp.src("src/jade/**/*.jade")
		.pipe(jade({
			pretty: true
		}).on('error', function (error) {
			notifier.notify("Error on jade!");
			console.error('' + error);
		}))
		.pipe(gulp.dest("dist"));
	}catch(e){
		console.log(e);
		notifier.notify("Error");
	}
});

gulp.task("watch", ["server", "compile"], function() {
	gulp.watch("src/**", ["compile"]);
	gulp.watch("dist/**", ["reload"]);
});

gulp.task("default", ["watch"]);