import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { BaseOptions, WeatherJSInfo } from './types/internal';
import { MSNForecast, MSNResponse, MSNWeather } from './types/external';

const Parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: ""
})

const baseUrl = 'http://weather.service.msn.com/find.aspx?src=outlook&weadegreetype={degree}&culture={lang}&weasearchstr={city}';

class API {

    lang: string;
    degree: string;
    timeout: number;
    city?: any;
    _raw?: MSNResponse;

    /**
     * Use API.search instead.
     * @param {BaseOptions} options 
     * @private // idk if it does something outside of typescript, but there it is
     */
    constructor(options: BaseOptions) {
        this.lang = options?.lang ?? 'en-US';
        this.degree = options?.degree ?? 'F';
        this.timeout = options?.timeout ?? 10_000; // 10 seconds
    }

    /**
     * Search a city or place and returns an instance of the class
     * @param {String} city Place to search
     * @param {BaseOptions} options
     * @returns API Instance
     */
    static async search(city: string, options: BaseOptions = {}) {
        if (!city) throw new Error('Please provide a city to search for')
        const instance = new API({ ...options });
        try {
            const { data } = await axios.get(baseUrl.replace('{degree}', instance.degree).replace('{lang}', instance.lang).replace('{city}', city), { timeout: instance.timeout });
            instance._raw = Parser.parse(data);
            instance.city = instance._raw?.weatherdata?.weather?.[0] || instance._raw?.weatherdata?.weather;
        } catch (err) {
            if (err.message.includes('code 500')) throw new Error('Server Internal Error')
            throw new Error(err.message)
        }
        if (!instance.city) throw new Error(instance._raw as unknown as string) // raw is a string when erroing
        return instance;
    }
    /**
     * Current
     * @returns current weather with observation time
     */
    current(): MSNWeather["current"] {
        return this.city.current;
    }

    /**
     * Forecast
     * @returns next days weather forecast
     */
    forecast(): MSNForecast {
        return this.city.forecast;
    }
    /**
     * Info
     * @returns next days weather forecast
     */
    info(): WeatherJSInfo {
        const city = this.city;
        const data = {
            location_code: city.weatherlocationcode,
            location_name: city.weatherlocationname,
            degree: city.degreetype,
            provider: {
                name: city.provider,
                url: city.attribution
            },
            coords: {
                latitude: city.lat,
                longitude: city.long,
            },
            timezone: city.timezone
        };

        return data;
    }

    /**
     * Raw
     */
    get raw(): MSNResponse | string { return this._raw; }
}

export default API;
export {
    API
}