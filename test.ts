import { API } from './src/index';

const test = async () => {
    try {
        const city = await API.search('Broklyn, NY', { degree: 'F', lang: 'en-US' })
        console.log('Info: ', city.info())
        console.log('Current: ', city.current())
        console.log('Forecast: ', city.forecast())
    } catch (err) {
        console.log(err)
    }
};

test();
