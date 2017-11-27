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
    
    this.animationID = null;

    // texture ID.
    this.textureID = null ;

    this.transformMatrix = mat4.create();
    mat4.identity(this.transformMatrix);
    
    this.animationMatrix = mat4.create();
    mat4.identity(this.animationMatrix);

    this.animTime = 0;
    this.animIndex = 0;
    this.animSec = 0;	//section
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

// Update animation
MyGraphNode.prototype.updateAnimation = function(deltaTime){

    this.animTime += deltaTime;

    if(this.animIndex < this.animations.length){
        
        let newAnim = this.animations[this.animIndex];
       // console.log("before matrix11");

        this.animationMatrix = newAnim.getmatrix(this.animTime, this.animSec);

        

        
        if(this.animTime >= newAnim.getSpan()){
            this.animIndex++;
            this.animSec = 0;
            this.animTime = 0;
        }
        else if (this.animTime >= newAnim.sectionTimes[this.animSec])
            this.animSec++;
    }
}
