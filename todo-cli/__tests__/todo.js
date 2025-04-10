/* eslint-disable no-undef */
const todoList = require("../todo");

const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();

describe("TodoList Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
  });

  test("Checks retrieval of due today items", () => {
    let duesToday = dueToday();
    expect(duesToday.length).toBe(1);
  });

  test("Checks creating a new todo", () => {
    const todoItemCount = all.length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(all.length).toBe(todoItemCount + 1);
  });

  test("Checks marking a todo as completed", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("checks retrieval of overdue items", () => {
    add({
      title: "Test overdue",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .slice(0, 10),
    });
    let overdues = overdue();
    expect(overdues.length).toBe(1);
  });

  test("Checks retrieval of due later items", () => {
    add({
      title: "Test overdue",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .slice(0, 10),
    });
    let duesLater = dueLater();
    expect(duesLater.length).toBe(1);
  });
});
