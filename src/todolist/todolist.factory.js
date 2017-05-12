(function () {
'use strict';

angular.module('TodoList')
.factory('TodoListFactory', TodoListFactory);


function TodoListFactory() {
  var factory = function (maxTodos) {
    return new TodoListService(maxTodos);
  };

  return factory;
}


// If not specified, maxTodos assumed unlimited
function TodoListService(maxTodos) {
  var service = this;

  // List of todos
  var todos = [];

  // Pre-populate a todo list
  todos.push({
    title: "Init",
    plannedEffort: "15 min",
    details: "Call Marcus for a team meeting appointment",
    dueDate: 20170519
  });
  todos.push({
    title: "meeting X",
    plannedEffort: "2 hours",
    details: "talk about the strategy",
    dueDate: 20170530
  });
  todos.push({
    title: "first version",
    plannedEffort: "5 days",
    details: "show simple todo list",
    dueDate: 20170630
  });

  service.addItem = function (pTitle, pPlannedEff, pDetails, pDueDate) {
    if ((maxTodos === undefined) ||
        (maxTodos !== undefined) && (todos.length < maxTodos)) {
      var newTodo = {
        title: pTitle,
        plannedEffort: pPlannedEff,
        details: pDetails,
        dueDate: pDueDate
      };
      todos.push(newTodo);
    }
    else {
      throw new Error("Max todos (" + maxTodos + ") reached.");
    }
  };

  // service.addItem = function (itemName, itemQuantity) {
  //   if ((maxTodos === undefined) ||
  //       (maxTodos !== undefined) && (todos.length < maxTodos)) {
  //     var item = {
  //       name: itemName,
  //       quantity: itemQuantity
  //     };
  //     todos.push(item);
  //   }
  //   else {
  //     throw new Error("Max todos (" + maxTodos + ") reached.");
  //   }
  // };

  service.removeItem = function (itemIndex) {
    todos.splice(itemIndex, 1);
  };

  service.getTodos = function () {
    return todos;
  };
}

})();
