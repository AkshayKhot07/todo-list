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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addTaskModal\": () => (/* binding */ addTaskModal)\n/* harmony export */ });\n/* harmony import */ var _task_submit_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task-submit.js */ \"./src/task-submit.js\");\n/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks.js */ \"./src/tasks.js\");\n\r\n\r\n\r\nconst addTaskModal = () => {\r\n  let li = document.createElement(\"li\");\r\n  let iniTaskBtn = document.createElement(\"button\");\r\n  iniTaskBtn.textContent = \"+ Add task\";\r\n  iniTaskBtn.classList.add(\"iniTaskBtn\");\r\n\r\n  li.appendChild(iniTaskBtn);\r\n\r\n  const atbContainer = `<div class=\"atbContainer\">\r\n  <div class=taskTextDate>\r\n  <textarea\r\n    name=\"task\"\r\n    id=\"task\"\r\n    cols=\"80\"\r\n    rows=\"5\"\r\n    class=\"textArea\"\r\n  ></textarea>\r\n  <input type=\"date\" id=\"datePicker\" class=\"datePicker\" name=\"datePicker\">\r\n  </div>\r\n  <button class=\"addTaskBtn\">Add Task</button>\r\n  <button class=\"cancelTaskBtn\">Cancel</button>\r\n</div>`;\r\n\r\n  iniTaskBtn.addEventListener(\"click\", function () {\r\n    li.innerHTML = \"\";\r\n    li.innerHTML += atbContainer;\r\n    let datePicker = document.querySelector(\".datePicker\");\r\n    datePicker.min = new Date().toISOString().split(\"T\")[0];\r\n    let addTaskBtn = document.querySelector(\".addTaskBtn\");\r\n    addTaskBtn.addEventListener(\"click\", _task_submit_js__WEBPACK_IMPORTED_MODULE_0__.taskSubmit.add);\r\n    let cancelTaskBtn = document.querySelector(\".cancelTaskBtn\");\r\n    cancelTaskBtn.addEventListener(\"click\", function () {\r\n      li.innerHTML = \"\";\r\n      li.appendChild(iniTaskBtn);\r\n    });\r\n  });\r\n\r\n  return { li, atbContainer };\r\n};\r\n\n\n//# sourceURL=webpack://todo-list/./src/addTaskModal.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks.js */ \"./src/tasks.js\");\n/* harmony import */ var _taskslistLS__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./taskslistLS */ \"./src/taskslistLS.js\");\n/* harmony import */ var _tooglebtwntabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tooglebtwntabs */ \"./src/tooglebtwntabs.js\");\n\r\n\r\n\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n  let listContainer = document.querySelector(\".list-container\");\r\n  _tasks_js__WEBPACK_IMPORTED_MODULE_0__.tasks.render(listContainer);\r\n  _tasks_js__WEBPACK_IMPORTED_MODULE_0__.tasks.taskSubscribe();\r\n  (0,_taskslistLS__WEBPACK_IMPORTED_MODULE_1__.taskslistLocalStorage)(); //renders tasks from local storage to persist data on pageload\r\n  (0,_tooglebtwntabs__WEBPACK_IMPORTED_MODULE_2__.toggleBtwnTabs)();\r\n\r\n  let inboxBtn = document.querySelector(\".inbox-btn\");\r\n  inboxBtn.classList.add(\"tabSelectedColor\");\r\n});\r\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/pubsub.js":
/*!***********************!*\
  !*** ./src/pubsub.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"pubsub\": () => (/* binding */ pubsub)\n/* harmony export */ });\nconst pubsub = {\r\n  events: {},\r\n  subscribe: function (evName, fn) {\r\n    console.log(`PUBSUB: someone just subscribed to know about ${evName}`);\r\n    this.events[evName] = this.events[evName] || [];\r\n    this.events[evName].push(fn);\r\n    console.log(this.events);\r\n  },\r\n  unsubscribe: function (evName, fn) {\r\n    console.log(`PUBSUB: someone just UNsubscribed to know about ${evName}`);\r\n    if (this.events[evName]) {\r\n      this.events[evName] = this.events[evName].filter((f) => f !== fn);\r\n    }\r\n  },\r\n  publish: function (evName, data) {\r\n    console.log(\r\n      `PUBSUB: Making an broadcast about ${evName} with ${\r\n        Object.values(data)[0]\r\n      }`\r\n    );\r\n    if (this.events[evName]) {\r\n      this.events[evName].forEach((f) => {\r\n        f(data);\r\n      });\r\n    }\r\n  },\r\n};\r\n\n\n//# sourceURL=webpack://todo-list/./src/pubsub.js?");

/***/ }),

/***/ "./src/task-submit.js":
/*!****************************!*\
  !*** ./src/task-submit.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"taskSubmit\": () => (/* binding */ taskSubmit)\n/* harmony export */ });\n/* harmony import */ var _pubsub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubsub.js */ \"./src/pubsub.js\");\n\r\n\r\nconst taskSubmit = {\r\n  add: () => {\r\n    let textArea = document.querySelector(\".textArea\");\r\n    let task = textArea.value.trim();\r\n    textArea.value = \"\";\r\n    const regex = /^.{3,}$/;\r\n\r\n    let datePicker = document.querySelector(\".datePicker\");\r\n    let date = datePicker.value;\r\n\r\n    let obj = { task, date };\r\n    console.log(obj);\r\n\r\n    if (task.match(regex)) {\r\n      console.log(`TASK SUBMIT: ${task} ${date}`);\r\n      _pubsub_js__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish(\"taskAdded\", obj);\r\n    } else {\r\n      alert(\"Enter atleast 3 characters\");\r\n    }\r\n  },\r\n};\r\n\n\n//# sourceURL=webpack://todo-list/./src/task-submit.js?");

/***/ }),

/***/ "./src/tasks.js":
/*!**********************!*\
  !*** ./src/tasks.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"tasks\": () => (/* binding */ tasks)\n/* harmony export */ });\n/* harmony import */ var _pubsub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubsub.js */ \"./src/pubsub.js\");\n/* harmony import */ var _addTaskModal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addTaskModal.js */ \"./src/addTaskModal.js\");\n/* harmony import */ var _week_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./week.js */ \"./src/week.js\");\n\r\n\r\n\r\n\r\nconst tasks = {\r\n  list: [],\r\n\r\n  render: (container) => {\r\n    container.appendChild((0,_addTaskModal_js__WEBPACK_IMPORTED_MODULE_1__.addTaskModal)().li);\r\n\r\n    let ul = document.querySelector(\".list-container\");\r\n    ul.addEventListener(\"click\", tasks.taskDeleted);\r\n    // ul.addEventListener(\"click\", tasks.taskEdited);\r\n  },\r\n\r\n  taskSubscribe: () => {\r\n    _pubsub_js__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe(\"taskAdded\", tasks.taskAdded);\r\n  },\r\n\r\n  taskAdded: (obj) => {\r\n    console.log(`TASKS: ${Object.values(obj)[0]} was added`);\r\n    // let list = new Set(tasks.list);\r\n    let list = tasks.list;\r\n    list.push(obj);\r\n\r\n    let filteredList = list.filter(\r\n      (tag, index, array) =>\r\n        array.findIndex((t) => t.task == tag.task && t.date == tag.date) ==\r\n        index\r\n    );\r\n\r\n    tasks.list = filteredList;\r\n\r\n    console.log(filteredList);\r\n\r\n    // localStorage.setItem(\"tasksList\", JSON.stringify(tasks.list));\r\n    // localStorage.setItem(\"tasksList\", JSON.stringify(filteredList));\r\n    //Revamp\r\n    let inboxBtn = document.querySelector(\".inbox-btn\");\r\n    if (inboxBtn.classList.contains(\"tabSelectedColor\")) {\r\n      localStorage.setItem(\r\n        \"tasksList\",\r\n        JSON.stringify({\r\n          projects: [\r\n            {\r\n              name: \"Inbox\",\r\n              tasks: filteredList,\r\n            },\r\n          ],\r\n        })\r\n      );\r\n    }\r\n    //Revamp\r\n\r\n    // console.log(`TASKS: tasksUpdated the list`);\r\n    // pubsub.publish(\"tasksUpdated\", tasks.list);\r\n\r\n    let ul = document.querySelector(\".list-container\");\r\n    ul.innerHTML = \"\";\r\n    let df = document.createDocumentFragment();\r\n    let df2 = document.createDocumentFragment();\r\n\r\n    tasks.list.forEach((obj) => {\r\n      let li = document.createElement(\"li\");\r\n      tasks.taskElement(obj, li);\r\n      df.appendChild(li);\r\n    });\r\n\r\n    tasks.render(df2);\r\n    ul.appendChild(df);\r\n    ul.appendChild(df2);\r\n  },\r\n\r\n  taskDeleted: (ev) => {\r\n    let item = ev.target.closest(\"input[type=checkbox]\");\r\n    if (!item) return;\r\n    // let task = item.parentElement.innerText;\r\n    let taskText = item.nextElementSibling.innerText;\r\n    let taskDate = ev.target.closest(\"li\").querySelector(\".taskDate\").innerText;\r\n    console.log(taskText);\r\n    console.log(taskDate);\r\n    // console.log(`TEST: ${task}`);\r\n\r\n    // tasks.list = tasks.list.filter((tsk) => {\r\n    //   console.log(\r\n    //     `${Object.values(tsk)[0].trim()} and ${Object.values(tsk)[1].trim()}`\r\n    //   );\r\n    //   return (\r\n    //     Object.values(tsk)[0].trim() !== taskText.trim() &&\r\n    //     Object.values(tsk)[1].trim() !== taskDate.trim()\r\n    //   );\r\n    // });\r\n\r\n    tasks.list = tasks.list.filter(\r\n      // (t) => !(t.task == taskText && t.date == taskDate)\r\n      (t) => !(t.task.includes(taskText) && t.date.includes(taskDate))\r\n    );\r\n\r\n    item.parentElement.parentElement.parentElement.removeChild(\r\n      item.parentElement.parentElement\r\n    );\r\n\r\n    console.log(tasks.list);\r\n\r\n    // localStorage.setItem(\"tasksList\", JSON.stringify(tasks.list));\r\n    //Revamp\r\n    localStorage.setItem(\r\n      \"tasksList\",\r\n      JSON.stringify({\r\n        projects: [\r\n          {\r\n            name: \"Inbox\",\r\n            tasks: tasks.list,\r\n          },\r\n        ],\r\n      })\r\n    );\r\n    //Revamp\r\n    console.log(`TASKS: taskDeleted ${taskText}`);\r\n    _pubsub_js__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish(\"taskDeleted\", tasks.list);\r\n  },\r\n\r\n  taskEdited: (ev) => {\r\n    let li = ev.target.closest(\"li\");\r\n    let taskTextEl = li.querySelector(\"p\");\r\n    let taskText = li.querySelector(\"p\").textContent;\r\n    const regex = /^.{3,}$/;\r\n\r\n    let taskDate = li.querySelector(\".taskDate\");\r\n    let date = taskDate.textContent;\r\n\r\n    li.innerHTML = \"\";\r\n    li.innerHTML += (0,_addTaskModal_js__WEBPACK_IMPORTED_MODULE_1__.addTaskModal)().atbContainer;\r\n\r\n    let textArea = document.querySelector(\".textArea\");\r\n    textArea.innerText = taskText;\r\n    console.log(textArea);\r\n\r\n    let objtaskTextEl = { taskTextEl, date };\r\n\r\n    let datePicker = document.querySelector(\".datePicker\");\r\n    datePicker.value = date;\r\n    datePicker.min = new Date().toISOString().split(\"T\")[0];\r\n\r\n    let addTaskBtn = document.querySelector(\".addTaskBtn\");\r\n    addTaskBtn.addEventListener(\"click\", () => {\r\n      //Get current date value\r\n      let datePickerValue = datePicker.value;\r\n      li.innerHTML = \"\";\r\n\r\n      // tasks.taskElement(textArea, li).li;\r\n      if (textArea.value.match(regex)) {\r\n        // tasks.taskElement(textArea, li)\r\n        let objtextArea = { textArea, date: datePickerValue };\r\n        console.log(objtextArea);\r\n        tasks.taskElement(objtextArea, li);\r\n      } else {\r\n        alert(\"Enter atleast 3 characters\");\r\n        // tasks.taskElement(taskTextEl, li);\r\n        tasks.taskElement(objtaskTextEl, li);\r\n      }\r\n\r\n      //// Edit Task date on todays tab\r\n      let listContainer = document.querySelector(\".list-container\");\r\n      let todayBtn = document.querySelector(\".today-btn\");\r\n      if (todayBtn.classList.contains(\"tabSelectedColor\")) {\r\n        let allTask = Array.from(listContainer.querySelectorAll(\"li\"));\r\n        console.log(allTask);\r\n        listContainer.innerHTML = \"\";\r\n\r\n        for (let i = 0; i < allTask.length; i++) {\r\n          let task = allTask[i];\r\n          let taskDate = allTask[i].querySelector(\".taskDate\").innerText;\r\n\r\n          console.log(task);\r\n          console.log(taskDate);\r\n\r\n          let today = new Date();\r\n          let todayDate =\r\n            today.getFullYear() +\r\n            \"-\" +\r\n            (\"0\" + (today.getMonth() + 1)).slice(-2) +\r\n            \"-\" +\r\n            (\"0\" + today.getDate()).slice(-2);\r\n          console.log(todayDate);\r\n\r\n          if (taskDate == todayDate) {\r\n            listContainer.appendChild(task);\r\n          }\r\n        }\r\n      }\r\n      //// Edit Task date on todays tab\r\n\r\n      //// Edit Task date on thisweek's tab\r\n      // let listContainer = document.querySelector(\".list-container\");\r\n      let thisweekBtn = document.querySelector(\".thisweek-btn\");\r\n      if (thisweekBtn.classList.contains(\"tabSelectedColor\")) {\r\n        let allTask = Array.from(listContainer.querySelectorAll(\"li\"));\r\n        console.log(allTask);\r\n        listContainer.innerHTML = \"\";\r\n\r\n        for (let i = 0; i < allTask.length; i++) {\r\n          let task = allTask[i];\r\n          let taskDate = (0,_week_js__WEBPACK_IMPORTED_MODULE_2__.whichWeek)(\r\n            allTask[i].querySelector(\".taskDate\").innerText\r\n          );\r\n\r\n          console.log(task);\r\n          console.log(taskDate);\r\n\r\n          let currWeek = (0,_week_js__WEBPACK_IMPORTED_MODULE_2__.currentWeek)();\r\n\r\n          if (taskDate == currWeek) {\r\n            listContainer.appendChild(task);\r\n          }\r\n        }\r\n      }\r\n      //// Edit Task date on thisweek's tab\r\n\r\n      /* Previous Code\r\n      let listContainer = document.querySelector(\".list-container\");\r\n      let allTasks = Array.from(listContainer.querySelectorAll(\"p\"));\r\n      let allTasksDates = Array.from(\r\n        listContainer.querySelectorAll(\".taskDate\")\r\n      );\r\n\r\n      tasks.list = [];\r\n\r\n      allTasks.forEach((task, i) =>\r\n        tasks.list.push({\r\n          task: task.innerText,\r\n          date: allTasksDates[i].textContent,\r\n        })\r\n      );\r\n      */\r\n\r\n      console.log(tasks.list);\r\n\r\n      tasks.list.forEach((obj) => {\r\n        if (obj.task === taskText && obj.date === taskDate.textContent) {\r\n          obj.task = textArea.value;\r\n          obj.date = datePickerValue;\r\n        }\r\n      });\r\n\r\n      console.log(tasks.list);\r\n      // localStorage.setItem(\"tasksList\", JSON.stringify(tasks.list));\r\n      //Revamp\r\n      localStorage.setItem(\r\n        \"tasksList\",\r\n        JSON.stringify({\r\n          projects: [\r\n            {\r\n              name: \"Inbox\",\r\n              tasks: tasks.list,\r\n            },\r\n          ],\r\n        })\r\n      );\r\n      //Revamp\r\n    });\r\n\r\n    let cancelTaskBtn = document.querySelector(\".cancelTaskBtn\");\r\n    cancelTaskBtn.addEventListener(\"click\", () => {\r\n      li.innerHTML = \"\";\r\n\r\n      tasks.taskElement(objtaskTextEl, li);\r\n    });\r\n  },\r\n\r\n  taskElement: (obj, li) => {\r\n    let taskContent = document.createElement(\"div\");\r\n    taskContent.className = \"taskDetails\";\r\n    let p = document.createElement(\"p\");\r\n    let newCheckBox = document.createElement(\"input\");\r\n    newCheckBox.type = \"checkbox\";\r\n    newCheckBox.id = \"newCheckBox\";\r\n    taskContent.appendChild(newCheckBox);\r\n\r\n    if (Object.keys(obj)[0] == \"textArea\") {\r\n      p.innerText = `${Object.values(obj)[0].value}`;\r\n      li.dataset.taskName = `${Object.values(obj)[0].value}`;\r\n    } else if (Object.keys(obj)[0] == \"taskTextEl\") {\r\n      p.innerText = `${Object.values(obj)[0].innerText}`;\r\n      li.dataset.taskName = `${Object.values(obj)[0].innerText}`;\r\n    } else {\r\n      p.innerText = `${Object.values(obj)[0]}`;\r\n      li.dataset.taskName = `${Object.values(obj)[0]}`;\r\n    }\r\n\r\n    taskContent.appendChild(p);\r\n    li.appendChild(taskContent);\r\n\r\n    let taskTools = document.createElement(\"div\");\r\n    taskTools.className = \"taskTools\";\r\n\r\n    let taskDate = document.createElement(\"div\");\r\n    taskDate.className = \"taskDate\";\r\n    if (Object.values(obj)[1] == \"\") {\r\n      taskDate.innerText = \"No Date\";\r\n    } else {\r\n      taskDate.innerText = Object.values(obj)[1];\r\n    }\r\n    taskTools.appendChild(taskDate);\r\n\r\n    let taskEditBtn = document.createElement(\"button\");\r\n    taskEditBtn.textContent = \"Edit\";\r\n    taskEditBtn.className = \"taskEditBtn\";\r\n    taskEditBtn.addEventListener(\"click\", tasks.taskEdited);\r\n    taskTools.appendChild(taskEditBtn);\r\n\r\n    li.appendChild(taskTools);\r\n\r\n    // return { li };\r\n  },\r\n};\r\n\n\n//# sourceURL=webpack://todo-list/./src/tasks.js?");

/***/ }),

/***/ "./src/taskslistLS.js":
/*!****************************!*\
  !*** ./src/taskslistLS.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"taskslistLocalStorage\": () => (/* binding */ taskslistLocalStorage)\n/* harmony export */ });\n/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks.js */ \"./src/tasks.js\");\n\r\n\r\nconst taskslistLocalStorage = () => {\r\n  let tasksList = JSON.parse(localStorage.getItem(\"tasksList\"));\r\n\r\n  if (!tasksList) return;\r\n  // tasksList.forEach((task) => {\r\n  //   tasks.taskAdded(task);\r\n  // });\r\n\r\n  //Revamp\r\n  let lsObjArr = tasksList.projects;\r\n  lsObjArr.forEach((obj) => {\r\n    // console.log(obj);\r\n    if (obj.name == \"Inbox\") {\r\n      console.log(...obj.tasks);\r\n      let multasks = [...obj.tasks];\r\n      // console.log(multasks);\r\n      multasks.forEach((taskobj) => {\r\n        _tasks_js__WEBPACK_IMPORTED_MODULE_0__.tasks.taskAdded(taskobj);\r\n      });\r\n    }\r\n  });\r\n};\r\n\n\n//# sourceURL=webpack://todo-list/./src/taskslistLS.js?");

/***/ }),

/***/ "./src/tooglebtwntabs.js":
/*!*******************************!*\
  !*** ./src/tooglebtwntabs.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"toggleBtwnTabs\": () => (/* binding */ toggleBtwnTabs)\n/* harmony export */ });\n/* harmony import */ var _taskslistLS__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskslistLS */ \"./src/taskslistLS.js\");\n/* harmony import */ var _addTaskModal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addTaskModal.js */ \"./src/addTaskModal.js\");\n/* harmony import */ var _week_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./week.js */ \"./src/week.js\");\n/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tasks.js */ \"./src/tasks.js\");\n\r\n\r\n\r\n\r\n\r\nconst toggleBtwnTabs = () => {\r\n  let listContainer = document.querySelector(\".list-container\");\r\n  let inboxBtn = document.querySelector(\".inbox-btn\");\r\n  let todayBtn = document.querySelector(\".today-btn\");\r\n  let thisweekBtn = document.querySelector(\".thisweek-btn\");\r\n  let listHeader = document.querySelector(\".list-header\");\r\n\r\n  // Today's tasks\r\n  todayBtn.addEventListener(\"click\", () => {\r\n    inboxBtn.classList.remove(\"tabSelectedColor\");\r\n    thisweekBtn.classList.remove(\"tabSelectedColor\");\r\n    todayBtn.classList.add(\"tabSelectedColor\");\r\n    listHeader.innerText = \"Today\";\r\n\r\n    listContainer.innerHTML = \"\";\r\n\r\n    /* Old Code\r\n    let allTask = Array.from(listContainer.querySelectorAll(\"li\"));\r\n    console.log(allTask);\r\n\r\n    for (let i = 0; i < allTask.length - 1; i++) {\r\n      let task = allTask[i];\r\n      let taskDate = allTask[i].querySelector(\".taskDate\").innerText;\r\n\r\n      console.log(task);\r\n      console.log(taskDate);\r\n\r\n      let today = new Date();\r\n      let todayDate =\r\n        today.getFullYear() +\r\n        \"-\" +\r\n        (\"0\" + (today.getMonth() + 1)).slice(-2) +\r\n        \"-\" +\r\n        (\"0\" + today.getDate()).slice(-2);\r\n      console.log(todayDate);\r\n\r\n      if (taskDate === todayDate) {\r\n        // console.log(task);\r\n        let todayTask = task;\r\n        console.log(todayTask);\r\n        listContainer.appendChild(todayTask);\r\n        // listContainer.innerHTML += todayTaks;\r\n      }\r\n    }\r\n    Old Code */\r\n\r\n    //New Code\r\n    let today = new Date();\r\n    let todayDate =\r\n      today.getFullYear() +\r\n      \"-\" +\r\n      (\"0\" + (today.getMonth() + 1)).slice(-2) +\r\n      \"-\" +\r\n      (\"0\" + today.getDate()).slice(-2);\r\n    console.log(todayDate);\r\n\r\n    let tasksList = JSON.parse(localStorage.getItem(\"tasksList\"));\r\n    console.log(tasksList);\r\n    /*\r\n    let filteredList = tasksList.filter((t) => {\r\n      return t.date == todayDate;\r\n    });\r\n    console.log(filteredList);\r\n    for (let i = 0; i < filteredList.length; i++) {\r\n      let li = document.createElement(\"li\");\r\n      tasks.taskElement(filteredList[i], li);\r\n      listContainer.appendChild(li);\r\n    }\r\n    */\r\n    //Revamp\r\n    let lsObjArr = tasksList.projects;\r\n    lsObjArr.forEach((obj) => {\r\n      // console.log(obj);\r\n      if (obj.name == \"Inbox\") {\r\n        // console.log(...obj.tasks);\r\n        let multasks = [...obj.tasks];\r\n        // console.log(multasks);\r\n\r\n        let filteredObj = multasks.filter((t) => {\r\n          return t.date == todayDate;\r\n        });\r\n        // console.log(filteredObj);\r\n        for (let i = 0; i < filteredObj.length; i++) {\r\n          let li = document.createElement(\"li\");\r\n          _tasks_js__WEBPACK_IMPORTED_MODULE_3__.tasks.taskElement(filteredObj[i], li);\r\n          listContainer.appendChild(li);\r\n        }\r\n      }\r\n    });\r\n  });\r\n\r\n  //Week's tasks\r\n  thisweekBtn.addEventListener(\"click\", () => {\r\n    inboxBtn.classList.remove(\"tabSelectedColor\");\r\n    todayBtn.classList.remove(\"tabSelectedColor\");\r\n    thisweekBtn.classList.add(\"tabSelectedColor\");\r\n    listHeader.innerText = \"This Week\";\r\n\r\n    listContainer.innerHTML = \"\";\r\n\r\n    let currWeek = (0,_week_js__WEBPACK_IMPORTED_MODULE_2__.currentWeek)();\r\n    console.log(currWeek);\r\n    // let taskWeek = whichWeek(taskDate);\r\n    console.log((0,_week_js__WEBPACK_IMPORTED_MODULE_2__.whichWeek)(\"2022-05-07\"));\r\n\r\n    let tasksList = JSON.parse(localStorage.getItem(\"tasksList\"));\r\n    console.log(tasksList);\r\n\r\n    /*\r\n    let filteredList = tasksList.filter((t) => {\r\n      return whichWeek(t.date) == currWeek;\r\n    });\r\n    console.log(filteredList);\r\n    for (let i = 0; i < filteredList.length; i++) {\r\n      let li = document.createElement(\"li\");\r\n      tasks.taskElement(filteredList[i], li);\r\n      listContainer.appendChild(li);\r\n    }\r\n    */\r\n    //Revamp\r\n    let lsObjArr = tasksList.projects;\r\n    lsObjArr.forEach((obj) => {\r\n      // console.log(obj);\r\n      if (obj.name == \"Inbox\") {\r\n        // console.log(...obj.tasks);\r\n        let multasks = [...obj.tasks];\r\n        // console.log(multasks);\r\n\r\n        let filteredObj = multasks.filter((t) => {\r\n          return (0,_week_js__WEBPACK_IMPORTED_MODULE_2__.whichWeek)(t.date) == currWeek;\r\n        });\r\n        // console.log(filteredObj);\r\n        for (let i = 0; i < filteredObj.length; i++) {\r\n          let li = document.createElement(\"li\");\r\n          _tasks_js__WEBPACK_IMPORTED_MODULE_3__.tasks.taskElement(filteredObj[i], li);\r\n          listContainer.appendChild(li);\r\n        }\r\n      }\r\n    });\r\n  });\r\n\r\n  //Inbox tasks\r\n  inboxBtn.addEventListener(\"click\", () => {\r\n    inboxBtn.classList.add(\"tabSelectedColor\");\r\n    thisweekBtn.classList.remove(\"tabSelectedColor\");\r\n    todayBtn.classList.remove(\"tabSelectedColor\");\r\n    listHeader.innerText = \"Inbox\";\r\n    console.log(listContainer);\r\n\r\n    listContainer.innerHTML = \"\";\r\n    let tasksList = JSON.parse(localStorage.getItem(\"tasksList\"));\r\n    console.log(tasksList);\r\n    if (tasksList === null || tasksList.length === 0) {\r\n      listContainer.appendChild((0,_addTaskModal_js__WEBPACK_IMPORTED_MODULE_1__.addTaskModal)().li);\r\n    }\r\n    (0,_taskslistLS__WEBPACK_IMPORTED_MODULE_0__.taskslistLocalStorage)();\r\n  });\r\n};\r\n\n\n//# sourceURL=webpack://todo-list/./src/tooglebtwntabs.js?");

/***/ }),

/***/ "./src/week.js":
/*!*********************!*\
  !*** ./src/week.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"currentWeek\": () => (/* binding */ currentWeek),\n/* harmony export */   \"whichWeek\": () => (/* binding */ whichWeek)\n/* harmony export */ });\nfunction whichWeek(datestring) {\r\n  let currentDate = new Date(datestring);\r\n  let startDate = new Date(currentDate.getFullYear(), 0, 1);\r\n  let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));\r\n  let weekNumber = Math.ceil((currentDate.getDay() + 1 + days) / 7);\r\n\r\n  return weekNumber;\r\n}\r\n\r\nfunction currentWeek() {\r\n  let currentDate = new Date();\r\n  let startDate = new Date(currentDate.getFullYear(), 0, 1);\r\n  let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));\r\n  let weekNumber = Math.ceil((currentDate.getDay() + 1 + days) / 7);\r\n\r\n  return weekNumber;\r\n}\r\n\r\n/*\r\nexport function whichWeek(datestring) {\r\n  var date1 = new Date(datestring);\r\n  var oneJan = new Date(date1.getFullYear(), 0, 1);\r\n  var numberOfDays = Math.floor((date1 - oneJan) / (24 * 60 * 60 * 1000));\r\n  var result = Math.round((date1.getDay() + 1 + numberOfDays) / 7);\r\n  // console.log(oneJan);\r\n  // console.log(numberOfDays);\r\n  // console.log(result);\r\n  return result;\r\n}\r\n\r\n// console.log(whichWeek(\"2022-02-07\"));\r\n\r\nexport function currentWeek() {\r\n  var date1 = new Date();\r\n  var oneJan = new Date(date1.getFullYear(), 0, 1);\r\n  var numberOfDays = Math.floor((date1 - oneJan) / (24 * 60 * 60 * 1000));\r\n  var result = Math.round((date1.getDay() + 1 + numberOfDays) / 7);\r\n  // console.log(oneJan);\r\n  // console.log(numberOfDays);\r\n  // console.log(result);\r\n  return result;\r\n}\r\n*/\r\n\n\n//# sourceURL=webpack://todo-list/./src/week.js?");

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