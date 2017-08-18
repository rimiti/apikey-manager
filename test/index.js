import test from 'ava'
import Manager from '../src/lib/manager'
import jwt from 'jsonwebtoken'

const manager = Manager.create()

test('Generate API key with resource array parameter', t => {
  return manager.create(['resource1', 'resource2'])
    .then(result => {
      jwt.verify(result.key, manager.jwt.secret)
      t.true(Array.isArray(result.resources))
      t.is(result.resources[0], 'resource1')
      t.is(result.resources[1], 'resource2')
    })
})

// test('Generate API key with string resource parameter', t => {
//   manager.create('resource')
//     .then(result => {
//       t.is(result, true)
//     })
// })
//
// test('Generate API key with array resource parameter and API key', t => {
//   manager.create(['resource1', 'resource2'], 'myCustomeApiKey')
//     .then(result => {
//       t.is(result, true)
//     })
// })
//
// test('Generate API key with string resource parameter and API key', t => {
//   manager.create('resource', 'myCustomeApiKey')
//     .then(result => {
//       t.is(result, true)
//     })
// })
//
// test('Delete resource from string parameter', t => {
//   manager.deleteResource('resource', 'myCustomeApiKey')
//     .then(result => {
//       t.is(result, true)
//     })
// })
//
// test('Delete resources from array parameter', t => {
//   manager.deleteResource(['resource1', 'resource2'], 'myCustomeApiKey')
//     .then(result => {
//       t.is(result, true)
//     })
// })








