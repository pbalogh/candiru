# Candiru
A bottom-up deterministic parser with lookahead of 1 (so far). Written in ES6 using Babel and Webpack to transpile and bundle.

Live demo is [here](https://pbalogh.github.io/candiru/).

node_modules isn't committed, of course, so 'npm install' to get things going.

```npm test``` to run the mocha tests, ```npm run watch``` to have it watch for changes to code and use webpack rebuild the bundle.

## Overview
The pulldown lets you choose between three different types of input statements that Candiru can parse: booleans, XML, and arithmetic.

## Creating and Using Candiru Classes
In the Javascript function that serves as the callback for the pulldown's change event, you can see that arrays of tokens and nonterminals are created and then passed to a utility class (e.g., Boolius, XMLius, Mathius). The utility class passes those token and nonterminal definitions to a Candiru Lexer and a Candiru Parser, and creates any Visitor objects that might be needed by the Parser. 

## Visitors
This demo uses D3 to visualize the data produced by parsing statements into a parse tree and then evaluating that tree to get a final return value (and to assign values to various nodes in the tree during the evaluation process). 
### JSON Visitors (evaluation-time)
Since D3 consumes JSON, every Parser will need some kind of JSON-creating visitor to apply to the final parse tree. Generally, the root of the parse tree is told to call a visit with that evaluation visitor. E.g.:
```parseTree[0].visit( myJSONcreatingVisitor );```


### Parse-Time Visitor
However, the XML parser also needs a parse-time visitor to enforce XML rules such as the one that opening and closing tags must have the same tag name, etc. And the Boolean statement needs an evaluation-time Visitor in order to know if a variable such as "c" or "a" has a value of true or false at any given moment.)

And the Boolean parser needs a parse-time visitor as well, to handle variables. For example, you can pass it a state object like { a : true, b : false }, and the lexer will see that there are variable identifiers named "a" and "b", but it will need a visitor to do the work of looking inside the state object for a variable by a particular name and to know what type it is ("BOOLEAN", in this case). Typing is important, as the grammar used by the Boolean parser defines reductions for a "BOOLEAN" variables but has nothing for, say, "STRING" or "FLOAT" or "INT" variables.

## Next steps: 
  - D3 parse tree for XML should have mouseover handling (e.g., if node has "attributes", show in modal)
  - Better display for parsing and lexing errors (using try/catch)
  - HTML pages are throwing lexer errors for '"'
  - Visitor classes need clearer naming -- right now, default assumption is that a visitor is an Evaluation visitor
  - Set up packaging correctly. boolius.js shouldn't be the entry file -- or, if it is, it certainly shouldn't be the only thing in module.exports! (export default class is not right)
  
