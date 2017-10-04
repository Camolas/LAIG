/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, xmlelem) {
    this.id = null;

    this.graph.reader.getString(xmlelem,"type");
    this.graph.reader.getString(xmlelem,"args");
}

