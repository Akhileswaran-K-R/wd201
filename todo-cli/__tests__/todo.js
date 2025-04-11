/* eslint-disable no-undef */
// /* eslint-disable no-undef */
// const todoList = require("../todo");

// const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();

// describe("TodoList Test Suite", () => {
//   beforeAll(() => {
//     add({
//       title: "Test todo",
//       completed: false,
//       dueDate: new Date().toISOString().slice(0, 10),
//     });
//   });

//   test("Checks creating a new todo", () => {
//     const todoItemCount = all.length;
//     add({
//       title: "Test todo",
//       completed: false,
//       dueDate: new Date().toISOString().slice(0, 10),
//     });
//     expect(all.length).toBe(todoItemCount + 1);
//   });

//   test("Checks marking a todo as completed", () => {
//     expect(all[0].completed).toBe(false);
//     markAsComplete(0);
//     expect(all[0].completed).toBe(true);
//   });

//   test("checks retrieval of overdue items", () => {
//     let num = overdue().length;
//     add({
//       title: "Test overdue",
//       completed: false,
//       dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
//         .toISOString()
//         .slice(0, 10),
//     });
//     let overdues = overdue();
//     expect(overdues.length).toBe(num + 1);
//   });

//   test("Checks retrieval of due today items", () => {
//     let num = dueToday().length;
//     add({
//       title: "Test due today",
//       completed: false,
//       dueDate: new Date().toISOString().slice(0, 10),
//     });
//     let duesToday = dueToday();
//     expect(duesToday.length).toBe(num + 1);
//   });

//   test("Checks retrieval of due later items", () => {
//     let num = dueLater().length;
//     add({
//       title: "Test due later",
//       completed: false,
//       dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
//         .toISOString()
//         .slice(0, 10),
//     });
//     let duesLater = dueLater();
//     expect(duesLater.length).toBe(num + 1);
//   });
// });

const db = require("../models");

describe("Todolist Test Suite", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  test("Should add new todo", async () => {
    const todoItemsCount = await db.Todo.count();
    await db.Todo.addTask({
      title: "Test todo",
      completed: false,
      dueDate: new Date(),
    });
    const newTodoItemsCount = await db.Todo.count();
    expect(newTodoItemsCount).toBe(todoItemsCount + 1);
  });
});
