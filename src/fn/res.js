/**
 * the result of running one of the functions defined in the `fn` module
 * `V` is the value returned by a function as a Javascript type,
 * which may in particular be a monet.Nil
 */

const {
  tagged,
} = require('daggy')

const FRes = tagged('FRes', [
  /** updated execution environment after running the function */
  'env',
  /** `monet.Maybe[V]` */
  'res',
])

var exports = FRes

module.exports = exports
