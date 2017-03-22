(function (global) {
    var paths = {
        "npm:": "./node_modules/",// PROD 'https://unpkg.com/',
        //"libs:rxjs": "./node_modules/rxjs/bundles/Rx.js"
        "libs:rxjs" : "https://cdnjs.cloudflare.com/ajax/libs/rxjs/5.2.0/Rx.js"
        //"@angular/*": "node_modules/@angular/*",
        //"rxjs*": "node_modules/rxjs/bundles/Rx.js" //PROD
    }

    bundles = {
    "libs:rxjs": [
      "rxjs",
      "rxjs/*",
      "rxjs/operator/*",
      "rxjs/observable/*",
      "rxjs/scheduler/*",
      "rxjs/symbol/*",
      "rxjs/add/operator/*",
      "rxjs/add/observable/*",
      "rxjs/util/*"
    ]
  }

    var maps = {       
        "rxjs": "npm:rxjs",
        //"rxjs": "rxjs.module.min.js",
        //"rxjs/*/*": "rxjs.module.min.js",
        "@angular": "npm:@angular"
    }
    var packages = { 
        "app": {},
        "rxjs": { defaultExtension: "js"}
        //"rxjs": { main: "libs:rxjs" }
    };

    ["common", "compiler", "core", "platform-browser", "platform-browser-dynamic",
     "forms", "http", "router"].forEach(function (pkg) {
        packages["@angular/" + pkg] = {
            main: "bundles/" + pkg + ".umd.js"
        };
    });

    System.config({ map:maps, paths:paths, bundles:bundles, packages: packages });
})(this);