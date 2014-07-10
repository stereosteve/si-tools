'use strict';
var assert = require('assert');
var SI = require('./si');


it('Formats SI numbers', function () {
	testCase(1337e-16, "133.7f")
	testCase(1337e-15, "1.337p")
	testCase(1337e-14, "13.37p")
	testCase(1337e-13, "133.7p")
	testCase(1337e-12, "1.337n")
	testCase(1337e-11, "13.37n")
	testCase(1337e-10, "133.7n")
	testCase(1337e-9, "1.337µ")
	// testCase(1337e-8)
	// testCase(1337e-7)
	// testCase(1337e-6)
	// testCase(1337e-5)
	// testCase(1337e-4)
	// testCase(1337e-3)
	// testCase(1337e-2)
	// testCase(1337e-1)
	//
	// testCase(0)
	// testCase(1337)
	// testCase(1337e0)
	//
	// testCase(1337e1)
	// testCase(1337e2)
	// testCase(1337e3)
	// testCase(1337e4)
	// testCase(1337e5)
	// testCase(1337e6)
	// testCase(1337e7)
	// testCase(1337e8)
	// testCase(1337e9)
	// testCase(1337e10)
	// testCase(1337e11)
	// testCase(1337e12)
	// testCase(1337e13)
	// testCase(1337e14)
	// testCase(1337e15)
	// testCase(1337e16)

	function testCase(num, expected) {
		var si = SI.compute(num)
		var str = si.number.toFixed(5).replace(/0+$/, '') + si.prefix

		console.log(si.input, '-->', si.number, si.prefix, '-->', str)
		assert.equal(str, expected)
	}
})


it('Parses SI strings', function () {

	parseTest('1.21GW', {
		number: 1210,
		prefix: 'G',
		unit: 'W'
	})

	parseTest('1.337 nM', {
		number: 0.001337,
		prefix: 'n',
		unit: 'M'
	})

	parseTest('12 W', {
		number: 12,
		prefix: undefined,
		unit: 'W'
	})

	parseTest('12 µF', {
		number: 0.12,
		prefix: 'µ',
		unit: 'F'
	})

	parseTest('12 uF', {
		number: 0.12,
		prefix: 'µ',
		unit: 'F'
	})

	// favors prefix over unit.
	// this will be parsed as Mega, not Meters
	parseTest('12 M', {
		number: 1200,
		prefix: 'M',
		unit: ''
	})

	function parseTest(str, expected) {
		var parsed = SI.parse(str)
		console.log(parsed)
		assert.deepEqual(parsed, expected)
	}
})
