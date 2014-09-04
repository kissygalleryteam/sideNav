/*
Thu Sep 04 2014 20:22:48 GMT+0800 (中国标准时间)
combined files by KMD:

index.js
*/

KISSY.add('kg/sidenav/2.0.0/index',["node","base"],function(S ,require, exports, module) {
var $ = require('node').all;
var Base = require('base');

var Sidenav = Base.extend({
    initializer:function(){
        var self = this;
        var $target = self.get('$target');
    }
},{
    ATTRS:{
        $target:{
            value:'',
            getter:function(v){
                return $(v);
            }
        }
    }
});

module.exports = Sidenav;




});