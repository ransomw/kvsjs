const R = require('ramda')
const M = require('monet')

const FRes = require('./res')

const commit = R.nAry(1, (env) => {
  if (env.tail().isNil) {
    return M.Either.Left(new Error(
      "Not in a transaction"))
  }
  return M.Either.Right(FRes(
    M.NonEmptyList(
      env.tail().head().merge(env.head()),
      env.tail().tail()),
    M.Maybe.None()))
})

var exports = commit
module.exports = exports
