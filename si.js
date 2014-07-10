/*!
	pretty-bytes
	Convert bytes to a human readable string: 1337 → 1.34 kB
	https://github.com/sindresorhus/pretty-bytes
	by Sindre Sorhus
	MIT License
*/
(function () {
	'use strict';

	var siPrefixTable = {
		8:    'Y', // yotta
		7:    'Z', // zetta
		6:    'E', // exa
		5:    'P', // peta
		4:    'T', // tera
		3:    'G', // giga
		2:    'M', // mega
		1:    'k', // kilo
		0:    '',
		'-1': 'm', // milli
		'-2': 'µ', // micro
		'-3': 'n', // nano
		'-4': 'p', // pico
		'-5': 'f', // femto
		'-6': 'a', // atto
		'-7': 'z', // zepto
		'-8': 'y', // ycoto
	}

	var si = {}

	si.compute = function (num) {
		if (typeof num !== 'number' || Number.isNaN(num)) {
			throw new TypeError('Input must be a number');
		}

		var input = num;
		var exponent;
		var prefix;
		var unit;
		var neg = num < 0;

		if (neg) {
			num = -num;
		}

		if (num === 0) {
			return {
				input: input,
				number: num,
				prefix: '',
			}
		}

		exponent = Math.floor(Math.log(num) / Math.log(1000));
		prefix = siPrefixTable[exponent];
		num = (num / Math.pow(1000, exponent));

		if (neg) num *= -1

		return {
			input: input,
			number: num,
			prefix: prefix,
		};
	};

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = si;
	} else {
		window.SI = si;
	}
})();
