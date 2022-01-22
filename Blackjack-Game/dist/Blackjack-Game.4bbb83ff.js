// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Focm":[function(require,module,exports) {
var player = {
  name: "Vaibhav Sethia",
  chips: 135
};
var cards = [];
var cardsSum = 0;
var hasBlackJack = false;
var isAlive = false;
var message = "";
var messageEl = document.getElementById("message-el");
var cardsEl = document.getElementById("cards-el");
var sumEl = document.querySelector("#sum-el");
var playerEl = document.getElementById("player-el");
playerEl.textContent = player.name + ": $" + player.chips;

window.getRandomCard = function getRandomCard() {
  var randomNumber = Math.floor(Math.random() * 13 + 1);
  if (randomNumber == 1) return 11;
  if (randomNumber >= 11) return 10;
  return randomNumber;
};

window.startGame = function startGame() {
  isAlive = true;
  var firstCard = getRandomCard();
  var secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  cardsSum = cards[0] + cards[1];
  renderGame();
};

window.renderGame = function renderGame() {
  cardsEl.textContent = "Cards: ";
  var len = cards.length;

  for (var card = 0; card < len; card++) {
    cardsEl.textContent += cards[card] + " ";
  }

  sumEl.textContent = "Sum: " + cardsSum;
  if (cardsSum <= 20) message = "Do you want to draw another card?";else if (cardsSum === 21) {
    message = "Wohoo! You've go Blackjack!";
    hasBlackJack = true;
  } else {
    message = "You're out of the game!";
    isAlive = true;
  }
  messageEl.textContent = message;
};

window.newCard = function newCard() {
  if (!isAlive || hasBlackJack) return;
  var card = getRandomCard();
  cards.push(card);
  cardsSum += card;
  renderGame();
};
},{}]},{},["Focm"], null)
//# sourceMappingURL=Blackjack-Game.4bbb83ff.js.map