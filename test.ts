'use strict';

import test from 'ava';
import {Match, matches} from './index';

// const debug = require('debug')('test');

test('Test the matches function for a regex string', t => {
	const data: string = 'a b c a b c a b c';
	const res: Match[] = matches(data, /a/g);

	t.is(res.length, 3);

	t.is(res[0].text, 'a');
	t.is(res[0].start, 0);
	t.is(res[0].end, 0);

	t.is(res[1].text, 'a');
	t.is(res[1].start, 6);
	t.is(res[1].end, 6);

	t.is(res[2].text, 'a');
	t.is(res[2].start, 12);
	t.is(res[2].end, 12);
});

test('Test with an empty string to the matches function', t => {
	const res: Match[] = matches('', /a/g);
	t.is(res.length, 0);
});

test('Test with a regex that will not be found by matches', t => {
	const data: string = 'a b c a b c a b c';
	const res: Match[] = matches(data, /f/g);

	t.is(res.length, 0);
});

test('Test with regex that contains groups with their indicies', t => {
	const data: string = 'the date range is 01/02/2016 to 09/25/2017 blah';
	const res: Match[] = matches(data, /(\d{2})\/(\d{2})\/(\d{4})/g);

	t.is(res.length, 2);

	t.is(res[0].text, '01/02/2016');
	t.is(res[0].start, 18);
	t.is(res[0].end, 27);
	t.is(res[0].groupIndex[0], 0); // 01
	t.is(res[0].groupIndex[1], 3); // 02
	t.is(res[0].groupIndex[2], 6); // 2016

	t.is(res[1].text, '09/25/2017');
	t.is(res[1].start, 32);
	t.is(res[1].end, 41);
	t.is(res[1].groupIndex[0], 0); // 09
	t.is(res[1].groupIndex[1], 3); // 25
	t.is(res[1].groupIndex[2], 6); // 2017
});

test('Test regex without using the global flag', t => {
	const data: string = 'The quick brown fox jumps over the lazy dog';
	const res: Match[] = matches(data, /brown/i);

	t.truthy(res);
	t.is(res.length, 1);

	t.is(res[0].text, 'brown');
	t.is(res[0].start, 10);
	t.is(res[0].end, 14);
	t.is(res[0].groupIndex.length, 0);
});

test('Test regex without using global at front of string', t => {
	const data: string = 'The quick brown fox jumps over the lazy dog';
	const res: Match[] = matches(data, /^\w*/i);

	t.truthy(res);
	t.is(res.length, 1);
	t.is(res[0].text, 'The');
	t.is(res[0].start, 0);
	t.is(res[0].end, 2);
	t.is(res[0].groupIndex.length, 0);
});
