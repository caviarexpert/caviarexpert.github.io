#! /usr/bin/env node
"use strict";
var fs = require('fs');
var exec = require('child_process').exec;
var Q = require('q');

function initTerraform(){
  var deferred = Q.defer();   
  exec('terraform init', {cwd: './releng'}, (error, stdout, stderr) => {      
      if (error) deferred.reject(error);
      console.log("Terraform is initialized");
      deferred.resolve();
    });
  return deferred.promise; 
};

function getState() {
  var deferred = Q.defer();
    exec('terraform output -json', {cwd: './releng'}, (error, stdout, stderr) => {
      if(error){
        return deferred.reject(error) 
      }      
      fs.writeFile("./src/environments/aws.json", `${stdout}`, err => {
        if (err) deferred.reject(error);
        const message = "The AWS state has been provisioned as JSON to ./src/environments/aws.json"
        deferred.resolve(message);
      });
    });    
  return deferred.promise;
}
function init() {
    var deferred = Q.defer();
      fs.stat('./releng/.terraform/terraform.tfstate', function(err, stat) { 
        if (err == null) {
          //file exists 
          console.log("Terraform initilized already - file OK: ./releng/.terraform/terraform.tfstate")
          deferred.resolve(true);          
        }else if (err.code == 'ENOENT'){
          //file doesn't exist
          deferred.resolve(false); 
        }else{
          //some other error
          deferred.reject(err);
        }
      });
  return deferred.promise;
}

init()
  .then( val => {
    if(val) return getState();
    return initTerraform().then( () => getState());
  })
  .then( msg => console.log("MESSAGE: ", msg))
  .catch( err => console.error("ERROR: ", err));
