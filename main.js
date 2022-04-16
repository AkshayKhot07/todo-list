/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/addTaskModal.js":
/*!*****************************!*\
  !*** ./src/addTaskModal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addTaskModal\": () => (/* binding */ addTaskModal)\n/* harmony export */ });\n/* harmony import */ var _task_submit_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task-submit.js */ \"./src/task-submit.js\");\n\r\n\r\nconst addTaskModal = () => {\r\n  let li = document.createElement(\"li\");\r\n  let iniTaskBtn = document.createElement(\"button\");\r\n  iniTaskBtn.textContent = \"+ Add task\";\r\n  iniTaskBtn.classList.add(\"iniTaskBtn\");\r\n\r\n  li.appendChild(iniTaskBtn);\r\n\r\n  const atbContainer = `<div class=\"atbContainer\">\r\n  <textarea\r\n    name=\"task\"\r\n    id=\"task\"\r\n    cols=\"80\"\r\n    rows=\"5\"\r\n    class=\"textArea\"\r\n  ></textarea>\r\n  <button class=\"addTaskBtn\">Add Task</button>\r\n  <button class=\"cancelTaskBtn\">Cancel</button>\r\n</div>`;\r\n\r\n  iniTaskBtn.addEventListener(\"click\", function () {\r\n    li.innerHTML = \"\";\r\n    li.innerHTML += atbContainer;\r\n    let addTaskBtn = document.querySelector(\".addTaskBtn\");\r\n    addTaskBtn.addEventListener(\"click\", _task_submit_js__WEBPACK_IMPORTED_MODULE_0__.taskSubmit.add);\r\n    let cancelTaskBtn = document.querySelector(\".cancelTaskBtn\");\r\n    cancelTaskBtn.addEventListener(\"click\", function () {\r\n      li.innerHTML = \"\";\r\n      li.appendChild(iniTaskBtn);\r\n    });\r\n  });\r\n\r\n  return { li };\r\n};\r\n\n\n//# sourceURL=webpack://todo-list/./src/addTaskModal.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks.js */ \"./src/tasks.js\");\n/* harmony import */ var _taskslistLS__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./taskslistLS */ \"./src/taskslistLS.js\");\n\r\n\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n  let listContainer = document.querySelector(\".list-container\");\r\n  _tasks_js__WEBPACK_IMPORTED_MODULE_0__.tasks.render(listContainer);\r\n  _tasks_js__WEBPACK_IMPORTED_MODULE_0__.tasks.taskSubscribe();\r\n  (0,_taskslistLS__WEBPACK_IMPORTED_MODULE_1__.taskslistLocalStorage)(); //renders tasks from local storage to persist data on pageload\r\n});\r\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/pubsub.js":
/*!***********************!*\
  !*** ./src/pubsub.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"pubsub\": () => (/* binding */ pubsub)\n/* harmony export */ });\nconst pubsub = {\r\n  events: {},\r\n  subscribe: function (evName, fn) {\r\n    console.log(`PUBSUB: someone just subscribed to know about ${evName}`);\r\n    this.events[evName] = this.events[evName] || [];\r\n    this.events[evName].push(fn);\r\n    console.log(this.events);\r\n  },\r\n  unsubscribe: function (evName, fn) {\r\n    console.log(`PUBSUB: someone just UNsubscribed to know about ${evName}`);\r\n    if (this.events[evName]) {\r\n      this.events[evName] = this.events[evName].filter((f) => f !== fn);\r\n    }\r\n  },\r\n  publish: function (evName, data) {\r\n    console.log(`PUBSUB: Making an broadcast about ${evName} with ${data}`);\r\n    if (this.events[evName]) {\r\n      this.events[evName].forEach((f) => {\r\n        f(data);\r\n      });\r\n    }\r\n  },\r\n};\r\n\n\n//# sourceURL=webpack://todo-list/./src/pubsub.js?");

/***/ }),

/***/ "./src/task-submit.js":
/*!****************************!*\
  !*** ./src/task-submit.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"taskSubmit\": () => (/* binding */ taskSubmit)\n/* harmony export */ });\n/* harmony import */ var _pubsub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubsub.js */ \"./src/pubsub.js\");\n\r\n\r\nconst taskSubmit = {\r\n  add: () => {\r\n    let textArea = document.querySelector(\".textArea\");\r\n    let task = textArea.value;\r\n    textArea.value = \"\";\r\n\r\n    console.log(`TASK SUBMIT: ${task}`);\r\n    _pubsub_js__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish(\"taskAdded\", task);\r\n  },\r\n};\r\n\n\n//# sourceURL=webpack://todo-list/./src/task-submit.js?");

/***/ }),

/***/ "./src/tasks.js":
/*!**********************!*\
  !*** ./src/tasks.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"tasks\": () => (/* binding */ tasks)\n/* harmony export */ });\n/* harmony import */ var _pubsub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubsub.js */ \"./src/pubsub.js\");\n/* harmony import */ var _addTaskModal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addTaskModal.js */ \"./src/addTaskModal.js\");\n\r\n\r\n\r\nconst tasks = {\r\n  list: [],\r\n\r\n  render: (container) => {\r\n    container.appendChild((0,_addTaskModal_js__WEBPACK_IMPORTED_MODULE_1__.addTaskModal)().li);\r\n  },\r\n\r\n  taskSubscribe: () => {\r\n    _pubsub_js__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe(\"taskAdded\", tasks.taskAdded);\r\n  },\r\n\r\n  taskAdded: (task) => {\r\n    console.log(`TASKS: ${task} was added`);\r\n    let list = new Set(tasks.list);\r\n    list.add(task);\r\n    tasks.list = Array.from(list);\r\n    console.log(list);\r\n\r\n    localStorage.setItem(\"tasksList\", JSON.stringify(tasks.list));\r\n\r\n    // console.log(`TASKS: tasksUpdated the list`);\r\n    // pubsub.publish(\"tasksUpdated\", tasks.list);\r\n\r\n    let ul = document.querySelector(\".list-container\");\r\n    ul.innerHTML = \"\";\r\n    let df = document.createDocumentFragment();\r\n    let df2 = document.createDocumentFragment();\r\n\r\n    tasks.list.forEach((task) => {\r\n      let li = document.createElement(\"li\");\r\n      let newCheckBox = document.createElement(\"input\");\r\n      newCheckBox.type = \"checkbox\";\r\n      newCheckBox.id = \"newCheckBox\";\r\n      li.appendChild(newCheckBox);\r\n      //   li.innerText = task;\r\n      li.append(task);\r\n      df.appendChild(li);\r\n    });\r\n\r\n    tasks.render(df2);\r\n    ul.appendChild(df);\r\n    ul.appendChild(df2);\r\n  },\r\n};\r\n\n\n//# sourceURL=webpack://todo-list/./src/tasks.js?");

/***/ }),

/***/ "./src/taskslistLS.js":
/*!****************************!*\
  !*** ./src/taskslistLS.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"taskslistLocalStorage\": () => (/* binding */ taskslistLocalStorage)\n/* harmony export */ });\n/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks.js */ \"./src/tasks.js\");\n\r\n\r\nconst taskslistLocalStorage = () => {\r\n  let tasksList = JSON.parse(localStorage.getItem(\"tasksList\"));\r\n\r\n  tasksList.forEach((task) => {\r\n    _tasks_js__WEBPACK_IMPORTED_MODULE_0__.tasks.taskAdded(task);\r\n  });\r\n};\r\n\n\n//# sourceURL=webpack://todo-list/./src/taskslistLS.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;