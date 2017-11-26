/**
* Animation
* @constructor
*/
/*function Animation(scene, object) {
	CGFobject.call(this,scene);
    this.scene = scene;
    this.object = object;
};

Animation.prototype = Object.create(CGFobject.prototype);
Animation.prototype.constructor = Animation;


Animation.prototype.display = function() {

}*/

/**
* Animation
* @constructor
*/
class Animation{
	constructor(scene, id){
		this.scene = scene;
		this.id = id;
		this.span = 0;
	}

	getSpan(){
		return this.span;
	}
	
}
