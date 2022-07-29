<div align="center">
	<h1>weather.js</h1>
	<a href="https://www.codefactor.io/repository/github/ifraan/weather.js"><img src="https://www.codefactor.io/repository/github/ifraan/weather.js/badge" alt="CodeFactor" /></a>
	<a href="https://www.npmjs.com/package/@ifraan_/weather.js"><img src="https://badgen.net/npm/v/@ifraan_/weather.js?color=blue" alt="NPM-Version"/></a>
	<a href="https://www.npmjs.com/package/@ifraan_/weather.js"><img src="https://badgen.net/npm/dt/@ifraan_/weather.js?color=blue" alt="NPM-Downloads"/></a>
	<a href="https://github.com/iFraan/weather.js"><img src="https://badgen.net/github/stars/iFraan/weather.js?color=yellow" alt="Github Stars"/></a>
	<a href="https://github.com/iFraan/weather.js/issues"><img src="https://badgen.net/github/issues/iFraan/weather.js?color=green" alt="Issues"/></a>
   <h2>This a wrapper of the unnoficial MSN weather API</h2>
</div>

## Instalattion
No apiKey, its free.
### Dependencies
``
axios fast-xml-parser
``

To install use:
```shell
npm i @ifraan_/weather.js
```
### You must use **API.search** before using any other method
search can take options parameters
```js
await search('Location', {
	degree: 'C', // Either C for Celcius or F for Fahrenheit, default is F
	lang: 'en-UK', // Language code for the results, default is en-US
	timeout: 5_000 // Timeout in miliseconds, default is 10_000
})
```

| Methods | Description |
| - | - |
| info | Generical info | 
| current | Current weather |
| forecast | Forecast for the next 5 days |

Example code:
```js
const { API } = require('@ifraan_/weather.js');

try {
    const city = await API.search('Broklyn, NY', {degree: 'F', lang: 'es-ES'})
    console.log('Info: ', city.info())
	/*
	Info:  {
		location_code: 'wc:USNY0996',
		location_name: 'Brooklyn, Estados Unidos',
		degree: 'F',
		provider: { name: 'Foreca', url: 'http://www.foreca.com/' },
		coords: { latitude: '40,693', longitude: '-73,991' },
		timezone: '-4'
	}
	*/
    console.log('Current: ', city.current())
	/*
	Current:  {
		temperature: '83',
		skycode: '34',
		skytext: 'Muy soleado',
		date: '2022-07-21',
		observationtime: '08:15:00',
		observationpoint: 'Brooklyn, NY',
		feelslike: '88',
		humidity: '77',
		winddisplay: '8 mph Sur',
		day: 'jueves',
		shortday: 'ju.',
		windspeed: '8 mph'
	}
	*/
    console.log('Forecast: ', city.forecast())
	/*
	Forecast:  [
		{
			low: '77',
			high: '91',
			skycodeday: '31',
			skytextday: 'Despejado',
			date: '2022-07-20',
			day: 'miércoles',
			shortday: 'mi.',
			precip: ''
		},
		...
	]
	*/
} catch (err) {
    console.log(err)
}
```


## Disclaimer
This project is fully for educational purposes.