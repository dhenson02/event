
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
var call = Function.prototype.call;
var slice = call.bind([].slice);
var isArray = Array.isArray;
var _FUNCTION_TYPE_ = 'function';

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
  if ( this instanceof Event ) {
    this._cbs = {};
    if (obj) return mixin(obj, proto);
  }
  else {
    return new Event(obj);
  }
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
  this._cbs[ name ] = isArray(current) ? _cb.concat(current) : _cb;
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
proto.off = function(name, cb, ctx) {
  if ( name ) {
    if ( _FUNCTION_TYPE_ === typeof cb ) {
      cb = cb.bind(ctx || this);
      var cbs = this._cbs[name];
      if ( isArray(cbs) && cbs.length !== 0 ) {
        var i;
        while (cbs && ~(i = cbs.indexOf(cb))) cbs.splice(i, 1);
      }
      return this;
    }
    return delete this._cbs[name];
  }
  return new Event();
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

  if ( isArray(cbs) ) {
    var l = cbs.length;
    if ( l > 0 ) {
      var args = slice(arguments, 1);
      while (l--) cbs[l].apply(null, args);
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
