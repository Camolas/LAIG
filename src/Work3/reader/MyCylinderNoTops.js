/**
 * MyCylinderNoTops
 * @constructor
 */
function MyCylinderNoTops(scene, height, bot_r, top_r, stacks, slices) {
    CGFobject.call(this, scene);

    this.height = height;
    this.bot_r = bot_r;
    this.top_r = top_r;
    this.stacks = stacks;
    this.slices = slices;

    this.initBuffers();
};

MyCylinderNoTops.prototype = Object.create(CGFobject.prototype);
MyCylinderNoTops.prototype.constructor = MyCylinderNoTops;

MyCylinderNoTops.prototype.initBuffers = function() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    const ang = (2*Math.PI)/this.slices;
    var z_coord = this.height/2;
    var delta_r = (this.bot_r - this.top_r)/this.stacks;
	var patchLengthY = this.height/this.stacks;
    
	var a = 0;
    var b = 0;
 
    for (var j = 0; j < this.stacks; j++) {
        for (var i = 0; i <= this.slices; i++) {

            var current_r = (this.top_r + j*delta_r);
            var new_r = (this.top_r + (j+1)*delta_r);

            var v1 = vec3.fromValues(current_r * Math.cos(i*ang), current_r * Math.sin(i*ang), z_coord);
            var v2 = vec3.fromValues(new_r * Math.cos(i*ang), new_r * Math.sin(i*ang), (z_coord - patchLengthY));
            var v3 = vec3.fromValues(current_r * Math.cos((i+1)*ang), current_r * Math.sin((i+1)*ang), z_coord);

            var vec1 = vec3.create();
            var vec2 = vec3.create();
            var vec_norm = vec3.create();
            vec3.sub(vec1, v2, v1);
            vec3.sub(vec2, v3, v1);
            vec3.cross(vec_norm, vec1, vec2);
            vec3.normalize(vec_norm, vec_norm);

            this.vertices.push(v1[0], v1[1], v1[2]);
            this.normals.push(vec_norm[0], vec_norm[1], vec_norm[2]);
            this.texCoords.push(a, b);

            this.vertices.push(v2[0], v2[1], v2[2]);
            this.normals.push(vec_norm[0], vec_norm[1], vec_norm[2]);
            this.texCoords.push(a, b + 1.0/this.stacks);

            a = a + 1/this.slices;
        }

        z_coord = z_coord - patchLengthY;
        a = 0;
        b = b + 1/this.stacks;

        var current_ind = j * ((this.slices+1)*2);
        for (var i = 0; i < this.slices; i++, current_ind += 2) {
            this.indices.push(current_ind, current_ind + 1, current_ind + 2);
            this.indices.push(current_ind + 1, current_ind + 3, current_ind + 2);
        }
    }

    this.baseTexCoords = this.texCoords.slice();
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

MyCylinderNoTops.prototype.updateTex = function(S, T) {
    for (var i = 0; i < this.texCoords.length; i += 2) {
        this.texCoords[i] = this.baseTexCoords[i]/S;
        this.texCoords[i+1] = this.baseTexCoords[i+1]/T;
    }

    this.updateTexCoordsGLBuffers();
};
