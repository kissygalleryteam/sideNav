/**
 * @fileoverview 
 * @author songchen<songchen.sxc@taobao.com>
 * @module sideNav
 **/
KISSY.add(function (S, Node, Anim, Base, Normal, Fade, Zoom, Rotate, Blur, Blink, Tool) {
    
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



