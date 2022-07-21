const { API } = require('./index');

const m = async () => {
    try {
        const city = await API.search('Broklyn, NY', {degree: 'F', lang: 'es-ES'})
        console.log('Info: ', city.info())
        console.log('Current: ', city.current())
        console.log('Forecast: ', city.forecast())
    } catch (err) {
        console.log(err)
    }
}
m()
