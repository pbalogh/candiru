# mechanical
A bottom-up deterministic parser with lookahead of 1 (so far).

node-modules isn't committed, of course, so 'npm install' to get things going.

Right now, the only way to see it in action is to run 'npm test'. 

The index.html file uses the pulldown to create arrays of tokens and nonterminals, which it passes to a utility class (e.g., Boolius, XMLius, Mathius). The utility class passes those token and nonterminal definitions to a Lexer and a Parser, and creates any Visitor objects that might be needed by the Parser. (Since D3 consumes JSON, for example, every Parser will need some kind of JSON-creating visitor to apply to the final parse tree. However, the XML parser also needs a parse-time visitor to enforce XML rules such as the one that opening and closing tags must have the same tag name, etc.)

## Next steps: 
  - D3 parse tree for XML should have mouseover handling (e.g., if node has "attributes", show in modal)
  - Better display for parsing and lexing errors (using try/catch)
  
