/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/js";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nonterminal = __webpack_require__(6);

var _nonterminal2 = _interopRequireDefault(_nonterminal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NonterminalFactory = function () {
  function NonterminalFactory(grammarObject) {
    _classCallCheck(this, NonterminalFactory);

    this.grammarObject = grammarObject;
    this.nonterminals = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = grammarObject[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var grammarRule = _step.value;

        var nonterminal = new _nonterminal2.default(grammarRule[0], grammarRule[1]);
        if (grammarRule.length > 2) // it has an array of lookaheadTokensToAvoid
          {
            nonterminal.lookaheadTokensToAvoid = grammarRule[2];
          }
        this.nonterminals.push(nonterminal);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  _createClass(NonterminalFactory, [{
    key: 'getNonterminals',
    value: function getNonterminals() {
      return this.nonterminals;
    }
  }]);

  return NonterminalFactory;
}();

exports.default = NonterminalFactory;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _token = __webpack_require__(7);

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TokenFactory = function () {
  function TokenFactory(tokenDefinitions) {
    _classCallCheck(this, TokenFactory);

    this.tokens = [];
    this.tokenDefinitions = tokenDefinitions;
  }

  _createClass(TokenFactory, [{
    key: "makeTokenFromDefinition",
    value: function makeTokenFromDefinition(tokenDefinition) {
      return this.makeToken(tokenDefinition[0], tokenDefinition[1], tokenDefinition.length > 2 ? tokenDefinition[2] : false);
    }
  }, {
    key: "makeToken",
    value: function makeToken(regex, name) {
      var ignore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var token = new _token2.default(regex, name, 0, "", ignore);
      this.tokens.push(token);
      return token;
    }
  }, {
    key: "getTokens",
    value: function getTokens() {
      var IGNORE = true;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.tokenDefinitions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var tokenDefinition = _step.value;

          this.makeTokenFromDefinition(tokenDefinition);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return this.tokens;
    }
  }]);

  return TokenFactory;
}();

exports.default = TokenFactory;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tokenfactory = __webpack_require__(1);

var _tokenfactory2 = _interopRequireDefault(_tokenfactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Lexer = function () {
  function Lexer(tokenDefinitions) {
    _classCallCheck(this, Lexer);

    var tokenFactory = new _tokenfactory2.default(tokenDefinitions);
    this.tokens = tokenFactory.getTokens();
  }

  _createClass(Lexer, [{
    key: "tokenize",
    value: function tokenize(sentenceToTokenize) {
      var arrayOfTokens = [];
      var startingLetter = 0;
      var stringToMatch = sentenceToTokenize; // want to keep original sentence for length/reference

      while (startingLetter < sentenceToTokenize.length) {
        var foundAMatchSomewhere = false;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.tokens[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var token = _step.value;

            var lengthOfMatch = 0;

            var _token$matchYourselfT = token.matchYourselfToStartOfThisStringAndAddSelfToArray(arrayOfTokens, stringToMatch, startingLetter);

            var _token$matchYourselfT2 = _slicedToArray(_token$matchYourselfT, 3);

            lengthOfMatch = _token$matchYourselfT2[0];
            arrayOfTokens = _token$matchYourselfT2[1];
            stringToMatch = _token$matchYourselfT2[2];

            if (lengthOfMatch > 0) {
              foundAMatchSomewhere = true;
              startingLetter += lengthOfMatch;
              break; // START AT THE TOP OF OUR TOKEN LIST!!
              // That is IMPORTANT.
              // Some of our later tokens, like IDENT, are catch-alls that will greedily snatch up keywords like NOT
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (!foundAMatchSomewhere) {
          throw new Error("Illegal character " + stringToMatch.charAt(0) + " at position " + startingLetter);
        }
      }
      return arrayOfTokens;
    }
  }]);

  return Lexer;
}();

exports.default = Lexer;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _symbol = __webpack_require__(4);

var _symbol2 = _interopRequireDefault(_symbol);

var _nonterminal = __webpack_require__(6);

var _nonterminal2 = _interopRequireDefault(_nonterminal);

var _nonterminalfactory = __webpack_require__(0);

var _nonterminalfactory2 = _interopRequireDefault(_nonterminalfactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parser = function () {
  function Parser(grammarObject) {
    _classCallCheck(this, Parser);

    var nonterminalFactory = new _nonterminalfactory2.default(grammarObject);
    this.nonterminals = nonterminalFactory.getNonterminals();
    this.state = {};
  }

  _createClass(Parser, [{
    key: 'setState',
    value: function setState(state) {
      this.state = state; // generally just a lookup table for declared/initialized variables
    }

    // What does this do? Well, if there's a token of type IDENT, it's a variable.
    // If that variable hasn't been declared, then how are we supposed to know what type it is?
    // We'll be strongly-typed so that even a simple grammar can work effectively.

  }, {
    key: 'resolveIdentifiersToTypes',
    value: function resolveIdentifiersToTypes(sentenceOfSymbols) {
      var resolvedSymbols = [];
      while (sentenceOfSymbols.length > 0) {
        var symbol = sentenceOfSymbols.shift();
        // we only care about tokens
        if (symbol.constructor.name == "Token") {
          if (symbol.type == "IDENT") {
            // so now we can wrap our variable in the appropriate nonterminal type
            if (typeof this.state[symbol._stringIMatched] == "boolean") {
              var nonterm = new _nonterminal2.default(["IDENT"], "BOOLEAN");
              nonterm.seriesOfSymbolsIAbsorbedAndReplaced = [symbol];
              symbol = nonterm;
            }
            resolvedSymbols.push(symbol);
            continue;
          } else {
            resolvedSymbols.push(symbol);
          }
        } else {
          resolvedSymbols.push(symbol);
        }
      }
      return resolvedSymbols;
    }
  }, {
    key: 'getSimpleStringForSentence',
    value: function getSimpleStringForSentence(sentenceOfSymbols) {
      var traceString = "";
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = sentenceOfSymbols[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var symbol = _step.value;

          traceString += symbol.type + " ";
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return traceString;
    }
  }, {
    key: 'parse',
    value: function parse(sentenceOfSymbols) {
      var parseTimeVisitor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


      sentenceOfSymbols = this.resolveIdentifiersToTypes(sentenceOfSymbols);
      var arrayOfSymbolsMatchedBeforeMe = [];
      var lengthOfMatch = 0;
      var finished = false;
      while (!finished) {
        var madeAMatch = false;
        //console.log("------- Starting at top of nonterminals list -------" );
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.nonterminals[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var nonterminal = _step2.value;

            // we'll go through the input sentence
            // and try to match this nonterminal to the beginning of it.
            // if there's a match, then our nonterminal will be part of the future sentence.
            // (replacing whatever portion it matched.)
            // if there's no match, we want to pop a symbol off the start of the input sentence
            // (moving it into the future sentence, since we )
            var traceString = this.getSimpleStringForSentence(sentenceOfSymbols);
            while (sentenceOfSymbols.length > 0) {

              // if we matched, then the good news is, the input sentence is now changed
              // so we don't have to worry about changing it.
              // otherwise, we didn't match the beginning of the input sentence,
              // so let's pop a symbol off it and try again.
              var _nonterminal$matchYou = nonterminal.matchYourselfToStartOfThisStringAndAddSelfToArray(arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbols, parseTimeVisitor);
              //console.log("USING nonterminal " + nonterminal.toStringSimple() + " to look at " + traceString );


              var _nonterminal$matchYou2 = _slicedToArray(_nonterminal$matchYou, 3);

              lengthOfMatch = _nonterminal$matchYou2[0];
              arrayOfSymbolsMatchedBeforeMe = _nonterminal$matchYou2[1];
              sentenceOfSymbols = _nonterminal$matchYou2[2];
              if (lengthOfMatch == 0) {

                arrayOfSymbolsMatchedBeforeMe.push(sentenceOfSymbols.shift());
                traceString = this.getSimpleStringForSentence(sentenceOfSymbols);
              } else {
                //console.log("MATCHED nonterminal " + nonterminal.toStringSimple() + " to sentence " + traceString );
                madeAMatch = true;
              }
            }

            // ok, we did what we could. let's gather our processed items and hand them to the next nonterminal to process.
            sentenceOfSymbols = arrayOfSymbolsMatchedBeforeMe.slice(0); // make sure we copy the items over and keep these two arrays discrete!
            arrayOfSymbolsMatchedBeforeMe = [];
            //console.log("sentenceOfSymbols is now " + sentenceOfSymbols );
            // are we done? if so, then don't bother looking at other nonterminals!
            if (sentenceOfSymbols.length <= 1) {
              finished == true;
              break;
            }

            // we need to start from the top of our nonterminals if we made a match!
            // order MATTERS.
            if (madeAMatch) break;
          } // end of cycling through our array of nonterminals

          // what if we made it through all our nonterminals and didn't make a match?
          // error, that's what!
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        if (!madeAMatch) {
          var stringAndPosition = this.getLastTokenDescriptionOfSymbol(sentenceOfSymbols[0]);
          var errorString = "\nSyntax error:" + stringAndPosition.string + " at position " + stringAndPosition.position;
          throw new Error(errorString);

          finished = true;
        }

        if (sentenceOfSymbols.length <= 1) {
          finished = true;
        }
      } // end of our "while" loop going through sentenceOfSymbols until finished == true

      return sentenceOfSymbols;
    }
  }, {
    key: 'getLastTokenDescriptionOfSymbol',
    value: function getLastTokenDescriptionOfSymbol(symbol) {
      return this.getStringAndPositionOfTokensOfSymbol(symbol.symbolsMatched[symbol.symbolsMatched.length - 1]);
    }
  }, {
    key: 'getStringAndPositionOfTokensOfSymbol',
    value: function getStringAndPositionOfTokensOfSymbol(symbol) {
      var earliestPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100000000;

      if (symbol.constructor.name == "Token") {
        return { string: symbol._stringIMatched, position: symbol.start };
      } else if (symbol.constructor.name == "Nonterminal") {
        var tokenString = "";
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = symbol.symbolsMatched[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var kid = _step3.value;

            var stringAndPosition = this.getStringAndPositionOfTokensOfSymbol(kid, earliestPosition);
            tokenString += stringAndPosition.string;
            if (stringAndPosition.position < earliestPosition) {
              earliestPosition = stringAndPosition.position;
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        return { string: tokenString, position: earliestPosition };
      }
    }
  }]);

  return Parser;
}();

exports.default = Parser;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Symbol = function () {
  function _Symbol() {
    _classCallCheck(this, _Symbol);
  }

  _createClass(_Symbol, [{
    key: "name",
    get: function get() {
      return this._name;
    },
    set: function set(someName) {
      this._name = someName;
    }
  }]);

  return _Symbol;
}();

exports.default = _Symbol;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Boolius = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //import Token from './token';
//import Symbol from './token';


var _lexer = __webpack_require__(2);

var _lexer2 = _interopRequireDefault(_lexer);

var _parser = __webpack_require__(3);

var _parser2 = _interopRequireDefault(_parser);

var _xmlius = __webpack_require__(17);

var _xmlius2 = _interopRequireDefault(_xmlius);

var _mathius = __webpack_require__(11);

var _mathius2 = _interopRequireDefault(_mathius);

var _booleanjsonvisitor = __webpack_require__(12);

var _booleanjsonvisitor2 = _interopRequireDefault(_booleanjsonvisitor);

var _tokenfactory = __webpack_require__(1);

var _tokenfactory2 = _interopRequireDefault(_tokenfactory);

var _nonterminalfactory = __webpack_require__(0);

var _nonterminalfactory2 = _interopRequireDefault(_nonterminalfactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Boolius = exports.Boolius = function () {
  function Boolius(tokenDefinitions, grammarObject) {
    _classCallCheck(this, Boolius);

    // we set the state so that the parser knows the data type of each of these variables
    // (in this case, boolean)
    // and later so that the visitor can evaluate each node to determine if it is true or false.
    this.state = { "a": false, "b": true, "c": false, "d": true, "e": false, "f": true, "g": false, "h": true, "i": false };
    this.visitor = new _booleanjsonvisitor2.default(this.state);
    // lay the groundwork for lexical analysis
    this.lexer = new _lexer2.default(tokenDefinitions);
    this.parser = new _parser2.default(grammarObject);
    this.parser.setState(this.state);
  }

  _createClass(Boolius, [{
    key: 'parse',
    value: function parse(sentenceToParse) {
      try {
        var sentenceOfTokens = this.lexer.tokenize(sentenceToParse);
        this.parseTree = this.parser.parse(sentenceOfTokens);
        return this.evaluateParseTree();
      } catch (e) {
        alert(e);
      }
    }
  }, {
    key: 'evaluateParseTree',
    value: function evaluateParseTree() {
      var result = this.parseTree[0].visit(this.visitor);
      return result;
    }
  }]);

  return Boolius;
}();
//window.Boolius = Boolius;


module.exports = Boolius;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _symbol = __webpack_require__(4);

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Nonterminal = function (_Symbol2) {
  _inherits(Nonterminal, _Symbol2);

  function Nonterminal(seriesOfSymbolsIMustMatch, type) {
    _classCallCheck(this, Nonterminal);

    var _this = _possibleConstructorReturn(this, (Nonterminal.__proto__ || Object.getPrototypeOf(Nonterminal)).call(this));

    _this.seriesOfSymbolsIMustMatch = seriesOfSymbolsIMustMatch;
    _this.type = type;
    _this.seriesOfSymbolsIAbsorbedAndReplaced = [];
    _this.wildcardMode = false;
    _this.lookaheadTokensToAvoid = null;
    return _this;
  }

  _createClass(Nonterminal, [{
    key: 'toStringSimple',
    value: function toStringSimple() {
      return this.seriesOfSymbolsIMustMatch.join(' ');
    }
  }, {
    key: 'toString',
    value: function toString() {
      var returnString = this.type + " (";

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.seriesOfSymbolsIAbsorbedAndReplaced[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var symbol = _step.value;

          returnString += " " + symbol.toString();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return returnString;
    }
  }, {
    key: 'visit',
    value: function visit(evaluationVisitor) {
      return evaluationVisitor.execute(this);
    }
  }, {
    key: 'matchYourselfToStartOfThisStringAndAddSelfToArray',
    value: function matchYourselfToStartOfThisStringAndAddSelfToArray(arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbolsToMatch, parseTimeVisitor) {

      var care = false;

      if (this.toStringSimple() == "BOOLEAN & BOOLEAN") {}
      //care = true;

      // clone it so we don't destroy the original in case we're only a partial match

      var sentenceOfSymbolsToMatchClone = sentenceOfSymbolsToMatch.slice(0);

      if (care) console.log("sentenceOfSymbolsToMatchClone is " + sentenceOfSymbolsToMatchClone);

      // same with ours

      var seriesOfSymbolsIMustMatchClone = this.seriesOfSymbolsIMustMatch.slice(0);

      if (care) console.log("seriesOfSymbolsIMustMatchClone is " + seriesOfSymbolsIMustMatchClone);

      this.seriesOfSymbolsIAbsorbedAndReplaced = [];

      var done = false;

      // in case of wildcard, we need to know what the previous symbol was

      var symbolThatBreaksWildcard = null;

      while (seriesOfSymbolsIMustMatchClone.length > 0) {
        if (care) console.log("at top of seriesOfSymbolsIMustMatchClone.length loop, where seriesOfSymbolsIMustMatchClone.length is " + seriesOfSymbolsIMustMatchClone.length);
        var mySymbol = seriesOfSymbolsIMustMatchClone.shift();
        var theirSymbol = sentenceOfSymbolsToMatchClone.shift();

        if (care) console.log("mySymbol is " + mySymbol);
        if (care) console.log("theirSymbol is " + theirSymbol);

        // if they ran out of symbols, then we're obviously not a match. UNLESS we were in wildcard mode.
        if (!theirSymbol) {
          this.seriesOfSymbolsIAbsorbedAndReplaced = [];
          return [0, arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbolsToMatch];
        }

        if (mySymbol == "WILDCARD") {
          this.wildcardMode = true;
          symbolThatBreaksWildcard = seriesOfSymbolsIMustMatchClone.shift();
          while (theirSymbol.type != symbolThatBreaksWildcard) {
            this.seriesOfSymbolsIAbsorbedAndReplaced.push(theirSymbol);

            if (sentenceOfSymbolsToMatchClone.length == 0) // they ran out of symbols in their sentence!
              {
                if (seriesOfSymbolsIMustMatchClone.length == 0) // that wildcard was my last character
                  {
                    arrayOfSymbolsMatchedBeforeMe.push(this.getFrozenClone());
                    return [this.length, arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbolsToMatchClone];
                  } else // failure -- we had more to match but they ran out first
                  {
                    this.seriesOfSymbolsIAbsorbedAndReplaced = [];
                    return [0, arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbolsToMatch];
                  }
              } else {
              theirSymbol = sentenceOfSymbolsToMatchClone.shift();
            }
          } //end of tight loop inside wildcard mode, but still in wildcard mode

          // absorb the one that got us out of the wildcard
          // i.e., it matched the symbol of ours that follows (and thus ends) the wildcard

          this.seriesOfSymbolsIAbsorbedAndReplaced.push(theirSymbol);

          // we made it through!
          // if that was the last one, then we should skip the rest of the matching and go right to success
          // if not, keep the process going -- get a new symbol from them
          if (seriesOfSymbolsIMustMatchClone.length == 0) // we don't have any more
            {
              done = true;
            } else if (sentenceOfSymbolsToMatchClone.length > 0) // we have more, and they have more things that need matching
            {
              theirSymbol = sentenceOfSymbolsToMatchClone.shift();
              // but if our wildcard was our last character, then we should leave
            } else // we have more, but they don't!
            {
              this.seriesOfSymbolsIAbsorbedAndReplaced = [];
              return [0, arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbolsToMatch];
            }
        } // end of wildcard loop

        if (!done) {
          // do they match? i.e., the next character in the sentence -- does it match the next symbol in my internal list?
          if (theirSymbol.type != mySymbol) {
            return [0, arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbolsToMatch];
          } else {
            if (care) console.log("OK, we matched symbols and done is " + done);
            this.seriesOfSymbolsIAbsorbedAndReplaced.push(theirSymbol);
          }
        }
      } // bottom of seriesOfSymbolsIMustMatchClone.length loop

      if (care) console.log("ALL IS WELL SO FAR");
      // we made it through -- matched everything we needed to -- but maybe there's a problem after all...
      // now, there's an edge case -- good for operator precedence enforcement
      // -- the lookahead tokens.
      // maybe we matched everything we needed, and that's great,
      // but maybe the next token in the sentence is a dealbreaker!
      // for example, 1 + 2 * 3
      // if we're NUMERIC + NUMERIC, we'll find a match
      // but that is wrong! because the next token *after* our possible match is a *
      // and that has higher precedence than +

      if (this.lookaheadTokensToAvoid) {
        if (care) console.log("LOOKAHEADS!!!" + this.lookaheadTokensToAvoid);
        if (sentenceOfSymbolsToMatchClone.length > 0) {
          var theirNextSymbol = sentenceOfSymbolsToMatchClone[0];
          if (this.lookaheadTokensToAvoid.indexOf(theirNextSymbol.type) > -1) {
            return [0, arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbolsToMatch];
          }
        }
      }
      // we made it here! must be a basically perfect match.
      // but let's see if there's a context stack for this parser
      // e.g., an XML parser keeps a stack of open nodes
      // so that when you hit a closing tag for a node
      // the parser can know if it's the most recently opened tag
      if (!parseTimeVisitor || parseTimeVisitor.execute(this)) {
        arrayOfSymbolsMatchedBeforeMe.push(this.getFrozenClone());
        return [this.length, arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbolsToMatchClone];
      } else {
        return [0, arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbolsToMatch];
      }
    }
  }, {
    key: 'getFrozenClone',
    value: function getFrozenClone() {

      var frozenClone = new Nonterminal(this.seriesOfSymbolsIMustMatch, this.type);

      frozenClone.seriesOfSymbolsIAbsorbedAndReplaced = this.seriesOfSymbolsIAbsorbedAndReplaced;

      return frozenClone;
    }
  }, {
    key: 'symbolsMatched',
    get: function get() {
      return this.seriesOfSymbolsIAbsorbedAndReplaced;
    }
  }, {
    key: 'length',
    get: function get() {
      return this.seriesOfSymbolsIAbsorbedAndReplaced.length;
    }
  }]);

  return Nonterminal;
}(_symbol2.default);

exports.default = Nonterminal;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _symbol = __webpack_require__(4);

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Token = function (_Symbol2) {
  _inherits(Token, _Symbol2);

  /***
   * We are one of the two types of Symbol this parser deals with:
   * Tokens and Nonterminals.
   * A Token is basically a Symbol that contains one or more string characters.
   * A Nonterminal is basically a Symbol that contains one or more Symbols
   * (each of which can be either a Token or a Nonterminal).
   *
   * First argument will be a regex that will match some of the raw input stream.
   * Second argument will be the internal representation I will use for myself
   * (a string).
   *
   */
  function Token(regexOfThingsIMustMatch, type, leng, stringIActuallyMatched, ignore) {
    var startIndex = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : -1;

    _classCallCheck(this, Token);

    var _this = _possibleConstructorReturn(this, (Token.__proto__ || Object.getPrototypeOf(Token)).call(this));

    _this.regexOfThingsIMustMatch = regexOfThingsIMustMatch;
    _this._type = type;
    _this.start = startIndex;
    _this._length = leng ? leng : 0;
    _this._stringIMatched = stringIActuallyMatched;
    _this._ignore = ignore;
    return _this;
  }

  _createClass(Token, [{
    key: "toStringSimple",
    value: function toStringSimple() {
      return " " + this._type + " ";
    }
  }, {
    key: "visit",
    value: function visit(evaluationVisitor) {
      return evaluationVisitor.execute(this);
    }
  }, {
    key: "matchYourselfToStartOfThisStringAndAddSelfToArray",
    value: function matchYourselfToStartOfThisStringAndAddSelfToArray(symbolArray, stringToMatch, startingIndex) {
      this._length = 0;
      var match = this.regexOfThingsIMustMatch.exec(stringToMatch);
      if (match != null && match.index == 0) {
        this._length = match[0].length;
        // a frozen clone to record this moment,
        // so that our data can go on to be reused without breaking things
        var frozenToken = new Token(this.regexOfThingsIMustMatch, this.type, this._length, match[0], this._ignore, startingIndex);
        if (!this._ignore) symbolArray.push(frozenToken);
        stringToMatch = stringToMatch.substring(this.length);
      }
      return [this._length, symbolArray, stringToMatch];
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.type + "(" + this.regexOfThingsIMustMatch.toString() + ")<" + this._stringIMatched + "." + this.start + ">";
    }
  }, {
    key: "type",
    get: function get() {
      return this._type;
    }
  }, {
    key: "length",
    get: function get() {
      return this._length;
    }
  }]);

  return Token;
}(_symbol2.default);

exports.default = Token;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _booleanvisitor = __webpack_require__(13);

var _booleanvisitor2 = _interopRequireDefault(_booleanvisitor);

var _numericvisitor = __webpack_require__(9);

var _numericvisitor2 = _interopRequireDefault(_numericvisitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EvaluationVisitor = function () {
  function EvaluationVisitor(state) {
    _classCallCheck(this, EvaluationVisitor);

    this.state = state;
    this.booleanVisitor = new _booleanvisitor2.default(state);
    this.numericVisitor = new _numericvisitor2.default(state);
  }

  _createClass(EvaluationVisitor, [{
    key: 'setState',
    value: function setState(newstate) {
      this.state = newstate;
      this.booleanVisitor.setState(newstate);
      this.numericVisitor.setState(newstate);
    }
  }, {
    key: 'execute',
    value: function execute(nonterminalOrToken) {
      if (nonterminalOrToken.constructor.name == "Nonterminal") {
        if (nonterminalOrToken.type == "BOOLEAN") return this.booleanVisitor.execute(nonterminalOrToken);
        if (nonterminalOrToken.type == "NUMERIC") return this.numericVisitor.execute(nonterminalOrToken);
      } else // it's a token
        {
          if (nonterminalOrToken.type.toUpperCase().indexOf("TRUE") > -1) {
            return true;
          }
          if (nonterminalOrToken.type.toUpperCase().indexOf("FALSE") > -1) {
            return false;
          }
          throw new Error("nonterminalOrToken.type is " + nonterminalOrToken.type);
          return null;
        }
    }
  }]);

  return EvaluationVisitor;
}();

module.exports = EvaluationVisitor;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _evaluationvisitor = __webpack_require__(8);

var _evaluationvisitor2 = _interopRequireDefault(_evaluationvisitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NumericVisitor = function () {
  function NumericVisitor(state) {
    _classCallCheck(this, NumericVisitor);

    this.state = state;
  }

  _createClass(NumericVisitor, [{
    key: "setState",
    value: function setState(newstate) {
      this.state = newstate;
    }
  }, {
    key: "execute",
    value: function execute(nonterminalOrToken) {
      if (nonterminalOrToken.constructor.name == "Nonterminal") {
        var symbolsMatched = nonterminalOrToken.seriesOfSymbolsIAbsorbedAndReplaced;
        var value = "FOO"; // declare this and, hey, initialize it with something we'll notice if there's an error.
        if (symbolsMatched.length == 1) // we're a nonterminal that absorbed one other thing
          {
            value = symbolsMatched[0].visit(this);
            return value;
          } else if (symbolsMatched.length == 3) // we're a boolean comprising an operator and two operands
          {
            // or maybe we're just a numeric wrapped in parens!

            if (symbolsMatched[0].type == "(" && symbolsMatched[2].type == ")") {
              return symbolsMatched[1].visit(this);
            }

            if (symbolsMatched[1].type == "+") {
              return symbolsMatched[0].visit(this) + symbolsMatched[2].visit(this);
            } else if (symbolsMatched[1].type == "-") {
              return symbolsMatched[0].visit(this) - symbolsMatched[2].visit(this);
            } else if (symbolsMatched[1].type == "*") {
              return symbolsMatched[0].visit(this) * symbolsMatched[2].visit(this);
            } else if (symbolsMatched[1].type == "/") {
              return symbolsMatched[0].visit(this) / symbolsMatched[2].visit(this);
            } else if (symbolsMatched[1].type == "^") {
              return Math.pow(symbolsMatched[0].visit(this), symbolsMatched[2].visit(this));
            } else {
              throw new Error("WE HAVE 3 SYMBOLS BUT I DON'T KNOW WHAT THIS IS:" + JSON.stringify(symbolsMatched));
            }
          } else if (symbolsMatched.length == 2) // we're a boolean with one operator -- probably a not
          {
            if (symbolsMatched[0].type == "+") {
              return symbolsMatched[1].visit(this);
            }
            if (symbolsMatched[0].type == "-") {
              return -1 * symbolsMatched[1].visit(this);
            } else {
              throw new Error("IN NUMERICVISITOR, DON'T KNOW WHAT THE OPERATOR OF THIS 2-ELEMENT SYMBOLSMATCHED IS:" + JSON.stringify(symbolsMatched));
            }
          }

        throw new Error("UNKNOWN LENGTH OF SYMBOLSMATCHED:" + JSON.stringify(symbolsMatched));
      } else // it's a token
        {
          if (nonterminalOrToken.type.toUpperCase().indexOf("NUM_LIT") > -1) {
            return parseInt(nonterminalOrToken._stringIMatched);
          }
          throw new Error("nonterminalOrToken.type is " + nonterminalOrToken.type);
          return null;
        }
    }
  }]);

  return NumericVisitor;
}();

module.exports = NumericVisitor;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _boolius = __webpack_require__(5);

var _boolius2 = _interopRequireDefault(_boolius);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// which in turn imports all the other classes

window.onload = function () {
    console.log("visualizer window.onLoad");
    d3.select('#modeSelect').on('change', function (e) {
        var selectedMode = d3.select('#modeSelect').node().value.toLowerCase();
        changeMode(selectedMode);
    });

    function changeMode(newMode) {
        if (newMode.indexOf('arithmetic') > -1) {
            // the user wants to look at arithmetic expressions.
            // is boolius already loaded?
            if (!evaluator || evaluator.constructor.name != "Mathius") {
                var grammarObject = [[["NUMERIC", "^", "NUMERIC"], "NUMERIC"], [["NUMERIC", "*", "NUMERIC"], "NUMERIC"], [["NUMERIC", "+", "NUMERIC"], "NUMERIC", ["*", "/", "^"]], [["NUMERIC", "-", "NUMERIC"], "NUMERIC", ["*", "/", "^"]], [["NUM_LIT"], "NUMERIC"], [["(", "NUMERIC", ")"], "NUMERIC"]];

                var IGNORE = true;

                var tokenDefinitions = [[/\s+/, "", IGNORE], // ignore whitespace
                [/\^/, "^"], // this is the escaped form of ^
                [/\(/, "("], [/\)/, ")"], [/\+/, "+"], [/-/, "-"], [/\*/, "*"], [/\//, "/"], [/[-+]?[0-9]*\.?[0-9]+/, "NUM_LIT"], [/[a-zA-Z]+/, "IDENT"], [/.+/, "DIRTYTEXT"]];
                makeEvaluatorAndInitialize(new Mathius(tokenDefinitions, grammarObject), "1 + 2 ^ (5 - 2) * 3", "Click operators to expand or collapse.");
            }
        } else if (newMode.indexOf('boolean') > -1) {
            // the user wants to look at boolean expressions.
            // is boolius already loaded?
            if (!evaluator || evaluator.constructor.name != "Boolius") {
                var grammarObject = [[["TRUE"], "BOOLEAN"], [["FALSE"], "BOOLEAN"], [["!", "BOOLEAN"], "BOOLEAN"], [["BOOLEAN", "&", "BOOLEAN"], "BOOLEAN"], [["BOOLEAN", "|", "BOOLEAN"], "BOOLEAN"], [["(", "BOOLEAN", ")"], "BOOLEAN"]];

                var _IGNORE = true;

                var _tokenDefinitions = [[/\s+/, "", _IGNORE], // ignore whitespace
                [/&&/, "&"], [/AND/i, "&"], [/\|\|/, "|"], // this is the escaped form of ||
                [/XOR/i, "^"], [/OR/i, "|"], [/\^/, "^"], // this is the escaped form of ^
                [/\!/, "!"], // this is the escaped form of !
                [/NOT/i, "!"], [/\(/, "("], [/\)/, ")"], [/(true)(?![a-zA-Z0-9])/i, "TRUE"], [/(false)(?![a-zA-Z0-9])/i, "FALSE"], [/[a-zA-Z]+/, "IDENT"], [/.+/, "DIRTYTEXT"]];
                makeEvaluatorAndInitialize(new _boolius2.default(_tokenDefinitions, grammarObject), "((d && c)) || (!b && a) && (!d || !a) && (!c || !b)", "Click operators to expand or collapse. Click leaf nodes to toggle true/false.");
            }
        } else if (newMode.indexOf('xml') > -1) {
            // the user wants to look at boolean expressions.
            // is boolius already loaded?
            if (!evaluator || evaluator.constructor.name != "XMLius") {
                var grammarObject = [[["OPENCOMMENT", "WILDCARD", "CLOSECOMMENT"], "COMMENT"], [["<", "/", "IDENT", ">"], "CLOSETAG"], [["<", "IDENT", ">"], "OPENTAG"], [["<", "IDENT", "/", ">"], "XMLNODE"], [["<", "IDENT", "IDENT", "=", "\"", "WILDCARD", "\""], "OPENTAGSTART"],
                /* Some recursive self-nesting here */
                [["OPENTAGSTART", "IDENT", "=", "\"", "WILDCARD", "\""], "OPENTAGSTART"], [["OPENTAGSTART", ">"], "OPENTAG"], [["OPENTAG", "CLOSETAG"], "XMLNODE"], [["OPENTAG", "WILDCARD", "CLOSETAG"], "XMLNODE"]];

                var _IGNORE2 = true;

                var _tokenDefinitions2 = [[/\s+/, "", _IGNORE2], [/<!--/, 'OPENCOMMENT'], [/-->/, 'CLOSECOMMENT'], [/\//, "/"], [/>/, ">"], [/</, "<"], [/=/, "="], [/"/, '"'], [/'/, '"'], [/[-+]?[0-9]*\.?[0-9]+/, "NUM_LIT"], [/[a-zA-Z]+/, "IDENT"], [/[^<]+/, "DIRTYTEXT"]];
                makeEvaluatorAndInitialize(new XMLius(_tokenDefinitions2, grammarObject), "<top foo='bar'>Hello!<simpleChildNode></simpleChildNode>There!<complexNode><simpleChildNode></simpleChildNode><simpleChildNode></simpleChildNode></complexNode></top>", "Click nodes to expand or collapse. Click nodes to see attributes and/or content.");
            }
        }
    }

    function makeEvaluatorAndInitialize(newEvaluator, statement, hintText) {
        assignEvaluator(newEvaluator);
        d3.select('#statement').node().value = statement;
        d3.select('div.hint').text(hintText);
        evaluateStatement();
    }

    function assignEvaluator(newEvaluator) {
        // don't change if the user wants what they already have
        if (evaluator && newEvaluator.constructor.name == evaluator.constructor.name) return;
        evaluator = newEvaluator;
    }

    var evaluator;

    var winHeight = Math.max(600, window.innerHeight);
    var winWidth = Math.max(1000, window.innerWidth);

    var m = [0, 120, 140, 120],
        w = winWidth - m[1] - m[3],
        h = winHeight - m[0] - m[2],
        i = 0,
        root;

    var tree = d3.layout.tree().size([h, w]);

    var diagonal = d3.svg.diagonal().projection(function (d) {
        return [d.y, d.x];
    });

    var vis = d3.select("#body").append("svg:svg").attr("width", w + m[1] + m[3]).attr("height", h + m[0] + m[2]).append("svg:g").attr("transform", "translate(" + m[3] + "," + m[0] + ")");

    vis.append("text").attr("opacity", 1).attr("y", 246).attr("dy", "1.71em").style("font-size", "34px").style("text-anchor", "end").attr("id", "result").text("");

    d3.select("#testbutton").on("click", function (e) {
        evaluateStatement();
    });

    d3.select("#statement").on("keyup", function () {
        if (d3.event.keyCode == 13) {
            d3.select("#testbutton").on("click")();
        }
    });

    var parseTree;

    function evaluateStatement() {
        var statement = d3.select("#statement").node().value;
        parseTree = evaluator.parse(statement);
        displayJSON(parseTree);
    };

    function displayJSON(json) {
        root = json;
        root.x0 = h / 2;
        root.y0 = 0;
        //d3.select("#statement").val( root.title );
        d3.select("#statement").property("value", root.expressionString);

        d3.select("#result").text(root.value);

        function toggleAll(d, delay) {

            if (!delay) delay = 1;

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
        if (d == undefined) return;
        //boolean
        if (d.value === true || d.value === false) {
            if (d.children) {
                // hide the children by moving them into _children
                d._children = d.children;
                d.children = null;
            } else {
                // bring back the hidden children
                d.children = d._children;
                d._children = null;
            }

            if (!d.children && !d._children) // it's a leaf
                {
                    // toggle true/false
                    if (d.value === true || d.value === false) {
                        d.value = !d.value;
                        //var myInt = parseInt( d.name );
                        //conditionTruthValues[ myInt ] = d.value;
                        var myVar = d.name;
                        evaluator.state[myVar] = d.value;
                        updateWithoutDeleting(root);
                    }
                }
        } else // you clicked something that isn't in a boolean flow
            {
                if (showOverlay) {
                    var attributeText = d.attributes ? JSON.stringify(d.attributes) : "None";
                    if (!d.children && !d._children) // it's a leaf
                        {
                            //showValueOverlay( d.value );

                            showValueOverlay("Attributes: " + attributeText + "</br>Content: " + d.value);
                        } else //oops, we wanted to collapse this thing
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

    function showValueOverlay(val) {
        $('#valueModalText').html(val);
        $('#valueModal').modal('show');
    }

    function updateWithoutDeleting() {
        parseTree = evaluator.evaluateParseTree();
        updateObjectAndItsChildren(parseTree, root);

        d3.select("#result").text(root.value);
    }

    function updateObjectAndItsChildren(newObjectTemp, rootTemp) {

        rootTemp.value = newObjectTemp.value;
        if (!newObjectTemp.children) return;
        for (var i = 0; i < newObjectTemp.children.length; i++) {
            if (rootTemp.children) {
                updateObjectAndItsChildren(newObjectTemp.children[i], rootTemp.children[i]);
            } else {
                if (rootTemp._children) {
                    updateObjectAndItsChildren(newObjectTemp.children[i], rootTemp._children[i]);
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
        widthInPixels = parseInt(widthInPixels);
        var widthPerNode = widthInPixels / nodes.length;
        nodes.forEach(function (d) {
            d.y = d.depth * widthPerNode;
        });

        d3.select("#result").transition().duration(duration).attr("x", nodes[nodes.length - 1].y - 40).attr("y", function (d) {
            return nodes[nodes.length - 1].x - 48;
        });

        // Update the nodes…
        var node = vis.selectAll("g.node").data(nodes, function (d) {
            return d.id || (d.id = ++i);
        });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("svg:g").attr("class", "node").attr("transform", function (d) {
            return "translate(" + source.y0 + "," + source.x0 + ")";
        }).on("click", function (d) {
            toggle(d, true);update(d);
        });

        nodeEnter.append("svg:circle").attr("r", 1e-6).style("stroke", function (d) {
            return d.value ? "green" : "red";
        }).style("fill", function (d) {
            return d._children ? "grey" : "#fff";
        });

        nodeEnter.append("svg:text").attr("x", function (d) {
            return d.children || d._children ? -1 : 17;
        }).attr("y", function (d) {
            return d.children || d._children ? 18 : -1;
        }).attr("dy", ".35em").attr("text-anchor", function (d) {
            return d.children || d._children ? "middle" : "left";
        })
        //      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
        .text(function (d) {
            return d.name;
        }).style("fill-opacity", 1e-6);

        // Transition nodes to their new position.
        var nodeUpdate = node.transition().duration(duration).style("stroke", function (d) {
            return d.value ? "green" : "red";
        }).attr("transform", function (d) {
            return "translate(" + d.y + "," + d.x + ")";
        });

        nodeUpdate.select("circle").attr("r", 8.5).style("stroke", function (d) {
            return d.value ? "green" : "red";
        }).style("fill", function (d) {
            return d._children ? "lightsteelblue" : "#fff";
        });

        nodeUpdate.select("text").style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition().duration(duration).attr("transform", function (d) {
            return "translate(" + source.y + "," + source.x + ")";
        }).remove();

        nodeExit.select("circle").attr("r", 1e-6);

        nodeExit.select("text").style("fill-opacity", 1e-6);

        // Update the links…
        var link = vis.selectAll("path.link").data(tree.links(nodes), function (d) {
            return d.target.id;
        });

        // Enter any new links at the parent's previous position.
        link.enter().insert("svg:path", "g").attr("class", "link").attr("d", function (d) {
            var o = { x: source.x0, y: source.y0 };
            return diagonal({ source: o, target: o });
        }).transition().duration(duration).attr("d", diagonal);

        // Transition links to their new position.
        link.transition().duration(duration).attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition().duration(duration).attr("d", function (d) {
            var o = { x: source.x, y: source.y };
            return diagonal({ source: o, target: o });
        }).remove();

        // Stash the old positions for transition.
        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    changeMode("boolean");
    evaluateStatement();
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //import Token from './token';
//import Symbol from './token';


var _lexer = __webpack_require__(2);

var _lexer2 = _interopRequireDefault(_lexer);

var _parser = __webpack_require__(3);

var _parser2 = _interopRequireDefault(_parser);

var _numericvisitor = __webpack_require__(9);

var _numericvisitor2 = _interopRequireDefault(_numericvisitor);

var _mathjsonvisitor = __webpack_require__(14);

var _mathjsonvisitor2 = _interopRequireDefault(_mathjsonvisitor);

var _tokenfactory = __webpack_require__(1);

var _tokenfactory2 = _interopRequireDefault(_tokenfactory);

var _nonterminalfactory = __webpack_require__(0);

var _nonterminalfactory2 = _interopRequireDefault(_nonterminalfactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mathius = function () {
  function Mathius(tokenDefinitions, grammarObject) {
    _classCallCheck(this, Mathius);

    // we set the state so that the parser knows the data type of each of these variables
    // (in this case, boolean)
    // and later so that the visitor can evaluate each node to determine if it is true or false.
    this.state = { "a": false, "b": true, "c": false, "d": true, "e": false, "f": true, "g": false, "h": true, "i": false };

    this.visitor = new _mathjsonvisitor2.default(this.state);
    // lay the groundwork for lexical analysis
    this.lexer = new _lexer2.default(tokenDefinitions);
    this.parser = new _parser2.default(grammarObject);
    this.parser.setState(this.state);
  }

  _createClass(Mathius, [{
    key: 'parse',
    value: function parse(sentenceToParse) {
      try {
        var sentenceOfTokens = this.lexer.tokenize(sentenceToParse);
        this.parseTree = this.parser.parse(sentenceOfTokens);
        return this.evaluateParseTree();
      } catch (e) {
        console.error("ERROR PARSING OR EVALUATING:" + e);
      }
    }
  }, {
    key: 'evaluateParseTree',
    value: function evaluateParseTree() {
      var result = this.parseTree[0].visit(this.visitor);
      return result;
    }
  }]);

  return Mathius;
}();

exports.default = Mathius;

window.Mathius = Mathius;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BooleanJSONVisitor = function () {
  function BooleanJSONVisitor(state) {
    _classCallCheck(this, BooleanJSONVisitor);

    this.state = state;
  }

  _createClass(BooleanJSONVisitor, [{
    key: "setState",
    value: function setState(newstate) {
      this.state = newstate;
    }
  }, {
    key: "execute",
    value: function execute(thingToEvaluate) {
      var ob = {};
      ob.name = thingToEvaluate.type;
      ob.value = thingToEvaluate.value = this.getBoolean(thingToEvaluate);
      var symbolsMatched = thingToEvaluate.seriesOfSymbolsIAbsorbedAndReplaced;

      switch (thingToEvaluate.type) {
        case "TOKEN":
          return { name: thingToEvaluate.stringIActuallyMatched, value: this.getBoolean(thingToEvaluate), condition: "Condition Text Goes Here" };
        case "BOOLEAN":

          ob.children = [];
          if (symbolsMatched.length == 3) // there's a binary operator
            {

              // either a binary operator or "(" + boolean + ")"
              if (symbolsMatched[0].type == "(" && symbolsMatched[2].type == ")") {
                // we'll pass it through transparently
                // in other words, allow our middle child to represent us completely
                // since the user isn't interested in seeing each "(" represented with its own node onscreen
                return this.execute(symbolsMatched[1]);
              } else {
                ob.name = this.getNameForOperator(symbolsMatched[1].type);
                ob.children.push(this.execute(symbolsMatched[0]));
                ob.children.push(this.execute(symbolsMatched[2]));
              }
            } else if (symbolsMatched.length == 2) // there's a unary operator
            {
              // the only unary operator
              ob.name = this.getNameForOperator(symbolsMatched[0].type);
              ob.children.push(this.execute(symbolsMatched[1]));
            } else {
            return this.execute(symbolsMatched[0]);
          }

          break;

        case "IDENT":
          // basically a passthrough. Assume our first child is a real operator, and return *its* json.
          ob.name = thingToEvaluate._stringIMatched;
      }
      return ob;
    }
  }, {
    key: "getBoolean",
    value: function getBoolean(nonterminalOrToken) {

      if (nonterminalOrToken.constructor.name == "Nonterminal") {
        var symbolsMatched = nonterminalOrToken.seriesOfSymbolsIAbsorbedAndReplaced;
        var value = "FOO"; // declare this and, hey, initialize it with something we'll notice if there's an error.
        if (symbolsMatched.length == 1) // we're a nonterminal that absorbed one other thing
          {
            value = this.getBoolean(symbolsMatched[0]);
            return value;
          } else if (symbolsMatched.length == 3) // we're a boolean comprising an operator and two operands
          {
            if (symbolsMatched[1].type == "|") {
              return this.getBoolean(symbolsMatched[0]) || this.getBoolean(symbolsMatched[2]);
            } else if (symbolsMatched[1].type == "&") {
              return this.getBoolean(symbolsMatched[0]) && this.getBoolean(symbolsMatched[2]);
            } else if (symbolsMatched[0].type == "(" && symbolsMatched[2].type == ")") {
              return this.getBoolean(symbolsMatched[1]);
            } else {
              throw new Error("DON'T KNOW WHAT THE OPERATOR OF THIS 3-ELEMENT SYMBOLSMATCHED IS:" + JSON.stringify(symbolsMatched));
            }
          } else if (symbolsMatched.length == 2) // we're a boolean with one operator -- probably a not
          {
            if (symbolsMatched[0].type == "!") {
              return !this.getBoolean(symbolsMatched[1]);
            } else {
              throw new Error("DON'T KNOW WHAT THE OPERATOR OF THIS 2-ELEMENT SYMBOLSMATCHED IS:" + JSON.stringify(symbolsMatched));
            }
          }

        throw new Error("UNKNOWN LENGTH OF SYMBOLSMATCHED:" + JSON.stringify(symbolsMatched));
      } else // it's a token
        {
          if (nonterminalOrToken.type.toUpperCase().indexOf("TRUE") > -1) {
            return true;
          }
          if (nonterminalOrToken.type.toUpperCase().indexOf("FALSE") > -1) {
            return false;
          }
          if (nonterminalOrToken.type.toUpperCase().indexOf("IDENT") > -1) {
            return this.state[nonterminalOrToken._stringIMatched];
          }

          throw new Error("nonterminalOrToken.type is " + nonterminalOrToken.type);
          return null;
        }
    }
  }, {
    key: "getNameForOperator",
    value: function getNameForOperator(operatorSymbol) {
      if (operatorSymbol == "|") return "OR";
      if (operatorSymbol == "&") return "AND";
      if (operatorSymbol == "^") return "XOR";
      if (operatorSymbol == "!") return "NOT";
    }
  }]);

  return BooleanJSONVisitor;
}();

module.exports = BooleanJSONVisitor;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _evaluationvisitor = __webpack_require__(8);

var _evaluationvisitor2 = _interopRequireDefault(_evaluationvisitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BooleanVisitor = function () {
  function BooleanVisitor(state) {
    _classCallCheck(this, BooleanVisitor);

    this.state = state;
  }

  _createClass(BooleanVisitor, [{
    key: "setState",
    value: function setState(newstate) {
      this.state = newstate;
    }
  }, {
    key: "execute",
    value: function execute(nonterminalOrToken) {
      if (nonterminalOrToken.constructor.name == "Nonterminal") {
        var symbolsMatched = nonterminalOrToken.seriesOfSymbolsIAbsorbedAndReplaced;
        var value = "FOO"; // declare this and, hey, initialize it with something we'll notice if there's an error.
        if (symbolsMatched.length == 1) // we're a nonterminal that absorbed one other thing
          {
            value = symbolsMatched[0].visit(this);
            return value;
          } else if (symbolsMatched.length == 3) // we're a boolean comprising an operator and two operands
          {
            if (symbolsMatched[1].type == "|") {
              return symbolsMatched[0].visit(this) || symbolsMatched[2].visit(this);
            } else if (symbolsMatched[1].type == "&") {
              return symbolsMatched[0].visit(this) && symbolsMatched[2].visit(this);
            } else if (symbolsMatched[0].type == "(" && symbolsMatched[2].type == ")") {
              return symbolsMatched[1].visit(this);
            } else {
              throw new Error("DON'T KNOW WHAT THE OPERATOR OF THIS 3-ELEMENT SYMBOLSMATCHED IS:" + JSON.stringify(symbolsMatched));
            }
          } else if (symbolsMatched.length == 2) // we're a boolean with one operator -- probably a not
          {
            if (symbolsMatched[0].type == "!") {
              return !symbolsMatched[1].visit(this);
            } else {
              throw new Error("DON'T KNOW WHAT THE OPERATOR OF THIS 2-ELEMENT SYMBOLSMATCHED IS:" + JSON.stringify(symbolsMatched));
            }
          }

        throw new Error("UNKNOWN LENGTH OF SYMBOLSMATCHED:" + JSON.stringify(symbolsMatched));
      } else // it's a token
        {
          if (nonterminalOrToken.type.toUpperCase().indexOf("TRUE") > -1) {
            return true;
          }
          if (nonterminalOrToken.type.toUpperCase().indexOf("FALSE") > -1) {
            return false;
          }
          if (nonterminalOrToken.type.toUpperCase().indexOf("IDENT") > -1) {
            return this.state[nonterminalOrToken._stringIMatched];
          }

          throw new Error("nonterminalOrToken.type is " + nonterminalOrToken.type);
          return null;
        }
    }
  }]);

  return BooleanVisitor;
}();

module.exports = BooleanVisitor;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MathJSONVisitor = function () {
  function MathJSONVisitor(state) {
    _classCallCheck(this, MathJSONVisitor);

    this.state = state;
  }

  _createClass(MathJSONVisitor, [{
    key: "setState",
    value: function setState(newstate) {
      this.state = newstate;
    }
  }, {
    key: "execute",
    value: function execute(thingToEvaluate) {
      var ob = {};
      ob.name = thingToEvaluate.type;
      ob.value = thingToEvaluate.value = this.getValue(thingToEvaluate);

      var symbolsMatched = thingToEvaluate.seriesOfSymbolsIAbsorbedAndReplaced;

      switch (thingToEvaluate.type) {
        case "NUM_LIT":
          return { name: this.getValue(thingToEvaluate), value: this.getValue(thingToEvaluate), condition: "Condition Text Goes Here" };
        case "NUMERIC":

          ob.children = [];
          if (symbolsMatched.length == 3) // there's a binary operator
            {

              // either a binary operator or "(" + boolean + ")"
              if (symbolsMatched[0].type == "(" && symbolsMatched[2].type == ")") {
                // we'll pass it through transparently
                // in other words, allow our middle child to represent us completely
                // since the user isn't interested in seeing each "(" represented with its own node onscreen
                return this.execute(symbolsMatched[1]);
              } else {
                ob.name = symbolsMatched[1].type;
                ob.children.push(this.execute(symbolsMatched[0]));
                ob.children.push(this.execute(symbolsMatched[2]));
              }
            } else if (symbolsMatched.length == 2) // there's a unary operator
            {
              // the only unary operator
              ob.name = symbolsMatched[0].type;
              ob.children.push(this.execute(symbolsMatched[1]));
            } else {
            return this.execute(symbolsMatched[0]);
          }

          break;

        case "IDENT":
          // basically a passthrough. Assume our first child is a real operator, and return *its* json.
          ob.name = thingToEvaluate._stringIMatched;
      }
      return ob;
    }
  }, {
    key: "getValue",
    value: function getValue(nonterminalOrToken) {
      if (nonterminalOrToken.constructor.name == "Nonterminal") {
        var symbolsMatched = nonterminalOrToken.seriesOfSymbolsIAbsorbedAndReplaced;
        var value = "FOO"; // declare this and, hey, initialize it with something we'll notice if there's an error.
        if (symbolsMatched.length == 1) // we're a nonterminal that absorbed one other thing
          {
            value = this.getValue(symbolsMatched[0]);
            return value;
          } else if (symbolsMatched.length == 3) // we're a boolean comprising an operator and two operands
          {
            // or maybe we're just a numeric wrapped in parens!

            if (symbolsMatched[0].type == "(" && symbolsMatched[2].type == ")") {
              return this.getValue(symbolsMatched[1]);
            }

            if (symbolsMatched[1].type == "+") {
              return this.getValue(symbolsMatched[0]) + this.getValue(symbolsMatched[2]);
            } else if (symbolsMatched[1].type == "-") {
              return this.getValue(symbolsMatched[0]) - this.getValue(symbolsMatched[2]);
            } else if (symbolsMatched[1].type == "*") {
              return this.getValue(symbolsMatched[0]) * this.getValue(symbolsMatched[2]);
            } else if (symbolsMatched[1].type == "/") {
              return this.getValue(symbolsMatched[0]) / this.getValue(symbolsMatched[2]);
            } else if (symbolsMatched[1].type == "^") {
              return Math.pow(this.getValue(symbolsMatched[0]), this.getValue(symbolsMatched[2]));
            } else {
              throw new Error("WE HAVE 3 SYMBOLS BUT I DON'T KNOW WHAT THIS IS:" + JSON.stringify(symbolsMatched));
            }
          } else if (symbolsMatched.length == 2) // we're a boolean with one operator
          {
            if (symbolsMatched[0].type == "+") {
              return this.getValue(symbolsMatched[1]);
            }
            if (symbolsMatched[0].type == "-") {
              return -1 * this.getValue(symbolsMatched[1]);
            } else {
              throw new Error("IN NUMERICVISITOR, DON'T KNOW WHAT THE OPERATOR OF THIS 2-ELEMENT SYMBOLSMATCHED IS:" + JSON.stringify(symbolsMatched));
            }
          }

        throw new Error("UNKNOWN LENGTH OF SYMBOLSMATCHED:" + JSON.stringify(symbolsMatched));
      } else // it's a token
        {
          if (nonterminalOrToken.type.toUpperCase().indexOf("NUM_LIT") > -1) {
            return parseInt(nonterminalOrToken._stringIMatched);
          }
          throw new Error("nonterminalOrToken.type is " + nonterminalOrToken.type);
          return null;
        }
    }
  }, {
    key: "getNameForOperator",
    value: function getNameForOperator(operatorSymbol) {
      if (operatorSymbol == "|") return "OR";
      if (operatorSymbol == "&") return "AND";
      if (operatorSymbol == "^") return "XOR";
      if (operatorSymbol == "!") return "NOT";
    }
  }]);

  return MathJSONVisitor;
}();

module.exports = MathJSONVisitor;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _token = __webpack_require__(7);

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var XMLJSONVisitor = function () {
  function XMLJSONVisitor(state) {
    _classCallCheck(this, XMLJSONVisitor);

    this.state = state;
  }

  _createClass(XMLJSONVisitor, [{
    key: "setState",
    value: function setState(newstate) {
      this.state = newstate;
    }
  }, {
    key: "execute",
    value: function execute(thingToEvaluate) {
      var ob = {};
      ob.name = thingToEvaluate.type;
      ob.value = this.getValue(thingToEvaluate);
      var symbolsMatched = thingToEvaluate.symbolsMatched;

      switch (thingToEvaluate.type) {

        case "TOKEN":
          return { name: thingToEvaluate.stringIActuallyMatched, value: this.getValue(thingToEvaluate), condition: "Condition Text Goes Here" };
        case "XMLNODE":

          ob.children = [];
          // opentag is first item, and that gives us our name
          ob.name = this.getValue(symbolsMatched[0]);
          var optionalAttributes = this.getAttributes(symbolsMatched[0]);

          if (optionalAttributes) {
            ob.attributes = optionalAttributes;
          }

          symbolsMatched = this.consolidateChildrenThatAreTokens(symbolsMatched);

          for (var i = 1; i < symbolsMatched.length - 1; i++) // -1, because the last match will be a closetag, which is irrelevant
          {
            ob.children.push(this.execute(symbolsMatched[i]));
          }

          break;

        case "IDENT":
          // basically a passthrough. Assume our first child is a real operator, and return *its* json.
          ob.name = thingToEvaluate._stringIMatched;
      }
      return ob;
    }

    // good for the wildcard globbing we do inside open and close tags

  }, {
    key: "consolidateChildrenThatAreTokens",
    value: function consolidateChildrenThatAreTokens(arrayOfSymbolsThatMightBeTokens) {
      var symbolChildrenOnly = [];
      var runningStringOfTokenText = "";
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = arrayOfSymbolsThatMightBeTokens[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var symbol = _step.value;

          if (symbol.constructor.name != "Token") {
            if (runningStringOfTokenText.length > 0) // we've been building up a text string!
              {
                var _tokenConsolidatingStrings = this.makeTokenWrappingString(runningStringOfTokenText);
                symbolChildrenOnly.push(_tokenConsolidatingStrings);
                runningStringOfTokenText = "";
                symbolChildrenOnly.push(symbol);
              } else {
              symbolChildrenOnly.push(symbol);
            }
          } else // it's a token!
            {

              runningStringOfTokenText += symbol._stringIMatched;
            }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (runningStringOfTokenText.length > 0) {
        var tokenConsolidatingStrings = this.makeTokenWrappingString(runningStringOfTokenText);
        symbolChildrenOnly.push(tokenConsolidatingStrings);
      }

      return symbolChildrenOnly;
    }
  }, {
    key: "makeTokenWrappingString",
    value: function makeTokenWrappingString(stringToWrap) {
      var newSymbol = new _token2.default(/.+/, "TEXTNODE", stringToWrap.length, stringToWrap);
      return newSymbol;
    }

    // sent either an opentag or an opentagstart

  }, {
    key: "getAttributes",
    value: function getAttributes(childOfXMLNode) {

      if (childOfXMLNode.type == "OPENTAGSTART") {
        // could be nested
        // or could just be <, IDENT, IDENT, =, ', WILDCARD, '
        var atts = {};
        if (childOfXMLNode.symbolsMatched[0].constructor.name == "Token") // could only be "<"
          {
            var name = this.getValue(childOfXMLNode.symbolsMatched[2]);
            var val = this.getValue(childOfXMLNode.symbolsMatched[5]);
            atts[name] = val;
            return atts;
          } else if (childOfXMLNode.symbolsMatched[0].type == "OPENTAGSTART") {
          atts = this.getAttributes(childOfXMLNode.symbolsMatched[0]);
          var _name = this.getValue(childOfXMLNode.symbolsMatched[1]);
          var _val = this.getValue(childOfXMLNode.symbolsMatched[4]);
          atts[_name] = _val;
          return atts;
        }
      } else if (childOfXMLNode.symbolsMatched[0].type == "OPENTAGSTART") {
        var returnAtts = this.getAttributes(childOfXMLNode.symbolsMatched[0]);
        return returnAtts;
      }
      return null;
    }
  }, {
    key: "getValue",
    value: function getValue(nonterminalOrToken) {

      if (nonterminalOrToken.constructor.name == "Nonterminal") {
        var symbolsMatched = nonterminalOrToken.symbolsMatched;

        var value = "FOO"; // declare this and, hey, initialize it with something we'll notice if there's an error.

        if (nonterminalOrToken.type == "XMLNODE") {
          // our first child will be our opentag, which is where our name comes from.
          var _returnVal = this.getValue(symbolsMatched[0]);
          return _returnVal;
        }

        if (nonterminalOrToken.type == "OPENTAG" || nonterminalOrToken.type == "OPENTAGSTART") {
          var returnVal;
          // symbolsMatched[1] will either be an IDENT or an OPENTAGSTART (the wrapper for attribute definitions)
          if (symbolsMatched[0].type == "OPENTAGSTART") {
            returnVal = this.getValue(symbolsMatched[0]);
            return returnVal;
          }
          returnVal = this.getValue(symbolsMatched[1]);
          return returnVal;
        }

        if (nonterminalOrToken.type == "CLOSETAG") {
          return this.getValue(symbolsMatched[2]); // after < and /
        }

        if (nonterminalOrToken.type == "COMMENT") {
          console.error("COMMENT is " + nonterminalOrToken.toString());
          var commentstring = "";
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = nonterminalOrToken.symbolsMatched[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var kid = _step2.value;

              if (kid.type == "OPENCOMMENT" || kid.type == "CLOSECOMMENT") continue;
              commentstring += this.getValue(kid);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          return commentstring;
        }

        throw new Error("XMLJSONVISITOR UNKNOWN LENGTH OF SYMBOLSMATCHED for " + nonterminalOrToken.type + ":" + JSON.stringify(symbolsMatched));
      } else // it's a token
        {
          if (nonterminalOrToken.type.toUpperCase().indexOf("TRUE") > -1) {
            return true;
          }
          if (nonterminalOrToken.type.toUpperCase().indexOf("TEXTNODE") > -1) {
            return nonterminalOrToken._stringIMatched;
          }
          if (nonterminalOrToken.type.toUpperCase().indexOf("IDENT") > -1) {
            return nonterminalOrToken._stringIMatched;
          }
          return nonterminalOrToken._stringIMatched;
          //        throw new Error("nonterminalOrToken.type is " + nonterminalOrToken.type );
          //        return null;
        }
    }
  }]);

  return XMLJSONVisitor;
}();

module.exports = XMLJSONVisitor;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var XMLParseTimeVisitor = function () {
  function XMLParseTimeVisitor(state) {
    _classCallCheck(this, XMLParseTimeVisitor);

    this.state = state;
  }

  _createClass(XMLParseTimeVisitor, [{
    key: "setState",
    value: function setState(newstate) {
      this.state = newstate;
    }
  }, {
    key: "execute",
    value: function execute(nonterm) {

      if (nonterm.type == "XMLNODE") {
        return this.verifyOpeningAndCloseTagsMatch(nonterm) && this.verifyTagContentIsLegal(nonterm);
      } else if (nonterm.type == "OPENTAG") {
        return this.verifyAttributeContentIsLegal(nonterm);
      } else return true;
    }
  }, {
    key: "verifyOpeningAndCloseTagsMatch",
    value: function verifyOpeningAndCloseTagsMatch(thingToEvaluate) {

      var openTagName = this.getTagName(thingToEvaluate.symbolsMatched[0]);
      var closeTagName = void 0;
      if (thingToEvaluate.symbolsMatched.length == 2) {
        closeTagName = this.getTagName(thingToEvaluate.symbolsMatched[1]);
      } else if (thingToEvaluate.symbolsMatched.length > 2) {
        closeTagName = this.getTagName(thingToEvaluate.symbolsMatched[thingToEvaluate.symbolsMatched.length - 1]);
      }

      return openTagName == closeTagName;
    }
  }, {
    key: "verifyAttributeContentIsLegal",
    value: function verifyAttributeContentIsLegal(nonterm) {
      // remember that OPENTAG can contain optional OPENTAGSTART nodes
      // each of which can enclose other OPENTAGSTART nodes in perpetuity
      return true;
    }
  }, {
    key: "verifyTagContentIsLegal",
    value: function verifyTagContentIsLegal(thingToEvaluate) {
      return true;
    }
  }, {
    key: "getTagName",
    value: function getTagName(thingToEvaluate) {

      while (thingToEvaluate.type != "IDENT") {

        if (thingToEvaluate.type == "OPENTAG") {
          if (thingToEvaluate.symbolsMatched) {
            if (thingToEvaluate.symbolsMatched[0].type == "<") {

              return thingToEvaluate.symbolsMatched[1]._stringIMatched;
            }
          }
        } else if (thingToEvaluate.type == "CLOSETAG") {

          if (thingToEvaluate.symbolsMatched) {
            if (thingToEvaluate.symbolsMatched[0].type == "<") {
              // element [1] will be "/" so we'll skip to [2]

              return thingToEvaluate.symbolsMatched[2]._stringIMatched;
            }
          }
        } else if (thingToEvaluate.type == "OPENTAGSTART") {

          if (thingToEvaluate.symbolsMatched) {
            if (thingToEvaluate.symbolsMatched[0].type == "<") {
              return thingToEvaluate.symbolsMatched[1]._stringIMatched;
            }
          }
        }
        thingToEvaluate = thingToEvaluate.symbolsMatched[0];
      }
      return thingToEvaluate._stringIMatched;
    }
  }]);

  return XMLParseTimeVisitor;
}();

module.exports = XMLParseTimeVisitor;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //import Token from './token';
//import Symbol from './token';


var _lexer = __webpack_require__(2);

var _lexer2 = _interopRequireDefault(_lexer);

var _parser = __webpack_require__(3);

var _parser2 = _interopRequireDefault(_parser);

var _xmlparsetimevisitor = __webpack_require__(16);

var _xmlparsetimevisitor2 = _interopRequireDefault(_xmlparsetimevisitor);

var _xmljsonvisitor = __webpack_require__(15);

var _xmljsonvisitor2 = _interopRequireDefault(_xmljsonvisitor);

var _tokenfactory = __webpack_require__(1);

var _tokenfactory2 = _interopRequireDefault(_tokenfactory);

var _nonterminalfactory = __webpack_require__(0);

var _nonterminalfactory2 = _interopRequireDefault(_nonterminalfactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var XMLius = function () {
  function XMLius(tokenDefinitions, grammarObject) {
    _classCallCheck(this, XMLius);

    // we set the state so that the parser knows the data type of each of these variables
    // (in this case, boolean)
    // and later so that the visitor can evaluate each node to determine if it is true or false.
    this.state = { "a": false, "b": true, "c": false, "d": true, "e": false, "f": true, "g": false, "h": true, "i": false };

    this.xmlParseTimeVisitor = new _xmlparsetimevisitor2.default();

    this.visitor = new _xmljsonvisitor2.default(this.state);
    // lay the groundwork for lexical analysis
    this.lexer = new _lexer2.default(tokenDefinitions);
    this.parser = new _parser2.default(grammarObject);
    this.parser.setState(this.state);
  }

  _createClass(XMLius, [{
    key: 'parse',
    value: function parse(sentenceToParse) {
      try {
        var sentenceOfTokens = this.lexer.tokenize(sentenceToParse);
        this.parseTree = this.parser.parse(sentenceOfTokens, this.xmlParseTimeVisitor);
        return this.evaluateParseTree();
      } catch (e) {
        console.error("ERROR PARSING OR EVALUATING:" + e);
      }
    }
  }, {
    key: 'evaluateParseTree',
    value: function evaluateParseTree() {
      var result = this.parseTree[0].visit(this.visitor);
      return result;
    }
  }]);

  return XMLius;
}();

exports.default = XMLius;


window.XMLius = XMLius;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5);
module.exports = __webpack_require__(10);


/***/ })
/******/ ]);
//# sourceMappingURL=boolius.bundle.js.map