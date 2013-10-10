/**
 * @fileoverview 
 * @author songchen<songchen.sxc@taobao.com>
 * @module sideNav
 **/
KISSY.add(function (S, Node, Base) {
    var EMPTY = '';
    var $ = Node.all;
    
    /**
     * 
     * @class SideNav
     * @constructor
     * @extends Base
     */
    function SideNav(comConfig) {
        var self = this;
        //调用父类构造函数
        SideNav.superclass.constructor.call(self, comConfig);
    }

    S.extend(SideNav, Base, /** @lends SideNav.prototype*/{

    }, {ATTRS : /** @lends SideNav*/{

    }});

    return SideNav;

}, {
    requires: ['node', 'base']
});



