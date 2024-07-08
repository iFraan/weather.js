export type BaseOptions = {
    lang?: string;
    degree?: 'C' | 'F';
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