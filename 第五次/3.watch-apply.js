//scope 是我们的当前的作用域 是一个对象
function Scope() {
    this.$$watchers = [];
}
var scope = new Scope();
//angular的数据绑定主要是通过脏值检查，就是先保存一个值，拿新值来比较，如果变化了就刷新视图
Scope.prototype.$watch = function (exp,fn) {
    this.$$watchers.push({
        exp:exp,
        fn:fn,
        last:this[exp]
    });
};
Scope.prototype.$apply = function () {
    this.$degist();
};
Scope.prototype.$degist  = function () {
    var dirty = true;//只要脏了就进行脏值检查
    //当满10次后 如果值仍然为脏，则保存
    var count = 9;
    do{
        dirty = this.$degistOne();
        if(dirty&&count == 0){
            throw new Error('10 $digest() iterations reached. Aborting!')
        }
    }while(dirty&&count--)
};


Scope.prototype.$degistOne = function () {
    //当我们调用$apply方法后，将每一个watcher进行观察，如果值改变就刷新视图，还要执行回调函数
    //先取出老的值和新的值
    var that = this;
    var dirty = false;
    this.$$watchers.forEach(function (watcher) {
        var oldVal = watcher.last; //上一次的值
        var newVal = that[watcher.exp];
        if(oldVal != newVal){
            watcher.fn(newVal,oldVal);
            watcher.last = newVal;
            dirty = true;
        }
    });
    return dirty;
};
scope.name = 100;
scope.age = 1;
//当改变数据的时候，在改变数据后的回调函数中又改变了其他的数据，angular发现还有值在变化，要在去查询一次，直到没有任何变化为止
scope.$watch('name',function (newVal,oldVal) {
    scope.age = Math.random();
    console.log( scope.age);
});
scope.$watch('age',function (newVal,oldVal) {
    scope.name = Math.random();
    console.log(scope.name);
});
scope.name = 200;
scope.$apply();



