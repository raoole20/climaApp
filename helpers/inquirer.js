const inquirer = require('inquirer');
require('colors');

let menuOpts = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: 1,
                name:  `${'1.'.green} Buscar ciudad`,
            }, 
            {
                value: 2,
                name:  `${'2.'.green} Historial`,
            }, 
            {
                value: 0,
                name:  `${'0.'.red} salir`,
            }, 
        ]
    }
];

const inquirerMenu = async () => {

    
    console.log("=========================".green);
    console.log("  Seleccione una opcion  ");
    console.log("=========================\n".green);

    const { opcion } = await inquirer.prompt( menuOpts );
    return opcion;
}

let menuOpts2 = [
    {
        type: 'input',
        name: 'respuesta',
        message: `Presione ${ 'Enter'.green} para continuar`
    }
];

const pausa = async(  ) =>{
    return await inquirer.prompt(  menuOpts2 );
}

const leerInput = async ( message ) => {
    const question = {
        type: 'input',
        name: 'desc',
        message,
        validate( value ){
            if( value.length === 0){
                return "Por favor ingresar un valor";
            }
            return true;
        },
    }

    const {desc} = await inquirer.prompt( question );
    return desc;
}



const mostrarCiudades = async ( arrayLugares = [] ) =>{

    const choices = arrayLugares.map( (lugar, i) => {
        const {  place_name_es } = lugar;
        i++;
        return {
            value: lugar,
            name: `   ${(i + '.').green} ${place_name_es} `
        }
    });
    const menuOpts3 = [ {
        type: 'list',
        name: 'lugar',
        message: 'Seleccionar Cuidad',
        choices: choices
    }]
    const {lugar} = await inquirer.prompt( menuOpts3 );
    return lugar;

}

const confirmar = async (message)=>{

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const checkList = async ( tareas ) =>{

    const choices = tareas.map( (tarea, i) => {
        const { desc } = tarea;
        return {
            value: tarea.id,
            name: `${(i + '.').green} ${desc} `,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });
    const menuOpts3 = [ {
        type: 'checkbox',
        name: 'ids',
        message: 'Seleccione',
        choices
    }]

    const {ids} = await inquirer.prompt( menuOpts3 );
    return ids;

}
module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    mostrarCiudades,
    confirmar,
    checkList
}