import test from 'ava'
import Manager from '../src/lib/manager'

const manager = Manager.create()
let access = ''

test.before(async t => {
  access = await manager.create('resource1')
})

test('Add resources from array parameter', t => {
  return manager.add(['resource1', 'resource2'], access.key)
    .then(result => {
      t.is(result, 0)
      return manager.findAll(access.key)
    })
    .then(results => {
      t.is(results[0], 'resource1')
      t.is(results[1], 'resource2')
    })
})

// test('Add resource from string parameter', t => {
//
// })
//
// test('Find resources from array parameter', t => {
//
// })
//
// test('Find resource from string parameter', t => {
//
// })
//
// test('Find all resources', t => {
//
// })
//
// test('Remove resources from array parameter', t => {
//
// })
//
// test('Remove resource from string parameter', t => {
//
// })
//
