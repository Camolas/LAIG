/**
* LinearAnimation
* @constructor
*/

function LinearAnimation(scene, controlPoints, velocity){
	CGFobject.call(this, scene);
	this.scene = scene;
	var date = new Date();
	
	this.initialTime = date.getTime();
	this.lastTime = this.initialTime;
	this.timeNeeded = 0;
	this.distanceMoved = [0, 0, 0];

	if(controlPoints.length < 2)
		console.log("controlPoints is not a valid array");
	else
		this.controlPoints = controlPoints;

	this.posX = controlPoints[0][0];
	this.posY = controlPoints[0][1];
	this.posZ = controlPoints[0][2];

	if(velocity.length != 3)
		console.log("velocity is not a valid array");
	else{
		this.velocity = [];
		this.velocity[0] = velocity[0];
		this.velocity[1] = velocity[1];
		this.velocity[2] = velocity[2];
	}
	this.trajectories = [];

	for(i = 1; i < this.controlPoints.length; i++){
		var pathX = this.controlPoints[i][0]-this.controlPoints[i-1][0];
		var pathY = this.controlPoints[i][1]-this.controlPoints[i-1][1];
		var pathZ = this.controlPoints[i][2]-this.controlPoints[i-1][2];

		this.trajectories.push([pathX, pathY, pathZ]);
	}

	this.currentTrajectory = this.trajectories.shift();
};

LinearAnimation.prototype = Object.create(CGFobject.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;


LinearAnimation.prototype.getMatrix = function() {

	if(this.currentTrajectory != null){

		var date = new Date();
		var timePassed = date.getTime() - this.initialTime;
		var deltaTime = (date.getTime()-this.lastTime)/1000;  //seconds
		var deltaX, deltaY, deltaZ;

		//X
		if(this.distanceMoved[0] < Math.abs(this.currentTrajectory[0])){
			if(this.currentTrajectory[0] > 0)
				deltaX = this.velocity[0]*deltaTime;
			else
				deltaX = -this.velocity[0]*deltaTime;

			this.distanceMoved[0] += Math.abs(deltaX);
		}
		else
			deltaX = null;
		//Y
		if(this.distanceMoved[1] <  Math.abs(this.currentTrajectory[1])){
			if(this.currentTrajectory[1] > 0)
				deltaY = this.velocity[1]*deltaTime;
			else
				deltaY = -this.velocity[1]*deltaTime;

			this.distanceMoved[1] += Math.abs(deltaY);
		}
		else
			deltaY = null;
		//Z
		if(this.distanceMoved[2] <  Math.abs(this.currentTrajectory[2])){
			if(this.currentTrajectory[2] > 0)
				deltaZ = this.velocity[2]*deltaTime;
			else
				deltaZ = -this.velocity[2]*deltaTime;

			this.distanceMoved[2] += Math.abs(deltaZ);
		}
		else
			deltaZ = null;

		if(deltaX == null && deltaY == null && deltaZ == null){
			this.currentTrajectory = this.trajectories.shift();
			this.distanceMoved = [0,0,0];
		}
		
		if(deltaX != null)
			this.posX += deltaX;
		if(deltaY != null)
			this.posY += deltaY;
		if(deltaZ != null)
			this.posZ += deltaZ;

		this.lastTime = date.getTime();
	}
	this.scene.translate(this.posX, this.posY, this.posZ);
//	return([this.posX, this.posY, this.posZ]);
}

LinearAnimation.prototype.getType = function() {
	return "linear";
}
