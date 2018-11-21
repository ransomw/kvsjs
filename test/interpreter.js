const fs = require('fs')
const path = require('path')

const R = require('ramda')

const {path_app_src} = require('./util')

const env_init = require(path_app_src + '/env_init')
const {exec_line} = require(path_app_src + '/interpreter')

const dir_fixtures = path.join(__dirname, 'examples')
const prefix_line_out = '> '

const parse_spec = R.reduce((acc, val) => {
  if (R.take(prefix_line_out.length, val) === prefix_line_out) {
    return R.append(
      R.merge(R.last(acc), {
        lines_out: R.append(R.drop(prefix_line_out.length, val),
                            R.last(acc).lines_out)
      }), R.init(acc))
  } else {
    return R.append({
      line: val,
      lines_out: []
    }, acc)
  }
}, [])

const test_spec = (spec, t) => {
  let exec_env = env_init()
  spec.forEach((spec_line) => {
    const {line, lines_out} = spec_line
    exec_line(line)(exec_env).cata(
      (err_lines) => {
        t.deepEqual(err_lines.toArray(), lines_out,
                    "found expected error lines (if any)")
      },
      (i_res) => {
        exec_env = i_res.env
        t.deepEqual(i_res.lines.toArray(), lines_out,
                    "found expected lines (if any)")
      })
  })
  t.end()
}

const tests_main = (t) => {
  fs.readdirSync(dir_fixtures).filter(
    (filename) => filename.match(/\.cmds$/)
  ).forEach((filename) => {
    t.test("testing fixture '"+filename+"'",
           R.partial(test_spec, [parse_spec(
             fs.readFileSync(path.join(dir_fixtures, filename))
               .toString().trim().split('\n'))
           ]))
  })
  t.end()
}

var exports = tests_main

module.exports = exports
