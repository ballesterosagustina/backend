const knex = require('knex');



async function createTable(options ,name, schema) {
    const knexInstance = knex(options);

    const exist = await knexInstance.schema.hasTable(name);
    if (exist) {
        console.log(`La tabla ${name} ya existe`);
        return;
    }

    try {
        await knexInstance.schema.createTable(name, schema);
        console.log(`Tabla ${name} creada`); 
    } catch (error) {
        console.log(error.message);
        throw error;
    } finally {
        knexInstance.destroy();
    }
}

async function selectData(options, database) {
    const knexInstance = knex(options);
    try {
        const data = await knexInstance.from(database).select('*');
        return data;
    } catch (error) {
        console.log(error.message);
        throw error;
    } finally {
        knexInstance.destroy();
    }
}


async function insertData(options, database, data) {
    const knexInstance = knex(options);
    try {
        await knexInstance(database).insert(data);
        console.log(`Datos insertados en la tabla ${database}`);
    } catch (error) {
        console.log(error.message);
        throw error;
    } finally {
        knexInstance.destroy();
    }
}



module.exports = { createTable, selectData , insertData };