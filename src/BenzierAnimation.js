class BezierAnimation extends Animation{
    constructor(scene, id, speed, controlPoints){
        super(scene, id, speed);
        this.controlPoints = controlPoints;
    }
}