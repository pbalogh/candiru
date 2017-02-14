# Candiru
A bottom-up deterministic parser with lookahead of 1 (so far).

node-modules isn't committed, of course, so 'npm install' to get things going.

Right now, the only way to see it in action is to run 'npm test'. 

## Overview
The pulldown lets you choose between three different types of input statements that Candiru can parse: booleans, XML, and arithmetic.

In the Javascript function that serves as the callback for the pulldown's change event, you can see that arrays of tokens and nonterminals are created and then passed to a utility class (e.g., Boolius, XMLius, Mathius). The utility class passes those token and nonterminal definitions to a Candiru Lexer and a Candiru Parser, and creates any Visitor objects that might be needed by the Parser. (Since D3 consumes JSON, for example, every Parser will need some kind of JSON-creating visitor to apply to the final parse tree. However, the XML parser also needs a parse-time visitor to enforce XML rules such as the one that opening and closing tags must have the same tag name, etc. And the Boolean statement needs an evaluation-time Visitor in order to know if a variable such as "c" or "a" has a value of true or false at any given moment.)

## Next steps: 
  - D3 parse tree for XML should have mouseover handling (e.g., if node has "attributes", show in modal)
  - Better display for parsing and lexing errors (using try/catch)
  - HTML pages are throwing lexer errors for "
  
