/**
 * rotate animation
 */

KISSY.add(function (S, Node, Anim, Base, Tool) {
	var EMPTY = '';
    var $ = Node.all;

    var resetCss1 = S.merge(Tool.transform('scale(0) rotate(-270deg)'), {
        'display' : 'block'
    });

    var resetCss2 = {
        'width'    : '0',
        'height'   : '0',
        'overflow' : 'hidden',
        'display'  : 'block'
    };

    var showCss1 = Tool.transform('scale(1) rotate(0)');

    var hideCss1 = Tool.transform('scale(0) rotate(-270deg)');

    var Rotate = {
        /**
         * 复位
         */
        reset: function(cxt) {

            var cfg = cxt.cfg;

            // 支持transform 和 transition
            if (Tool.isSupportTransform 
                && Tool.isSupportTransition) {

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

            // 支持transform 和 transition
            if (Tool.isSupportTransform 
                && Tool.isSupportTransition) {

                cxt.navNode.css(showCss1);
            } else {
                cxt.navNode.animate({
                    'width': cxt.navWidth,
                    'height': cxt.navHeight
                }, cfg.duration/1000, cfg.easing);
            }
        },
        /**
         * 隐藏
         */
        hide: function(cxt) {

            var cfg = cxt.cfg;

            // 支持transform 和 transition
            if (Tool.isSupportTransform 
                && Tool.isSupportTransition) {

                cxt.navNode.css(hideCss1);
            } else {
                cxt.navNode.animate({
                    'width': 0,
                    'height': 0
                }, cfg.duration/1000, cfg.easing);
            }
        }
    };

    return Rotate;
}, {
    requires: ['node', 'anim', 'base', './tool']
});