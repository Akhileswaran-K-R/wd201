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
      Todo.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }

    static addTodo({ title, dueDate, userId }) {
      return this.create({
        title: title,
        dueDate: dueDate,
        completed: false,
        userId,
      });
    }

    static getTodos(userId) {
      return this.findAll({
        where: {
          userId,
        },
      });
    }

    static async overdue(userId) {
      let allTodos = await this.getTodos(userId);
      const date = new Date().toISOString().slice(0, 10);

      return allTodos.filter((todo) => {
        return todo.dueDate < date && !todo.completed;
      });
    }

    static async dueToday(userId) {
      let allTodos = await this.getTodos(userId);
      const date = new Date().toISOString().slice(0, 10);

      return allTodos.filter((todo) => {
        return todo.dueDate === date && !todo.completed;
      });
    }

    static async dueLater(userId) {
      let allTodos = await this.getTodos(userId);
      const date = new Date().toISOString().slice(0, 10);

      return allTodos.filter((todo) => {
        return todo.dueDate > date && !todo.completed;
      });
    }

    static async completed(userId) {
      let allTodos = await this.getTodos(userId);

      return allTodos.filter((todo) => {
        return todo.completed;
      });
    }

    setCompletionStatus(status) {
      return this.update({ completed: !status });
    }

    static async remove(id, userId) {
      return this.destroy({
        where: {
          id,
          userId,
        },
      });
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
