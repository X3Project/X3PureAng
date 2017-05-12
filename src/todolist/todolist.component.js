(function () {
'use strict';

angular.module('TodoList')
.component('todoList', {
  templateUrl: 'src/templates/todolist.template.html',
  controller: TodoListComponentController,
  bindings: {
    todos: '<',
    myTitle: '@title',
    onRemove: '&'
  }
});


TodoListComponentController.$inject = ['$rootScope', '$element', '$q', 'WeightLossFilterService']
function TodoListComponentController($rootScope, $element, $q, WeightLossFilterService) {
  var $ctrl = this;
  var totalItems;

  $ctrl.$onInit = function () {
    totalItems = 0;
  };


  $ctrl.$doCheck = function () {
    if ($ctrl.todos.length !== totalItems) {
      totalItems = $ctrl.todos.length;

      $rootScope.$broadcast('todolist:processing', {on: true});
      var promises = [];
      for (var i = 0; i < $ctrl.todos.length; i++) {
        promises.push(WeightLossFilterService.checkName($ctrl.todos[i].details));
      }

      $q.all(promises)
      .then(function (result) {
        // Remove cookie warning
        var warningElem = $element.find('div.error');
        warningElem.slideUp(900);
      })
      .catch(function (result) {
        // Show cookie warning
        var warningElem = $element.find('div.error');
        warningElem.slideDown(900);
      })
      .finally(function () {
        $rootScope.$broadcast('todolist:processing', { on: false });
      });
    }
  };

  $ctrl.remove = function (myIndex) {
    $ctrl.onRemove({ index: myIndex });
  };
}

})();
