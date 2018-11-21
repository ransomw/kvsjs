const R = require('ramda')
const M = require('monet')

const FRes = require('./res')

const rollback = R.nAry(1, (env) => {
  if (env.tail().isNil) {
    return M.Either.Left(new Error(
      "Not in a transaction"))
  }
  return M.Either.Right(FRes(
    env.tail(),
    M.Maybe.None()))
})

var exports = rollback
module.exports = exports
