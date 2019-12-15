import {Match, matches} from "./index";

// const debug = require('debug')('test');

test("Test the matches function for a regex string", () => {
	const data: string = "a b c a b c a b c";
	const res: Match[] = matches(data, /a/g);

	expect(res).toBeDefined();

	expect(res.length).toBe(3);
	expect(res[0].text).toBe("a");
	expect(res[0].start).toBe(0);
	expect(res[0].end).toBe(0);

	expect(res[1].text).toBe("a");
	expect(res[1].start).toBe(6);
	expect(res[1].end).toBe(6);

	expect(res[2].text).toBe("a");
	expect(res[2].start).toBe(12);
	expect(res[2].end).toBe(12);
});

test("Test with an empty string to the matches function", () => {
	const res: Match[] = matches("", /a/g);
	expect(res).toBeDefined();
	expect(res.length).toBe(0);
});

test("Test with a regex that will not be found by matches", () => {
	const data: string = "a b c a b c a b c";
	const res: Match[] = matches(data, /f/g);
	expect(res).toBeDefined();
	expect(res.length).toBe(0);
});

test("Test with regex that contains groups with their indicies", () => {
	const data: string = "the date range is 01/02/2016 to 09/25/2017 blah";
	const res: Match[] = matches(data, /(\d{2})\/(\d{2})\/(\d{4})/g);

	expect(res).toBeDefined();

	expect(res.length).toBe(2);
	expect(res[0].text).toBe("01/02/2016");
	expect(res[0].start).toBe(18);
	expect(res[0].end).toBe(27);
	expect(res[0].groupIndex[0]).toBe(0); // 01
	expect(res[0].groupIndex[1]).toBe(3); // 02
	expect(res[0].groupIndex[2]).toBe(6); // 2016

	expect(res[1].text).toBe("09/25/2017");
	expect(res[1].start).toBe(32);
	expect(res[1].end).toBe(41);
	expect(res[1].groupIndex[0]).toBe(0); // 09
	expect(res[1].groupIndex[1]).toBe(3); // 25
	expect(res[1].groupIndex[2]).toBe(6); // 2017
});

test("Test regex without using the global flag", () => {
	const data: string = "The quick brown fox jumps over the lazy dog";
	const res: Match[] = matches(data, /brown/i);

	expect(res).toBeDefined();

	expect(res.length).toBe(1);
	expect(res[0].text).toBe("brown");
	expect(res[0].start).toBe(10);
	expect(res[0].end).toBe(14);
	expect(res[0].groupIndex.length).toBe(0);
});

test("Test regex without using global at front of string", () => {
	const data: string = "The quick brown fox jumps over the lazy dog";
	const res: Match[] = matches(data, /^\w*/i);

	expect(res).toBeDefined();

	expect(res.length).toBe(1);
	expect(res[0].text).toBe("The");
	expect(res[0].start).toBe(0);
	expect(res[0].end).toBe(2);
	expect(res[0].groupIndex.length).toBe(0);
});
