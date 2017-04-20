(function (global) {
    //try to load angular from CDN https://plnkr.co/edit/gDTZRdPhbOhRL4irkbX9?p=info
    var paths = {
        "npm:": "./node_modules/",// PROD 'https://unpkg.com/',
        "npmcdn:":"https://npmcdn.com/",
        //"libs:rxjs": "./node_modules/rxjs/bundles/Rx.js"
       // "libs:rxjs" : "https://cdnjs.cloudflare.com/ajax/libs/rxjs/5.2.0/Rx.js"
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
        "rxjs": "npmcdn:rxjs@5.2.0",
        "text": "systemjs.plugin.text.js",
        //"rxjs": "rxjs.module.min.js",
        //"rxjs/*/*": "rxjs.module.min.js",
        "@angular": "npmcdn:@angular",
        "leaflet": "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/leaflet.js"
        //"@angular/router": "npmcdn:@angular/router@3.4.10"
    }
    var packages = { 
        "app": {
            "main": "aot/app",
            "meta": {
                "*.html": {
                    "loader": "text"
                },
                "*.css": {
                    "loader": "text"
                }
            },
            defaultExtension: "js"
        },
        "aot": {defaultExtension: "js"},
        "rxjs": { defaultExtension: "js"}
        //"rxjs": { main: "libs:rxjs" }
    };

    ["common", "compiler", "core", "platform-browser", "platform-browser-dynamic",
     "forms", "http", "router"].forEach(function (pkg) {
        packages["@angular/" + pkg] = {
            main: "bundles/" + pkg + ".umd.js"
        };
    });

    System.config({ map:maps, paths:paths,  packages: packages });
})(this);