const R = require('ramda')
const M = require('monet')

const FRes = require('./res')
const {flatten_env} = require('./util')

const sum = R.nAry(1, (env) => {
  return M.Either.Right(FRes(
    env,
    M.Maybe.Some(
      R.reduce(
        (acc, val) => acc + (Number.isInteger(val) ? val : 0),
        0, flatten_env(env).toArray())
    )))
})

var exports = sum
module.exports = exports
