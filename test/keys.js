import test from 'ava'
import Manager from '../src/lib/manager'
import jwt from 'jsonwebtoken'

const manager = Manager.create()

test('Generate API key from resource array parameter', t => {
  return manager.create(['resource1', 'resource2'])
    .then(result => {
      jwt.verify(result.key, manager.jwt.secret)
      t.is(result.resources[0], 'resource1')
      t.is(result.resources[1], 'resource2')
    })
})

test('Generate API key from resource array parameter and custom payload', t => {
  return manager.create(['resource1', 'resource2'], {user_id: 1})
    .then(result => {
      const token = jwt.verify(result.key, manager.jwt.secret)
      t.is(token.user_id, 1)
      t.is(result.resources[0], 'resource1')
      t.is(result.resources[1], 'resource2')
    })
})

test('Generate API key from resource array parameter and API key', t => {
  return manager.create(['resource1', 'resource2'], 'S64Jp6yyfRK2nKZvnTv4wtNRcbt7VPXt5fMBqH7CaMXyPBRN')
    .then(result => {
      t.is(result.key, 'S64Jp6yyfRK2nKZvnTv4wtNRcbt7VPXt5fMBqH7CaMXyPBRN')
      t.is(result.resources[0], 'resource1')
      t.is(result.resources[1], 'resource2')
    })
})

test('Generate API key from string resource parameter', t => {
  return manager.create('resource')
    .then(result => {
      jwt.verify(result.key, manager.jwt.secret)
      t.is(result.resources[0], 'resource')
    })
})

test('Generate API key from string resource parameter and API key', t => {
  return manager.create('resource', 'S64Jp6yyfRK2nKZvnTv4wtNRcbt7VPXt5fMBqH7CaMXyPBRN')
    .then(result => {
      t.is(result.key, 'S64Jp6yyfRK2nKZvnTv4wtNRcbt7VPXt5fMBqH7CaMXyPBRN')
      t.is(result.resources[0], 'resource')
    })
})

test('Generate two same API keys', async t => {
  const promise = manager.create('resource1', 'S64Jp6yyfRK2nKZvnTv4wtNRcbt7VPXt5fMBqH7CaMXyPBRN')
    .then(() => manager.create('resource2', 'S64Jp6yyfRK2nKZvnTv4wtNRcbt7VPXt5fMBqH7CaMXyPBRN'))
  await t.throws(promise)
})
