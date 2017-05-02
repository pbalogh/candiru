
import Boolius from './boolius'; // which in turn imports all the classes it depends upon
import XMLius from './xmlius';
import Mathius from './mathius';

window.onload = function(){
    d3.select('#modeSelect').on('change', function(e){
        var selectedMode = d3.select('#modeSelect').node().value.toLowerCase();
        changeMode( selectedMode );
    });


    function changeMode( newMode ){
        if( newMode.indexOf( 'arithmetic' ) > -1 )
        {
            // the user wants to look at arithmetic expressions.
            // is boolius already loaded?
            if(  !evaluator || evaluator.constructor.name != "Mathius" )
            {
                var grammarObject = [
                    [  ["NUMERIC", "^", "NUMERIC" ], "NUMERIC" ],
                    [  ["NUMERIC", "*", "NUMERIC" ], "NUMERIC" ],
                    [  ["NUMERIC", "+", "NUMERIC" ], "NUMERIC", ["*", "/", "^"] ],
                    [  ["NUMERIC", "-", "NUMERIC" ], "NUMERIC", ["*", "/", "^"] ],
                    [  ["NUM_LIT" ], "NUMERIC" ],
                    [  ["(", "NUMERIC", ")" ], "NUMERIC" ]
                ];

                let IGNORE = true;

                let tokenDefinitions = [
                    [ /\s+/, "", IGNORE ], // ignore whitespace
                    [ /\^/, "^" ], // this is the escaped form of ^
                    [ /\(/, "(" ],
                    [ /\)/, ")" ],
                    [ /\+/, "+" ],
                    [ /-/, "-" ],
                    [ /\*/, "*" ],
                    [ /\//, "/" ],
                    [ /[-+]?[0-9]*\.?[0-9]+/, "NUM_LIT" ],
                    [ /[a-zA-Z]+/, "IDENT" ],
                    [ /.+/, "DIRTYTEXT"]
                ];
                makeEvaluatorAndInitialize( new Mathius( tokenDefinitions, grammarObject ), "1 + 2 ^ (5 - 2) * 3",
                "Click operators to expand or collapse." );
            }
        }
        else if( newMode.indexOf( 'boolean' ) > -1 )
        {
            // the user wants to look at boolean expressions.
            // is boolius already loaded?
            if(  !evaluator || evaluator.constructor.name != "Boolius" )
            {
                var grammarObject = [
                    [  ["TRUE" ], "BOOLEAN" ],
                    [  ["FALSE" ], "BOOLEAN" ],
                    [  ["!", "BOOLEAN" ], "BOOLEAN" ],
                    [  ["BOOLEAN", "&", "BOOLEAN" ], "BOOLEAN" ],
                    [  ["BOOLEAN", "|", "BOOLEAN" ], "BOOLEAN" ],
                    [  ["(", "BOOLEAN", ")" ], "BOOLEAN" ]
                ];

                let IGNORE = true;

                let tokenDefinitions = [
                    [ /\s+/, "", IGNORE ], // ignore whitespace
                    [ /&&/, "&" ],
                    [ /AND/i, "&" ],
                    [ /\|\|/, "|" ], // this is the escaped form of ||
                    [ /XOR/i, "^" ],
                    [ /OR/i, "|" ],
                    [ /\^/, "^" ], // this is the escaped form of ^
                    [ /\!/, "!" ], // this is the escaped form of !
                    [ /NOT/i, "!" ],
                    [ /\(/, "(" ],
                    [ /\)/, ")" ],
                    [ /(true)(?![a-zA-Z0-9])/i, "TRUE" ],
                    [ /(false)(?![a-zA-Z0-9])/i, "FALSE" ],
                    [ /[a-zA-Z]+/, "IDENT" ],
                    [ /.+/, "DIRTYTEXT"]
                ];
                makeEvaluatorAndInitialize( new Boolius( tokenDefinitions, grammarObject ), "((d && c)) || (!b && a) && (!d || !a) && (!c || !b)",
                "Click operators to expand or collapse. Click leaf nodes to toggle true/false." );
            }
        }
        else if( newMode.indexOf( 'xml' ) > -1 )
        {
            // the user wants to look at boolean expressions.
            // is boolius already loaded?
            if(  !evaluator || evaluator.constructor.name != "XMLius" )
            {
                let grammarObject = [
                    [  ["OPENCOMMENT", "WILDCARD", "CLOSECOMMENT" ], "COMMENT" ],
                    // comments will be engulfed by the text of a node
                    // and ignored when the node is asked for its text as a string
                    [  ["COMMENT"], "NODETEXT" ],
                    [  ["<", "/", "IDENT", ">" ], "CLOSETAG" ],
                    [  ["<", "IDENT", ">" ], "OPENTAG" ],
                    [  ["<", "IDENT", "/", ">" ], "XMLNODE" ],
                    [  ["<", "IDENT", "IDENT", "=", "\"", "WILDCARD", "\"" ], "OPENTAGSTART" ],
                    /* Some recursive self-nesting here */
                    [  ["OPENTAGSTART", "IDENT", "=", "\"", "WILDCARD", "\"" ], "OPENTAGSTART" ],
                    [  ["OPENTAGSTART", ">"], "OPENTAG" ],
                    // can't have two identifiers in a row, unless we're between an opening and closing tag
                    // a/k/a node.text
                    [  ["IDENT", "IDENT" ], "NODETEXT" ],
                    [  ["IDENT", "NODETEXT" ], "NODETEXT" ],
                    [  ["NODETEXT", "NODETEXT" ], "NODETEXT" ],
                    // let's also have nested nodes engulfed in the NODETEXT
                    [  ["XMLNODE", "NODETEXT" ], "NODETEXT" ],
                    [  ["XMLNODES", "NODETEXT" ], "NODETEXT" ],
                    [  ["NODETEXT", "XMLNODE" ], "NODETEXT" ],
                    [  ["NODETEXT", "XMLNODES" ], "NODETEXT" ],
                    [  ["OPENTAG", "CLOSETAG" ], "XMLNODE" ],
                    [  ["OPENTAG", "NODETEXT", "CLOSETAG" ], "XMLNODE" ],
                    [  ["OPENTAG", "XMLNODE", "CLOSETAG" ], "XMLNODE" ],
                    [  ["XMLNODE", "XMLNODE" ], "XMLNODES" ],
                    [  ["OPENTAG", "XMLNODES", "CLOSETAG" ], "XMLNODE" ]
                ];

                let IGNORE = true;

                let tokenDefinitions = [
                    [  /\s+/, "", IGNORE ],
                    [  /<!--/, 'OPENCOMMENT' ],
                    [  /-->/, 'CLOSECOMMENT' ],
                    [  /\//, "/" ],
                    [  />/, ">" ],
                    [  /</, "<" ],
                    [  /=/, "=" ],
                    [  /"/, '"' ],
                    [  /'/, '"' ],
                    [  /[-+]?[0-9]*\.?[0-9]+/, "NUM_LIT" ],
                    [  /[a-zA-Z]+[a-zA-Z0-9-]*/, "IDENT" ],
                    // having trapped all these things,
                    [ /[^<]+/, "NODETEXT"]
                ];

                makeEvaluatorAndInitialize( new XMLius( tokenDefinitions, grammarObject ),
                `<div class="hintwrapper"><div class="hint">Click operators to expand or collapse. Click leaf nodes to toggle true/false.</div><div class="styled-select green semi-square"></div></div>`);
            }
        }
    }

    function makeEvaluatorAndInitialize( newEvaluator, statement, hintText ){
        assignEvaluator( newEvaluator );
        d3.select('#statement').node().value = statement;
        d3.select('div.hint').text( hintText );
        evaluateStatement();
    }

    function assignEvaluator( newEvaluator ) {
        // don't change if the user wants what they already have
        if( evaluator && newEvaluator.constructor.name == evaluator.constructor.name ) return;
        evaluator = newEvaluator;
    }

var evaluator;



var winHeight = Math.max( 600, window.innerHeight );
var winWidth = Math.max( 1000, window.innerWidth );

var m = [0, 120, 140, 120],
    w = winWidth - m[1] - m[3],
    h = winHeight - m[0] - m[2],
    i = 0,
    root;

var tree = d3.layout.tree()
    .size([h, w]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var vis = d3.select("#body").append("svg:svg")
    .attr("width", w + m[1] + m[3])
    .attr("height", h + m[0] + m[2])
  .append("svg:g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

vis.append("text")
	.attr("opacity", 1)
    .attr("y", 246)
    .attr("dy", "1.71em")
    .style("font-size","34px")
    .style("text-anchor", "end")
    .attr("id", "result")
    .text("");



d3.select("#testbutton").on("click", function(e) {
	evaluateStatement();
});

d3.select("#statement").on("keyup", function(){
    if(d3.event.keyCode == 13){
        d3.select("#testbutton").on("click")();
    }
});

var parseTree;

function evaluateStatement()
{
    var statement = d3.select("#statement").node().value;
	parseTree = evaluator.parse( statement );
    console.log("parseTree is " + JSON.stringify( parseTree ));
	displayJSON( parseTree );
};

function displayJSON( json )
{
  root = json;
  root.x0 = h / 2;
  root.y0 = 0;
  //d3.select("#statement").val( root.title );
  d3.select("#statement").property("value", root.expressionString);

  d3.select("#result")
  .text( root.value )

  function toggleAll(d, delay ) {

  	if( ! delay ) delay = 1;

    if (d.children) {
		toggle(d);
    }

    if (d._children) {
		toggle(d);
    }
  }
  // Initialize the display to show all nodes.
  root.children.forEach(toggleAll, 444);

  update(root);
};

// Toggle children.
function toggle(d, showOverlay) {
	if( d == undefined ) return;
    //boolean
    if( d.value === true  || d.value === false )
    {
        if (d.children) {
        // hide the children by moving them into _children
            d._children = d.children;
            d.children = null;
        } else {
        // bring back the hidden children
            d.children = d._children;
            d._children = null;
        }

        var hasNoChildren = !d.children && !d._children;
        if( !hasNoChildren )
        {
            // has an array in d.children or d._children
            // but it might be empty!

            if ( d.children && d.children.length == 0 ) hasNoChildren = true;
            if ( d._children && d._children.length == 0 ) hasNoChildren = true;
        }
        if( hasNoChildren ) // it's a leaf
        {
            // toggle true/false
            if( ( d.value === true ) || (d.value === false ) )
            {
                d.value = !d.value;
                //var myInt = parseInt( d.name );
                //conditionTruthValues[ myInt ] = d.value;
                var myVar = d.name;
                evaluator.state[ myVar ] = d.value;
                updateWithoutDeleting(root);
            }
        }
    }
    else // you clicked something that isn't in a boolean flow
    {
        if( showOverlay )
        {
            var attributeText = d.attributes ? JSON.stringify( d.attributes ) : "None";
            if( ! d.children && !d._children) // it's a leaf
            {
                //showValueOverlay( d.value );

                showValueOverlay( "Attributes: " + attributeText + "</br>Content: " + d.value );
            }
            else//oops, we wanted to collapse this thing
            {
                //showValueOverlay( "Attributes: " + attributeText + "</br>Content: " + d.value );
                if (d.children) {
                // hide the children by moving them into _children
                    d._children = d.children;
                    d.children = null;
                } else {
                // bring back the hidden children
                    d.children = d._children;
                    d._children = null;
                }
            }
        }
    }
}

function showValueOverlay( val ){
    $('#valueModalText').html( val );
    $('#valueModal').modal('show');
}

function updateWithoutDeleting()
{
    parseTree = evaluator.evaluateParseTree();
    updateObjectAndItsChildren( parseTree, root );

	d3.select("#result")
		.text( root.value )
}

function updateObjectAndItsChildren( newObjectTemp, rootTemp )
{

    rootTemp.value = newObjectTemp.value;
    if( ! newObjectTemp.children ) return;
    for( var i = 0; i < newObjectTemp.children.length; i++ )
    {
        if( rootTemp.children )
        {
            updateObjectAndItsChildren( newObjectTemp.children[ i ], rootTemp.children[ i ] );
        }
        else
        {
        	if( rootTemp._children )
        	{
            	updateObjectAndItsChildren( newObjectTemp.children[ i ], rootTemp._children[ i ] );
            }
        }

    }
}



function update(source) {
  var duration = d3.event && d3.event.altKey ? 5000 : 500;

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse();



  // Normalize for fixed-depth.
  // OK -- why is d.y correlated with the horizontal position here???

  widthPerNode = 110;
  var body = d3.select("body");
  var svg = body.select("svg");
  var widthInPixels = svg.style("width").replace("px", "");
  widthInPixels = parseInt( widthInPixels );
  var widthPerNode = widthInPixels / nodes.length;
  nodes.forEach(function(d) { d.y = d.depth * widthPerNode; });

  d3.select("#result")
  .transition()
  .duration(duration)
  .attr("x", nodes[nodes.length -1 ].y - 40 )
  .attr("y", function(d){ return nodes[nodes.length -1 ].x - 48 } )

  // Update the nodes…
  var node = vis.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("svg:g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
      .on("click", function(d) { toggle(d, true ); update(d); })
      .on("mouseover", function(d){
            var attributeText = d.attributes ? JSON.stringify( d.attributes ) : "";
            if( attributeText.length > 0 )
            {
                showValueOverlay( "Attributes: " + attributeText + "</br>Content: " + d.value );
            }

      });

  nodeEnter.append("svg:circle")
      .attr("r", 1e-6)
      .style("stroke", function(d){ return d.value ? "green" : "red" } )
      .style("fill", function(d) { return d._children ? "grey" : "#fff"; });

  nodeEnter.append("svg:text")
      .attr("x", function(d) { return d.children || d._children ? -1 : 17; })
      .attr("y", function(d) { return d.children || d._children ? 18 : -1; })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.children || d._children ? "middle" : "left"; })
//      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .text(function(d) { return d.name; })
      .style("fill-opacity", 1e-6);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      .style("stroke", function(d){ return d.value ? "green" : "red";  } )
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
      .attr("r", 8.5)
      .style("stroke", function(d){ return d.value ? "green" : "red" } )
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeUpdate.select("text")
      .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .remove();

  nodeExit.select("circle")
      .attr("r", 1e-6);

  nodeExit.select("text")
      .style("fill-opacity", 1e-6);

  // Update the links…
  var link = vis.selectAll("path.link")
      .data(tree.links(nodes), function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("svg:path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      })
    .transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

changeMode("boolean");
evaluateStatement();
};