import Classroom from "./Classroom";

const rowSelector: Element = document.querySelector(".js-row-selector");
const colSelector: Element = document.querySelector(".js-col-selector");
const resetButton: Element = document.querySelector(".js-reset-button");
const setButton: Element = document.querySelector(".js-set-button");
const addButton: Element = document.querySelector(".js-add-button");
const reomveButton: Element = document.querySelector(".js-remove-button");

const classroom: Classroom = new Classroom("canvas");

const handleChangeRow = event => {};

const handleChangeCol = event => {};

const handleClickReset = event => {};
const handleClickSet = event => {};
const handleClickAdd = event => {
  classroom.createStudent();
};
const handleClickRemove = event => {};

rowSelector.addEventListener("change", handleChangeRow);
colSelector.addEventListener("change", handleChangeCol);

resetButton.addEventListener("click", handleClickReset);
setButton.addEventListener("click", handleClickSet);

addButton.addEventListener("click", handleClickAdd);
reomveButton.addEventListener("click", handleClickRemove);

// var names;

// var count = 1;
// //var diffx, diffy;

// function createStudent() {
//   var names = document.getElementsByName("name");
//   for (var i = 0; i < count; i++) {
//     students.push(
//       new Student(
//         generateRandom(0, 936),
//         generateRandom(250 + row * 120, 250 + row * 120 + 50),
//         64,
//         100,
//         "image/" + generateRandom(1, 8) + ".png",
//         names[i].value,
//         i + 1
//       )
//     );
//   }
// }

// function createDesk() {
//   desks = [];
//   for (var i = 0; i < row; i++) {
//     for (var j = 0; j < col; j++) {
//       desks.push(
//         new Desk(
//           canvas.width / 2 + (j - col / 2) * 64,
//           250 + i * 120,
//           64,
//           120,
//           "image/desk.png",
//           col * i + (j + 1)
//         )
//       );
//     }
//   }
// }

// function createEvents() {
//   document.getElementById("row").addEventListener("change", function() {
//     row = document.getElementById("row").value;
//     canvas.height = 250 + row * 120 + 200;
//     createDesk();
//     for (var i = 0; i < students.length; i++) {
//       students[i].reset();
//     }
//   });
//   document.getElementById("col").addEventListener("change", function() {
//     col = document.getElementById("col").value;

//     createDesk();
//     for (var i = 0; i < students.length; i++) {
//       students[i].reset();
//     }
//   });
// }

// function setSeat() {
//   if (students.length > desks.length) {
//     alert("책상 수가 학생 수보다 적습니다");
//     return false;
//   }

//   var temp = 0;
//   var total = 0;

//   for (var i = 0; i < students.length; i++) {
//     if (!students[i].seat) total++;
//   }

//   //alert(total);
//   if (document.getElementById("empty").checked) {
//     while (temp < total) {
//       var random = generateRandom(0, students.length - 1);
//       if (students[random].seat == false) {
//         for (var i = 0; i < desks.length; i++) {
//           if (!desks[i].seat) {
//             students[random].seat = true;
//             students[random].deskId = i + 1;
//             students[random].x = desks[i].x;
//             students[random].y = desks[i].y + 15;
//             desks[i].studentId = students[random].id;
//             desks[i].seat = true;
//             temp++;
//             break;
//           }
//         }
//       }
//     }
//   } else {
//     while (temp < total) {
//       var random1 = generateRandom(0, students.length - 1);
//       var random2 = generateRandom(0, desks.length - 1);
//       if (students[random1].seat == false && desks[random2].seat == false) {
//         students[random1].seat = true;
//         students[random1].deskId = random2 + 1;
//         students[random1].x = desks[random2].x;
//         students[random1].y = desks[random2].y + 15;
//         desks[random2].studentId = students[random1].id;
//         desks[random2].seat = true;
//         temp++;
//       }
//     }
//   }
// }

// function updateName(index) {
//   for (i = 0; i < students.length; i++) {
//     if (students[i].id == index) {
//       var name = document.getElementsByName("name")[index - 1].value;
//       students[i].name = name;
//     }
//   }
// }

// document.getElementById("row").addEventListener("change", function() {
//   row = document.getElementById("row").value;
//   //alert(row);
//   canvas.height = 250 + row * 120 + 200;
//   createDesk();
//   for (var i = 0; students.length; i++) {
//     students[i].reset();
//   }
// });
// document.getElementById("col").addEventListener("change", function() {
//   col = document.getElementById("col").value;
//   //alert(col);

//   createDesk();
//   for (var i = 0; students.length; i++) {
//     students[i].reset();
//   }
// });
// document.getElementById("add").addEventListener("click", function() {
//   var tr = document.createElement("tr");
//   var temp = "";
//   count++;

//   temp +=
//     "<td>" +
//     count +
//     "</td><td><input type='text' name='name' onchange='updateName(" +
//     count +
//     ")'></td>";
//   tr.id = "tr" + count; // 폼 Div에 ID 부여 (삭제를 위해)
//   tr.innerHTML = temp; // 폼 Div안에 HTML삽입
//   document.getElementById("table").appendChild(tr);
//   document.getElementById("studentCount").innerHTML = "학생수 : " + count;
//   var name = document.getElementsByName("name")[count - 1].value;
//   students.push(
//     new Student(
//       generateRandom(0, 936),
//       generateRandom(250 + row * 120, 250 + row * 120 + 50),
//       64,
//       100,
//       "image/" + generateRandom(1, 8) + ".png",
//       name,
//       count
//     )
//   );
// });
// document.getElementById("remove").addEventListener("click", function() {
//   var table = document.getElementById("table");
//   if (count > 1) {
//     var tr = document.getElementById("tr" + count);
//     table.removeChild(tr);
//     count--;
//     document.getElementById("studentCount").innerHTML = "학생수 : " + count;
//     students.pop();
//   } else {
//     alert("더 이상 삭제할 수 없습니다");
//     return false;
//   }
// });
// document.getElementById("save").addEventListener("click", function() {
//   var names = document.getElementsByName("name");

//   for (var i = 0; i < names.length; i++) {
//     if (names[i].value == "") {
//       alert("빈 항목이 있습니다");
//       return false;
//     }
//   }
//   document.getElementById("form").submit();
// });
// document.getElementById("load").addEventListener("click", function() {
//   var code = document.getElementById("code");

//   if (code.value == "") {
//     alert("코드를 입력하세요");
//     return false;
//   } else if (code.value.length != 6) {
//     alert("6자리 코드를 입력하세요");
//     return false;
//   }
//   document.getElementById("dataload").submit();
// });
// function loadStudent() {
//   for (var i = 1; i < count; i++) {
//     var name = document.getElementsByName("name")[i].value;
//     students.push(
//       new Student(
//         generateRandom(0, 936),
//         generateRandom(250 + row * 120, 250 + row * 120 + 50),
//         64,
//         100,
//         "image/" + generateRandom(1, 8) + ".png",
//         name,
//         i + 1
//       )
//     );
//   }
// }
