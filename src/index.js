const axios = require('axios');
const {XMLParser} = require('fast-xml-parser');

const P = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix : ""
})

const baseUrl = 'http://weather.service.msn.com/find.aspx?src=outlook&weadegreetype={degree}&culture={lang}&weasearchstr={city}';

class API {

    constructor(options = {}){
        this.lang = options.lang || 'en-US';
        this.degree = options.degree || 'F';
        this.timeout = options.timeout || 10_000; // 10 seconds
        this._raw = {}
    }

    /**
     * Search a city or place and returns an instance of the class
     * @param {String} city Place to search
     * @param {String} options.lang Optional language 
     * @param {String} options.degree Either C o F
     * @param {Number} options.timeout Default 10 seconds
     * @returns API Instance
     */
    static async search(city, options = {}) {
        if (!city) throw new Error('Please provide a city to search for')
        const W = new API({...options});
        try {
            const res = await axios.get(baseUrl.replace('{degree}', W.degree).replace('{lang}', W.lang).replace('{city}', city), {timeout: W.timeout});
            W._raw = P.parse(res.data);
            W.city = W._raw?.weatherdata?.weather?.[0] || W._raw?.weatherdata?.weather;
        } catch (err) {
            if (err.message.includes('code 500')) throw new Error('Server Internal Error')
            throw new Error(err.message)
        }
        if (!W.city) throw new Error(W._raw)
        return W;
    }
    /**
     * Current
     * @returns current weather with observation time
     */
    current() {
        return this.city.current;
    }

    /**
     * Forecast
     * @returns next days weather forecast
     */
    forecast() {
        return this.city.forecast;
    }
    /**
     * Info
     * @returns next days weather forecast
     */
    info() {
        const C = this.city;
        const INFO = {
            location_code: C.weatherlocationcode,
            location_name: C.weatherlocationname,
            degree: C.degreetype,
            provider: {
                name: C.provider,
                url: C.attribution
            },
            coords: {
                latitude: C.lat,
                longitude: C.long,
            },
            timezone: C.timezone
        };

        return INFO;
    }

    /**
     * Raw
     */
    get raw() { return this._raw; }
}


module.exports = {
    API
}