# si-tools [![Build Status](https://travis-ci.org/stereosteve/si-tools.svg?branch=master)](https://travis-ci.org/stereosteve/si-tools)

> Parsing and Formatting of SI numbers:


## Install

```sh
$ npm install --save si-tools
```

```sh
# TODO
$ bower install --save si-tools
```

```sh
# TODO
$ component install stereosteve/si-tools
```


## Usage

```js
SI.format(1210000000, 'W')
//=> '1.21GW'

SI.parse('1.21GW')
//=> { number: 1210000000,
//     prefix: 'G',
//     unit: 'W' }
```



## Credits

* Forked from Snidre Sorhus' [pretty-bytes](https://github.com/sindresorhus/pretty-bytes) module.
  Adapted to work with SI numbers.


## License

[MIT](http://opensource.org/licenses/MIT) © [Steve Perkins](http://www.stereosteve.com)
