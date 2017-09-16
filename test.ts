'use strict';

import test from 'ava';
import {Match, matches} from './index';

test('Test the matches function for a regex string', t => {
	const data: string = 'a b c a b c a b c';
	const res: Match[] = matches(data, /a/g);

	t.is(res.length, 3);

	t.is(res[0].text, 'a');
	t.is(res[0].start, 0);
	t.is(res[0].end, 1);

	t.is(res[1].text, 'a');
	t.is(res[1].start, 6);
	t.is(res[1].end, 7);

	t.is(res[2].text, 'a');
	t.is(res[2].start, 12);
	t.is(res[2].end, 13);
});

test('Test with a bad regex string (no global flag) to the matches function', t => {

	const data: string = 'a b c a b c a b c';

	t.throws(() => {
		const res = matches(data, /a/);
		t.fail(JSON.stringify(res));
	});
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
