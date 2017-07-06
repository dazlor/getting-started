console.log('Loaded: 1_simple-transpile.js');

/**
 * Conclusion: I can find no significant performance difference in
 * these crude tests.  So, render setup is a matter of syntax preference
 * Also, JavaScript or rather the browser will most likely not allow
 * the level of performance needed.  Need to evaluate GPU or worker techniques.
 */
interface App {
  name: string;
  containerName: string;

  initialize(): void;
}

// Set RUNTIME to a value higher than TIMEOUT to test stopAnimation()
const RUNTIME: number = 4000;
const TIMEOUT: number = 5000;

class App {
  readonly cid: string = 'App';
  name: string;
  containerName: string;
  requestAnimationId: any;
  iterations: number = 0;
  iterationTime: number;
  animationStartTime: number;
  animationStopTime: number;
  animationDuration: number;
  maxAnimationRuntime: number = RUNTIME;

  constructor(containerName: string) {
    console.log(`${this.cid}:constructor(containerName=${containerName})`);
    this.containerName = containerName;
    this.render4 = this.render4.bind(this);
  }

  initialize() {
    console.log(`${this.cid}:initialize()`);
    console.log(`${this.cid}:this.cid=${this.cid}`);
  }

  startAnimation() {
    console.log(`${this.cid}:startAnimation()`);
    this.animationStartTime = new Date().getTime();
    console.log('this.animationStartTime=' + this.animationStartTime);

    // Stop after 5 seconds and review the number of iterations
    setTimeout(() => {
      this.stopAnimation();
    }, TIMEOUT);

    if (!this.requestAnimationId) {
      //this.render1();
      //this.render2();
      //this.render3();
      //this.render4();
      //this.render5();
    }
  }

  stopAnimation() {
    console.log(`${this.cid}:startAnimation()`);
    console.log('this.requestAnimationId=' + this.requestAnimationId + ':' + typeof (this.requestAnimationId));
    if (this.requestAnimationId) {
      cancelAnimationFrame(this.requestAnimationId);
      this.requestAnimationId = undefined;
    }
    console.log('this.iterations=' + this.iterations);
  }

  canAnimate() {
    //console.log(`${this.cid}:canAnimate()`);
    this.iterationTime = new Date().getTime();
    return ((this.iterationTime - this.animationStartTime) < this.maxAnimationRuntime);
  }

  // --------------------------------------------------------------------------
  // NOTE: When you invoke redner() via [window.]requestAnimationFrame(this.render)
  // the scope in redner() is bound to window
  // --------------------------------------------------------------------------

  // 1. Using bind
  // Note that by binding functions you are creating a new instance
  // of the function for every object you create, whereas normally
  // JS will try to be smart about function invocation and grab them
  // from the prototype.
  render1() {
    //console.log(`${this.cid}:render1()`);
    if (this.canAnimate()) {
      this.intensifyRenderProcess();
      this.iterations++;
      this.requestAnimationId = requestAnimationFrame(this.render1.bind(this));
    }
  }

  // 2. Using new function
  render2() {
    //console.log(`${this.cid}:render2()`);
    if (this.canAnimate()) {
      this.intensifyRenderProcess();
      this.iterations++;
      let self = this;
      this.requestAnimationId = requestAnimationFrame(function() { self.render2(); });
    }
  }

  // 3. Using ES6 arrow function
  // (Syntax sugar, transpiled result is same as option 2)
  render3() {
    //console.log(`${this.cid}:render3()`);
    if (this.canAnimate()) {
      this.intensifyRenderProcess();
      this.iterations++;
      this.requestAnimationId = requestAnimationFrame(() => { this.render3() });
    }
  }

  // 4. Bind the function in the constructor
  // this.render4 = this.render4.bind(this);
  render4() {
    //console.log(`${this.cid}:render4()`);
    if (this.canAnimate()) {
      this.intensifyRenderProcess();
      this.iterations++;
      this.requestAnimationId = requestAnimationFrame(this.render4);
    }
  }

  // 5. Use class properties
  render5 = () => {
    //console.log(`${this.cid}:render5()`);
    if (this.canAnimate()) {
      this.intensifyRenderProcess();
      this.iterations++;
      this.requestAnimationId = requestAnimationFrame(this.render5);
    }
  }

  intensifyRenderProcess() {
    //console.log(`${this.cid}:intensifyRenderProcess()`);
    let people = [];
    for (var i = 0; i < 500; i++) {
      people.push(new Person());
      //console.log('person=', person);
    }
  }
}

class Person {
  brain: Array<Neuron> = [];
  constructor() {
    this.brain = this.createBrain();
  }

  createBrain() {
    let cellMatrix: Array<Neuron> = [];
    for (var i = 0; i < 5000; i++) {
      cellMatrix.push(new Neuron());
    }

    return cellMatrix;
  }
}

class Neuron {
  receptors: Array<Object>;
  constructor() {
    this.receptors = [];
    for (var i = 0; i < 5; i++) {
      this.receptors.push({ id: i });
    }
  }
}

let app = new App('1_simple-transpile');
app.initialize();
app.startAnimation();
