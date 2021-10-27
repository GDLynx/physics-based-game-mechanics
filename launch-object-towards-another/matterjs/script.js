const { Engine, Runner, Render, Bodies, Composite } = Matter; 

// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
    element: document.body,
    engine: engine,
	width: 200, height: 200
});

// create two boxes and a ground
const boxA = Bodies.rectangle(400, 400, 80, 80);
const boxB = Bodies.trapezoid(0 + Math.random() * 500, 0 + Math.random() * 500, 100, 180, 1, { isStatic: true });
const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true});

Composite.add(engine.world, [ boxB, boxA,  ground]);

let circles = Composite.create(); 
window.setInterval(() => {
		let force = 0.6; 
        let targetAngle = Matter.Vector.angle(boxA.position, boxB.position); 
	    Matter.Body.applyForce(boxA, boxA.position, {
			x: Math.cos(targetAngle) * force, 
			y: Math.sin(targetAngle) * force
		}); 

		window.setTimeout(() => {
			Matter.Body.setPosition(boxB, {x: 0 + Math.random() * 500, y: 0 + Math.random() * 500})
			Matter.Body.setPosition(boxA, {x: 0 + Math.random() * 500, y: 0 + Math.random() * 500});
		}, 3000); 
}, 6000); 

// run the renderer
Render.run(render);

// create runner
let runner = Runner.create();

// run the engine
Runner.run(runner, engine);

