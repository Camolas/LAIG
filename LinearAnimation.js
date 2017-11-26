

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

	getmatrix(time, section){
		console.log("in function");
	       var sectionTime = time;
	        
	       if (section >= 1) {
	           sectionTime -= this.sectionTimes[section - 1];
	       }

	       if(section < this.controlPoints.length - 1){

	           //console.log("sectiontime: " + sectionTime);

	           var dX = sectionTime * this.sectionStats[section][0];
	           var dY = sectionTime * this.sectionStats[section][1];
	           var dZ = sectionTime * this.sectionStats[section][2];

	           //console.log("deltas: " + [dX, dY, dZ]);

	           var sectionVector = [
	                this.controlPoints[section+1][0]-this.controlPoints[section][0],
	                this.controlPoints[section+1][1]-this.controlPoints[section][1],
	                this.controlPoints[section+1][2]-this.controlPoints[section][2]
	           ];

	           mat4.identity(this.matrix);
	           mat4.translate(this.matrix, this.matrix, [dX, dY, dZ]);
	           mat4.translate(this.matrix, this.matrix, [this.controlPoints[section][0], this.controlPoints[section][1], this.controlPoints[section][2]]);
	           mat4.rotate(this.matrix, this.matrix, Math.atan(-sectionVector[2], sectionVector[0]) + Math.PI/2, [0, 1, 0]);
	       }
	      // else{
	      //    this.finished = true;
	      // }

	       //console.log("matrix: " + this.matrix);

	       return this.matrix;
	    }
}

