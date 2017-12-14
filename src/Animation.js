
/**
* Animation
* @constructor
*/
class Animation{
	constructor(scene, id){
		this.scene = scene;
		this.id = id;
		this.span = 0;
		this.finished = false;
	}

	getSpan(){
		return this.span;
	}
	
}
