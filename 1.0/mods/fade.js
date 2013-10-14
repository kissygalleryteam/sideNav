/**
 * fade animation
 */

KISSY.add(function (S, Node, Anim, Base, Tool) {
	var EMPTY = '';
    var $ = Node.all;

    // 支持css3
    var resetCss1 = {
    	'opacity' : '0',
        'display' : 'block'
    };

    // 不支持css3
    var resetCss2 = {
        'display' : 'none'
    };

    var showCss1 = {
        'opacity' : '1'
    };

    var hideCss1 = {
        'opacity' : '0'
    };

    var Fade = {
    	/**
    	 * 复位
    	 */
    	reset: function(cxt) {

            var cfg = cxt.cfg;

            // 支持transition
            if (Tool.isSupportTransition) {

                // reset first
                cxt.navNode.css(resetCss1);

                /**
                 * add transition, should be later than reset.
                 */
                S.later(function() {
                    var animCss = Tool.transition('all', cfg.duration, cfg.easing);
                    cxt.navNode.css(animCss);
                }, 50);

            } else {
                cxt.navNode.css(resetCss2);
            }
    	},
    	/**
    	 * 展示
    	 */
    	show: function(cxt) {

            var cfg = cxt.cfg;

            // 支持transition属性
            if (Tool.isSupportTransition) {
                cxt.navNode.css(showCss1);
            } else {
                cxt.navNode.fadeIn(cfg.duration/1000, null, cfg.easing);
            }
    	},
    	/**
    	 * 隐藏
    	 */
    	hide: function(cxt) {

            var cfg = cxt.cfg;

            // 支持transition属性
            if (Tool.isSupportTransition) {
                cxt.navNode.css(hideCss1);
            } else {
                cxt.navNode.fadeOut(cfg.duration/1000, null, cfg.easing);
            }
    	}
    };

    return Fade;
}, {
    requires: ['node', 'anim', 'base', './tool']
});