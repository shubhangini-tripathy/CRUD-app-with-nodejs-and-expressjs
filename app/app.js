var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');//currently not using
import dummydb from '../db/db';


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// mongoose.connect('mongoDb://localhost/bookstore', { useNewUrlParser: true });
// mongoose.connection;

//update todo
app.put('/api/v1/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  let todoFound;
  let itemIndex;
  dummydb.map((todo, index) => {
    if (todo.id === id) {
      todoFound = todo;
      itemIndex = index;
    }
  });

  if (!todoFound) {
    return res.status(404).send({
      success: 'false',
      message: 'todo not found',
    });
  }

  if (!req.body.name) {
    return res.status(400).send({
      success: 'false',
      message: 'name is required',
    });
  } else if (!req.body.id) {
    return res.status(400).send({
      success: 'false',
      message: 'id is required',
    });
  }

  const updatedTodo = {
    id: todoFound.id,
    name: req.body.name || todoFound.name,
    id: req.body.id || todoFound.id,
  };

  db.splice(itemIndex, 1, updatedTodo);

  return res.status(201).send({
    success: 'true',
    message: 'todo added successfully',
    updatedTodo,
  });
});

app.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  dummydb.map((todo, index) => {
    if (todo.id === id) {
      dummydb.splice(index, 1);
      return res.status(200).send({
        success: 'true',
        message: 'Todo deleted successfuly',
      });
    }
  });


  return res.status(404).send({
    success: 'false'
  });

});

app.get('/:id', (req, res) => {
  ///get a single todo
  const id = parseInt(req.params.id, 10);
  console.log(dummydb,id)
  dummydb.map((todo) => {
    if (todo.id === id) {
      return res.status(200).send({
        success: 'true',
        message: 'todo retrieved successfully',
        todo,
      });
    };
  });
  return res.status(404).send({
    success: 'false',
    message: 'todo does not exist',
  });
});
//create todo
app.post('/', (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      success: 'false',
      message: 'name is required'
    });
  } else if (!req.body.id) {
    return res.status(400).send({
      success: 'false',
      message: 'id is required'
    });
  }
  const todo = {
    id: dummydb.length + 1,
    name: req.body.name
  }
  dummydb.push(todo);


  return res.status(201).send({
    success: 'true',
    message: 'this is a todo app',
    todo
  });
});

app.listen(3000);
console.log("running on port 3000");

