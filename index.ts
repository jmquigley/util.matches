"use strict";

export interface Match {
	groupIndex: number[];
	result: any;
	text: string;
	start: number;
	end: number;
}

/**
 * Searches a string for N instances of a given regex.  The `/g` flag must
 * be set on the regex for this work correctly.  The function will check
 * for this flag and throws an Exception if it is not set.  This will
 * also compute the location index for regex groupings for each
 * match.
 * @param text {string} the text string to search
 * @param re {RegExp} the regular expression used in the search
 * @return {IMatch} an array of IMatch objects.  They contain `result',
 * `text`, `start` index, `end` index within the original string.
 */
export function matches(text: string, re: RegExp): Match[] {
	const l: Match[] = [];

	if (!text) {
		return l;
	}

	let match: any;
	if (re.global) {
		while ((match = re.exec(text)) != null) {
			// When the regex has grouping modifiers, then this will compute
			// The offset within the matched string (not the whole string)
			// of the start location index for each grouping
			const groupIndex: number[] = [];
			if (match.length > 1) {
				for (let idx = 1; idx < match.length; idx++) {
					groupIndex.push(match[0].indexOf(match[idx]));
				}
			}

			l.push({
				groupIndex: groupIndex,
				result: match,
				text: match[0],
				start: match.index,
				end: match.index + match[0].length - 1
			});
		}
	} else {
		match = text.match(re);
		if (match) {
			l.push({
				groupIndex: [],
				result: match,
				text: match[0],
				start: match.index,
				end: match.index + match[0].length - 1
			});
		}
	}

	return l;
}
