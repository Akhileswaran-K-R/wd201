const todoList = () => {
  all = [];
  var dateToday = new Date();
  var date = Number(dateToday.getDate());
  var month = Number(dateToday.getMonth());
  var year = Number(dateToday.getFullYear());

  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    arr = [];
    all.forEach((task) => {
      dueDate = task.dueDate.split("-").map((due) => {
        return Number(due);
      });

      if (
        year > dueDate[0] ||
        (year === dueDate[0] && month > dueDate[1]) ||
        (year === dueDate[0] && month === dueDate[1] && date > dueDate[2])
      ) {
        arr.push(task);
      }
    });
    return arr;
  };

  const dueToday = () => {
    arr = [];
    all.forEach((task) => {
      dueDate = task.dueDate.split("-").map((due) => {
        return Number(due);
      });

      if (year === dueDate[0] && month === dueDate[1] && date === dueDate[2]) {
        arr.push(task);
      }
    });
    return arr;
  };

  const dueLater = () => {
    arr = [];
    all.forEach((task) => {
      dueDate = task.dueDate.split("-").map((due) => {
        return Number(due);
      });

      if (
        year < dueDate[0] ||
        (year === dueDate[0] && month < dueDate[1]) ||
        (year === dueDate[0] && month === dueDate[1] && date < dueDate[2])
      ) {
        arr.push(task);
      }
    });
    return arr;
  };

  const toDisplayableList = (list, num = 0) => {
    str = "";
    list.forEach((task) => {
      if (task.completed) {
        str += `[X] ${task.title} `;
      } else {
        str += `[ ] ${task.title} `;
      }

      if (num === 1) {
        str += task.dueDate + "\n";
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
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);

todos.add({ title: "Submit assignment", dueDate: yesterday, completed: false });
todos.add({ title: "Pay rent", dueDate: today, completed: true });
todos.add({ title: "Service Vehicle", dueDate: today, completed: false });
todos.add({ title: "File taxes", dueDate: tomorrow, completed: false });
todos.add({ title: "Pay electric bill", dueDate: tomorrow, completed: false });

console.log("My Todo-list\n");

console.log("Overdue");
var overdues = todos.overdue();
var formattedOverdues = todos.toDisplayableList(overdues, 1);
console.log(formattedOverdues);
console.log("\n");

console.log("Due Today");
let itemsDueToday = todos.dueToday();
let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday);
console.log(formattedItemsDueToday);
console.log("\n");

console.log("Due Later");
let itemsDueLater = todos.dueLater();
let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater, 1);
console.log(formattedItemsDueLater);
console.log("\n\n");
