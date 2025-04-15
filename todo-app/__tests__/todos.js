/* eslint-disable no-undef */
const request = require("supertest");
const db = require("../models/index");
const app = require("../app");
const cheerio = require("cheerio");

let server, agent;

function extractCsrfToken(res) {
  const $ = cheerio.load(res.text);
  return $("[name=_csrf]").val();
}

describe("Todo test suite", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    server = app.listen(4000, () => {});
    agent = request.agent(server);
  });

  afterAll(async () => {
    await db.sequelize.close();
    server.close();
  });

  test("Create a new todo", async () => {
    const res = await agent.get("/");
    const csrfToken = extractCsrfToken(res);
    const response = await agent.post("/todos").send({
      title: "Buy Milk",
      dueDate: new Date().toISOString().slice(0, 10),
      _csrf: csrfToken,
    });

    expect(response.statusCode).toBe(302);
  });

  test("Updating a todo", async () => {
    let res = await agent.get("/");
    let csrfToken = extractCsrfToken(res);

    await agent.post("/todos").send({
      title: "Buy Milk",
      dueDate: new Date().toISOString().slice(0, 10),
      _csrf: csrfToken,
    });

    let groupedTodosResponse = await agent
      .get("/")
      .set("Accept", "application/json");

    let parsedGroupedResponse = JSON.parse(groupedTodosResponse.text);
    const dueTodayCount = parsedGroupedResponse.dueTodayItems.length;
    let latestTodo = parsedGroupedResponse.dueTodayItems[dueTodayCount - 1];

    res = await agent.get("/");
    csrfToken = extractCsrfToken(res);

    let markCompleteResponse = await agent.put(`/todos/${latestTodo.id}`).send({
      _csrf: csrfToken,
      completed: latestTodo.completed,
    });
    let parsedUpdatedResponse = JSON.parse(markCompleteResponse.text);
    expect(parsedUpdatedResponse.completed).toBe(true);

    groupedTodosResponse = await agent
      .get("/")
      .set("Accept", "application/json");

    parsedGroupedResponse = JSON.parse(groupedTodosResponse.text);
    const completedCount = parsedGroupedResponse.completedItems.length;
    latestTodo = parsedGroupedResponse.completedItems[completedCount - 1];

    res = await agent.get("/");
    csrfToken = extractCsrfToken(res);

    markCompleteResponse = await agent.put(`/todos/${latestTodo.id}`).send({
      _csrf: csrfToken,
      completed: latestTodo.completed,
    });
    parsedUpdatedResponse = JSON.parse(markCompleteResponse.text);
    expect(parsedUpdatedResponse.completed).toBe(false);
  });

  test("Delete a todo", async () => {
    let res = await agent.get("/");
    let csrfToken = extractCsrfToken(res);
    await agent.post("/todos").send({
      title: "Buy Milk",
      dueDate: new Date().toISOString().slice(0, 10),
      _csrf: csrfToken,
    });

    const groupedTodosResponse = await agent
      .get("/")
      .set("Accept", "application/json");

    const parsedGroupedResponse = JSON.parse(groupedTodosResponse.text);
    const dueTodayCount = parsedGroupedResponse.dueTodayItems.length;
    const latestTodo = parsedGroupedResponse.dueTodayItems[dueTodayCount - 1];

    res = await agent.get("/");
    csrfToken = extractCsrfToken(res);

    const deleteResponse = await agent.delete(`/todos/${latestTodo.id}`).send({
      _csrf: csrfToken,
    });
    const result = JSON.parse(deleteResponse.text);
    expect(result).toBe(true);
  });
});
