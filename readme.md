<div align="center">
	<h1>weather.js</h1>
	<a href="https://www.codefactor.io/repository/github/ifraan/weather.js"><img src="https://www.codefactor.io/repository/github/ifraan/weather.js/badge" alt="CodeFactor" /></a>
	<a href="https://www.npmjs.com/package/@ifraan_/weather.js"><img src="https://badgen.net/npm/v/@ifraan_/weather.js?color=blue" alt="NPM-Version"/></a>
	<a href="https://www.npmjs.com/package/@ifraan_/weather.js"><img src="https://badgen.net/npm/dt/@ifraan_/weather.js?color=blue" alt="NPM-Downloads"/></a>
	<a href="https://github.com/iFraan/weather.js"><img src="https://badgen.net/github/stars/iFraan/weather.js?color=yellow" alt="Github Stars"/></a>
	<a href="https://github.com/iFraan/weather.js/issues"><img src="https://badgen.net/github/issues/iFraan/weather.js?color=green" alt="Issues"/></a>
   <h2>This a typesafe wrapper of the unnoficial MSN weather API</h2>
</div>

## Instalattion

No apiKey, its free.

### Dependencies

``
axios
fast-xml-parser
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

| Methods  | Description                  |
| -------- | ---------------------------- |
| info     | Generical info               |
| current  | Current weather              |
| forecast | Forecast for the next 5 days |

Example code:

```js
const { API } = require('@ifraan_/weather.js');

try {
    const city = await API.search('Broklyn, NY', { degree: 'F', lang: 'en-US' })
    console.log('Info: ', city.info())
    /*
    Info:  {
        location_code: 'wc:USNY0996',
        location_name: 'Brooklyn, NY',
        degree: 'F',
        provider: { name: 'Foreca', url: 'http://www.foreca.com/' },
        coords: { latitude: '40.692', longitude: '-73.99' },
        timezone: '0'
    }
    */
    console.log('Current: ', city.current())
    /*
    Current:  {
        temperature: '85',
        skycode: '32',
        skytext: 'Sunny',
        date: '2024-07-08',
        observationtime: '13:20:00',
        observationpoint: 'Brooklyn, NY',
        feelslike: '99',
        humidity: '70',
        winddisplay: '3 mph Northeast',
        day: 'Monday',
        shortday: 'Mon',
        windspeed: '3 mph'
    }
    */
    console.log('Forecast: ', city.forecast())
    /*
    Forecast:  [
        {
            low: '75',
            high: '90',
            skycodeday: '34',
            skytextday: 'Mostly sunny',
            date: '2024-07-08',
            day: 'Monday',
            shortday: 'Mon',
            precip: '6'
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
