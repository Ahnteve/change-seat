import Student from "./Student";
import Desk from "./Desk";

class Classroom {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private image: HTMLImageElement;
  private row: number;
  private col: number;
  private diffx: number;
  private diffy: number;

  private students: Student[];
  private desks: Desk[];

  private static WIDTH: number = 1000;
  private static HEIGHT: number = 2000;

  constructor(id: string) {
    this.canvas = <HTMLCanvasElement>document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.image = new Image();
    this.image.addEventListener("load", () => {
      this.draw();
    });
    this.image.src = "./image/class.png";

    this.canvas.addEventListener("mousedown", this.handleStartDrag);

    this.row = 2;
    this.col = 2;
  }

  createStudent() {}

  putDesk() {}

  draw(): void {
    this.ctx.drawImage(this.image, 0, 0, Classroom.WIDTH, Classroom.HEIGHT);
    if (this.desks) this.desks.forEach(desk => desk.draw(this.ctx));
    if (this.students) this.students.forEach(student => student.draw(this.ctx));
  }

  reset(): void {
    this.students.forEach(student => student.reset());
    this.desks.forEach(desk => desk.reset());
  }

  handleStartDrag(event: MouseEvent): void {
    const mx: number = event.offsetX;
    const my: number = event.offsetY;

    this.students.forEach((student, index) => {
      if (student.mouseover(mx, my)) {
        if (student.seated) {
          student.standUp();
          //       desks[students[i].deskId - 1].seat = false;
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
          desk.seated = true;
          desk.seatStudent = selectedStudent.id;
        }
      }
    });

    this.canvas.removeEventListener("mousemove", this.handleDrag);
    this.canvas.removeEventListener("mouseup", this.handleDrop);
  }
}

export default Classroom;
