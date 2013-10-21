## 综述

sideNav是一个简单的页面导航组件，常见于各种活动页面中。

* 版本：1.0
* 作者：颂晨
* 标签：导航, 效果
* demo：[http://gallery.kissyui.com/sideNav/1.0/demo/index.html](http://gallery.kissyui.com/sideNav/1.0/demo/index.html)

## 初始化组件

    S.use('gallery/sideNav/1.0/index', function (S, SideNav) {
         var sideNav = new SideNav({
	            node: '#J_SideNav',
	            effect: 'blink',
	            easing: 'ease',
	            duration: 300,
	            when: {
	            	type: 1,
	            	top: 300
	            }
            });
    })

## API说明
	
	/************************* sideNav 配置 *************************/

	/* 
     * 导航节点
     * String|HTMLElement|KISSY.Node|window
     */
    node: '',

    /*
     * 效果类型, 具体效果可参考demo, IE8目前只支持fade、zoom效果, IE6只支持fade效果
     * String
     * 可选值: fade, zoom, rotate, blur, blink
     * 默认值: zoom
     */
    effect: 'zoom',

    /*
     * 动画类型, 可参考KISSY Anim的easing类型
     * String
     * 可选值: linear, ease, ease-in, ease-out, ease-in-out
     * 默认值: ease
     */
    easing: 'ease',

    /*
     * 效果持续时间, 单位: 毫秒
     * int
     * 默认值: 300
     */
    duration: 300,

    /********** 出现时机配置 **********/
    when: {

        /*
         * 出现时机类型, 目前支持三种类型
         * int
         * 可选值: 1: 滚动到top高度后出现. 2: 滚动到node节点的时候出现. 3: 过了delay时间后出现. 
         * 默认值: 1
         */
        type: 1,

        /*
         * 滚动top高度后出现, 若type == 1, 则需要配置此值
         * int 
         * 默认值: 300
         */
        top: 300,

        /*
         * 滚动node节点的时候出现, 若type == 2, 则需要配置此值
         * String|HTMLElement|KISSY.Node|window
         */
        node: '',

        /*
         * 延迟时间, 若type == 3, 则需要配置此值, 单位: 毫秒
         * int 
         * 默认值: 3000
         */
        delay: 3000
    },

    /********** 返回顶部配置 **********/
    top: {

        /* 
         * 触发节点
         * String|HTMLElement|KISSY.Node|window
         */
        node: '',

        /*
         * 动画类型, 可参考KISSY Anim的easing类型
         * String
         * 可选值: linear, ease, ease-in, ease-out, ease-in-out
         * 默认值: ease
         */
        easing: 'ease',

        /*
	     * 效果持续时间, 单位: 毫秒
	     * int
	     * 默认值: 300
	     */
        duration: 300
    },

    /***** 映射规则配置 **********/
    map: {

        /*
         * 映射使能
         * boolean
         * 默认值: false
         */
        enable: false,

        /*
	     * 动画类型, 可参考KISSY Anim的easing类型
	     * String
	     * 可选值: linear, ease, ease-in, ease-out, ease-in-out
	     * 默认值: ease
	     */
        easing: 'ease',

        /*
	     * 效果持续时间, 单位: 毫秒
	     * int
	     * 默认值: 300
	     */
        duration: 300,

        /*
         * 当前区块class
         * String
         * 默认值: sn-cur-pannel
         */
        curPannelCls: 'sn-cur-pannel',

        /*
         * 当前导航class
         * String
         * 默认值: sn-cur-nav
         */
        curNavCls: 'sn-cur-nav',

        /***** 导航item与内容区块的映射规则 **********/
        rule: {

            /* 
             * 导航节点
             * String|HTMLElement|KISSY.Node|window
             */
            '': 
            /* 
             * 内容节点
             * String|HTMLElement|KISSY.Node|window
             */
            ''
        }
    }

