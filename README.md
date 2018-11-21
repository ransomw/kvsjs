# Javascript Key-Value Store

## usage

this is an application for
[node](http://nodejs.org)
`8.3.0`, so it's recommended to install
[nvm](https://github.com/creationix/nvm)
and begin terminal sessions with

```shell
$ nvm use v8.3.0
```

From there, `npm` is used to provide a command-line interface via
```shell
pagedraw$ npm run <script>
```
where `<script>` may be among the scripts defined in `package.json`:
* `test`
* `lint`
* `doc`: build documentation (into `doc/`)
* `interpreter`: run the interpreter (exits with EOF of SIGINT)

## implementation notes

Javascript was chosen mostly because it's rapidly becoming the
linga-franca of web development.
moreover, with libraries like Ramda and Monet on top of certain
ES6 updates, there's a reasonable view that it (Javascript) is
a good choice for implementing FP paradigms.
although i've experiemented with Haskell off and on for a few years,
i have only recently begun to try to apply FP concepts to loosely-typed,
object-oriented, proceedural languages in a more consistant fashion.

there were several cursory attempts to implement the interpreter
in the "right way" by lifting the functions in `DSL.cmds` into
a free monad.
however, each of these attempts at improvement resulted in a
subjectively messier codebase.

[Fluture](https://github.com/fluture-js/Fluture) improvements
to this demo could cleaned-up FP io.
as is, `main` is the only non-FP-style part of the codebase,
and it's relatively terse.
