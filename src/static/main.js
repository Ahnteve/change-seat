/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/assets/js/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets/js/main.ts":
/*!*******************************!*\
  !*** ./src/assets/js/main.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("window.onload = start;\r\nvar row = 2;\r\nvar col = 2;\r\nvar desks = [];\r\nvar students = [];\r\nvar classroom;\r\nvar names;\r\nvar count = 1;\r\nvar diffx, diffy;\r\nvar area = {\r\n    canvas: document.getElementById(\"canvas\"),\r\n    start: function () {\r\n        canvas.addEventListener(\"mousedown\", startDrag, false);\r\n        this.context = this.canvas.getContext(\"2d\");\r\n        this.interval = setInterval(updateArea, 20);\r\n    },\r\n    clear: function () {\r\n        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\r\n    },\r\n    stop: function () {\r\n        clearInterval(this.interval);\r\n    },\r\n    reset: function () {\r\n        for (var i = 0; i < students.length; i++) {\r\n            students[i].reset();\r\n        }\r\n        for (var i = 0; i < desks.length; i++) {\r\n            desks[i].reset();\r\n        }\r\n    }\r\n};\r\nfunction reset() {\r\n    for (var i = 0; i < students.length; i++) {\r\n        students[i].reset();\r\n    }\r\n    for (var i = 0; i < desks.length; i++) {\r\n        desks[i].reset();\r\n    }\r\n}\r\nfunction start() {\r\n    createStudent();\r\n    createDesk();\r\n    classroom = new Classroom(0, 0, 1000, 2000, \"image/class.png\");\r\n    area.start();\r\n}\r\nfunction updateArea() {\r\n    classroom.draw();\r\n    for (i = 0; i < desks.length; i++)\r\n        desks[i].draw();\r\n    for (i = 0; i < students.length; i++)\r\n        students[i].draw();\r\n}\r\nfunction createStudent() {\r\n    var names = document.getElementsByName(\"name\");\r\n    for (var i = 0; i < count; i++) {\r\n        students.push(new Student(generateRandom(0, 936), generateRandom(250 + row * 120, 250 + row * 120 + 50), 64, 100, \"image/\" + generateRandom(1, 8) + \".png\", names[i].value, i + 1));\r\n    }\r\n}\r\nfunction createDesk() {\r\n    desks = [];\r\n    for (var i = 0; i < row; i++) {\r\n        for (var j = 0; j < col; j++) {\r\n            desks.push(new Desk(canvas.width / 2 + (j - col / 2) * 64, 250 + i * 120, 64, 120, \"image/desk.png\", col * i + (j + 1)));\r\n        }\r\n    }\r\n}\r\nfunction createEvents() {\r\n    document.getElementById(\"row\").addEventListener(\"change\", function () {\r\n        row = document.getElementById(\"row\").value;\r\n        canvas.height = 250 + row * 120 + 200;\r\n        createDesk();\r\n        for (var i = 0; i < students.length; i++) {\r\n            students[i].reset();\r\n        }\r\n    });\r\n    document.getElementById(\"col\").addEventListener(\"change\", function () {\r\n        col = document.getElementById(\"col\").value;\r\n        createDesk();\r\n        for (var i = 0; i < students.length; i++) {\r\n            students[i].reset();\r\n        }\r\n    });\r\n}\r\nvar generateRandom = function (min, max) {\r\n    var num = Math.floor(Math.random() * (max - min + 1)) + min;\r\n    return num;\r\n};\r\nfunction setSeat() {\r\n    if (students.length > desks.length) {\r\n        alert(\"책상 수가 학생 수보다 적습니다\");\r\n        return false;\r\n    }\r\n    var temp = 0;\r\n    var total = 0;\r\n    for (var i = 0; i < students.length; i++) {\r\n        if (!students[i].seat)\r\n            total++;\r\n    }\r\n    //alert(total);\r\n    if (document.getElementById(\"empty\").checked) {\r\n        while (temp < total) {\r\n            var random = generateRandom(0, students.length - 1);\r\n            if (students[random].seat == false) {\r\n                for (var i = 0; i < desks.length; i++) {\r\n                    if (!desks[i].seat) {\r\n                        students[random].seat = true;\r\n                        students[random].deskId = i + 1;\r\n                        students[random].x = desks[i].x;\r\n                        students[random].y = desks[i].y + 15;\r\n                        desks[i].studentId = students[random].id;\r\n                        desks[i].seat = true;\r\n                        temp++;\r\n                        break;\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n    else {\r\n        while (temp < total) {\r\n            var random1 = generateRandom(0, students.length - 1);\r\n            var random2 = generateRandom(0, desks.length - 1);\r\n            if (students[random1].seat == false && desks[random2].seat == false) {\r\n                students[random1].seat = true;\r\n                students[random1].deskId = random2 + 1;\r\n                students[random1].x = desks[random2].x;\r\n                students[random1].y = desks[random2].y + 15;\r\n                desks[random2].studentId = students[random1].id;\r\n                desks[random2].seat = true;\r\n                temp++;\r\n            }\r\n        }\r\n    }\r\n}\r\nfunction Student(x, y, width, height, image, name, id) {\r\n    this.image = new Image();\r\n    this.image.src = image;\r\n    this.width = width;\r\n    this.height = height;\r\n    this.x = x;\r\n    this.y = y;\r\n    this.name = name;\r\n    this.id = id;\r\n    this.currentCycle = 0;\r\n    this.deskId = -1;\r\n    this.seat = false;\r\n    this.draw = draw;\r\n    this.setCurrentCycle = setCurrentCycle;\r\n    function setCurrentCycle(updateCycle) {\r\n        var temp = 0;\r\n        switch (updateCycle) {\r\n            case \"down\":\r\n                temp = 0;\r\n            case \"up\":\r\n                temp = 3;\r\n            case \"left\":\r\n                temp = 1;\r\n            case \"right\":\r\n                temp = 2;\r\n        }\r\n        this.currentCycle = temp;\r\n    }\r\n    function draw() {\r\n        ctx = area.context;\r\n        ctx.drawImage(this.image, 0 * 64, this.currentCycle * 100, this.width, this.height, this.x, this.y, this.width, this.height);\r\n        ctx.font = \"15px 나눔고딕\";\r\n        ctx.textAlign = \"center\";\r\n        ctx.fillText(this.name, this.x + 32, this.y);\r\n    }\r\n    this.mouseover = mouseover;\r\n    function mouseover(mx, my) {\r\n        if (mx >= this.x &&\r\n            mx <= this.x + this.width &&\r\n            my >= this.y &&\r\n            my <= this.y + this.height) {\r\n            return true;\r\n        }\r\n        else\r\n            return false;\r\n    }\r\n    this.reset = reset;\r\n    function reset() {\r\n        this.x = generateRandom(0, 936);\r\n        this.y = generateRandom(250 + row * 120, 250 + row * 120 + 50);\r\n        this.currentCycle = 0;\r\n        this.deskId = -1;\r\n        this.seat = false;\r\n    }\r\n}\r\nfunction Classroom(x, y, width, height, image) {\r\n    this.image = new Image();\r\n    this.image.src = image;\r\n    this.width = width;\r\n    this.height = height;\r\n    this.x = x;\r\n    this.y = y;\r\n    this.draw = draw;\r\n    function draw() {\r\n        ctx = area.context;\r\n        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);\r\n    }\r\n}\r\nfunction Desk(x, y, width, height, image, id) {\r\n    this.image = new Image();\r\n    this.image.src = image;\r\n    this.width = width;\r\n    this.height = height;\r\n    this.x = x;\r\n    this.y = y;\r\n    this.seat = false;\r\n    this.studentId = -1;\r\n    this.id = id;\r\n    this.draw = draw;\r\n    function draw() {\r\n        ctx = area.context;\r\n        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);\r\n    }\r\n    this.mouseover = mouseover;\r\n    function mouseover(mx, my) {\r\n        if (mx >= this.x &&\r\n            mx <= this.x + this.width &&\r\n            my >= this.y &&\r\n            my <= this.y + this.height) {\r\n            return true;\r\n        }\r\n        else {\r\n            return false;\r\n        }\r\n    }\r\n    this.reset = reset;\r\n    function reset() {\r\n        this.seat = false;\r\n        this.studentId = -1;\r\n    }\r\n}\r\nfunction updateName(index) {\r\n    for (i = 0; i < students.length; i++) {\r\n        if (students[i].id == index) {\r\n            var name = document.getElementsByName(\"name\")[index - 1].value;\r\n            students[i].name = name;\r\n        }\r\n    }\r\n}\r\nfunction startDrag(e) {\r\n    mx = e.offsetX;\r\n    my = e.offsetY;\r\n    var item;\r\n    for (i = 0; i < students.length; i++) {\r\n        if (students[i].mouseover(mx, my)) {\r\n            if (students[i].seat) {\r\n                students[i].seat = false;\r\n                desks[students[i].deskId - 1].seat = false;\r\n            }\r\n            diffx = mx - students[i].x;\r\n            diffy = my - students[i].y;\r\n            item = students[i];\r\n            //alert(item.image.src);\r\n            students.splice(i, 1);\r\n            students.push(item);\r\n            canvas.addEventListener(\"mousemove\", move, false);\r\n            canvas.addEventListener(\"mouseup\", drop, false);\r\n            break;\r\n        }\r\n    }\r\n}\r\nfunction move(e) {\r\n    mx = e.offsetX;\r\n    my = e.offsetY;\r\n    students[students.length - 1].x = mx - diffx;\r\n    students[students.length - 1].y = my - diffy;\r\n}\r\nfunction drop(e) {\r\n    mx = e.offsetX;\r\n    my = e.offsetY;\r\n    var temp = 0;\r\n    for (i = 0; i < desks.length; i++) {\r\n        if (desks[i].mouseover(mx, my)) {\r\n            if (desks[i].seat == false) {\r\n                //alert(students[students.length-1].image.src);\r\n                students[students.length - 1].seat = true;\r\n                students[students.length - 1].x = desks[i].x;\r\n                students[students.length - 1].y = desks[i].y + 15;\r\n                //students[students.length-1].setCurrentCycle(1);\r\n                desks[i].seat = true;\r\n                desks[i].studentId = students[students.length - 1].id;\r\n                students[students.length - 1].deskId = desks[i].id;\r\n                break;\r\n            }\r\n        }\r\n    }\r\n    canvas.removeEventListener(\"mousemove\", move, false);\r\n    canvas.removeEventListener(\"mouseup\", drop, false);\r\n}\r\ndocument.getElementById(\"row\").addEventListener(\"change\", function () {\r\n    row = document.getElementById(\"row\").value;\r\n    //alert(row);\r\n    canvas.height = 250 + row * 120 + 200;\r\n    createDesk();\r\n    for (var i = 0; students.length; i++) {\r\n        students[i].reset();\r\n    }\r\n});\r\ndocument.getElementById(\"col\").addEventListener(\"change\", function () {\r\n    col = document.getElementById(\"col\").value;\r\n    //alert(col);\r\n    createDesk();\r\n    for (var i = 0; students.length; i++) {\r\n        students[i].reset();\r\n    }\r\n});\r\ndocument.getElementById(\"add\").addEventListener(\"click\", function () {\r\n    var tr = document.createElement(\"tr\");\r\n    var temp = \"\";\r\n    count++;\r\n    temp +=\r\n        \"<td>\" +\r\n            count +\r\n            \"</td><td><input type='text' name='name' onchange='updateName(\" +\r\n            count +\r\n            \")'></td>\";\r\n    tr.id = \"tr\" + count; // 폼 Div에 ID 부여 (삭제를 위해)\r\n    tr.innerHTML = temp; // 폼 Div안에 HTML삽입\r\n    document.getElementById(\"table\").appendChild(tr);\r\n    document.getElementById(\"studentCount\").innerHTML = \"학생수 : \" + count;\r\n    var name = document.getElementsByName(\"name\")[count - 1].value;\r\n    students.push(new Student(generateRandom(0, 936), generateRandom(250 + row * 120, 250 + row * 120 + 50), 64, 100, \"image/\" + generateRandom(1, 8) + \".png\", name, count));\r\n});\r\ndocument.getElementById(\"remove\").addEventListener(\"click\", function () {\r\n    var table = document.getElementById(\"table\");\r\n    if (count > 1) {\r\n        var tr = document.getElementById(\"tr\" + count);\r\n        table.removeChild(tr);\r\n        count--;\r\n        document.getElementById(\"studentCount\").innerHTML = \"학생수 : \" + count;\r\n        students.pop();\r\n    }\r\n    else {\r\n        alert(\"더 이상 삭제할 수 없습니다\");\r\n        return false;\r\n    }\r\n});\r\ndocument.getElementById(\"save\").addEventListener(\"click\", function () {\r\n    var names = document.getElementsByName(\"name\");\r\n    for (var i = 0; i < names.length; i++) {\r\n        if (names[i].value == \"\") {\r\n            alert(\"빈 항목이 있습니다\");\r\n            return false;\r\n        }\r\n    }\r\n    document.getElementById(\"form\").submit();\r\n});\r\ndocument.getElementById(\"load\").addEventListener(\"click\", function () {\r\n    var code = document.getElementById(\"code\");\r\n    if (code.value == \"\") {\r\n        alert(\"코드를 입력하세요\");\r\n        return false;\r\n    }\r\n    else if (code.value.length != 6) {\r\n        alert(\"6자리 코드를 입력하세요\");\r\n        return false;\r\n    }\r\n    document.getElementById(\"dataload\").submit();\r\n});\r\nfunction loadStudent() {\r\n    for (var i = 1; i < count; i++) {\r\n        var name = document.getElementsByName(\"name\")[i].value;\r\n        students.push(new Student(generateRandom(0, 936), generateRandom(250 + row * 120, 250 + row * 120 + 50), 64, 100, \"image/\" + generateRandom(1, 8) + \".png\", name, i + 1));\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/assets/js/main.ts?");

/***/ })

/******/ });