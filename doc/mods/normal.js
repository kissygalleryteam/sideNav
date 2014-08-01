/**
 * normal
 */

KISSY.add(function (S, Node, Anim, Base, Tool) {
	var EMPTY = '';
    var $ = Node.all;

    var resetCss = {
        'display' : 'none'
    };

    var showCss = {
        'display' : 'block'
    };

    var hideCss = {
        'display' : 'none'
    };

    var Fade = {
    	/**
    	 * 复位
    	 */
    	reset: function(cxt) {

            var cfg = cxt.cfg;

            cxt.navNode.css(resetCss);
    	},
    	/**
    	 * 展示
    	 */
    	show: function(cxt) {

            var cfg = cxt.cfg;

            cxt.navNode.css(showCss);
    	},
    	/**
    	 * 隐藏
    	 */
    	hide: function(cxt) {

            var cfg = cxt.cfg;

            cxt.navNode.css(hideCss);
    	}
    };

    return Fade;
}, {
    requires: ['node', 'anim', 'base', './tool']
});