class CircularAnimation extends Animation{
    constructor(scene, id, speed, centerx, centery, centerz, radius, startAng, rotAng){
        super(scene, id, speed);
        this.centerx = centerx;
        this.centery = centery;
        this.centerz = centerz;
        this.radius = radius;
        this.startAng = startAng;
        this.rotAng = rotAng;

        //arc length
        this.arcLength = this.radius * this.rotAng;

        //animation time span
        this.animationSpan = this.arcLength / this.speed;

        //animation not started
        this.currAng = 0;
        this.currDist = 0;
        this.finished = false;
    }

    display(){
        //move scene to the center of the animation
        this.scene.translate(centerx, centery, centerz);

        //move scene to the object getting animated
        this.scene.translate(this.radius * Math.cos(this.startAng + this.currAng), 0, -this.radius * Math.sin(this.startAng + this.currAng));
        this.scene.rotate(Math.PI + (this.startAng + this.currAng), 0, 1, 0);
    }

    update(dTime){
        if(this.currAng < this.rotAng){
            this.currDist += ((deltaTime / 1000) * this.arcLength) / (this.animationSpan / 1000);
            this.currAng = this.currDist / this.radius;
        }
        else{
            this.finished = true;
        }

        if(finished){
            this.currAng = 0;
            this.currDist = 0;
        }
    }
}