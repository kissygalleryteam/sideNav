/**
 * tool
 */

KISSY.add(function (S) {

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