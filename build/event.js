(function(e){if("function"==typeof bootstrap)bootstrap("event",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeEvent=e}else"undefined"!=typeof window?window.Event=e():global.Event=e()})(function(){var define,ses,bootstrap,module,exports;
return (function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0](function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){

/**
 * Event
 *
 * A super lightweight
 * event emitter library.
 *
 * @version 0.2.3
 * @author Wilson Page <wilson.page@me.com>
 */

/**
 * Locals
 */

var proto = Event.prototype;

/**
 * Expose `Event`
 */

module.exports = Event;

/**
 * Creates a new event emitter
 * instance, or if passed an
 * object, mixes the event logic
 * into it.
 *
 * @param  {Object} obj
 * @return {Object}
 */
function Event(obj) {
  if (!(this instanceof Event)) return new Event(obj);
  this._cbs = {};
  if (obj) return mixin(obj, proto);
}

/**
 * Registers a callback
 * with an event name and
 * if provided, a context
 *
 * @param  {String}   name
 * @param  {Function} cb
 * @param  {Object}   ctx
 * @return {Event}
 */
proto.on = function(name, cb, ctx) {
  var current = this._cbs[ name ];
  var _cb = [ cb.bind(ctx || this) ];
  this._cbs[ name ] = Array.isArray(current) ? _cb.concat(current) : _cb;
  return this;
};

/**
 * Removes a single callback,
 * or all callbacks associated
 * with the passed event name.
 *
 * @param  {String}   name
 * @param  {Function} cb
 * @return {Event}
 */
proto.off = function(name, cb) {
  if (!name) return new Event();
  if (!cb) return delete this._cbs[name];
  
  var cbs = this._cbs[name];
  if ( Array.isArray(cbs) && cbs.length !== 0 ) {
    var i;
    while (cbs && ~(i = cbs.indexOf(cb))) cbs.splice(i, 1);
  }
  return this;
};

/**
 * Fires an event. Which triggers
 * all callbacks registered on this
 * event name.
 *
 * @param  {String} name
 * @return {Event}
 */
proto.fire = function(name) {
  var cbs = this._cbs[ name ];

  if ( Array.isArray(cbs) ) {
    var l = cbs.length;
    if ( l > 0 ) {
      var args = [].slice.call(arguments, 1);
      while (l--) cbs[l](args);
    }
  }

  return this;
};

/**
 * Util
 */

/**
 * Mixes in the properties
 * of the second object into
 * the first.
 *
 * @param  {Object} a
 * @param  {Object} b
 * @return {Object}
 */
function mixin(a, b) {
  for (var key in b) a[key] = b[key];
  return a;
}

},{}]},{},[1])(1)
});
;