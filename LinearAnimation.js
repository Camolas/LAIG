/**
* LinearAnimation
* @constructor
*/

/*function LinearAnimation(scene, controlPoints, speed){
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
		var rot = this.controlPoints[i-1][0]/pathX;
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
*/

/**
* LinearAnimation
* @constructor
*/
class LinearAnimation extends Animation{
	constructor(scene, id, speed, controlPoints){

		super(scene, id);
		this.controlPoints = controlPoints;
		this.speed = speed;
		this.matrix = mat4.create();

		this.sectionTimes = [];
		this.sectionStats = [];

		this.totaldistance = 0;
		for(var i = 0; i < this.controlPoints.length - 1; i++){
			//distance and time
			var distance = Math.sqrt(
				Math.pow(this.controlPoints[i+1][0] - this.controlPoints[i][0], 2) + 
				Math.pow(this.controlPoints[i+1][1] - this.controlPoints[i][1], 2) + 
				Math.pow(this.controlPoints[i+1][2] - this.controlPoints[i][2], 2));

			this.totaldistance += distance;
			
			var stime = this.totaldistance / this.speed;
			this.sectionTimes.push(stime);

			var sptime = distance / this.speed;
			//partial speeds
			var velx = (this.controlPoints[i+1][0] - this.controlPoints[i][0]) / sptime;
			var vely = (this.controlPoints[i+1][1] - this.controlPoints[i][1]) / sptime;
			var velz = (this.controlPoints[i+1][2] - this.controlPoints[i][2]) / sptime;

			var angle = Math.acos((this.controlPoints[i+1][0] - this.controlPoints[i][0]) / distance);

			this.sectionStats.push([velx, vely, velz, angle]);
		}

		this.span = this.totaldistance / this.speed;
	}

	getAnimationMatrix(time, section){
	       var sectionTime = time;
	        
	       if (section >= 1) {
	           sectionTime -= this.sectionTimes[section - 1];
	       }

	       if(section < this.controlPoints.length - 1){

	           //console.log("sectiontime: " + sectionTime);

	           var deltax = sectionTime * this.sectionValues[section][0];
	           var deltay = sectionTime * this.sectionValues[section][1];
	           var deltaz = sectionTime * this.sectionValues[section][2];

	           //console.log("deltas: " + [deltax, deltay, deltaz]);

	           var sectionVector = [
	                this.controlPoints[section+1][0]-this.controlPoints[section][0],
	                this.controlPoints[section+1][1]-this.controlPoints[section][1],
	                this.controlPoints[section+1][2]-this.controlPoints[section][2]
	           ];

	           mat4.identity(this.animationMatrix);
	           mat4.translate(this.animationMatrix, this.animationMatrix, [deltax, deltay, deltaz]);
	           mat4.translate(this.animationMatrix, this.animationMatrix, [this.controlPoints[section][0], this.controlPoints[section][1], this.controlPoints[section][2]]);
	           mat4.rotate(this.animationMatrix, this.animationMatrix, Math.atan(-sectionVector[2], sectionVector[0]) + Math.PI/2, [0, 1, 0]);
	       }
	       else{
	          this.finished = true;
	       }

	       //console.log("matrix: " + this.animationMatrix);

	       return this.animationMatrix;
	    }
}

