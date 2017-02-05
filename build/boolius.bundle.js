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
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _symbol = __webpack_require__(0);

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
    value: function matchYourselfToStartOfThisStringAndAddSelfToArray(arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbolsToMatch) {

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

      arrayOfSymbolsMatchedBeforeMe.push(this.getFrozenClone());
      return [this.length, arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbolsToMatchClone];
    }
  }, {
    key: 'getFrozenClone',
    value: function getFrozenClone() {

      var frozenClone = new Nonterminal(this.seriesOfSymbolsIMustMatch, this.type);

      frozenClone.seriesOfSymbolsIAbsorbedAndReplaced = this.seriesOfSymbolsIAbsorbedAndReplaced;

      return frozenClone;
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nonterminal = __webpack_require__(1);

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
/* 3 */
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
  function TokenFactory() {
    _classCallCheck(this, TokenFactory);

    this.tokens = [];
  }

  _createClass(TokenFactory, [{
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
      //this.makeToken( "[0-9]+", "INT" ); // second arg is how this token will present itself to the parser. Must be one character!
      this.makeToken(/\s+/, "", IGNORE);
      this.makeToken(/&&/, "&");
      this.makeToken(/AND/i, "&");
      this.makeToken(/\|\|/, "|"); // this is the escaped form of ||
      this.makeToken(/XOR/i, "^");
      this.makeToken(/OR/i, "|");
      this.makeToken(/\^/, "^"); // this is the escaped form of ^
      this.makeToken(/\!/, "!"); // this is the escaped form of !
      this.makeToken(/NOT/i, "!");
      this.makeToken(/\(/, "(");
      this.makeToken(/\)/, ")");
      this.makeToken(/\+/, "+");
      this.makeToken(/-/, "-");
      this.makeToken(/\*/, "*");
      this.makeToken(/\//, "/");
      this.makeToken(/(true)(?![a-zA-Z0-9])/i, "TRUE");
      this.makeToken(/(false)(?![a-zA-Z0-9])/i, "FALSE");
      this.makeToken(/[-+]?[0-9]*\.?[0-9]+/, "NUM_LIT"); // second arg is how this token will present itself to the parser. Must be one character!
      this.makeToken(/[a-zA-Z]+/, "IDENT"); // second arg is how this token will present itself to the parser. Must be one character!
      return this.tokens;
    }
  }]);

  return TokenFactory;
}();

exports.default = TokenFactory;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Lexer = function () {
  function Lexer(tokens) {
    _classCallCheck(this, Lexer);

    this.tokens = tokens;
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _symbol = __webpack_require__(0);

var _symbol2 = _interopRequireDefault(_symbol);

var _nonterminal = __webpack_require__(1);

var _nonterminal2 = _interopRequireDefault(_nonterminal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parser = function () {
  function Parser(nonterminals) {
    _classCallCheck(this, Parser);

    this.nonterminals = nonterminals;
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
              var _nonterminal$matchYou = nonterminal.matchYourselfToStartOfThisStringAndAddSelfToArray(arrayOfSymbolsMatchedBeforeMe, sentenceOfSymbols);
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

            // are we done? if so, then don't bother looking at other nonterminals!
            if (sentenceOfSymbols.length <= 1) {
              finished == true;
              break;
            }

            // we need to start from the top of our nonterminals if we made a match!
            // order MATTERS.
            if (madeAMatch) break;
          } // end of cycling through our array of nonterminals
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

        if (sentenceOfSymbols.length <= 1) {
          finished = true;
        }
      } // end of our "while" loop going through sentenceOfSymbols until finished == true

      return sentenceOfSymbols;
    }
  }]);

  return Parser;
}();

exports.default = Parser;

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _symbol = __webpack_require__(0);

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
      return this.type + "(" + this.regexOfThingsIMustMatch.toString() + ")<" + this._stringIMatched + "." + this.startingIndex + ">";
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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //import Token from './token';
//import Symbol from './token';


var _lexer = __webpack_require__(4);

var _lexer2 = _interopRequireDefault(_lexer);

var _parser = __webpack_require__(5);

var _parser2 = _interopRequireDefault(_parser);

var _booleanjsonvisitor = __webpack_require__(6);

var _booleanjsonvisitor2 = _interopRequireDefault(_booleanjsonvisitor);

var _tokenfactory = __webpack_require__(3);

var _tokenfactory2 = _interopRequireDefault(_tokenfactory);

var _nonterminalfactory = __webpack_require__(2);

var _nonterminalfactory2 = _interopRequireDefault(_nonterminalfactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Boolius = function () {
  function Boolius() {
    _classCallCheck(this, Boolius);

    var grammarObject = [[["TRUE"], "BOOLEAN"], [["FALSE"], "BOOLEAN"], [["!", "BOOLEAN"], "BOOLEAN"], [["BOOLEAN", "&", "BOOLEAN"], "BOOLEAN"], [["BOOLEAN", "|", "BOOLEAN"], "BOOLEAN"], [["(", "BOOLEAN", ")"], "BOOLEAN"], [["NUMERIC", "^", "NUMERIC"], "NUMERIC"], [["NUMERIC", "*", "NUMERIC"], "NUMERIC"], [["NUMERIC", "+", "NUMERIC"], "NUMERIC", ["*", "/", "^"]], [["NUMERIC", "-", "NUMERIC"], "NUMERIC", ["*", "/", "^"]], [["NUM_LIT"], "NUMERIC"], [["(", "NUMERIC", ")"], "NUMERIC"]];

    // we set the state so that the parser knows the data type of each of these variables 
    // (in this case, boolean)
    // and later so that the visitor can evaluate each node to determine if it is true or false.
    this.state = { "a": false, "b": true, "c": false, "d": true, "e": false, "f": true, "g": false, "h": true, "i": false };
    this.visitor = new _booleanjsonvisitor2.default(this.state);
    var tokenFactory = new _tokenfactory2.default();
    var tokens = tokenFactory.getTokens();
    var nonterminalFactory = new _nonterminalfactory2.default(grammarObject);
    var nonterminals = nonterminalFactory.getNonterminals();
    this.lexer = new _lexer2.default(tokens);
    this.parser = new _parser2.default(nonterminals);
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

exports.default = Boolius;

window.Boolius = Boolius;

/***/ })
/******/ ]);
//# sourceMappingURL=boolius.bundle.js.map