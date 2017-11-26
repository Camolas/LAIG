/**
 * MyGraphNode class, representing an intermediate node in the scene graph.
 * @constructor
**/

function MyGraphNode(graph, nodeID) {
    this.graph = graph;

    this.nodeID = nodeID;

    // child nodes ID
    this.children = [];

    // leaves ID
    this.leaves = [];

    // material ID.
    this.materialID = null ;

    // animations
    this.animations = [];

    // texture ID.
    this.textureID = null ;

    this.transformMatrix = mat4.create();
    mat4.identity(this.transformMatrix);
    
    this.animationMatrix = mat4.create();
    mat4.identity(this.animationMatrix);

    this.atime = 0;
    this.aind = 0;
    this.asec = 0;
}

/**
 * Adds ID of another node to this node's children array
 */
MyGraphNode.prototype.addChild = function(nodeID) {
    this.children.push(nodeID);
}

/**
 * Adds a leaf to this node's leaves array
 */
MyGraphNode.prototype.addLeaf = function(leaf) {
    this.leaves.push(leaf);
}

MyGraphNode.prototype.updateAnimation = function(timedif){

    this.atime += timedif;

    if(this.aind < this.animations.length){
        
        var nowani = this.graph.animations[this.animations[this.aind]];
        this.animationMatrix = nowani.calcMatrix(this.atime, this.asec);

        if(this.atime >= nowani.getSpan()){
            this.aind++;
            this.asec = 0;
            this.atime = 0;
        }
        else if (this.atime >= nowani.sectionTimes[this.asec])
            this.asec++;
    }
}
