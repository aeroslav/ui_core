define(function(require){
    var jq = require('jquery');
    console.log('module noConf loaded');
    return jq.noConflict(true);
});