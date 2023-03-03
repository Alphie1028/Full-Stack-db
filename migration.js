const {Pool} = require('pg');
const pool = require('./dbConn');

pool.query(`
    CREATE TABLE developers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
)`, (err, res)=>{
    if(err){
        return res.send(err);
    }


    pool.query(`
        CREATE TABLE games (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            genre VARCHAR(255) NOT NULL,
            developer_id INT NOT NULL,
            FORIGN KEY (developer_id) REFRENCES developers (id)
        )
    `, (err, res)=>{
        if(err){
            return res.send(err);
        } else{
            console.log('Tables made');
        }
        pool.end();
    })
});