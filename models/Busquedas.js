const fs = require('fs')
const axios = require('axios')

class Busquedas {

    

    constructor() {
        // leer bd si existe
        this.path = 'db/databases.json';
        this.historial = this.leerDB();
    }
    get params(){
        return {
            'access_token': process.env.MAPBOX_KEY || '',
            'limit': 5,
            'language': 'es'
        }   ;
    }

    async ciudad(lugar = '') {

        try {
            // preticion HTTP
            const  intance = axios.create( {
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.params
            })
            const  respuesta = await intance.get(  );
            const  cuidades  = respuesta.data.features
            return cuidades; // retirnar los lugares

        }catch( err ){
           console.log( err );
        }
    }
    get params2() {
         return {
             appid: process.env.OpenWeather_KEY,
             units: "metric",
             lang: 'es'
         }
    }
    async temp( q ){

        try{
            // const intanc = await axios.default.get('http://api.openweathermap.org/data/2.5/weather?id=524901&appid=c6ff32c5ed22d31e9f0933c504b4bbd6&lang=es&lat=10.63333&lan=-71.63333&units=metric');
            const intac = axios.create( {
                baseURL: "http://api.openweathermap.org/data/2.5/weather",
                params: { ...this.params2, q}
            })
            const intance = await intac.get(); 
            
            const { temp, temp_min, temp_max } = intance.data['main'];
            return { temp, temp_min , temp_max };
        }catch( err ){
            console.log('ha ocurrido un error')
            return  { 
                temp :  null, 
                temp_min :  null, 
                temp_max  : null
            };
        }

    }

    agregarHistorial( lugar = ''){
      
        if( this.historial.includes( lugar.toLocaleLowerCase() ) ) return;
        this.historial.unshift( lugar.toLocaleLowerCase() );
        this.guardarDB();
    }

    guardarDB(){
        fs.writeFileSync( this.path, JSON.stringify( this.historial ));
    }

    leerDB(){

        const respuesta =  fs.readFileSync( this.path, { encoding: 'utf-8'});
        const data = JSON.parse(respuesta);
        console.log(data);
        return data;
    }
}


module.exports = Busquedas;