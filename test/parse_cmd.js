const R = require('ramda')

const {path_app_src} = require('./util')

const DSL = require(path_app_src + '/dsl')
const parse_cmd = require(path_app_src + '/parse_cmd')

const test_parse_one_token = (t) => {
  const cmds = [
    'SUM',
    'BEGIN',
    'COMMIT',
    'ROLLBACK',
  ]
  R.forEach((cmd) => {
    t.ok(parse_cmd(cmd).isRight(),
         "parsed " + cmd)
    t.ok(parse_cmd(' \t'+cmd+'   \n').isRight(),
         "parsed " + cmd + " with added whitespace")
  }, cmds)
  t.end()
}

const test_parse_set = (t) => {
  const parse_either = parse_cmd('SET a 1')
  t.ok(parse_either.isRight(),
       "parsed command without error")
  const parse_res = parse_either.right()
  t.ok(DSL.Set.is(parse_res),
       "found DSL Set command")
  t.equal(parse_res.key, 'a',
          "found expected key")
  t.equal(parse_res.val, 1,
          "found expected value")
  t.end()
}

const tests_main = (t) => {
  t.test("parse commands that consist of a single token",
         test_parse_one_token)
  t.test("parse SET command",
         test_parse_set)
  t.end()
}

var exports = tests_main

module.exports = exports
