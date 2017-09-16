'use strict';

export interface Match {
	result: any;
	text: string;
	start: number;
	end: number;
}

/**
 * Searches a string for N instances of a given regex.  The `/g` flag must
 * be set on the regex for this work correctly.  The function will check
 * for this flag and throws an Exception if it is not set.
 * @param text {string} the text string to search
 * @param re {RegExp} the regular expression used in the search
 * @return {IMatch} an array of IMatch objects.  They contain `result',
 * `text`, `start` index, `end` index within the original string.
 */
export function matches(text: string, re: RegExp): Match[] {

	const l: Match[] = [];

	if (!re.global) {
		throw new Error('The regex must use th /g flag');
	}

	if (!text) {
		return l;
	}

	let match: any;
	while ((match = re.exec(text)) != null) {
		l.push({
			result: match,
			text: match[0],
			start: match.index,
			end: match.index + match[0].length
		});
	}

	return l;
}
