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
      return _.every(predicates, i => i(this)) ? render.call(this) : null
    }
    return component
  }
}
