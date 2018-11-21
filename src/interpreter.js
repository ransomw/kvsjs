// this module is the interpreter's "kitchen sink":
// it patches together the other modules in order to implement `main`.
// a few relevant types used throughout are
// - `L` (input line) - `String`
// - `E` (see `env_init` module) - execution environment
// - `X` (lines to standard error) - `immutable.Seq([String])`
// - `fn` (see `fn` module) - `E -> FRes`
// - `DSL` (see `dsl` module) - `daggy.taggedSum`
const readline = require('readline')

const I = require('immutable')
const {
  tagged,
} = require('daggy')

// (successful) Interpreter Instruction Result
const IRes = tagged('IRes', [
  // updated execution environment after running the function
  'env',
  // I.Seq([String])
  'lines',
])

// `L -> Either[ParsimmonError, DSL]`
const parse_cmd = require('./parse_cmd')

// `String -> Either[X, fn]`
const parse_line = (aline) => {
  return parse_cmd(aline)
    .bimap(
      (parse_err) => I.Seq([
        "### parse error ###",
        parse_err.toString(),
        "###################",
      ]),
      // see `dsl` module
      (cmd) => cmd.to_env_fn())
}

// `L -> E -> Either[X, IRes]`
const exec_line = (line) => (exec_env) => parse_line(line).flatMap(
  (env_fn) => env_fn(exec_env).leftMap(
    (err) => I.Seq(["Error: " + err.message])
  )
).map((f_res) => IRes(
  f_res.env,
  f_res.res.fold(I.Seq())(
    (res) => I.Seq(res.isNil ? ["NULL"] : [res.toString()])
  )))

// departing from the FP style of the rest of the implementation,
// this function performs side-effects
// by re-binding the execution environment variable
// and printing to stdio
const main = () => {
  let exec_env = require('./env_init')()

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
  })

  rl.prompt()

  rl.on('line', (line) => {
    exec_line(line)(exec_env).cata(
      (err_lines) => err_lines.forEach((line) => console.error(line)),
      (i_res) => {
        exec_env = i_res.env
        i_res.lines.forEach((line) => console.log(line))
      })
    rl.prompt()
  }).on('close', () => {
    console.log()
    console.log("bye!")
    process.exit(0)
  })
}

var exports = {}

exports.exec_line = exec_line
exports.main = main

module.exports = exports
