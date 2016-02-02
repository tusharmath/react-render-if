/**
 * Created by tushar.mathur on 16/01/16.
 */

'use strict'

const toArray = x => Array.prototype.slice.call(x, 0)
exports.renderIf = function () {
  const predicates = toArray(arguments)
  return component => {
    var prototype = component.prototype
    const render = prototype.render
    prototype.render = function () {
      return predicates.every(i => i(this)) ? render.call(this) : null
    }
    return component
  }
}
const has = exports.has = (obj, path) => {
  if (typeof obj !== 'object') {
    return
  }
  var val = obj
  path = path instanceof Array ? path : path.split('.')
  return path.every(x => {
    if (x in val) {
      val = val[x]
      return true
    }
    return false
  })
}
const get = exports.get = (obj, path) => {
  if (typeof obj !== 'object') {
    return
  }
  var val = obj
  path = path instanceof Array ? path : path.split('.')
  path.every(x => val = x in val ? val[x] : undefined)
  return val
}
const curry = exports.curry = func => {
  return function out () {
    const args = toArray(arguments)
    if (args.length === func.length) {
      return func.apply(this, args)
    }
    return Function.prototype.bind.apply(out, [this, ...args])
  }
}

const HELPERS = {
  itHas: (path, x) => has(x, path),
  itsTrue: (path, x) => get(x, path) === true,
  itsFalse: (path, x) => get(x, path) === false,

  itsOk: (path, x) => Boolean(get(x, path)),
  itsNotOk: (path, x) => !Boolean(get(x, path)),

  itsGT: (path, value, x) => get(x, path) > value,
  itsGTE: (path, value, x) => get(x, path) >= value,
  itsLTE: (path, value, x) => get(x, path) <= value,
  itsLT: (path, value, x) => get(x, path) < value,

  itsEqual: (path, value, x) => get(x, path) === value,
  itsNotEqual: (path, value, x) => get(x, path) !== value
}

Object.keys(HELPERS).forEach(k => exports[k] = curry(HELPERS[k]))

