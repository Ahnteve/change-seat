import Student from './Student';
import Desk from './Desk';
import { GenerateRandom } from './utils';

class Classroom {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private image: HTMLImageElement;
  private diffx: number;
  private diffy: number;
  private loadedImages: Object;
  private isSet: boolean;
  private count: number = 0;
  private setMode: boolean;

  public static MAX_WIDTH: number = 1000;
  public static MAX_HEIGHT: number = 2000;

  private students: Student[];
  private desks: Desk[];

  private row: number;
  private col: number;

  constructor(selector: string, loadedImages: Object) {
    this.canvas = <HTMLCanvasElement>document.querySelector(selector);
    this.ctx = this.canvas.getContext('2d');
    this.image = new Image();
    this.image.addEventListener('load', () => {
      this.draw();
    });
    this.image.src = './image/class.png';
    this.students = [];
    this.desks = [];
    this.row = 1;
    this.col = 1;
    this.loadedImages = loadedImages;
    this.isSet = false;
    this.setMode = false;

    this.handleStartDrag = this.handleStartDrag.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDrop = this.handleDrop.bind(this);

    this.canvas.addEventListener('mousedown', this.handleStartDrag);
  }

  getId(): number {
    return this.count++;
  }

  createStudent(name: string): number;
  createStudent(students: Array<Student>): void;
  createStudent(x: string | Array<Student>): any {
    if (typeof x === 'string') {
      const id: number = this.getId();
      this.students.push(
        new Student(
          id,
          x,
          this.row,
          this.loadedImages[`image/${GenerateRandom(1, 7)}.png`]
        )
      );
      this.draw();
      return id;
    } else {
      x.forEach(student => this.students.push(student));
    }
  }

  createDesk(): number;
  createDesk(desks: Array<Desk>): void;
  createDesk(desks?: Array<Desk>): any {
    if (!desks) {
      let x: number, y: number;

      if (this.desks.length !== 0) {
        const lastDesk: Desk = this.desks[this.desks.length - 1];
        x = lastDesk.x + 10;
        y = lastDesk.y + 10;
      } else {
        x = this.canvas.width / 2;
        y = this.canvas.height / 2;
      }

      const id = this.desks.length;
      this.desks.push(new Desk(id, x, y, this.loadedImages['image/desk.png']));
      this.draw();
      return id;
    } else {
      desks.forEach(desk => this.desks.push(desk));
    }
  }

  removeStudent(id: number): void {
    const removeStudent = this.students.filter(student => student.id == id)[0];
    this.students = this.students.filter(student => student.id !== id);
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
    if (this.isSet) this.reset();
    else this.isSet = true;

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
    if (this.students && !this.setMode)
      this.students.forEach(student => student.draw(this.ctx));
  }

  reset(): void {
    this.students.forEach(student => student.reset(this.row));
    this.desks.forEach(desk => desk.reset());
    this.draw();
  }

  handleStartDrag(event: MouseEvent): void {
    const mx: number = event.offsetX;
    const my: number = event.offsetY;

    if (event.which == 1) {
      if (this.students && !this.setMode) {
        const selectedStudents = this.students.filter(student =>
          student.mouseover(mx, my)
        );

        if (selectedStudents.length !== 0) {
          const selectedStudent = selectedStudents.pop();
          this.students = this.students.filter(
            student => selectedStudent.id !== student.id
          );

          if (selectedStudent.seated) {
            let seatedDesk = this.desks.filter(
              desk => desk.id === selectedStudent.seatDesk
            )[0];
            seatedDesk.seated = false;
            selectedStudent.standUp();
          }

          this.diffx = mx - selectedStudent.x;
          this.diffy = my - selectedStudent.y;
          this.students.push(selectedStudent);

          this.canvas.addEventListener('mousemove', this.handleDrag);
          this.canvas.addEventListener('mouseup', this.handleDrop);
        }
      }

      if (this.desks && this.setMode) {
        const selectedDesks = this.desks.filter(desk => desk.mouseover(mx, my));

        if (selectedDesks.length !== 0) {
          const selectedDesk = selectedDesks.pop();
          this.desks = this.desks.filter(desk => desk.id !== selectedDesk.id);
          this.diffx = mx - selectedDesk.x;
          this.diffy = my - selectedDesk.y;
          this.desks.push(selectedDesk);

          this.canvas.addEventListener('mousemove', this.handleDrag);
          this.canvas.addEventListener('mouseup', this.handleDrop);
        }
      }
    }
  }

  handleDrag(event: MouseEvent) {
    const mx: number = event.offsetX;
    const my: number = event.offsetY;

    if (!this.setMode) {
      const selectedStudent: Student = this.students[this.students.length - 1];
      selectedStudent.x = mx - this.diffx;
      selectedStudent.y = my - this.diffy;
      this.draw();
    } else {
      const selectedDesk: Desk = this.desks[this.desks.length - 1];
      selectedDesk.x = mx - this.diffx;
      selectedDesk.y = my - this.diffy;
      this.draw();
    }
  }

  handleDrop(event: MouseEvent) {
    const mx: number = event.offsetX;
    const my: number = event.offsetY;
    if (!this.setMode) {
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
    }

    this.canvas.removeEventListener('mousemove', this.handleDrag);
    this.canvas.removeEventListener('mouseup', this.handleDrop);
  }

  getInfo(): Object {
    return {
      isSet: this.isSet,
      count: this.count,
      row: this.row,
      col: this.col,
      students: this.students,
      desks: this.desks
    };
  }

  loadData(data): void {
    const { row, col, count, isSet } = data;
    this.row = row;
    this.col = col;
    this.count = count;
    this.isSet = isSet;

    const students = data.students.map(student => {
      const { id, name, x, y, seated, seatDesk } = student;
      return new Student(
        id,
        name,
        this.row,
        this.loadedImages[`image/${GenerateRandom(1, 7)}.png`],
        x,
        y,
        seated,
        seatDesk
      );
    });

    const desks = data.desks.map(desk => {
      const { id, x, y, seated, seatStudent } = desk;
      return new Desk(
        id,
        x,
        y,
        this.loadedImages[`image/desk.png`],
        seated,
        seatStudent
      );
    });

    this.students = students;
    this.desks = desks;

    this.draw();
  }

  changeMode(): boolean {
    this.reset();
    this.setMode = !this.setMode;
    this.draw();
    return this.setMode;
  }
}

export default Classroom;
