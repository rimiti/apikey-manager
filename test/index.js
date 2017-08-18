import test from 'ava'
import Manager from '../src/lib/manager'
import jwt from 'jsonwebtoken'

const manager = Manager.create()

test('Generate API key with resource array parameter (without API key set)', t => {
  return manager.create(['resource1', 'resource2'])
    .then(result => {
      jwt.verify(result.key, manager.jwt.secret)
      t.is(result.resources[0], 'resource1')
      t.is(result.resources[1], 'resource2')
    })
})

test('Generate API key with resource array parameter (with API key set)', t => {
  return manager.create(['resource1', 'resource2'], 'S64Jp6yyfRK2nKZvnTv4wtNRcbt7VPXt5fMBqH7CaMXyPBRN')
    .then(result => {
      t.is(result.key, 'S64Jp6yyfRK2nKZvnTv4wtNRcbt7VPXt5fMBqH7CaMXyPBRN')
      t.is(result.resources[0], 'resource1')
      t.is(result.resources[1], 'resource2')
    })
})

test('Generate API key with string resource parameter (without API key set)', t => {
  return manager.create('resource')
    .then(result => {
      jwt.verify(result.key, manager.jwt.secret)
      t.is(result.resources[0], 'resource')
    })
})

test('Generate API key with string resource parameter (with API key set)', t => {
  return manager.create('resource', 'S64Jp6yyfRK2nKZvnTv4wtNRcbt7VPXt5fMBqH7CaMXyPBRN')
    .then(result => {
      t.is(result.key, 'S64Jp6yyfRK2nKZvnTv4wtNRcbt7VPXt5fMBqH7CaMXyPBRN')
      t.is(result.resources[0], 'resource')
    })
})

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








