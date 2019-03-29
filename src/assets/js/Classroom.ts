import Student from "./Student";
import Desk from "./Desk";
import { GenerateRandom } from "./utils";

class Classroom {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private image: HTMLImageElement;
  private diffx: number;
  private diffy: number;
  private loadedImages;

  public static MAX_WIDTH: number = 1000;
  public static MAX_HEIGHT: number = 2000;

  private students: Student[];
  private desks: Desk[];

  private row: number;
  private col: number;

  constructor(
    id: string,
    row: number,
    col: number,
    loadedImages: HTMLImageElement[]
  ) {
    this.canvas = <HTMLCanvasElement>document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.image = new Image();
    this.image.addEventListener("load", () => {
      this.draw();
    });
    this.image.src = "./image/class.png";
    this.students = [];
    this.row = row;
    this.col = col;
    this.loadedImages = loadedImages;

    this.setDesk(row, col);

    this.handleStartDrag = this.handleStartDrag.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDrop = this.handleDrop.bind(this);

    this.canvas.addEventListener("mousedown", this.handleStartDrag);
  }

  createStudent() {
    const id: number = this.students.length + 1;
    this.students.push(
      new Student(id, this.row, this.loadedImages[GenerateRandom(1, 7)])
    );
    this.draw();
  }

  setDesk(row: number, col: number): void {
    this.desks = [];
    this.row = row;
    this.col = col;

    for (var i = 0; i < row; i++) {
      for (var j = 0; j < col; j++) {
        this.desks.push(
          new Desk(
            col * i + (j + 1),
            this.canvas.width / 2 + (j - col / 2) * Desk.WIDTH,
            250 + i * Desk.HEIGHT
          )
        );
      }
    }
    this.canvas.height = 250 + row * 120 + 200;
    this.draw();
  }

  matchStudent(student: Student, desk: Desk): void {
    student.seated = true;
    student.x = desk.x;
    student.y = desk.y + 15;
    student.seatDesk = desk.id;
    desk.seated = true;
    desk.seatStudent = student.id;
  }

  setSeat(hasEmpty: boolean): void {
    const standingStudents = this.students.filter(student => !student.seated);
    standingStudents.sort(() => 0.5 - Math.random());
    const emptyDesks = this.desks.filter(desk => !desk.seated);

    if (hasEmpty) emptyDesks.sort(() => 0.5 - Math.random());

    emptyDesks.forEach((emptyDesk, index) => {
      if (index < standingStudents.length) {
        this.matchStudent(standingStudents[index], emptyDesk);
      }
    });
    this.draw();
  }

  draw(): void {
    this.ctx.drawImage(
      this.image,
      0,
      0,
      Classroom.MAX_WIDTH,
      Classroom.MAX_HEIGHT
    );
    if (this.desks) this.desks.forEach(desk => desk.draw(this.ctx));
    if (this.students) this.students.forEach(student => student.draw(this.ctx));
  }

  reset(): void {
    this.students.forEach(student => student.reset(this.row));
    this.desks.forEach(desk => desk.reset());
    this.draw();
  }

  handleStartDrag(event: MouseEvent): void {
    const mx: number = event.offsetX;
    const my: number = event.offsetY;

    if (this.students)
      this.students.forEach((student, index) => {
        if (student.mouseover(mx, my)) {
          if (student.seated) {
            let seatDesk = this.desks.filter(
              desk => desk.id === student.seatDesk
            )[0];
            seatDesk.seated = false;
            student.standUp();
          }
          this.diffx = mx - student.x;
          this.diffy = my - student.y;
          let item = student;
          this.students.splice(index, 1);
          this.students.push(item);

          this.canvas.addEventListener("mousemove", this.handleDrag);
          this.canvas.addEventListener("mouseup", this.handleDrop);
        }
      });
  }

  handleDrag(event: MouseEvent) {
    const mx: number = event.offsetX;
    const my: number = event.offsetY;

    const selectedStudent: Student = this.students[this.students.length - 1];
    selectedStudent.x = mx - this.diffx;
    selectedStudent.y = my - this.diffy;
    this.draw();
  }

  handleDrop(event: MouseEvent) {
    const mx: number = event.offsetX;
    const my: number = event.offsetY;

    const selectedStudent: Student = this.students[this.students.length - 1];

    this.desks.forEach(desk => {
      if (desk.mouseover(mx, my)) {
        if (!desk.seated) {
          selectedStudent.seated = true;
          selectedStudent.x = desk.x;
          selectedStudent.y = desk.y + 15;
          selectedStudent.seatDesk = desk.id;
          desk.seated = true;
          desk.seatStudent = selectedStudent.id;
        }
      }
    });

    this.draw();

    this.canvas.removeEventListener("mousemove", this.handleDrag);
    this.canvas.removeEventListener("mouseup", this.handleDrop);
  }
}

export default Classroom;
