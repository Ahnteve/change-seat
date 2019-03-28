import Classroom from "./Classroom";

const rowSelector: HTMLInputElement = document.querySelector(
  ".js-row-selector"
);
const colSelector: HTMLInputElement = document.querySelector(
  ".js-col-selector"
);
const resetButton: Element = document.querySelector(".js-reset-button");
const setButton: Element = document.querySelector(".js-set-button");
const addButton: Element = document.querySelector(".js-add-button");
const reomveButton: Element = document.querySelector(".js-remove-button");
const hasEmpty: HTMLInputElement = document.querySelector("[name=has-empty]");

const classroom: Classroom = new Classroom(
  "canvas",
  Number(rowSelector.value),
  Number(colSelector.value)
);

const handleChangeRow = event => {
  classroom.setDesk(event.target.value, Number(colSelector.value));
  classroom.reset();
};
const handleChangeCol = event => {
  classroom.setDesk(Number(rowSelector.value), event.target.value);
  classroom.reset();
};

const handleClickReset = () => {
  classroom.reset();
};
const handleClickSet = () => {
  classroom.setSeat(hasEmpty.checked);
};

const handleClickAdd = () => {
  classroom.createStudent();
};

const handleClickRemove = event => {};

rowSelector.addEventListener("change", handleChangeRow);
colSelector.addEventListener("change", handleChangeCol);

resetButton.addEventListener("click", handleClickReset);
setButton.addEventListener("click", handleClickSet);

addButton.addEventListener("click", handleClickAdd);
reomveButton.addEventListener("click", handleClickRemove);

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
