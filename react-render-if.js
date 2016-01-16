/**
 * Created by tushar.mathur on 16/01/16.
 */

'use strict'

const toArray = x => Array.prototype.slice.call(x)
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
