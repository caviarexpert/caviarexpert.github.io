module.exports = {
/*
  translate: function(load) {
    console.log("this.builder: ", this.builder);
    if (this.builder && this.transpiler) {
      load.metadata.format = 'esm';
      console.log("ESM for TEXT");
      return 'exp' + 'ort var __useDefault = true; exp' + 'ort default ' + JSON.stringify(load.source) + ';';
    }

    //load.metadata.format = 'amd';
    //console.log("AMD for TEXT", JSON.stringify(load.source));
    //return 'def' + 'ine(function() {\nreturn ' + JSON.stringify(load.source) + ';\n});';
    //return JSON.stringify(load.source);

    //load.metadata.format = "cjs";
    
    //if (this.builder) {
        console.log("CommonJS as text");
        load.metadata.format = 'cjs';
        var str = load.source.replace(/\n/g,"").replace(/\r/g,"").replace(/\t/g,"");
        console.log(str);
        return 'module.exports = "' + str + '";';
    //}

    //load.metadata.format = "cjs";
    //console.log("CommonJS for TEXT");
    //return 'Object.defineProperty(exports, "__esModule", { value: true });exports.textData = function(){ return "' + JSON.stringify(load.source) + '"};'
  },
*/ 
  instantiate: function(load) {
    //if (!this.builder) {
      //load.metadata.format = 'cjs';
      //return "<h1>HELLO WORLD 2</h1>";
      return load.source;
    //}
  }

}