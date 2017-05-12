(function () {
'use strict';

angular.module('TodoList')
.controller('TodoListController', TodoListController);


TodoListController.$inject = ['TodoListFactory'];
function TodoListController(TodoListFactory) {
  var list = this;

  // Use factory to create new todo list service
  var todoList = TodoListFactory();

  list.items = todoList.getTodos();
  var origTitle = "Todo List as first basic try ;-)";
  list.title = origTitle + " (" + list.items.length + " items )";

  list.todoTitle = "";
  list.todoDetail = "";
  list.todoPlannedEffort = "";
  list.todoDueDate = "";

  list.addItem = function () {
    todoList.addItem(list.todoTitle, list.todoDetail, list.todoPlannedEffort, list.todoDueDate);
    list.title = origTitle + " (" + list.items.length + " items )";
  }

  list.removeItem = function (itemIndex) {
    this.lastRemoved = "Last item removed was " + this.items[itemIndex].title;
    todoList.removeItem(itemIndex);
    this.title = origTitle + " (" + list.items.length + " items )";
  };
}

})();
