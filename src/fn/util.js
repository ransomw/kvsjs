/**
 * helpers used in multiple functions exposed by the `fn` module
 */

const I = require('immutable')

/**
 * takes an execution environment as a single parameter
 * and returns a map of keys to values
 * with keys corresponding to values according to
 * the first frame in the list where a value is defined.
 */
const flatten_env = (env) => {
  return env.foldRight(I.Map())(
    (el, acc) => acc.merge(el))
}

var exports = {}

exports.flatten_env = flatten_env

module.exports = exports
