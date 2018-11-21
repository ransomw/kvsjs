// parse a string containing one complete command
// with `parsimmon`, a `Parsec`-inspired Javascript library
// see also the `dsl` module

const P = require('parsimmon')
const M = require('monet')
const R = require('ramda')

const cmds = require('./dsl').cmds

const _Key = P.regexp(/[A-z_][A-z0-9_]*/)
      .desc("invalid key: " +
            "keys must begin with a letter or underscore " +
            "and may contain only alphanumeric characters " +
            "and underscores")
const _Value = P.alt(
  P.regexp(/[0-9]+/).map(Number),
  P.regexp(/.+/))

const Sum = P.string('SUM')
      .map(() => cmds.sum())
const Begin = P.string('BEGIN')
      .map(() => cmds.begin())
const Commit = P.string('COMMIT')
      .map(() => cmds.commit())
const Rollback = P.string('ROLLBACK')
      .map(() => cmds.rollback())
const NoOp = P.string('')
      .map(() => cmds.no_op())

const Set_ = P.seqMap(
  P.string('SET').skip(P.whitespace),
  _Key.skip(P.whitespace),
  _Value,
  (_, key, value) => cmds.set(key, value))
const Get = P.seqMap(
  P.string('GET').skip(P.whitespace),
  _Key,
  (_, key) => cmds.get(key))

const Cmd = P.alt(
  Set_,
  Get,
  Sum,
  Begin,
  Commit,
  Rollback,
  NoOp)
      .trim(P.optWhitespace)

// `String -> Either[ParsimmonError, DSL]`
const parse_cmd = R.nAry(1, (cmd_text) => {
  try {
    return M.Either.Right(Cmd.tryParse(cmd_text))
  } catch (err) {
    return M.Either.Left(err)
  }
})

var exports = parse_cmd

module.exports = exports
