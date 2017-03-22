(function (global) {
    var maps = {
        "rxjs": "node_modules/rxjs",
        //"rxjs": "rxjs.module.min.js",
        //"rxjs/*/*": "rxjs.module.min.js",
        "@angular": "node_modules/@angular"
    }
    var paths = {
        //"@angular/*": "node_modules/@angular/*",
        //"rxjs/*": "rxjs.module.min.js" //PROD
    }
    var packages = { 
        "app": {},
        "rxjs": { defaultExtension: "js"}
        //"rxjs": { main: "rxjs.module.min.js" }
    };

    ["common", "compiler", "core", "platform-browser", "platform-browser-dynamic",
     "forms", "http", "router"].forEach(function (pkg) {
        packages["@angular/" + pkg] = {
            main: "bundles/" + pkg + ".umd.js"
        };
    });

    System.config({ map:maps, paths:paths, packages: packages });
})(this);