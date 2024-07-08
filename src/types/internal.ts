export type BaseOptions = {
    lang?: string;
    degree?: string;
    timeout?: number;
}

export type WeatherJSInfo = {
    location_code: string;
    location_name: string;
    degree: string;
    provider: {
        name: string;
        url: string;
    },
    coords: {
        latitude: string;
        longitude: string;
    },
    timezone: string;
}