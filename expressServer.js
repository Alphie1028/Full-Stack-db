const express = require('express');
const pool = require('./dbConn');

const app = express();
app.use(express.json());
const port = 3000;

//connection pool to the PSQL db


//defining a route that returns all the games with their devs
app.get('/api/games',(req, res)=>{
    pool.query('SELECT * FROM games', (err, result)=>{
        if(err){
            return res.send(err);
        }
        let rows = result.rows;
        res.send(rows);
    });
});

//defining a  route that returns a specific game by id
app.get('/api/games/:id', (req, res)=>{
    const id = Number.parseInt(req.params.id);
    pool.query('SELECT * FROM games WHERE id=' + id, (err, result)=>{
        if(err){
            return res.send(err);
        }
        let rows = result.rows[0];
        res.send(rows);
    });
});

//defining a route that adds a new game, and then returns it
app.post('/api/games', (req, res)=>{
    const {name, genre, developer_id} = req.body;
    pool.query('INSERT INTO games (name, genre, developer_id) VALUES($1, $2, $3) RETURNING*', [name, genre, developer_id], (err, result)=>{
        if(err){
            return res.send(err);
        }
        let rows = result.rows[0];
        res.send(rows);
    });
});

//defining a route that takes a game by id and then updates, or or more values within that game, and returns that game
app.patch('/api/games/:id', (req, res)=>{
    const id = Number.parseInt(req.params.id);
    const {name, genre, developer_id} = req.body;
    let values = [];
    let updateQuery = 'UPDATE games SET ';
    if(name){
        values.push(name);
        updateQuery += 'name=$' + values.length + ',';
    }
    if(genre){
        values.push(genre);
        updateQuery += 'genre=$' + values.length + ',';
    }
    if(developer_id){
        values.push(developer_id);
        updateQuery += 'developer_id=$' + values.length + ',';
    }
    updateQuery = updateQuery.slice(0, -1);
    updateQuery += ' WHERE id=' + id + ' RETURNING *';
    console.log(updateQuery);
    pool.query(updateQuery, values, (err, result)=>{
        if(err){
            return res.send(err);
        }
        let rows = result.rows[0];
        res.send(rows);
    });
});

//defining a route to delete a game based on id, and then return the deleted game
app.delete('/api/games/:id', (req, res)=>{
    const id = Number.parseInt(req.params.id);
    pool.query('DELETE FROM games WHERE id=$1 RETURNING *', [id], (err, result)=>{
        if(err){
            return res.send(err);
        }
        let rows = result.rows[0];
        res.send(rows);
    });
});

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});