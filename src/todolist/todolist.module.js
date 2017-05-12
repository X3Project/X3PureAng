(function () {
'use strict';

angular.module('TodoList', []);

angular.module('TodoList')
.config(function () {
  console.log("TodoList config fired.");
})
.run(function () {
  console.log("TodoList run fired.");
});

})();
