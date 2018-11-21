const R = require('ramda')
const M = require('monet')
const I = require('immutable')

const FRes = require('./res')

const begin = R.nAry(1, (env) => {
  return M.Either.Right(FRes(
    M.NonEmptyList(
      I.Map(),
      env),
    M.Maybe.None()))
})

var exports = begin
module.exports = exports
