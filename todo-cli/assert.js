let toggleTodoCompletionStatus = (todoItem) => {
  return todoItem;
};

let testToggleCompletion = () => {
  let item = {
    title: "Buy Milk",
    completed: false,
  };

  item = toggleTodoCompletionStatus(item);
  console.assert(item.completed === true, "Todo item should be completed");
};

testToggleCompletion();
