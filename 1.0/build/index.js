/*
combined files : 

gallery/sideNav/1.0/mods/tool
gallery/sideNav/1.0/mods/normal
gallery/sideNav/1.0/mods/fade
gallery/sideNav/1.0/mods/zoom
gallery/sideNav/1.0/mods/rotate
gallery/sideNav/1.0/mods/blur
gallery/sideNav/1.0/mods/blink
gallery/sideNav/1.0/index

*/
/**
 * tool
 */

KISSY.add('gallery/sideNav/1.0/mods/tool',function (S) {

    var $ = S.Node.all;

    /**
     * 判断是否支持css3属性
     * @param {String} prop 要判断的css3属性
     * @return {boolean} true: 支持 false: 不支持
     */
    function supportCSS3(prop) {
        var div = document.createElement('div'),
            vendors = 'Khtml Ms O Moz Webkit'.split(' '),
            len = vendors.length;

        if (prop in div.style) return true;

        prop = prop.replace(/^[a-z]/, function(val) {
            return val.toUpperCase();
        });

        while (len--) {
            if (vendors[len]+prop in div.style) {
                // browser supports box-shadow. Do what you need.
                // Or use a bang (!) to test if the browser doesn't.
                return true;
            }
        }
        return false;
    }

    /**
     * 判断当前浏览器是否IE6
     */
    function isIE6() {
        return $('html').hasClass('.ks-ie6');
    }

    var Tool = {

        // 是否IE6
        isIE6: isIE6(),

        // 是否支持transition
        isSupportTransition: supportCSS3('transition'),

        // 是否支持transform
        isSupportTransform: supportCSS3('transform'),

        // 是否支持filter
        isSupportFilter: supportCSS3('filter'),

        /**
         * 生成transition
         */
        transition: function(prop, duration, easing) {
            var valStr = prop + ' ' + duration/1000 + 's ' + easing;

            return {
                '-webkit-transition' : valStr,
                '-moz-transition'    : valStr,
                '-o-transition'      : valStr,
                'transition'         : valStr
            };
        },

        /**
         * 生成transform
         */
        transform: function(valStr) {

            return {
                '-webkit-transform' : valStr,
                '-moz-transform'    : valStr,
                '-o-transform'      : valStr,
                'transform'         : valStr
            };
        },

        /**
         * filter
         */
        filter: function(valStr) {

            return {
                '-webkit-filter' : valStr,
                '-moz-filter'    : valStr,
                '-o-filter'      : valStr,
                'filter'         : valStr
            };
        },

        /**
         * 滚动到对应位置
         */
        scrollWindow: function(x, y, duration, easing) {

            // 若duration为0, 则直接滚到对应位置
            if (!duration) {
                window.scrollTo(x + 1, y + 1);
            } 
            // 否则开始动画滚动
            else {
                $(window).animate({
                    'scrollLeft': x + 1,
                    'scrollTop': y + 1
                }, duration/1000, easing);
            }
        }
    };

    return Tool;
});
/**
 * normal
 */

KISSY.add('gallery/sideNav/1.0/mods/normal',function (S, Node, Anim, Base, Tool) {
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
/**
 * fade animation
 */

KISSY.add('gallery/sideNav/1.0/mods/fade',function (S, Node, Anim, Base, Tool) {
	var EMPTY = '';
    var $ = Node.all;

    // 是否正在运行动画
    var isCSS3Running = false;

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

            // 支持transition属性
            if (Tool.isSupportTransition) {
                
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
                cxt.navNode.fadeOut(cfg.duration/1000, null, cfg.easing);
            }
    	}
    };

    return Fade;
}, {
    requires: ['node', 'anim', 'base', './tool']
});
/**
 * zoom animation
 */

KISSY.add('gallery/sideNav/1.0/mods/zoom',function (S, Node, Anim, Base, Tool) {
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
/**
 * rotate animation
 */

KISSY.add('gallery/sideNav/1.0/mods/rotate',function (S, Node, Anim, Base, Tool) {
	var EMPTY = '';
    var $ = Node.all;

    // 是否正在运行动画
    var isCSS3Running = false;

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

    return Rotate;
}, {
    requires: ['node', 'anim', 'base', './tool']
});
/**
 * blur animation
 */

KISSY.add('gallery/sideNav/1.0/mods/blur',function (S, Node, Anim, Base, Tool) {
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
                cxt.navNode.fadeIn(cfg.duration/1000, null, cfg.easing);
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
                cxt.navNode.fadeOut(cfg.duration/1000, null, cfg.easing);
            }
    	}
    };

    return Blur;
}, {
    requires: ['node', 'anim', 'base', './tool']
});
/**
 * blink animation
 */

KISSY.add('gallery/sideNav/1.0/mods/blink',function (S, Node, Anim, Base, Tool) {
	var EMPTY = '';
    var $ = Node.all;

    // 是否正在运行动画
    var isCSS3Running = false;

    var resetCss1 = S.merge(Tool.transform('scale(1.2)'), {
        'opacity' : '0',
        'display' : 'block'
    });

    var resetCss2 = {
    	'display' : 'none'
    };

    var showCss1 = S.merge(Tool.transform('scale(1)'), {
        'opacity' : '1'
    });

    var hideCss1 = S.merge(Tool.transform('scale(1.2)'), {
        'opacity' : '0'
    });

    var Blink = {
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
                cxt.navNode.fadeIn(cfg.duration/1000, null, cfg.easing);
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
                cxt.navNode.fadeOut(cfg.duration/1000, null, cfg.easing);
            }
    	}
    };

    return Blink;
}, {
    requires: ['node', 'anim', 'base', './tool']
});
/**
 * @fileoverview 
 * @author songchen<songchen.sxc@taobao.com>
 * @module sideNav
 **/
KISSY.add('gallery/sideNav/1.0/index',function (S, Node, Anim, Base, Normal, Fade, Zoom, Rotate, Blur, Blink, Tool) {
    
    var EMPTY = '';
    var $ = Node.all;

    // 默认配置
    var defaultCfg = {
        /* 
         * 导航节点
         * 值类型: String|HTMLElement|KISSY.Node|window
         */
        node: '',
        /*
         * 效果类型
         * 值类型: String
         * 可选值: normal, fade, zoom, rotate, blur, blink
         * 默认值: zoom
         */
        effect: 'zoom',
        /*
         * 效果函数
         * 值类型: String
         * 可选值: linear, ease, ease-in, ease-out, ease-in-out
         * 默认值: ease
         */
        easing: 'ease',
        /*
         * 持续时间
         * 值类型: int
         * 默认值: 300
         */
        duration: 300,
        /*
         * 使用KISSY.buffer机制控制监听scroll事件的频率
         * 值类型: int
         * 默认值: 100
         */
        frequency: 100,

        /* 出现时机 */
        when: {
            /*
             * 出现时机类型
             * 值类型: int
             * 可选值: 1: 滚动到top高度后出现. 2: node节点开始出现的时候显示. 3: 过了delay时间后出现. 4: node节点开始被卷去的时候显示.
             * 默认值: 1
             */
            type: 1,
            /*
             * 滚动top高度后出现
             * 值类型: int 
             * 默认值: 300
             */
            top: 300,
            /*
             * 滚动到node节点的时候出现
             * 值类型: String|HTMLElement|KISSY.Node|window
             */
            node: '',
            /*
             * delay时长
             * 值类型: int 
             * 默认值: 1000
             */
            delay: 1000
        },

        /* 返回顶部 */
        top: {
            /* 
             * 触发节点
             * 值类型: String|HTMLElement|KISSY.Node|window
             */
            node: '',
            /*
             * 效果函数
             * 值类型: String
             * 可选值: linear, ease, ease-in, ease-out, ease-in-out
             * 默认值: ease
             */
            easing: 'ease',
            /*
             * 持续时间
             * 值类型: int
             * 默认值: 300
             */
            duration: 300
        },

        /* 映射规则 */
        map: {
            /*
             * 映射使能
             * 值类型: boolean
             * 默认值: false
             */
            enable: false,
            /*
             * 效果函数
             * 值类型: String
             * 可选值: linear, ease, ease-in, ease-out, ease-in-out
             * 默认值: ease
             */
            easing: 'ease',
            /*
             * 持续时间
             * 值类型: int
             * 默认值: 300
             */
            duration: 300,
            /*
             * 当前区块class
             * 值类型: String
             * 默认值: sn-cur-pannel
             */
            curPannelCls: 'sn-cur-pannel',
            /*
             * 当前导航class
             * 值类型: String
             * 默认值: sn-cur-nav
             */
            curNavCls: 'sn-cur-nav',
            /*
             * 映射规则
             * 值类型: int
             * 默认值: 300
             */
            rule: {
                /* 
                 * 导航节点
                 * 值类型: String|HTMLElement|KISSY.Node|window
                 */
                '': 
                /* 
                 * 内容节点
                 * 值类型: String|HTMLElement|KISSY.Node|window
                 */
                ''
            }
        }
    };

    /**
     * @class SideNav
     * @constructor
     * @extends Base
     */
    function SideNav(config) {
        var self = this;

        // 检测实例
        if (!(this instanceof SideNav)) {
            return new SideNav(config);
        }

        // 构造配置
        self.cfg = S.mix(defaultCfg, config, true, null, true);

        // 初始化组件
        self.init();

        //调用父类构造函数
        SideNav.superclass.constructor.call(self, config);
    }



    S.extend(SideNav, Base, /** @lends SideNav.prototype*/{

        /**
         * 检查参数
         */
        _checkParam: function() {
            var self = this,
                cfg = self.cfg,
                flag = true,
                effectArr = ['normal', 'fade', 'zoom', 'rotate', 'blur', 'blink'],
                easeArr = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'];

            // nav node
            if (!$(cfg.node).length) {
                flag = false;
                S.log("can't find node.");
            }
            if (!S.inArray(cfg.effect, effectArr)) {
                cfg.effect = 'zoom';
            }
            if (!S.inArray(cfg.easing, easeArr)) {
                cfg.easing = 'ease';
            }
            if (!S.isNumber(cfg.frequency)) {
                cfg.frequency = 100;
            }

            // when show nav
            if ((cfg.when.type == 2 || cfg.when.type == 4) 
                && !$(cfg.when.node).length) {
                flag = false;
                S.log("can't find when node.");
            }
            if (!S.isNumber(cfg.when.top)) {
                cfg.when.top = 300;
            }
            if (!S.isNumber(cfg.when.delay)) {
                cfg.when.delay = 3000;
            }

            // back to top
            if (!S.inArray(cfg.top.easing, easeArr)) {
                cfg.top.easing = 'ease';
            }
            if (!$(cfg.top.node).length) {
                S.log("can't find top node.");
            }
            if (!S.isNumber(cfg.top.duration)) {
                cfg.top.duration = 300;
            }

            // nav map
            if (!S.inArray(cfg.map.easing, easeArr)) {
                cfg.map.easing = 'ease';
            }
            if (!S.isNumber(cfg.map.duration)) {
                cfg.map.duration = 300;
            }
            if (!cfg.map.curNavCls) {
                cfg.map.curNavCls = 'sn-cur-nav';
            }
            if (!cfg.map.curPannelCls) {
                cfg.map.curPannelCls = 'sn-cur-pannel';
            }

            return flag;
        },

        /**
         * 初始化运行时环境
         */
        _initCxt: function() {
            var self = this,
                cfg = self.cfg;

            self.rootNode = $(cfg.node);
            self.navHeight = self.rootNode.height();
            self.navWidth = self.rootNode.width();

            // 添加外围容器
            var wrapperStr = '<div class="sn-nav-wrapper"></div>';
            self.rootNode.wrapInner(wrapperStr);
            self.navNode = self.rootNode.one('.sn-nav-wrapper');

            // 设定容器样式
            self.navNode.css({
                'position' : 'absolute',
                'left' : '0',
                'right' : '0',
                'top' : '0',
                'bottom' : '0',
                'margin' : 'auto',
                'display' : 'none',
                'width' : self.navWidth,
                'height' : self.navHeight
            });

            // 设定根节点样式
            self.rootNode.css({
                'display' : 'block',
                'overflow' : 'visible',
                'width' : self.navWidth,
                'height' : self.navHeight
            });

            self.whenNode = $(cfg.when.node);
            self.topNode = $(cfg.top.node);

            // 初始化map节点
            if (cfg.map.enable) {

                self.navNodes = new S.NodeList();
                self.pannelNodes = new S.NodeList();

                S.each(cfg.map.rule, function(v, k) {

                    var $k = $(k),
                        $v = $(v);

                    if ($k.length && $v.length) {
                        self.navNodes = self.navNodes.add($k);
                        self.pannelNodes = self.pannelNodes.add($v);
                    }
                });

            }

            self.anim = self._getAnimObj();
        },

        /**
         * 滚动窗口回调
         */
        _scrollCallBack: function() {
            var self = this,
                cfg = self.cfg,
                dif = 0,
                scroll = document.body.scrollTop 
                || (document.documentElement && document.documentElement.scrollTop);

            // 非延迟出现
            if (cfg.when.type != 3) {

                // 滚到一定高度后出现
                if (cfg.when.type == 1) {
                    dif = cfg.when.top;
                }

                // 滚到指定节点出现后显示
                if (cfg.when.type == 2) {
                    dif = self.whenNode.offset().top - $(window).height();
                }

                // 滚到指定节点后开始被卷去后显示
                if (cfg.when.type == 4) {
                    dif = self.whenNode.offset().top;
                }

                // 切换导航的显示/隐藏状态
                if (scroll >= dif) {
                    self.show();
                } else {
                    self.hide();
                }
            }

            // 导航菜单映射
            if (cfg.map.enable) {

                var minDif = 999999,
                    targetIndex = 0,
                    maxTop = 0,
                    maxIndex = 0,
                    minTop = 999999,
                    minIndex = 0;

                S.each(self.pannelNodes, function(v, k) {

                    var $v = $(v),
                        top = $v.offset().top,
                        dif1 = scroll - top;

                    // 比当前滚动值小的最小值
                    if (dif1 >= 0 && Math.abs(dif1) <= minDif) {
                        minDif = Math.abs(dif1);
                        targetIndex = k;
                    }

                    // 最大top值
                    if (maxTop <= top) {
                        maxTop = top;
                        maxIndex = k;
                    }

                    // 最小top值
                    if (minTop >= top) {
                        minTop = top;
                        minIndex = k;
                    }

                });

                var maxNode = self.pannelNodes.item(maxIndex),
                    minNode = self.pannelNodes.item(minIndex);
                    // pannel最底部
                    pannelBottom = maxNode.height() + maxNode.offset().top,
                    // pannel最顶部
                    pannelTop = minNode.offset().top - $(window).height();

                // 去除current状态
                $('.' + cfg.map.curNavCls).removeClass(cfg.map.curNavCls);
                $('.' + cfg.map.curPannelCls).removeClass(cfg.map.curPannelCls);

                // 是否应该加上current状态
                if (scroll < pannelBottom && scroll > pannelTop) {
                    self.navNodes.item(targetIndex).addClass(cfg.map.curNavCls);
                    self.pannelNodes.item(targetIndex).addClass(cfg.map.curPannelCls);
                }
            }

            return true;
        },

        /**
         * 注册事件
         */
        _addEvent: function() {
            var self = this,
                cfg = self.cfg;

            var delayFunc = S.buffer(self._scrollCallBack, cfg.frequency, this);

            // 先调用一次
            delayFunc();

            // 窗口滚动
            $(window).on('scroll resize', function(e) {
                delayFunc();
            });

            // 返回顶部
            if (self.topNode.length) {

                self.topNode.on('click', function(e) {
                    e.preventDefault();

                    Tool.scrollWindow(0, 0, cfg.top.duration, cfg.top.easing);
                });
            }

            // 导航菜单映射
            if (cfg.map.enable) {

                // 导航item click
                self.navNodes.on('click', function(e) {
                    e.preventDefault();

                    var $this = $(this),
                        index = self.navNodes.index($this),
                        $pannel = self.pannelNodes.item(index),
                        top = $pannel.offset().top;

                    Tool.scrollWindow(0, top, cfg.map.duration, cfg.map.easing);

                    // 切换current状态
                    $('.' + cfg.map.curNavCls).removeClass(cfg.map.curNavCls);
                    $('.' + cfg.map.curPannelCls).removeClass(cfg.map.curPannelCls);
                    $this.addClass(cfg.map.curNavCls);
                    $pannel.addClass(cfg.map.curPannelCls);
                });

            }
        },

        /**
         * 何时出场
         */
        _when: function() {
            var self = this,
                cfg = self.cfg;

            // delay时间后出现
            if (cfg.when.type == 3) {
                S.later(self.show, cfg.when.delay, false, self);
            }
        }, 

        /**
         * 停止elem上的动画
         */
        stopAnim: function(elem) {
            Anim.stop(elem, true);
        },

        /**
         * 获取动画对象
         */
        _getAnimObj: function() {
            var self = this,
                cfg = self.cfg,
                animObj = Fade;

            // normal
            if (cfg.effect == 'normal') {
                animObj = Normal;
            }
            // fade
            else if (cfg.effect == 'fade') {
                animObj = Fade;
            }
            // zoom
            else if (cfg.effect == 'zoom') {
                animObj = Zoom;
            }
            // rotate
            else if (cfg.effect == 'rotate') {
                animObj = Rotate;
            }
            // blur
            else if (cfg.effect == 'blur') {
                animObj = Blur;
            }
            // blink
            else if (cfg.effect == 'blink') {
                animObj = Blink;
            }
            // others
            else {
                animObj = Fade;
            }

            // IE6 只支持Normal和Fade效果
            if (Tool.isIE6 && animObj != Fade) {
                animObj = Normal;
            }

            return animObj;
        },

        /**
         * 重置样式
         */
        _resetStyle: function() {
            var self = this,
                cfg = self.cfg;

            self.anim.reset(self);
        },

        /**
         * 出场
         */
        show: function() {
            var self = this,
                cfg = self.cfg;

            // 停止动画
            self.stopAnim(self.navNode);

            self.anim.show(self);
        },

        /**
         * 退场
         */
        hide: function() {
            var self = this,
                cfg = self.cfg;

            // 停止动画
            self.stopAnim(self.navNode);

            self.anim.hide(self);
        },

        /**
         * 初始化函数
         */
        init: function() {
            var self = this;

            if (!self._checkParam()) {
                return false;
            }

            self._initCxt();

            self._when();

            self._resetStyle();

            self._addEvent();
        }

    }, {
        ATTRS : /** @lends SideNav*/{

        }
    });

    return SideNav;

}, {
    requires: ['node', 'anim', 'base', './mods/normal', './mods/fade', './mods/zoom', './mods/rotate', './mods/blur', './mods/blink', './mods/tool']
});




