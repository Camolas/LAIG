class CircularAnimation extends Animation{
    constructor(scene, id, speed, X, Y, Z, r, startang, rotang){
        super(scene, id);
        this.speed = speed;
        this.X = X;
        this.Y = Y;
        this.Z = Z;
        this.r = r;
        this.startang = startang;
        this.rotang = rotang;
        this.sectionTimes = [];

        this.arc = Math.abs(this.rotang - this.startang) * this.r;

        //time span 
        this.span = this.arc/this.speed;


        this.matrix = mat4.create();
        this.sectionTimes.push(this.span);
    }

    getmatrix(time, section){
    	var rotratio = time / this.span;

		if(time <= this.span){

			mat4.identity(this.matrix);
			//console.warn('Teste');
			mat4.translate(this.matrix, this.matrix, [this.X, this.Y, this.Z]);
			mat4.rotate(this.matrix, this.matrix, this.startang + rotratio*this.rotang, [0,1,0]);
			mat4.translate(this.matrix, this.matrix, [this.r, 0, 0]);
			if(this.rotang > this.startang)
				mat4.rotate(this.matrix, this.matrix, Math.PI/2, [0,1,0]);
			else if (this.rotang < this.startang)
				mat4.rotate(this.matrix, this.matrix, -Math.PI/2, [0,1,0]);

		}
		return this.matrix;
	}
}