const todoList = () => {
  let all = [];

  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    let arr = [];
    all.forEach((task) => {
      if (new Date().toISOString().slice(0, 10) > task.dueDate) {
        arr.push(task);
      }
    });
    return arr;
  };

  const dueToday = () => {
    let arr = [];
    all.forEach((task) => {
      if (new Date().toISOString().slice(0, 10) === task.dueDate) {
        arr.push(task);
      }
    });
    return arr;
  };

  const dueLater = () => {
    let arr = [];
    all.forEach((task) => {
      if (new Date().toISOString().slice(0, 10) < task.dueDate) {
        arr.push(task);
      }
    });
    return arr;
  };

  const toDisplayableList = (list) => {
    let str = "";
    list.forEach((task) => {
      if (task.completed) {
        str += `[x] ${task.title}`;
      } else {
        str += `[ ] ${task.title}`;
      }

      if (task.dueDate != new Date().toISOString().slice(0, 10)) {
        str += ` ${task.dueDate}\n`;
      } else {
        str += "\n";
      }
    });
    return str;
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

const todos = todoList();

const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1)),
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1)),
);

todos.add({ title: "Submit assignment", dueDate: yesterday, completed: false });
todos.add({ title: "Pay rent", dueDate: today, completed: true });
todos.add({ title: "Service Vehicle", dueDate: today, completed: false });
todos.add({ title: "File taxes", dueDate: tomorrow, completed: false });
todos.add({ title: "Pay electric bill", dueDate: tomorrow, completed: false });

console.log("My Todo-list\n");

console.log("Overdue");
var overdues = todos.overdue();
var formattedOverdues = todos.toDisplayableList(overdues);
console.log(formattedOverdues);

console.log("\nDue Today");
let itemsDueToday = todos.dueToday();
let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday);
console.log(formattedItemsDueToday);

console.log("\nDue Later");
let itemsDueLater = todos.dueLater();
let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater);
console.log(formattedItemsDueLater);

module.exports = todoList;
