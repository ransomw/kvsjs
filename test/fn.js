// jshint unused:false

const R = require('ramda')
const M = require('monet')
const I = require('immutable')

const {path_app_src} = require('./util')

const env_init = require(path_app_src + '/env_init')
const {
  flatten_env,
} = require(path_app_src + '/fn/util')
const {
  sum,
  begin,
  commit,
  rollback,
  no_op,
  set,
  get,
} = require(path_app_src + '/fn')

const test_set = (t) => {
  const key = 'a'
  const val = 1
  set(key, val, env_init()).cata(
    (err) => t.fail("failed with error: " + err),
    (f_res) => {
      t.pass("called set")
      t.ok(f_res.res.isNone(), "Maybe.None result")
      t.equal(f_res.env.head().get(key), val,
              "found value in enviroment")
    })
  t.end()
}

const test_sum = (t) => {
  const env = M.NonEmptyList(
    I.Map({a: 1, b: 2}),
    M.NonEmptyList(I.Map({b: 3, c: 4})))
  sum(env).cata(
    (err) => t.fail("failed with error: " + err),
    (f_res) => {
      t.pass("called sum")
      t.ok(f_res.res.isSome(), "Maybe.Some result...")
      t.equal(f_res.res.some(), 7,
              "...with expected value for sum")
    })
  t.end()
}

const tests_main = (t) => {
  t.test("function for SET command",
         test_set)
  t.test("function for SUM command",
         test_sum)
  t.end()
}

var exports = tests_main

module.exports = exports
