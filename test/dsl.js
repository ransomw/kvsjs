const {path_app_src} = require('./util')

const DSL = require(path_app_src + '/dsl')
const cmds = DSL.cmds

const test_types = (t) => {
  DSL.Get('a')
  t.pass("ran type definitions")
  t.end()
}

const test_cmds = (t) => {
  cmds.sum()
  t.pass("ran constructor(s)")
  t.end()
}

const tests_main = (t) => {
  t.test("test command type definitions",
         test_types)
  t.test("test command constructors",
         test_cmds)
  t.end()
}

var exports = tests_main

module.exports = exports
