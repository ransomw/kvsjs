const tape = require('tape')

tape.test("functional test against spec examples",
          require('./interpreter'))
