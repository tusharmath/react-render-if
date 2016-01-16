/**
 * Created by tushar.mathur on 16/01/16.
 */

'use strict'
import test from 'ava'
import {renderIf} from './react-render-if'

const createComponentWithRender = (message, props) => {
  return class Component {
    constructor () {
      this.props = props
      this.message = message
    }

    render () {
      return this.message
    }
  }
}

test('multiple', t => {
  var C = renderIf(i => true, i => false)(createComponentWithRender('Hello', {canRender: false}))
  t.same((new C()).render(), null)
})

test('function:true', t => {
  var C = renderIf(i => i.props.canRender)(createComponentWithRender('Hello', {canRender: true}))
  t.same((new C()).render(), 'Hello')
})

test('function:false', t => {
  var C = renderIf(i => i.props.canRender)(createComponentWithRender('Hello', {canRender: false}))
  t.same((new C()).render(), null)
})
