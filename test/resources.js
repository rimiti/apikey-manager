import test from 'ava'
import Manager from '../src/lib/manager'

const manager = Manager.create()
let key = ''

test.before(async t => {
  key = await manager.create('resource1')
})

test('Add resources from array parameter', t => {

})

test('Add resource from string parameter', t => {

})

test('Find resources from array parameter', t => {

})

test('Find resource from string parameter', t => {

})

test('Find all resources', t => {

})

test('Remove resources from array parameter', t => {

})

test('Remove resource from string parameter', t => {

})

