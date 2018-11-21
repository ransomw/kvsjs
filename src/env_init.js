// this function constructs an execution environment in the loose sense
// of the word, where what's meant by "execution environment" is
// "a place where values can be stored".
// the environement is an immutable data structure that consists of
// a (non-empty) list of maps.
// the last map in the list represents keys and values completely
// commited to the store,
// and each other map toward the head represents a transaction.
//
// in particular, note that some concepts from the execution model
// are already folded into the environment.
const I = require('immutable')
const M = require('monet')

const env_init = () => {
  return M.NonEmptyList(I.Map())
}

var exports = env_init

module.exports = exports
