# util.matches

> Searches a string for N instances of a given regex.

[![Build Status](https://travis-ci.org/jmquigley/util.matches.svg?branch=master)](https://travis-ci.org/jmquigley/util.matches)
[![tslint code style](https://img.shields.io/badge/code_style-TSlint-5ed9c7.svg)](https://palantir.github.io/tslint/)
[![Test Runner](https://img.shields.io/badge/testing-ava-blue.svg)](https://github.com/avajs/ava)
[![NPM](https://img.shields.io/npm/v/util.matches.svg)](https://www.npmjs.com/package/util.matches)
[![Coverage Status](https://coveralls.io/repos/github/jmquigley/util.matches/badge.svg?branch=master)](https://coveralls.io/github/jmquigley/util.matches?branch=master)


## Installation

This module uses [yarn](https://yarnpkg.com/en/) to manage dependencies and run scripts for development.

To install as an application dependency:
```
$ yarn add --dev util.matches
```

To build the app and run all tests:
```
$ yarn run all
```

## Overview

The `matches` function will search through the given string for N occurrences of the given regex string.  It will return an array of `Match` objects; one entry for each instance found.  The `Match` structure contains the following values:

- `result` - The return value from the Javascript regex [exec()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec).
- `text` - the string that was matched by the regex
- `start` - the absolute starting index from the front of the string being searched.
- `end` - the absolute ending index from the from front of the string being searched.

The `/g` flag must be used with the regex or an exception is thrown.

## Usage

```javascript
import {Match, matches} from 'util.matches';

const data: string = 'a b c a b c a b c';
const res: Match[] = matches(data, /a/g);

// res[0].text = 'a'
// res[0].start = 0
// res[0].end = 1;

// res[1].text = 'a'
// res[1].start = 6
// res[1].end = 7
```
