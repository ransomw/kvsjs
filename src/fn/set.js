const R = require('ramda')
const M = require('monet')

const FRes = require('./res')

const set = R.nAry(3, (key, value, env) => {
  return M.Either.Right(FRes(
    M.NonEmptyList(
      env.head().set(key, value),
      env.tail()),
    M.Maybe.None()))
})

var exports = set
module.exports = exports
