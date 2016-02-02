/**
 * Created by tushar.mathur on 16/01/16.
 */

'use strict'
import test from 'ava'
import e from './react-render-if'

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
  var C = e.renderIf(i => true, i => false)(createComponentWithRender('Hello', {canRender: false}))
  t.same((new C()).render(), null)
})

test('function:true', t => {
  var C = e.renderIf(i => i.props.canRender)(createComponentWithRender('Hello', {canRender: true}))
  t.same((new C()).render(), 'Hello')
})

test('function:false', t => {
  var C = e.renderIf(i => i.props.canRender)(createComponentWithRender('Hello', {canRender: false}))
  t.same((new C()).render(), null)
})

test('get', t => t.is(e.get({a: {b: {c: 100}}}, 'a.b.c'), 100))
test('get', t => t.is(e.get({a: {b: {}}}, 'a.b.c'), undefined))
test('get:undef obj', t => t.is(e.get(undefined, 'a.b.c'), undefined))
test('get:arr', t => t.is(e.get({a: {b: {c: 100}}}, 'a.b.c'.split('.')), 100))

test('has', t => t.false(e.has({a: {b: {c: 100}}}, 'a.b.d')))
test('has', t => t.true(e.has({a: {b: {c: 100}}}, 'a.b.c')))
test('has', t => t.true(e.has({a: {b: {c: null}}}, 'a.b.c')))
test('has', t => t.true(e.has({a: {b: {c: undefined}}}, 'a.b.c')))

test('curry', t => {
  const f = e.curry((a, b, c) => [a, b, c])
  t.same(f(1, 2, 3), [1, 2, 3])
  t.same(f(10, 20)(30), [10, 20, 30])
})
