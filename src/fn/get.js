const R = require('ramda')
const M = require('monet')

const FRes = require('./res')
const {flatten_env} = require('./util')

const get = R.nAry(2, (key, env) => {
  return M.Either.Right(FRes(
    env,
    M.Maybe.Some(
      flatten_env(env).get(key) || M.Nil
    )))
})

var exports = get
module.exports = exports
