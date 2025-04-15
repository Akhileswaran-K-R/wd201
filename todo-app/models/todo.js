"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static addTodo({ title, dueDate }) {
      return this.create({
        title: title,
        dueDate: dueDate,
        completed: false,
      });
    }

    static getTodos() {
      return this.findAll();
    }

    static async overdue() {
      let allTodos = await this.getTodos();
      const date = new Date().toISOString().slice(0, 10);

      return allTodos.filter((todo) => {
        return todo.dueDate < date && !todo.completed;
      });
    }

    static async dueToday() {
      let allTodos = await this.getTodos();
      const date = new Date().toISOString().slice(0, 10);

      return allTodos.filter((todo) => {
        return todo.dueDate === date && !todo.completed;
      });
    }

    static async dueLater() {
      let allTodos = await this.getTodos();
      const date = new Date().toISOString().slice(0, 10);

      return allTodos.filter((todo) => {
        return todo.dueDate > date && !todo.completed;
      });
    }

    static async completed() {
      let allTodos = await this.getTodos();

      return allTodos.filter((todo) => {
        return todo.completed;
      });
    }

    setCompletionStatus(status) {
      return this.update({ completed: !status });
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    },
  );
  return Todo;
};
