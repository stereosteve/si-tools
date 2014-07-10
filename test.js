'use strict';
var assert = require('assert');
var SI = require('./si');


it('Formats SI numbers', function () {
	testCompute(1337e-16, "133.7f")
	testCompute(1337e-15, "1.337p")
	testCompute(1337e-14, "13.37p")
	testCompute(1337e-13, "133.7p")
	testCompute(1337e-12, "1.337n")
	testCompute(1337e-11, "13.37n")
	testCompute(1337e-10, "133.7n")
	testCompute(1337e-9, "1.337µ")
	testCompute(1337e-8, "13.37µ")
	testCompute(1337e-7, "133.7µ")
	testCompute(1337e-6, "1.337m")
	testCompute(1337e-5, "13.37m")
	testCompute(1337e-4, "133.7m")
	testCompute(1337e-3, "1.337")
	testCompute(1337e-2, "13.37")
	testCompute(1337e-1, "133.7")

	testCompute(0, "0")
	testCompute(1337, "1.337k")
	testCompute(1337e0, "1.337k")

	testCompute(1337e1, "13.37k")
	testCompute(1337e2, "133.7k")
	testCompute(1337e3, "1.337M")
	testCompute(1337e4, "13.37M")
	testCompute(1337e5, "133.7M")
	testCompute(1337e6, "1.337G")
	testCompute(1337e7, "13.37G")
	testCompute(1337e8, "133.7G")
	testCompute(1337e9, "1.337T")
	testCompute(1337e10, "13.37T")
	testCompute(1337e11, "133.7T")
	testCompute(1337e12, "1.337P")
	testCompute(1337e13, "13.37P")
	testCompute(1337e14, "133.7P")
	testCompute(1337e15, "1.337E")
	testCompute(1337e16, "13.37E")

	function testCompute(num, expected) {
		var si = SI.compute(num)
		var str = si.number.toFixed(5).replace(/\.?0+$/, '') + si.prefix

		console.log(si.input, '-->', si.number, si.prefix, '-->', str)
		assert.equal(str, expected)
	}
})


it('Parses SI strings', function () {

	testParse('1.21GW', {
		number: 1210,
		prefix: 'G',
		unit: 'W'
	})

	testParse('1.337 nM', {
		number: 0.001337,
		prefix: 'n',
		unit: 'M'
	})

	testParse('12 W', {
		number: 12,
		prefix: undefined,
		unit: 'W'
	})

	testParse('12 µF', {
		number: 0.12,
		prefix: 'µ',
		unit: 'F'
	})

	testParse('12 uF', {
		number: 0.12,
		prefix: 'µ',
		unit: 'F'
	})

	// favors prefix over unit.
	// this will be parsed as Mega, not Meters
	testParse('12 M', {
		number: 1200,
		prefix: 'M',
		unit: ''
	})

	function testParse(str, expected) {
		var parsed = SI.parse(str)
		console.log(parsed)
		assert.deepEqual(parsed, expected)
	}
})
