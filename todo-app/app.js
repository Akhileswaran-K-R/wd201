/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
const csrf = require("tiny-csrf");
const cookieParser = require("cookie-parser");
const path = require("path");

app.use(bodyParser.json()); //for parsing the request body

app.use(express.urlencoded({ extended: false })); //for taking the details from url

app.use(cookieParser("shh! some secret string"));
app.use(csrf("this_should_be_32_character_long", ["POST", "PUT", "DELETE"]));

app.set("view engine", "ejs"); //set the ejs engine

app.get("/", async (request, response) => {
  const overdueItems = await Todo.overdue();
  const dueTodayItems = await Todo.dueToday();
  const dueLaterItems = await Todo.dueLater();
  const completedItems = await Todo.completed();

  if (request.accepts("html")) {
    response.render("index", {
      overdueItems,
      dueTodayItems,
      dueLaterItems,
      completedItems,
      csrfToken: request.csrfToken(),
    }); //render the ejs  page to display
  } else {
    //for postman or other api checking
    return response.json({
      overdueItems,
      dueTodayItems,
      dueLaterItems,
      completedItems,
    });
  }
});

app.use(express.static(path.join(__dirname, "public"))); //for rendering static contents like css and js

app.get("/todos", async (request, response) => {
  try {
    const todos = await Todo.findAll();
    return response.json(todos);
  } catch (error) {
    console.error(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async (request, response) => {
  console.log("Creating a todo", request.body);
  try {
    await Todo.addTodo({
      title: request.body.title,
      dueDate: request.body.dueDate,
    });
    return response.redirect("/");
  } catch (error) {
    console.error(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id", async (request, response) => {
  console.log("We have to update a todo with id:", request.params.id);
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.setCompletionStatus(request.body.completed);
    return response.json(updatedTodo);
  } catch (error) {
    console.error(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async (request, response) => {
  console.log("Delete a todo by id:", request.params.id);
  try {
    const todo = await Todo.findByPk(request.params.id);
    await todo.destroy();
    return response.json(true);
  } catch (error) {
    console.error(error);
    return response.status(422).json(false);
  }
});

module.exports = app;
