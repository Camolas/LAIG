/**
* LinearAnimation
* @constructor
*/

function LinearAnimation(scene, controlPoints, speed){
	CGFobject.call(this, scene);
	this.scene = scene;
	var date = new Date();
	
	this.initialTime = date.getTime();
	this.lastTime = this.initialTime;
	this.timeNeeded = 0;
	
	this.distanceMoved = [0, 0, 0];

	//at least 2 points are needed
	if(controlPoints.length < 2)
		console.log("controlPoints is not a valid array");
	else
		this.controlPoints = controlPoints;

	this.X = controlPoints[0][0];
	this.Y = controlPoints[0][1];
	this.Z = controlPoints[0][2];

	if(speed.length != 3)
		console.log("speed is not a valid array");
	else{
		this.speed = [];
		this.speed[0] = speed[0];
		this.speed[1] = speed[1];
		this.speed[2] = speed[2];
	}
	
	this.direction = [];
	this.trajectories = [];

	for(i = 1; i < this.controlPoints.length; i++){
		var pathX = this.controlPoints[i][0]-this.controlPoints[i-1][0];
		var pathY = this.controlPoints[i][1]-this.controlPoints[i-1][1];
		var pathZ = this.controlPoints[i][2]-this.controlPoints[i-1][2];

		this.trajectories.push([pathX, pathY, pathZ]);
		var rot = this.controlPoints[i-1][0]/distanceX;
		this.direction.push(Math.acos(rot));
	}

	this.currentTrajectory = this.trajectories.shift();
};

LinearAnimation.prototype = Object.create(CGFobject.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;


LinearAnimation.prototype.getMatrix = function() {

	if(this.currentTrajectory != null){

		var date = new Date();
		var timePassed = date.getTime() - this.initialTime;
		var dTime = (date.getTime()-this.lastTime)/1000;  //seconds
		var dX, dY, dZ;

		//X
		if(this.distanceMoved[0] < Math.abs(this.currentTrajectory[0])){
			if(this.currentTrajectory[0] > 0)
				dX = dTime * this.speed[0];
			else
				dX = -(dTime * this.speed[0]);

			this.distanceMoved[0] += Math.abs(dX);
		}
		else
			dX = null;
		//Y
		if(this.distanceMoved[1] <  Math.abs(this.currentTrajectory[1])){
			if(this.currentTrajectory[1] > 0)
				dY = dTime * this.speed[1];
			else
				dY = -(dTime * this.speed[1]);

			this.distanceMoved[1] += Math.abs(dY);
		}
		else
			dY = null;
		//Z
		if(this.distanceMoved[2] <  Math.abs(this.currentTrajectory[2])){
			if(this.currentTrajectory[2] > 0)
				dZ = dTime * this.speed[2];
			else
				dZ = -(dTime * this.speed[2]);

			this.distanceMoved[2] += Math.abs(dZ);
		}
		else
			dZ = null;

		if(dX == null && dY == null && dZ == null){
			this.currentTrajectory = this.trajectories.shift();
			this.distanceMoved = [0,0,0];
			this.direction.pop();
		}
		
		if(dX != null)
			this.X += dX;
		if(dY != null)
			this.Y += dY;
		if(dZ != null)
			this.Z += dZ;

		this.lastTime = date.getTime();
	}
	this.scene.translate(this.X, this.Y, this.Z);
	this.scene.rotate(this.direction[0]);
	console.log("direction = " + this.direction);
}

LinearAnimation.prototype.getType = function() {
	return "linear";
}
