"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static associate(models) {
      // define association here
    }

    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const overdueItems = await Todo.overdue();
      const overduelist = overdueItems
        .map((todo) => todo.displayableString())
        .join("\n");
      console.log(overduelist);
      console.log("\n");

      console.log("Due Today");
      const dueTodayItems = await Todo.dueToday();
      const dueTodayList = dueTodayItems
        .map((todo) => todo.displayableString())
        .join("\n");
      console.log(dueTodayList);
      console.log("\n");

      console.log("Due Later");
      const dueLaterItems = await Todo.dueLater();
      const dueLaterList = dueLaterItems
        .map((todo) => todo.displayableString())
        .join("\n");
      console.log(dueLaterList);
    }

    static async overdue() {
      try {
        const all = await Todo.findAll();
        const date = new Date().toISOString().slice(0, 10);

        return all.filter((todo) => {
          return todo.dueDate < date;
        });
      } catch (error) {
        console.error(error);
      }
    }

    static async dueToday() {
      try {
        const all = await Todo.findAll();
        const date = new Date().toISOString().slice(0, 10);

        return all.filter((todo) => {
          return todo.dueDate === date;
        });
      } catch (error) {
        console.error(error);
      }
    }

    static async dueLater() {
      try {
        const all = await Todo.findAll();
        const date = new Date().toISOString().slice(0, 10);

        return all.filter((todo) => {
          return todo.dueDate > date;
        });
      } catch (error) {
        console.error(error);
      }
    }

    static async markAsComplete(id) {
      try {
        await Todo.update(
          { completed: true },
          {
            where: {
              id: id,
            },
          },
        );
      } catch (error) {
        console.error(error);
      }
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      let dueDate =
        this.dueDate === new Date().toISOString().slice(0, 10)
          ? ""
          : this.dueDate;
      return `${this.id}. ${checkbox} ${this.title} ${dueDate}`;
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
