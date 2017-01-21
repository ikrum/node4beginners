"use strict";

var Gearman = require("node-gearman");

// connect geaman server
var gearman = new Gearman('localhost', 4730);
gearman.connect();
gearman.on("connect", function(){
  console.log("Gearman connected to the server!");
});

/*
 * Send and outgoing message, Accept object or separate parameters
 *
 * @param opts_OR_msisd     {message: "the message to be sent", MSISDN:"880171213124"}
 ** OR **
 * @param opts_OR_msisdn    "880171213124"
 * @param message           "the message to be sent"
 */
exports.sendSMS = function(opts_OR_msisdn, message) {
  if(typeof opts_OR_msisdn == "object"){
    var obj = opts_OR_msisdn;
    obj.MSISDN = obj.MSISDN || obj.message;
  }
  else{
    var obj = {
      MSISDN: optsORmsisdn,
      message: message
    };
  }
  var job = gearman.submitJob("sendSMS", JSON.stringify(obj));


	job.on("data", onData);
	job.on("end", onEnd);
	job.on("error", onError);
}

function onData(data){
  console.log(data);
}

function onEnd(){
  console.log("Gearman Client: job done");
}

function onError(error){
  console.log("Gearman error");
  console.log(error);
}
