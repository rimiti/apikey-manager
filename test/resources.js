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
      console.log(result)
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
