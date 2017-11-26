/**
* CircularAnimation
* @constructor
*/
function CircularAnimation(scene, radius, initAng, angRot, velocity, center){
	CGFobject.call(this,scene);

	degToRad = Math.PI /180;

	this.radius=radius;
	this.velocity=velocity;
	this.center=center
	this.initAng=initAng*degToRad;
	this.angRot=angRot*degToRad;

	var date = new Date();
	this.initialTime = date.getTime();
	this.lastTime = this.initialTime;
	this.timeNeeded = 0;

	this.w = this.velocity / this.radius;

	this.timeNeeded = 2 * Math.PI * this.radius;

	console.log("radius: "+ this.radius);
	console.log("velocity: "+ this.velocity);
	console.log("center: "+ this.center);
	console.log("initAng: "+ this.initAng);
	console.log("angRot: "+ this.angRot);
	console.log("initialTime: "+ this.initialTime);
	console.log("w: "+ this.w);
	console.log("timeNeeded: "+ this.timeNeeded);

};

CircularAnimation.prototype = Object.create(CGFobject.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;


CircularAnimation.prototype.display = function() {

	var date = new Date();
	if((date.getTime()-this.initialTime)< this.timeNeeded*1000){
		var deltaTime = (date.getTime()-this.initialTime)/1000;

		var delta = this.initAng + this.w * deltaTime;

		this.scene.rotate(90, 0, 1, 0);
		this.scene.translate(this.radius, 0 , 0);
		this.scene.rotate(delta, 0, 1, 0);
		this.scene.translate(this.center[0], this.center[1], this.center[2]);

		this.lastTime=date.getTime();	
	}
}

CircularAnimation.prototype.getType = function() {
	return "circular";
}