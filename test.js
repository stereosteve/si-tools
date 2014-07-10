'use strict';
var assert = require('assert');
var SI = require('./si');

// it('should throw on invalid input', function () {
// 	assert.throws(function () { pb('') });
// 	assert.throws(function () { pb('1') });
// 	assert.throws(function () { pb(NaN) });
// 	assert.throws(function () { pb(true) });
// });
//
// it('should convert bytes to human readable strings', function () {
// 	assert.equal(pb(0), '0 B');
// 	assert.equal(pb(10), '10 B');
// 	assert.equal(pb(999), '999 B');
// 	assert.equal(pb(1001), '1 kB');
// 	assert.equal(pb(1001), '1 kB');
// 	assert.equal(pb(9999999999999999), '10 PB');
// });
//
// it('should support negative number', function () {
// 	assert.equal(pb(-999), '-999 B');
// });

it('si', function () {
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
