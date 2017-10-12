/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */


function MyQuad(scene, lenghtS, lenghtT, x1, y1, x2, y2){
	CGFobject.call(this, scene);

	

	this.x1 = x1;
	this.x2 = x2;
	this.y1 = y1;
	this.y2 = y2;
	this.lenghtS = lenghtS;
	this.lenghtT = lenghtT;
	console.log(x1);
	this.initBuffers();

}
MyQuad.prototype = Object.create(CGFobject.prototype);
MyQuad.prototype.constructor=MyQuad;

MyQuad.prototype.initBuffers = function () {
	console.log(this);
	this.vertices = [
		this.x1, this.y1, 0.0,	//0
        this.x2, this.y1, 0.0,	//1
        this.x2, this.y2, 0.0,	//2
        this.x1 ,this.y2, 0.0		//3
    ];

    this.indices = [
			0, 1, 2,
			0, 2, 3
        ];

    this.normals = [
          0, 0, 1,
          0, 0, 1,
          0, 0, 1,
          0, 0, 1

    ];

    /*this.texCoords = [
    	this.minS, this.maxT,
    	this.minS, this.minT,
    	this.maxS, this.maxT,
    	this.maxS, this.minT
    ];*/
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
