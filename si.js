/*!
	pretty-bytes
	Convert bytes to a human readable string: 1337 → 1.34 kB
	https://github.com/sindresorhus/pretty-bytes
	by Sindre Sorhus
	MIT License
*/
(function () {
	'use strict';

	var exponentTable = {
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
		'-8': 'y'  // ycoto
	};

	var prefixTable = {};

	for (var exp in exponentTable) {
		if (exponentTable.hasOwnProperty(exp)) {
			var prefix = exponentTable[exp];
			if (prefix.length === 0) {
				continue;
			}
			prefixTable[prefix] = exp;
		}
	}

	var aliasTable = {
		'u': 'µ',
		'K': 'k'
	}

	for (var alias in aliasTable) {
		var key = aliasTable[alias]
		prefixTable[alias] = prefixTable[key];
	}


	var SI = {};

	SI.compute = function (num) {
		if (typeof num !== 'number' || Number.isNaN(num)) {
			throw new TypeError('Input must be a number');
		}

		var input = num;
		var exponent;
		var prefix;
		var neg = num < 0;

		if (neg) {
			num = -num;
		}

		if (num === 0) {
			return {
				input: input,
				number: num,
				prefix: '',
			};
		}

		exponent = Math.floor(Math.log(num) / Math.log(1000));
		prefix = exponentTable[exponent];
		num = (num / Math.pow(1000, exponent));

		if (neg) {
			num *= -1;
		}

		return {
			input: input,
			number: num,
			prefix: prefix,
		};
	};

	SI.format = function (number, unit, separator) {
		var si = SI.compute(number);
		var parts = [
			si.number.toFixed(5).replace(/\.?0+$/, ''),
			separator,
			si.prefix,
			unit,
		]
		var str =  parts.join('')
		console.log(si)
		console.log(str)
		return str;
	}

	SI.parse = function(str) {
		var num = parseFloat(str);
		var unit = str.replace(num, '').trim();
		var prefix;
		var exp = prefixTable[unit[0]];
		if (exp) {
			num = num * Math.pow(1000, exp);
			prefix = unit[0];
			unit = unit.substr(1);
		}
		// if alias, use the proper prefix
		if (prefix && aliasTable[prefix]) {
			prefix = aliasTable[prefix];
		}
		return {
			number: num,
			prefix: prefix,
			unit: unit
		};
	};

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = SI;
	} else {
		window.SI = SI;
	}
})();
