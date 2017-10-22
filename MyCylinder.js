/**
 * MyCylinder
 * @constructor
 */
function MyCylinder(scene, args){
	  CGFobject.call(this,scene);
    args = args.split(" ").map(Number);

    this.height = args[0];
    this.bot_r = args[1];
    this.top_r = args[2];
    this.stacks = args[3];
    this.slices = args[4];
	this.if_top = args[5];
	this.if_bot = args[6];

    this.cylinder = new MyCylinderNoTops(scene, this.height, this.bot_r, this.top_r, this.stacks, this.slices);
    this.cylinder.initBuffers();

    this.topCover = new MyCircle(scene, this.top_r, this.slices);
 	  this.topCover.initBuffers();

    this.botCover = new MyCircle(scene, this.bot_r, this.slices);
 	  this.botCover.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.display = function()
{
    this.scene.pushMatrix();

    this.scene.translate(0, 0, this.height/2);

    if(this.if_top == 1) {
		this.scene.pushMatrix();
		this.scene.translate(0, 0, this.height/2);
		this.topCover.display();
		this.scene.popMatrix();
	};

	if(this.if_bot == 1) {
		this.scene.pushMatrix();
		this.scene.translate(0, 0, -this.height/2);
		this.scene.rotate(Math.PI, 1, 0, 0);
		this.botCover.display();
		this.scene.popMatrix();
	};

    this.scene.pushMatrix();
    this.cylinder.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
};

MyCylinder.prototype.updateTex = function(S, T) {
    this.cylinder.updateTex(S, T);
};
