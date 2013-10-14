/**
 * @fileoverview 
 * @author songchen<songchen.sxc@taobao.com>
 * @module sideNav
 **/
KISSY.add(function (S, Node, Anim, Base, Fade, Zoom, Rotate, Blur, Blink) {
    
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



