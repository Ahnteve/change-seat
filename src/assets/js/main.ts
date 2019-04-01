import * as moment from "moment";
import axios from "axios";

import Classroom from "./Classroom";
import { LoadImages } from "./utils";

const rowSelector: HTMLInputElement = document.querySelector(
  ".js-row-selector"
);
const colSelector: HTMLInputElement = document.querySelector(
  ".js-col-selector"
);
const resetButton: Element = document.querySelector(".js-reset-button");
const setButton: Element = document.querySelector(".js-set-button");
const addButton: Element = document.querySelector(".js-add-button");
const studentName: HTMLInputElement = document.querySelector(
  ".js-student-name"
);
const hasEmpty: HTMLInputElement = document.querySelector("[name=has-empty]");
const studentList: Element = document.querySelector(".js-student-list");
const saveButton: HTMLButtonElement = document.querySelector(".js-save-seat");
const loadFileSelector: HTMLInputElement = document.querySelector(
  ".js-load-seat"
);

const loadedImages = LoadImages([
  "image/desk.png",
  "image/1.png",
  "image/2.png",
  "image/3.png",
  "image/4.png",
  "image/5.png",
  "image/6.png",
  "image/7.png",
  "image/8.png"
]);

const classroom: Classroom = new Classroom(
  "canvas",
  Number(rowSelector.value),
  Number(colSelector.value),
  loadedImages
);

const handleRemove = (id: number): void => {
  classroom.removeStudent(id);
};

const addStudentToTable = (id: number, name: string): void => {
  const li = document.createElement("li");
  const removeButton = document.createElement("button");
  removeButton.innerHTML = "삭제";
  removeButton.addEventListener("click", event => {
    handleRemove(id);
    const currentElement = <Element>event.target;
    currentElement.parentElement.remove();
  });

  li.innerHTML = name;
  li.appendChild(removeButton);

  studentList.appendChild(li);
};

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
  const name: string = studentName.value.trim();
  if (name === "") return;
  const id: number = classroom.createStudent(name);
  studentName.value = "";
  addStudentToTable(id, name);
};

const handleClickSave = (): void => {
  const classroomInfo: string = JSON.stringify(classroom.getInfo());
  const now: string = moment().format("YYYYMMDD");

  const a: HTMLAnchorElement = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([classroomInfo]));
  a.download = `${now}.seat`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const handleChangeFile = (event): void => {
  const handleLoad = event => {
    const loadedData = JSON.parse(event.target.result);
    classroom.loadData(loadedData);
    loadedData.students.forEach(student => {
      addStudentToTable(student.id, student.name);
    });
  };

  var reader = new FileReader();
  reader.readAsText(event.target.files[0], "UTF-8");
  reader.addEventListener("load", handleLoad);
};

rowSelector.addEventListener("change", handleChangeRow);
colSelector.addEventListener("change", handleChangeCol);

resetButton.addEventListener("click", handleClickReset);
setButton.addEventListener("click", handleClickSet);

addButton.addEventListener("click", handleClickAdd);
saveButton.addEventListener("click", handleClickSave);
loadFileSelector.addEventListener("change", handleChangeFile);
