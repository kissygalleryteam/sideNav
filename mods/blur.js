/**
 * blur animation
 */

KISSY.add(function (S, Node, Anim, Base, Tool) {
	var EMPTY = '';
    var $ = Node.all;

    // 是否正在运行动画
    var isCSS3Running = false;

    var resetCss1 = S.merge(Tool.filter('blur(5px)'), {
        'opacity' : '0',
        'display' : 'block'
    });

    var resetCss2 = {
    	'display' : 'none'
    };

    var showCss1 = S.merge(Tool.filter('blur(0)'), {
        'opacity' : '1'
    });

    var hideCss1 = S.merge(Tool.filter('blur(5px)'), {
        'opacity' : '0'
    });

    var Blur = {
    	/**
    	 * 复位
    	 */
    	reset: function(cxt) {

            var cfg = cxt.cfg;

    		// 支持filter 和 transition
            if (Tool.isSupportFilter 
                && Tool.isSupportTransition) {

                // 扩大根容器, 主要解决chrome下残影问题
                cxt.rootNode.css({
                    'overflow' : 'hidden',
                    'width' : cxt.navWidth + 10,
                    'height' : cxt.navHeight + 10
                });

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

            // 支持filter 和 transition
            if (Tool.isSupportFilter 
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
                cxt.navNode.fadeIn(cfg.duration/2.0.00, null, cfg.easing);
            }
    	},
    	/**
    	 * 隐藏
    	 */
    	hide: function(cxt) {

            var cfg = cxt.cfg;

            // 支持filter 和 transition
            if (Tool.isSupportFilter 
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
                cxt.navNode.fadeOut(cfg.duration/2.0.00, null, cfg.easing);
            }
    	}
    };

    return Blur;
}, {
    requires: ['node', 'anim', 'base', './tool']
});