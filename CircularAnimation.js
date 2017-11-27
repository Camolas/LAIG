class CircularAnimation extends Animation{
    constructor(scene, id, speed, X, Y, Z, r, startang, rotang){
        super(scene, id, type);
        this.speed = speed;
        this.X = X;
        this.Y = Y;
        this.Z = Z;
        this.r = r;
        this.startang = startang;
        this.rotang = rotang;

        this.arc = this.r * this.rotang;

        //time span
        this.animationSpan = this.arc/this.speed;
        this.currentang = 0;
        this.deltaang = 0;

        //angular velocity
        this.vAngular = this.speed/this.r;
        
        this.matrix = mat4.create();
        this.sectionTimes.push(this.animationSpan);
    }

    getmatrix(time, section){
        this.currentang = this.vAngular*time;
        //finish animation when reached rotang
        if(this.currentang >= this.rotang){
            this.finished = true;
        }
        else{
            mat4.identity(this.matrix);
            var deltaang = this.startang + this.currentang;
            mat4.translate(this.matrix, this.matrix, [this.X, this.Y, this.Z]);
            mat4.rotate(this.matrix, this.matrix, deltaang, [0, 1, 0]);
            mat4.translate(this.matrix, this.matrix, [this.r, 0, 0]);
            mat4.rotate(this.matrix, this.matrix, Math.PI, [0, 1, 0]);
            }
        return this.matrix;
    }
}