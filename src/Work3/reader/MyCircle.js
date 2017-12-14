/**
 * MyCircle
 * @constructor
 */
 function MyCircle(scene, r, slices) {
 	CGFobject.call(this,scene);
	
	this.r = r;
	this.slices = slices;

 	this.initBuffers();
 };

 MyCircle.prototype = Object.create(CGFobject.prototype);
 MyCircle.prototype.constructor = MyCircle;

 MyCircle.prototype.initBuffers = function() {
 	this.vertices = [];
 	this.normals = [];
 	this.indices = [];
	this.texCoords = [];

	var ang=(2*Math.PI)/this.slices;

	for(j = 0; j < this.slices; j++) {
		this.vertices.push(this.r*Math.cos(ang*j),this.r*Math.sin(ang*j),0);
		this.normals.push(0, 0, 1);
		this.texCoords.push(0.5 + 0.5 * Math.cos(ang*j), 0.5 - 0.5 * Math.sin(ang*j));
	}

	this.vertices.push(0, 0, 0);
	this.normals.push(0, 0, 1);
	this.texCoords.push(0.5, 0.5);
		
	for(i = 0; i < this.slices - 1; i++) {
		this.indices.push(i, i + 1, this.slices);
	}

	this.indices.push(this.slices - 1, 0, this.slices);

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
