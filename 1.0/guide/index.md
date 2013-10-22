## 综述

sideNav是一个简单的页面导航组件，常见于各种活动页面中。

* 版本：1.0
* 作者：颂晨
* 标签：导航, 效果
* demo：[http://gallery.kissyui.com/sideNav/1.0/demo/index.html](http://gallery.kissyui.com/sideNav/1.0/demo/index.html)

sideNav特点

* 多种出场效果 (normal、fade、blink、blur、zoom、rotate)
* 出场时机配置 (指定高度、指定节点出现、指定节点开始被卷去、一段时间后)
* 回到顶部配置
* 内容与导航映射
* ...

## 初始化组件

    S.use('gallery/sideNav/1.0/index', function (S, SideNav) {
         var sideNav = new SideNav(cfg);
    })

sideNav只接收一个参, 即组件属性配置。

## 属性配置

*node* (String|HTMLElement|KISSY.Node|window)

要传入的导航节点


*effect* (String)

导航的出场效果，默认为 zoom

 - normal: 无动画
 - fade: 透明度(opacity: 0->1)
 - zoom: 缩放(scale: 0->1)
 - rotate: 缩放+旋转(scale: 0->1, rotate: -270deg->0)
 - blur: 模糊值(blur: 3px->0)
 - blink: 缩放(scale: 1.2->1)

注: IE8暂时只支持 normal、fade、zoom(效果不好), IE6只支持 normal、fade


*easing* (String)

导航出场的动画函数, 目前仅支持 linear、ease、ease-in、ease-out、ease-in-out, 关于动画函数可参考KISSY的[Easing 可视化](http://docs.kissyui.com/docs/html/demo/core/anim/easing.html#easing-visual), 默认值为 ease


*duration* (int)

导航出场的动画持续时间, 单位: 毫秒, 默认值为 300


*frequency* (int)

scroll事件的触发频率, 使用KISSY.buffer机制实现, 单位: ms, 默认值为 100


*when* (Object)

导航出场时机配置, 目前提供四种方案

 - type = 1: 滚动到固定高度后出场, 依赖 top 参数
 - type = 2: 滚动到指定节点开始出现后出场, 依赖 node 参数
 - type = 3: 过一段时间后出场, 依赖 delay 参数
 - type = 4: 滚动到指定节点开始被卷去的时候出场, 依赖 node 参数


*type* (int)

(when属性子配置) 导航出场时机类型, 可选 1、2、3、4 四个值, 见上述 when 参数配置, 默认值为 1


*top* (int)

(when属性子配置) 导航滚动top高度后出场, type = 1 时需要配置此参数, 默认值为 300


*node* (String|HTMLElement|KISSY.Node|window)

(when属性子配置) 导航滚动到 node 节点开始出现 (type=2) 或者节点开始被卷去后 (type=4) 出场, type = 2 或者 type = 4 时需要配置此参数


*delay* (int)

(when属性子配置) 导航在 delay 时间后出现, 若 type = 3 , 则需要配置此参数, 单位: 毫秒, 默认值为 1000


*top* (Object)

返回顶部配置


*node* (String|HTMLElement|KISSY.Node|window)

(top属性子配置) 返回顶部节点 


*easing* (String)

(top属性子配置) 窗口滚动的动画函数, 目前仅支持 linear、ease、ease-in、ease-out、ease-in-out, 关于动画函数可参考KISSY的[Easing 可视化](http://docs.kissyui.com/docs/html/demo/core/anim/easing.html#easing-visual), 默认值为 ease


*duration* (init)

(top属性子配置) 导航出场的动画持续时间, 单位: 毫秒, 默认值为 300


*map* (Object)

内容与导航的映射规则配置


*enable* (boolean)

(map属性子配置) 映射规则使能, 为 true 时需要配置具体的规则, 默认值为 false


*easing* (String)

(map属性子配置) 窗口滚动的动画函数, 目前仅支持 linear、ease、ease-in、ease-out、ease-in-out, 关于动画函数可参考KISSY的[Easing 可视化](http://docs.kissyui.com/docs/html/demo/core/anim/easing.html#easing-visual), 默认值为 ease


*duration* (int)

(map属性子配置) 窗口滚动的动画持续时间, 为 0 时无动画, 单位: 毫秒, 默认值为 300


*curPannelCls* (String)

(map属性子配置) 为当前内容节点额外增加的 class, 默认值为 'sn-cur-pannel'


*curNavCls* (String)

(map属性子配置) 为当前导航节点额外增加的 class, 默认值为 'sn-cur-nav'


*rule* (Object)

(map属性子配置) 导航与内容的映射规则, 数据格式为键值对形式, 例如: {'.nav-item-1': '.section-1'}, 具体配置可参考示例



## 使用示例

1. 出场模式: normal, 出场时机: 1秒后出场, [Demo](http://gallery.kissyui.com/sideNav/1.0/demo/normal.html)

        S.use('gallery/sideNav/1.0/index', function (S, SideNav) {
            new SideNav({
                node: '#J_SideNav',
                effect: 'normal',
                frequency: 100,
                top: {
                    node: '.back-top',
                    easing: 'ease-out',
                    duration: 300
                },
                when: {
                    type: 3,
                    delay: 1000
                },
                map: {
                    enable: true,
                    curNavCls: 'cur-nav',
                    curPannelCls: 'cur-pannel',
                    easing: 'ease',
                    duration: 300,
                    rule: {
                        '.nav-item-1' : '.section-1',
                        '.nav-item-2' : '.section-2',
                        '.nav-item-3' : '.section-3',
                        '.nav-item-4' : '.section-4',
                        '.nav-item-5' : '.section-5'
                    }
                }
            });
        });

2. 出场模式: blink, 出场时机: 滚动200px后出场, [Demo](http://gallery.kissyui.com/sideNav/1.0/demo/blink.html)

        S.use('gallery/sideNav/1.0/index', function (S, SideNav) {
            new SideNav({
                node: '#J_SideNav',
                effect: 'blink',
                easing: 'ease-out',
                duration: 300,
                frequency: 100,
                top: {
                    node: '.back-top',
                    easing: 'ease-out',
                    duration: 300
                },
                when: {
                    type: 1,
                    top: 200
                },
                map: {
                    enable: true,
                    curNavCls: 'cur-nav',
                    curPannelCls: 'cur-pannel',
                    easing: 'ease',
                    duration: 300,
                    rule: {
                        '.nav-item-1' : '.section-1',
                        '.nav-item-2' : '.section-2',
                        '.nav-item-3' : '.section-3',
                        '.nav-item-4' : '.section-4',
                        '.nav-item-5' : '.section-5'
                    }
                }
            });
        });

3. 出场模式: blur, 出场时机: section-1开始被卷去的时候出场, [Demo](http://gallery.kissyui.com/sideNav/1.0/demo/blur.html)

        S.use('gallery/sideNav/1.0/index', function (S, SideNav) {
            new SideNav({
                node: '#J_SideNav',
                effect: 'blur',
                easing: 'ease-out',
                duration: 300,
                frequency: 100,
                top: {
                    node: '.back-top',
                    easing: 'ease-out',
                    duration: 300
                },
                when: {
                    type: 4,
                    node: '.section-1'
                },
                map: {
                    enable: true,
                    curNavCls: 'cur-nav',
                    curPannelCls: 'cur-pannel',
                    easing: 'ease',
                    duration: 300,
                    rule: {
                        '.nav-item-1' : '.section-1',
                        '.nav-item-2' : '.section-2',
                        '.nav-item-3' : '.section-3',
                        '.nav-item-4' : '.section-4',
                        '.nav-item-5' : '.section-5'
                    }
                }
            });
        });

4. 出场模式: fade, 出场时机: section-2开始出现时出场, [Demo](http://gallery.kissyui.com/sideNav/1.0/demo/fade.html)

        S.use('gallery/sideNav/1.0/index', function (S, SideNav) {
            new SideNav({
                node: '#J_SideNav',
                effect: 'fade',
                easing: 'ease-out',
                duration: 300,
                frequency: 100,
                top: {
                    node: '.back-top',
                    easing: 'ease-out',
                    duration: 300
                },
                when: {
                    type: 2,
                    node: '.section-2'
                },
                map: {
                    enable: true,
                    curNavCls: 'cur-nav',
                    curPannelCls: 'cur-pannel',
                    easing: 'ease',
                    duration: 300,
                    rule: {
                        '.nav-item-1' : '.section-1',
                        '.nav-item-2' : '.section-2',
                        '.nav-item-3' : '.section-3',
                        '.nav-item-4' : '.section-4',
                        '.nav-item-5' : '.section-5'
                    }
                }
            });
        });

5. 出场模式: rotate, 出场时机: 滚动200px后出现, [Demo](http://gallery.kissyui.com/sideNav/1.0/demo/rotate.html)
        
        S.use('gallery/sideNav/1.0/index', function (S, SideNav) {
            new SideNav({
                node: '#J_SideNav',
                effect: 'rotate',
                easing: 'ease-out',
                duration: 300,
                frequency: 100,
                top: {
                    node: '.back-top',
                    easing: 'ease-out',
                    duration: 300
                },
                when: {
                    type: 1,
                    top: 200
                },
                map: {
                    enable: true,
                    curNavCls: 'cur-nav',
                    curPannelCls: 'cur-pannel',
                    easing: 'ease',
                    duration: 300,
                    rule: {
                        '.nav-item-1' : '.section-1',
                        '.nav-item-2' : '.section-2',
                        '.nav-item-3' : '.section-3',
                        '.nav-item-4' : '.section-4',
                        '.nav-item-5' : '.section-5'
                    }
                }
            });
        });

6. 出场模式: zoom, 出场时机: 滚动200px后出现, [Demo](http://gallery.kissyui.com/sideNav/1.0/demo/zoom.html)

        S.use('gallery/sideNav/1.0/index', function (S, SideNav) {
            new SideNav({
                node: '#J_SideNav',
                effect: 'zoom',
                easing: 'ease-out',
                duration: 300,
                frequency: 100,
                top: {
                    node: '.back-top',
                    easing: 'ease-out',
                    duration: 300
                },
                when: {
                    type: 1,
                    top: 200
                },
                map: {
                    enable: true,
                    curNavCls: 'cur-nav',
                    curPannelCls: 'cur-pannel',
                    easing: 'ease',
                    duration: 300,
                    rule: {
                        '.nav-item-1' : '.section-1',
                        '.nav-item-2' : '.section-2',
                        '.nav-item-3' : '.section-3',
                        '.nav-item-4' : '.section-4',
                        '.nav-item-5' : '.section-5'
                    }
                }
            });
        })

