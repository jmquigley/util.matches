# util.matches

> Searches a string for N instances of a given regex.

[![build](https://travis-ci.org/jmquigley/util.matches.svg?branch=master)](https://travis-ci.org/jmquigley/util.matches)
[![analysis](https://img.shields.io/badge/analysis-tslint-9cf.svg)](https://palantir.github.io/tslint/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![testing](https://img.shields.io/badge/testing-jest-blue.svg)](https://facebook.github.io/jest/)
[![NPM](https://img.shields.io/npm/v/util.matches.svg)](https://www.npmjs.com/package/util.matches)
[![coverage](https://coveralls.io/repos/github/jmquigley/util.matches/badge.svg?branch=master)](https://coveralls.io/github/jmquigley/util.matches?branch=master)


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

- `groupIndex` - When grouping symbols are used within a regex this structure will contain the index location within the matched string where that group starts.  The index location is computed for each group.
- `result` - The return value from the Javascript regex [exec()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec).
- `text` - the string that was matched by the regex
- `start` - the absolute starting index from the front of the string being searched.
- `end` - the absolute ending index from the from front of the string being searched.


## Usage

#### Simple match
```javascript
import {Match, matches} from 'util.matches';

const data: string = 'a b c a b c a b c';
const res: Match[] = matches(data, /a/g);

// res[0].text = 'a'
// res[0].start = 0
// res[0].end = 0;

// res[1].text = 'a'
// res[1].start = 6
// res[1].end = 6
```

#### Match with grouping indicies

```javascript
import {Match, matches} from 'util.matches';

const data: string = 'the date range is 01/02/2016 to 09/25/2017 blah';
const res: Match[] = matches(data, /(\d{2})\/(\d{2})\/(\d{4})/g);

// res[0].text = '01/02/2016');
// res[0].start = 18);
// res[0].end = 27);
// res[0].groupIndex[0] = 0); // 01
// res[0].groupIndex[1] = 3); // 02
// res[0].groupIndex[2] = 6); // 2016

// res[1].text = '09/25/2017');
// res[1].start = 32);
// res[1].end = 41);
// res[1].groupIndex[0] = 0); // 09
// res[1].groupIndex[1] = 3); // 25
// res[1].groupIndex[2] = 6); // 2017
```
