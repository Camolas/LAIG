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

    // animation ID
	this.animationID = null;

    this.transformMatrix = mat4.create();
    mat4.identity(this.transformMatrix);
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
