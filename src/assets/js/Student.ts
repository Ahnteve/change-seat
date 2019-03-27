import { GenerateRandom } from "./utils";

class Student {
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private image: HTMLImageElement;
  private name: string;
  private id: number;
  private deskId: number;
  private seat: boolean;

  constructor() {
    this.x = GenerateRandom(0, 936);
    //this.y=GenerateRandom()
    this.width = 64;
    this.height = 100;
    this.image = new Image();
    this.image.src = `image/${GenerateRandom(1, 8)}.png`;
    // students.push(
    //       new Student(
    //         generateRandom(0, 936),
    //         generateRandom(250 + row * 120, 250 + row * 120 + 50),
    //         64,
    //         100,
    //         "image/" + generateRandom(1, 8) + ".png",
    //         names[i].value,
    //         i + 1
    //       )
  }

  //(x, y, width, height, image, name, id)
  // this.image = new Image();
  // this.image.src = image;
  // this.width = width;
  // this.height = height;
  // this.x = x;
  // this.y = y;
  // this.name = name;
  // this.id = id;

  draw() {
    //   ctx = area.context;
    //   ctx.drawImage(
    //     this.image,
    //     0 * 64,
    //     this.currentCycle * 100,
    //     this.width,
    //     this.height,
    //     this.x,
    //     this.y,
    //     this.width,
    //     this.height
    //   );
    //   ctx.font = "15px 나눔고딕";
    //   ctx.textAlign = "center";
    //   ctx.fillText(this.name, this.x + 32, this.y);
  }

  // this.mouseover = mouseover;
  // function mouseover(mx, my) {
  //   if (
  //     mx >= this.x &&
  //     mx <= this.x + this.width &&
  //     my >= this.y &&
  //     my <= this.y + this.height
  //   ) {
  //     return true;
  //   } else return false;
  // }

  reset() {
    this.x = GenerateRandom(0, 936);
    //this.y = GenerateRandom(250 + row * 120, 250 + row * 120 + 50);
    this.deskId = -1;
    this.seat = false;
  }
}

export default Student;

// var row = 2;
// var col = 2;

// var desks = [];
// var students = [];
// var classroom;
// var names;

// var count = 1;
// var diffx, diffy;
// var area = {
//   canvas: document.getElementById("canvas"),
//   start: function() {
//     canvas.addEventListener("mousedown", startDrag, false);
//     this.context = this.canvas.getContext("2d");
//     this.interval = setInterval(updateArea, 20);
//   },
//   clear: function() {
//     this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//   },
//   stop: function() {
//     clearInterval(this.interval);
//   },
//   reset: function() {
//     for (var i = 0; i < students.length; i++) {
//       students[i].reset();
//     }
//     for (var i = 0; i < desks.length; i++) {
//       desks[i].reset();
//     }
//   }
// };

// function reset() {
//   for (var i = 0; i < students.length; i++) {
//     students[i].reset();
//   }
//   for (var i = 0; i < desks.length; i++) {
//     desks[i].reset();
//   }
// }

// function start() {
//   createStudent();
//   createDesk();

//   classroom = new Classroom(0, 0, 1000, 2000, "image/class.png");

//   area.start();
// }

// function updateArea() {
//   classroom.draw();
//   for (i = 0; i < desks.length; i++) desks[i].draw();

//   for (i = 0; i < students.length; i++) students[i].draw();
// }

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
// var generateRandom = function(min, max) {
//   var num = Math.floor(Math.random() * (max - min + 1)) + min;
//   return num;
// };

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

// function Student(x, y, width, height, image, name, id) {
//   this.image = new Image();
//   this.image.src = image;
//   this.width = width;
//   this.height = height;
//   this.x = x;
//   this.y = y;
//   this.name = name;
//   this.id = id;
//   this.currentCycle = 0;
//   this.deskId = -1;
//   this.seat = false;

//   this.draw = draw;
//   this.setCurrentCycle = setCurrentCycle;

//   function setCurrentCycle(updateCycle) {
//     var temp = 0;
//     switch (updateCycle) {
//       case "down":
//         temp = 0;
//       case "up":
//         temp = 3;
//       case "left":
//         temp = 1;
//       case "right":
//         temp = 2;
//     }
//     this.currentCycle = temp;
//   }
//   function draw() {
//     ctx = area.context;
//     ctx.drawImage(
//       this.image,
//       0 * 64,
//       this.currentCycle * 100,
//       this.width,
//       this.height,
//       this.x,
//       this.y,
//       this.width,
//       this.height
//     );
//     ctx.font = "15px 나눔고딕";
//     ctx.textAlign = "center";
//     ctx.fillText(this.name, this.x + 32, this.y);
//   }

//   this.mouseover = mouseover;
//   function mouseover(mx, my) {
//     if (
//       mx >= this.x &&
//       mx <= this.x + this.width &&
//       my >= this.y &&
//       my <= this.y + this.height
//     ) {
//       return true;
//     } else return false;
//   }

//   this.reset = reset;
//   function reset() {
//     this.x = generateRandom(0, 936);
//     this.y = generateRandom(250 + row * 120, 250 + row * 120 + 50);
//     this.currentCycle = 0;
//     this.deskId = -1;
//     this.seat = false;
//   }
// }
// function Classroom(x, y, width, height, image) {
//   this.image = new Image();
//   this.image.src = image;
//   this.width = width;
//   this.height = height;
//   this.x = x;
//   this.y = y;
//   this.draw = draw;

//   function draw() {
//     ctx = area.context;
//     ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
//   }
// }

// function Desk(x, y, width, height, image, id) {
//   this.image = new Image();
//   this.image.src = image;
//   this.width = width;
//   this.height = height;
//   this.x = x;
//   this.y = y;
//   this.seat = false;
//   this.studentId = -1;
//   this.id = id;
//   this.draw = draw;

//   function draw() {
//     ctx = area.context;
//     ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
//   }

//   this.mouseover = mouseover;
//   function mouseover(mx, my) {
//     if (
//       mx >= this.x &&
//       mx <= this.x + this.width &&
//       my >= this.y &&
//       my <= this.y + this.height
//     ) {
//       return true;
//     } else {
//       return false;
//     }
//   }
//   this.reset = reset;
//   function reset() {
//     this.seat = false;
//     this.studentId = -1;
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
// function startDrag(e) {
//   mx = e.offsetX;
//   my = e.offsetY;
//   var item;
//   for (i = 0; i < students.length; i++) {
//     if (students[i].mouseover(mx, my)) {
//       if (students[i].seat) {
//         students[i].seat = false;
//         desks[students[i].deskId - 1].seat = false;
//       }
//       diffx = mx - students[i].x;
//       diffy = my - students[i].y;
//       item = students[i];
//       //alert(item.image.src);
//       students.splice(i, 1);
//       students.push(item);

//       canvas.addEventListener("mousemove", move, false);
//       canvas.addEventListener("mouseup", drop, false);
//       break;
//     }
//   }
// }
// function move(e) {
//   mx = e.offsetX;
//   my = e.offsetY;
//   students[students.length - 1].x = mx - diffx;
//   students[students.length - 1].y = my - diffy;
// }
// function drop(e) {
//   mx = e.offsetX;
//   my = e.offsetY;
//   var temp = 0;
//   for (i = 0; i < desks.length; i++) {
//     if (desks[i].mouseover(mx, my)) {
//       if (desks[i].seat == false) {
//         //alert(students[students.length-1].image.src);
//         students[students.length - 1].seat = true;
//         students[students.length - 1].x = desks[i].x;
//         students[students.length - 1].y = desks[i].y + 15;
//         //students[students.length-1].setCurrentCycle(1);
//         desks[i].seat = true;
//         desks[i].studentId = students[students.length - 1].id;
//         students[students.length - 1].deskId = desks[i].id;
//         break;
//       }
//     }
//   }

//   canvas.removeEventListener("mousemove", move, false);
//   canvas.removeEventListener("mouseup", drop, false);
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
