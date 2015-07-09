"use strict";

/**
 * TernarySearchTree
 * @constructor
 * @param {object} [options] - options object FUTURE
 * @example
 *  new TernarySearchTree(options);
 *
 */
function TernarySearchTree(options){
  this.root = null;
  this.entries = 0;
  options = options || {};
}

TernarySearchTree.prototype = {
  constructor: TernarySearchTree,

  _createNode: function(c){
    return {
      val: c,
      end: false,
      left: null,
      mid: null,
      right: null,
      data: null
    };
  },

  _insert: function(node, str, data){
    var len = str.length;

    if (len < 1){
      return null;
    }

    var c = str.charAt(0);

    if (!node){
      node = this._createNode(c);
    }

    if (!this.root){
      this.root = node;
    }

    // current character of string is smaller than node's character,
    // insert this string in left subtree of node
    if (c < node.val){
      node.left = this._insert(node.left, str, data);
    }
    else if (c > node.val){
      // current character of string is greater than node's character,
      // insert this string in right subtree of node
      node.right = this._insert(node.right, str, data);
    }
    else {
      //current character of string is same as node's character,
      if (len > 1) {
        node.mid = this._insert(node.mid, str.slice(1), data);
      } else {
        node.end = true;
        node.data = data;
        this.entries += 1;
      }
    }

    return node;
  },

  _search: function(node, str){
    if (!node){
      return null;
    }

    var len = str.length;

    if (len < 1){
      return null;
    }

    var c = str.charAt(0);

    if (c < node.val) {
      return this._search(node.left, str);
    }
    else if (c > node.val) {
      return this._search(node.right, str);
    }
    else {
      if (len > 1){
        return this._search(node.mid, str.slice(1));
      }
    }
    return node;
  },

  _traverse: function(node, cb) {
    if (!node){
      return;
    }
    this._traverse(node.left, cb);
    if (node.end){
      cb(node);
    }
    else {
      this._traverse(node.mid, cb);
    }
    this._traverse(node.right, cb);
  },

  /**
   * Add a string to the tst
   * @param {string} str - string to add
   * @param {*} [data] - arbitrary data to associate with this string
   */
  add: function(str, data){
    this._insert(this.root, str, data);
  },

  /**
   * Remove all strings from the tree
   */
  empty: function(){
    this.root = null;
    this.entries = 0;
  },

  /**
   * Test if the tst contains a string
   * @param {String} - the string to test for
   * @returns {Boolean}
   */
  contains: function(str){
    var ret = this._search(this.root, str);
    if (ret){
      return ret.end;
    }
    return false;
  },

  /**
   * Search the tst for a string and return its node object (if found)
   * @param {String} - the string to search for
   * @returns {Object|null}
   */
  search: function(str){
    return this._search(this.root, str);
  },

  /**
   * Traverse the tst
   * @param {Function} - callback to call with nodes
   */
  traverse: function(cb){
    return this._traverse(this.root, cb);
  },

  /**
   * The number of strings in the tst
   * @returns {Number}
   */
  get length(){
    return this.entries;
  }
};

module.exports = TernarySearchTree;
