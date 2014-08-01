KISSY.add(function (S, Node,Demo) {
    var $ = Node.all;
    describe('sidenav', function () {
        it('Instantiation of components',function(){
            var demo = new Demo();
            expect(S.isObject(demo)).toBe(true);
        })
    });

},{requires:['node','kg/sidenav/2.0.0/']});