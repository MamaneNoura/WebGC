/**
*@module lib/utils 
*@const gossipUtil
*@description This object contains a set of functions that are used by the different
*implementations of the gossip protocols.
*@author Raziel Carvajal Gomez <raziel.carvajal-gomez@inria.fr>*/
(function(exports){
  /**
  *@class GossipUtil
  *@description This class implements miscelaneous functions needed by a gossip-based
  *algorithm
  *@param {Object} opts - options of the logger */
  function GossipUtil(log){
    this.log = log;
  }
  /**
  *@method newItem
  *@description Returns an object its age (timestamp) and its data.
  *@param {Integer} age - timestamp or age of the item
  *@param {Object} data - data of the item
  *@return {Object}*/
  GossipUtil.prototype.newItem = function(age, data){
    return { age: age, data: data };
  };
  /**
  *@method getRandomSubDict
  *@description Get a random set of n items from one object
  *@param {Integer} n - size of the new object
  *@param {Object} src - original object
  *@returns {Object}*/
  GossipUtil.prototype.getRandomSubDict = function(n, src){
    if( n <= 0 || Object.keys(src).length === 0 )
      return {};
    if( n >= Object.keys(src).length )
      return src;
    else {
      var keys = Object.keys(src);
      var tmpDict = {}, result = {}, key, tmpAr, i;
      for(i = 0; i < keys.length; i++)
        tmpDict[ keys[i] ] = 1;
      i = 0;
      do{
        tmpAr = Object.keys(tmpDict);
        key = tmpAr[ Math.floor(Math.random() * tmpAr.length) ];
        result[key] = src[key];
        delete tmpDict[key];
        i += 1;
      }while( i != n );
      return result;
    }
  };
  /**
  *@method getOldestKey
  *@description Get the key of the element with the oldes age in dictio
  *@param {Object} dictio - object
  *@returns {String} key of the item with the oldest age in dictio*/
  GossipUtil.prototype.getOldestKey = function(dictio){
    var keys = Object.keys(dictio);
    if( keys.length === 0 ){
      this.log.error('Empty dictionary');
      return null;
    }
    var max = dictio[ keys[0] ].age;
    var maxIndx = keys[0];
    var i = 1;
    while( i < keys.length ){
      if( dictio[ keys[i] ].age > max ){
        max = dictio[ keys[i] ].age;
        maxIndx = keys[i];
      }
      i += 1;
    }
    return maxIndx;
  };
  /**
  *@method getRandomKey
  *@description Get a random key of the object dict
  *@param {Object} dict - source object
  *@returns {String} key - random key of the obj */
  GossipUtil.prototype.getRandomKey = function(dict){
    var keys = Object.keys(dict), key;
    if( keys.length === 0 ){
      this.log.error('No way to return a key from an empty dictionary');
    }else{
      var rNum = keys.length === 1 ? 0 : Math.floor(Math.random() * keys.length);
      key = keys[rNum];
    }
    return key;
  };
  /**
  *@method removeRandomly
  *@description Remov n elements of the object dic
  *@param {Integer} n - elements to remove
  *@param {Object} dic - source object  */
  GossipUtil.prototype.removeRandomly = function(n, dic){
    if( n === 0 )
      return;
    else{
      var tmpDic = {}, tmpAr, key;
      for( key in dic )
        tmpDic[key] = 1;
      for( var i = 0; i < n; i += 1 ){
        tmpAr = Object.keys(tmpDic);
        key = tmpAr[ Math.floor(Math.random() * tmpAr.length) ];
        delete tmpDic[key]; delete dic[key];
      }
    }
  };
  /**
  *@method mergeViews
  *@description Merge two objects, the result object doesn't contain repetitions
  *@param {Object} v1 - first object to merge
  *@param {Object} v2 - second object to merge
  *@returns {Object} the merge of v1 and v2*/
  GossipUtil.prototype.mergeViews = function(v1, v2){
    var keysV1 = Object.keys(v1);
    var keysV2 = Object.keys(v2);
    var i, result = {};
    for(i = 0; i < keysV1.length; i++){
      if(keysV1[i] in keysV2 && (v2[ keysV1[i] ]).age < (v1[ keysV1[i] ]).age){
        result[ keysV1[i] ] = v2[ keysV1[i] ];
        delete v2[ keysV1[i] ];
      }else{
        result[ keysV1[i] ] = v1[ keysV1[i] ];
      }
    }
    keysV2 = Object.keys(v2);
    for(i = 0; i < keysV2; i++)
      result[ keysV2[i] ] = v2[ keysV2[i] ];
    return result;
  };
  /**
  *@method setData
  *@description If key exists in dic, the value of key is set to d
  *@param {Object} dic - object
  *@param {String} key - reference of the value to update
  *@param {Object} d - new value of key*/
  GossipUtil.prototype.setData = function(dic, key, d){
    if( key in dic )
      dic[key].data = d;
  };
  /**
  *@method extendProperties
  *@description Extends the elements in an object without repetitions. If an item in dst
  *is in src too, the value of that item isn't updated
  *@param {Object} dst - object to extend
  *@param {Object} srs - elements to add in dst*/
  GossipUtil.prototype.extendProperties = function(dst, src){
    var keys = Object.keys(src);
    for( var i = 0; i < keys.length; i++ ){
      if( !dst.hasOwnProperty(keys[i]) )
        dst[ keys[i] ] = src[ keys[i] ];
    }
  };
  
  GossipUtil.prototype.inherits = function(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
  
  exports.GossipUtil = GossipUtil;
  
}) (this);
