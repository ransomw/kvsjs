// this module and its submodules define interpreter functionality,
// how the interpreter affects its environment and produces results.
// each function corresponds to an interpreter command of arity n
// and has arity of n+1,
// where the function's first n parameters are (parsed) instruction
// parameters and
// its final parameter is an execution environment.
//
// each function returns
// `monet.Either[Error, FRes]`
// where `Error` is a native JS error and `FRes` is defined as in
// the `fn/res` module

var exports = {}

exports.sum = require('./sum')
exports.begin = require('./begin')
exports.commit = require('./commit')
exports.rollback = require('./rollback')
exports.no_op = require('./no_op')
exports.set = require('./set')
exports.get = require('./get')

module.exports = exports
