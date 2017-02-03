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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Boolius = undefined;
	
	var _token = __webpack_require__(1);
	
	var _token2 = _interopRequireDefault(_token);
	
	var _tokenfactory = __webpack_require__(3);
	
	var _tokenfactory2 = _interopRequireDefault(_tokenfactory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Boolius = exports.Boolius = function Boolius() {
	  _classCallCheck(this, Boolius);
	
	  var sym = new _token2.default();
	  var tokenFactory = new _tokenfactory2.default();
	  var tokens = tokenFactory.getTokens();
	  console.log("tokens are " + tokens);
	};
	
	var foo = new Boolius();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _symbol = __webpack_require__(2);
	
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

/***/ },
/* 2 */
/***/ function(module, exports) {

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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _token = __webpack_require__(1);
	
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

/***/ }
/******/ ]);
//# sourceMappingURL=boolius.bundle.js.map