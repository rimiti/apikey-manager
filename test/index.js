import test from 'ava'
import manager from '../lib/manager'

test('Generate API key with resource array parameter', t => {
  manager.create(['resource1', 'resource2'])
    .then(result => {
      t.is(result, true)
    })
})

test('Generate API key with string resource parameter', t => {
  manager.create('resource')
    .then(result => {
      t.is(result, true)
    })
})

test('Generate API key with array resource parameter and API key', t => {
  manager.create(['resource1', 'resource2'], 'myCustomeApiKey')
    .then(result => {
      t.is(result, true)
    })
})

test('Generate API key with string resource parameter and API key', t => {
  manager.create('resource', 'myCustomeApiKey')
    .then(result => {
      t.is(result, true)
    })
})

test('Delete resource from string parameter', t => {
  manager.deleteResource('resource', 'myCustomeApiKey')
    .then(result => {
      t.is(result, true)
    })
})

test('Delete resources from array parameter', t => {
  manager.deleteResource(['resource1', 'resource2'], 'myCustomeApiKey')
    .then(result => {
      t.is(result, true)
    })
})






