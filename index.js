const lessc = require("less");
const fs = require("fs");

var boostrapPath = require.resolve("bootstrap");
boostrapPath = boostrapPath.replace(/\\/g,"/").replace("/dist/js/npm.js","");
const bootstrapMainLess = `${boostrapPath}/less/bootstrap.less`;

module.exports = class CustomBootstrapBuilder {
    static buildCustomBoostrap(customVariables) {
        return new Promise((resolve,reject) => {
            fs.readFile(bootstrapMainLess,{encoding:"utf-8"},(err,lessContent) => {
                if(err) {
                    reject(`Fail to read bootstrap less source: ${err}`);
                } else {
                    let customVariablesString = "";
                    for(var key in customVariables) {
                        customVariablesString += `${key}:${customVariables[key]};` + "\n";
                    }
                    lessc.render(lessContent + customVariablesString,{filename:bootstrapMainLess})
                        .then((compiledContent) => {
                            resolve(compiledContent.css);
                        }).catch((err) => {
                            reject(err);
                        });
                }
            });
        });
    }
}