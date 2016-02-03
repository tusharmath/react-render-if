/**
 * Created by tushar.mathur on 16/01/16.
 */

'use strict'
const _ = require('./lodash.custom')
exports.renderIf = function () {
  const predicates = _.toArray(arguments)
  return component => {
    var prototype = component.prototype
    const render = prototype.render
    prototype.render = function () {
      return predicates.every(i => i(this)) ? render.call(this) : null
    }
    return component
  }
}

// TODO: Add unit tests
const HELPERS = {
  itHas: (path, x) => _.has(x, path),
  itsTrue: (path, x) => _.get(x, path) === true,
  itsFalse: (path, x) => _.get(x, path) === false,

  itsOk: (path, x) => Boolean(_.get(x, path)),
  itsNotOk: (path, x) => !Boolean(_.get(x, path)),

  itsGT: (path, value, x) => _.get(x, path) > value,
  itsGTE: (path, value, x) => _.get(x, path) >= value,
  itsLTE: (path, value, x) => _.get(x, path) <= value,
  itsLT: (path, value, x) => _.get(x, path) < value,

  itsEqual: (path, value, x) => _.get(x, path) === value,
  itsNotEqual: (path, value, x) => _.get(x, path) !== value
}

Object.keys(HELPERS).forEach(k => exports[k] = _.curry(HELPERS[k]))

