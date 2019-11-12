[![Build Status](https://travis-ci.com/final-state/final-state-monorepo.svg?branch=master)](https://travis-ci.com/final-state/final-state-monorepo)
[![codecov.io](https://codecov.io/gh/final-state/final-state-monorepo/branch/master/graph/badge.svg)](https://codecov.io/gh/final-state/final-state-monorepo)
[![Known Vulnerabilities](https://snyk.io/test/github/final-state/final-state-monorepo/badge.svg)](https://snyk.io/test/github/final-state/final-state-monorepo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![minified + gzip](https://badgen.net/bundlephobia/minzip/final-state-logger@2.0.0-alpha.0)](https://bundlephobia.com/result?p=final-state-logger@2.0.0-alpha.0)

# final-state-logger

> Logger for `final-state`. (Just like `redux-logger` to `redux`)

## Installation

```bash
yarn add final-state
yarn add final-state-logger
```

You should care about the `peer dependencies` of this package. If something not installed, just install them manually.

`final-state-logger` is written in `Typescript`, so you don't need to find a type definition for it.

## Basic Example

```javascript
import { applyLogger } from 'final-state-logger';

applyLogger(store);
```

## API Reference

### function finalStateLogger(store: Store): void

Print all state changes of the passed in store instance.

## Test

This project uses [jest](https://jestjs.io/) to perform testing.

```bash
yarn test
```

## Road Map
