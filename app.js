require('dotenv').config();

const { leerInput, pausa, inquirerMenu, mostrarCiudades } = require('./helpers/inquirer');
const Busquedas = require('./models/Busquedas');

const main = async () =>{

    const busquedas = new Busquedas();
    let opt;

    do{
        console.clear();

        opt = await inquirerMenu();
        
        switch ( opt) {
            case 1:
                //mostrar mensaje
                const lugar = await leerInput('Ciudad: ');
                // BUscarel lugar
                const arrayLugares = await busquedas.ciudad(lugar);

                // Seleccionar el lugar 
                const resultado = await mostrarCiudades( arrayLugares );
                busquedas.agregarHistorial( resultado.place_name_es );
                const tmp = await busquedas.temp(  resultado. text  );

                // Clima
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('   Cuidad: ', resultado.place_name_es );
                console.log('   Lat: ', resultado.center[1] );
                console.log('   Lng: ', resultado.center[0] );
                console.log('   Temperatura: ', tmp.temp );
                console.log('   Minima: ', tmp.temp_min );
                console.log('   maxima: ', tmp.temp_max );
                break;
        
            default:
            case 2:  
                busquedas.leerDB();
                break;
        }
        console.log( opt );


        if( opt!== 0 ) await pausa();

    }while( opt !== 0);
   
}

main();