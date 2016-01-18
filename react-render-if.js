/**
 * Created by tushar.mathur on 16/01/16.
 */

'use strict'

const _ = require('lodash')
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

exports.has = _.curry((path, x) => _.has(x, path))
exports.isTrue = _.curry((path, x) => _.get(x, path) === true)
exports.isFalse = _.curry((path, x) => _.get(x, path) === false)
exports.gt = _.curry((path, value, x) => _.get(x, path) > value)
exports.gte = _.curry((path, value, x) => _.get(x, path) >= value)
exports.lte = _.curry((path, value, x) => _.get(x, path) <= value)
exports.equals = _.curry((path, value, x) => _.get(x, path) === value)

