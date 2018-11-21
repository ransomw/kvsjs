const R = require('ramda')
const M = require('monet')

const FRes = require('./res')

const no_op = R.nAry(1, (env) => {
  return M.Either.Right(FRes(
    env,
    M.Maybe.None()))
})
