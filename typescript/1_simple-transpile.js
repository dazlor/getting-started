"use strict";
console.log('Loaded: 1_simple-transpile.js');
// Set RUNTIME to a value higher than TIMEOUT to test stopAnimation()
var RUNTIME = 4000;
var TIMEOUT = 5000;
var App = (function () {
    function App(containerName) {
        var _this = this;
        this.cid = 'App';
        this.iterations = 0;
        this.maxAnimationRuntime = RUNTIME;
        // 5. Use class properties
        this.render5 = function () {
            //console.log(`${this.cid}:render5()`);
            if (_this.canAnimate()) {
                _this.intensifyRenderProcess();
                _this.iterations++;
                _this.requestAnimationId = requestAnimationFrame(_this.render5);
            }
        };
        console.log(this.cid + ":constructor(containerName=" + containerName + ")");
        this.containerName = containerName;
        this.render4 = this.render4.bind(this);
    }
    App.prototype.initialize = function () {
        console.log(this.cid + ":initialize()");
        console.log(this.cid + ":this.cid=" + this.cid);
    };
    App.prototype.startAnimation = function () {
        var _this = this;
        console.log(this.cid + ":startAnimation()");
        this.animationStartTime = new Date().getTime();
        console.log('this.animationStartTime=' + this.animationStartTime);
        // Stop after 5 seconds and review the number of iterations
        setTimeout(function () {
            _this.stopAnimation();
        }, TIMEOUT);
        if (!this.requestAnimationId) {
            //this.render1();
            //this.render2();
            //this.render3();
            //this.render4();
            //this.render5();
        }
    };
    App.prototype.stopAnimation = function () {
        console.log(this.cid + ":startAnimation()");
        console.log('this.requestAnimationId=' + this.requestAnimationId + ':' + typeof (this.requestAnimationId));
        if (this.requestAnimationId) {
            cancelAnimationFrame(this.requestAnimationId);
            this.requestAnimationId = undefined;
        }
        console.log('this.iterations=' + this.iterations);
    };
    App.prototype.canAnimate = function () {
        //console.log(`${this.cid}:canAnimate()`);
        this.iterationTime = new Date().getTime();
        return ((this.iterationTime - this.animationStartTime) < this.maxAnimationRuntime);
    };
    // --------------------------------------------------------------------------
    // NOTE: When you invoke redner() via [window.]requestAnimationFrame(this.render)
    // the scope in redner() is bound to window
    // --------------------------------------------------------------------------
    // 1. Using bind
    // Note that by binding functions you are creating a new instance
    // of the function for every object you create, whereas normally
    // JS will try to be smart about function invocation and grab them
    // from the prototype.
    App.prototype.render1 = function () {
        //console.log(`${this.cid}:render1()`);
        if (this.canAnimate()) {
            this.intensifyRenderProcess();
            this.iterations++;
            this.requestAnimationId = requestAnimationFrame(this.render1.bind(this));
        }
    };
    // 2. Using new function
    App.prototype.render2 = function () {
        //console.log(`${this.cid}:render2()`);
        if (this.canAnimate()) {
            this.intensifyRenderProcess();
            this.iterations++;
            var self_1 = this;
            this.requestAnimationId = requestAnimationFrame(function () { self_1.render2(); });
        }
    };
    // 3. Using ES6 arrow function
    // (Syntax sugar, transpiled result is same as option 2)
    App.prototype.render3 = function () {
        var _this = this;
        //console.log(`${this.cid}:render3()`);
        if (this.canAnimate()) {
            this.intensifyRenderProcess();
            this.iterations++;
            this.requestAnimationId = requestAnimationFrame(function () { _this.render3(); });
        }
    };
    // 4. Bind the function in the constructor
    // this.render4 = this.render4.bind(this);
    App.prototype.render4 = function () {
        //console.log(`${this.cid}:render4()`);
        if (this.canAnimate()) {
            this.intensifyRenderProcess();
            this.iterations++;
            this.requestAnimationId = requestAnimationFrame(this.render4);
        }
    };
    App.prototype.intensifyRenderProcess = function () {
        //console.log(`${this.cid}:intensifyRenderProcess()`);
        var people = [];
        for (var i = 0; i < 500; i++) {
            people.push(new Person());
            //console.log('person=', person);
        }
    };
    return App;
}());
var Person = (function () {
    function Person() {
        this.brain = [];
        this.brain = this.createBrain();
    }
    Person.prototype.createBrain = function () {
        var cellMatrix = [];
        for (var i = 0; i < 5000; i++) {
            cellMatrix.push(new Neuron());
        }
        return cellMatrix;
    };
    return Person;
}());
var Neuron = (function () {
    function Neuron() {
        this.receptors = [];
        for (var i = 0; i < 5; i++) {
            this.receptors.push({ id: i });
        }
    }
    return Neuron;
}());
var app = new App('1_simple-transpile');
app.initialize();
app.startAnimation();
