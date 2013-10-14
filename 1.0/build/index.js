/*
combined files : 

gallery/sideNav/1.0/mods/tool
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

    var Tool = {

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
        }
    };

    return Tool;
});
/**
 * fade animation
 */

KISSY.add('gallery/sideNav/1.0/mods/fade',function (S, Node, Anim, Base, Tool) {
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
/**
 * zoom animation
 */

KISSY.add('gallery/sideNav/1.0/mods/zoom',function (S, Node, Anim, Base, Tool) {
	var EMPTY = '';
    var $ = Node.all;

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
/**
 * blur animation
 */

KISSY.add('gallery/sideNav/1.0/mods/blur',function (S, Node, Anim, Base, Tool) {
	var EMPTY = '';
    var $ = Node.all;

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

            // 支持filter 和 transition
            if (Tool.isSupportFilter 
                && Tool.isSupportTransition) {

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

            // 支持filter 和 transition
            if (Tool.isSupportFilter 
                && Tool.isSupportTransition) {

                cxt.navNode.css(hideCss1);
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

                cxt.navNode.css(hideCss1);
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
KISSY.add('gallery/sideNav/1.0/index',function (S, Node, Anim, Base, Fade, Zoom, Rotate, Blur, Blink) {
    
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
         * 可选值: fade, zoom, rotate, blur, blink, slideDown, slideUp, slideLeft, slideRight
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

        /* 出现时机 */
        when: {
            /*
             * 出现时机
             * 值类型: int
             * 可选值: 1: 滚动到top高度后出现. 2: 滚动到node节点的时候出现. 3: 过了delay时间后出现. 
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
             * 过了delay时间后出现
             * 值类型: int 
             * 默认值: 3000
             */
            delay: 3000
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
             * 映射规则
             * 值类型: int
             * 默认值: 300
             */
            rule: [
                {
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
            ]
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
        self.cfg = S.merge({}, defaultCfg, config);

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
                effectArr = ['fade', 'zoom', 'rotate', 'blur', 'blink', 'slideDown', 'slideUp', 'slideLeft', 'slideRight'],
                easeArr = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'];

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


            if (cfg.when.type == 2 && !$(cfg.when.node).length) {
                flag = false;
                S.log("can't find when node.");
            }
            if (!S.isNumber(cfg.when.top)) {
                cfg.when.top = 300;
            }
            if (!S.isNumber(cfg.when.delay)) {
                cfg.when.delay = 3000;
            }


            if (!S.inArray(cfg.top.easing, easeArr)) {
                cfg.top.easing = 'ease';
            }
            if (!$(cfg.top.node).length) {
                S.log("can't find top node.");
            }
            if (!S.isNumber(cfg.top.duration)) {
                cfg.top.duration = 300;
            }


            if (!S.inArray(cfg.map.easing, easeArr)) {
                cfg.map.easing = 'ease';
            }
            if (!S.isNumber(cfg.map.duration)) {
                cfg.map.duration = 300;
            }

            return flag;
        },

        /**
         * 初始化运行时环境
         */
        _initCxt: function() {
            var self = this;

            self.rootNode = $(self.cfg.node);
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

            self.whenNode = $(self.cfg.when.node);
            self.topNode = $(self.cfg.top.node);
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

            // 滚动一定高度后出现
            if (cfg.when.type == 1) {
                dif = cfg.when.top;
            }

            // 滚到指定节点后出现
            if (cfg.when.type == 2) {
                dif = self.whenNode.offset().top - $(window).height();
            }

            // 切换导航的显示/隐藏状态
            if (scroll >= dif) {
                self.show();
            } else {
                self.hide();
            }
            
            return true;
        },

        /**
         * 注册事件
         */
        _addEvent: function() {
            var self = this,
                cfg = self.cfg;

            var delayFunc = S.buffer(self._scrollCallBack, 100, this);

            // 窗口滚动
            $(window).on('load', function(e) {
                self._scrollCallBack();
            }).on('scroll resize', function(e) {
                delayFunc();
            });

            // 返回顶部
            if (self.topNode.length) {

                self.topNode.on('click', function(e) {
                    e.preventDefault();

                    // 若duration为0, 则直接滚到顶部
                    if (!cfg.top.duration) {
                        window.scrollTo(0, 0);
                    } 
                    // 否则开始动画滚动
                    else {
                        $(window).animate({
                            'scrollTop': 0
                        }, cfg.top.duration/1000, cfg.top.easing);
                    }
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
         * 重置样式
         */
        _resetStyle: function() {
            var self = this,
                cfg = self.cfg;

            // fade
            if (cfg.effect == 'fade') {
                Fade.reset(self);
            }
            // zoom
            else if (cfg.effect == 'zoom') {
                Zoom.reset(self);
            }
            // rotate
            else if (cfg.effect == 'rotate') {
                Rotate.reset(self);
            }
            // blur
            else if (cfg.effect == 'blur') {
                Blur.reset(self);
            }
            // blink
            else if (cfg.effect == 'blink') {
                Blink.reset(self);
            }
            // others
            else {
                Fade.reset(self);
            }
        },

        /**
         * 出场
         */
        show: function() {
            var self = this,
                cfg = self.cfg;

            // 停止动画
            self.stopAnim(self.navNode);

            // fade
            if (cfg.effect == 'fade') {
                Fade.show(self);
            }
            // zoom
            else if (cfg.effect == 'zoom') {
                Zoom.show(self);
            }
            // rotate
            else if (cfg.effect == 'rotate') {
                Rotate.show(self);
            }
            // blur
            else if (cfg.effect == 'blur') {
                Blur.show(self);
            }
            // blink
            else if (cfg.effect == 'blink') {
                Blink.show(self);
            }
            // others
            else {
                Fade.show(self);
            }
        },

        /**
         * 退场
         */
        hide: function() {
            var self = this,
                cfg = self.cfg;

            // 停止动画
            self.stopAnim(self.navNode);

            // fade
            if (cfg.effect == 'fade') {
                Fade.hide(self);
            }
            // zoom
            else if (cfg.effect == 'zoom') {
                Zoom.hide(self);
            }
            // rotate
            else if (cfg.effect == 'rotate') {
                Rotate.hide(self);
            }
            // blur
            else if (cfg.effect == 'blur') {
                Blur.hide(self);
            }
            // blink
            else if (cfg.effect == 'blink') {
                Blink.hide(self);
            }
            // others
            else {
                Fade.hide(self);
            }
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
    requires: ['node', 'anim', 'base', './mods/fade', './mods/zoom', './mods/rotate', './mods/blur', './mods/blink']
});




