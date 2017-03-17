var Builder = require("systemjs-builder");

var builder = new Builder("./");
builder.config({
    paths: {
        "rxjs/*": "node_modules/rxjs/*.js"
    },
    map: {
        "rxjs": "node_modules/rxjs"
    },
    packages: {
        "rxjs": { main: "Rx.js", defaultExtension: "js" }
    }
});
builder.bundle("rxjs", "rxjs.module.min.js", {
    normalize: false,
    runtime: false,
    minify: false,
    mangle: false
});