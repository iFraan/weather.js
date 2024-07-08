export type MSNForecast = {
    low: string;
    high: string;
    skycodeday: string;
    skytextday: string;
    date: string;
    day: string;
    shortday: string;
    precip: string;
};

export type MSNWeather = {
    current: {
        temperature: string;
        skycode: string;
        skytext: string;
        date: string;
        observationtime: string;
        observationpoint: string;
        feelslike: string;
        humidity: string;
        winddisplay: string;
        day: string;
        shortday: string;
        windspeed: string;
    },
    forecast: MSNForecast[],
    toolbar: { timewindow: string, minversion: string; },
    weatherlocationcode: string;
    weatherlocationname: string;
    url: string;
    imagerelativeurl: string;
    degreetype: string;
    provider: string;
    attribution: string;
    attribution2: string;
    lat: string;
    long: string;
    timezone: string;
    alert: string;
    entityid: string;
    encodedlocationname: string;
};

export type MSNResponse = {
    weatherdata: {
        weather: MSNWeather[] | MSNWeather;
    };
};