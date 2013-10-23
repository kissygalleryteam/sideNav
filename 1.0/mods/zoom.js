/**
 * zoom animation
 */

KISSY.add(function (S, Node, Anim, Base, Tool) {
	var EMPTY = '';
    var $ = Node.all;

    // 是否正在运行动画
    var isCSS3Running = false;

    var resetCss1 = S.merge(Tool.transform('scale(0)'), {
        'display' : 'block'
    });

    var resetCss2 = {
    	'width'    : '0',
    	'height'   : '0',
    	'overflow' : 'hidden',
        'display'  : 'block'
    };

    var showCss1 = Tool.transform('scale(1)');

    var hideCss1 = Tool.transform('scale(0)');

    var Zoom = {
    	/**
    	 * 复位
    	 */
    	reset: function(cxt) {

            var cfg = cxt.cfg;

    		// 支持transform 和 transition
            if (Tool.isSupportTransform 
                && Tool.isSupportTransition) {

                // 对 navNode 进行 reset
                cxt.navNode.css(resetCss1);

                // 设定 CSS3 动画, 必须在 reset 后隔段时间执行
                S.later(function() {
                    var animCss = Tool.transition('all', cfg.duration, cfg.easing);
                    cxt.navNode.css(animCss);
                }, 10);
                
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

                // 先展示 rootNode
                cxt.rootNode.show();

                // 再运行 navNode 的动画, 必须在 rootNode 出现后隔段时间执行
                S.later(function() {
                    // 标记动画正在执行
                    isCSS3Running = true;
                    cxt.navNode.css(showCss1);
                }, 10);

                // 取消标记
                S.later(function() {
                    isCSS3Running = false;
                }, 10 + cfg.duration);

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

                // 先隐藏 navNode
                cxt.navNode.css(hideCss1);

                // 再隐藏 rootNode , 必须在 navNode 消失后隔段时间执行
                S.later(function() {

                    // 当前没有动画在执行
                    if (!isCSS3Running) {
                        cxt.rootNode.hide();
                    }
                    
                }, cfg.duration);

            } else {
                cxt.navNode.animate({
                    'width': 0,
                    'height': 0
                }, cfg.duration/1000, cfg.easing);
            }
    	}
    };

    return Zoom;
}, {
    requires: ['node', 'anim', 'base', './tool']
});