// define a Domain-Specific Language for interpreter commands.
// commands entered into the interpreter are lexed to the `taggedSum`
// defined in this file.
// the `daggy.taggedSum` is analogous to a Haskell-dialect algebraic
// data type.
const R = require('ramda')

const fn = require('./fn')

const DSL = require('daggy').taggedSum('DSL', {
  Sum: [],
  Begin: [],
  Commit: [],
  Rollback: [],
  NoOp: [],
  Set: ['key', 'val'],
  Get: ['key'],
})

// calling the `.to_env_fn` method on any instance of the tagged sum
// (e.g. `DSL.Sum.to_env_fn()`) returns a function that takes an
// execution environment (see `env_init` module) as a single parameter
// and returns the result of evaluating the given instruction
// in the supplied execution environment (see `fn` module).
DSL.prototype.to_env_fn = function () {
  return this.cata({
    Sum: () => fn.sum,
    Begin: () => fn.begin,
    Commit: () => fn.commit,
    Rollback: () => fn.rollback,
    NoOp: () => fn.no_op,
    Set: (key, val) => R.partial(fn.set, [key, val]),
    Get: (key) => R.partial(fn.get, [key]),
  })
}

// for future-proofing (see readme), these functions are used in the
// lexer rather than directly calling the `taggedSum` constructors
// (e.g. `DSL.cmds.sum()` rather than `DSL.Sum()`)
DSL.cmds = {
  sum: () => DSL.Sum,
  begin: () => DSL.Begin,
  commit: () => DSL.Commit,
  rollback: () => DSL.Rollback,
  no_op: () => DSL.NoOp,
  set: (key, val) => DSL.Set(key, val),
  get: (key) => DSL.Get(key),
}

var exports = DSL

module.exports = exports
