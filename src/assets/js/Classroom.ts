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

  constructor(id: string, row: number, col: number, loadedImages: Object) {
    this.canvas = <HTMLCanvasElement>document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    this.image = new Image();
    this.image.addEventListener('load', () => {
      this.draw();
    });
    this.image.src = './image/class.png';
    this.students = [];
    this.row = row;
    this.col = col;
    this.loadedImages = loadedImages;
    this.isSet = false;
    this.setMode = false;

    this.setDesk(row, col);

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

  removeStudent(id: number): void {
    this.students = this.students.filter(student => student.id !== id);
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
            250 + i * Desk.HEIGHT,
            this.loadedImages['image/desk.png']
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

    if (this.students && !this.setMode) {
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

          this.canvas.addEventListener('mousemove', this.handleDrag);
          this.canvas.addEventListener('mouseup', this.handleDrop);
        }
      });
    }

    if (this.desks && this.setMode) {
      this.desks.forEach((desk, index) => {
        if (desk.mouseover(mx, my)) {
          this.diffx = mx - desk.x;
          this.diffy = my - desk.y;
          let item = desk;
          this.desks.splice(index, 1);
          this.desks.push(item);

          this.canvas.addEventListener('mousemove', this.handleDrag);
          this.canvas.addEventListener('mouseup', this.handleDrop);
        }
      });
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
      const loadedStudent = new Student(
        id,
        name,
        this.row,
        this.loadedImages[`image/${GenerateRandom(1, 7)}.png`]
      );
      loadedStudent.x = x;
      loadedStudent.y = y;
      loadedStudent.seated = seated;
      loadedStudent.seatDesk = seatDesk;
      return loadedStudent;
    });

    this.students = students;
    this.setDesk(this.row, this.col);
  }

  changeMode(): void {
    this.reset();
    this.setMode = !this.setMode;
    this.draw();
  }
}

export default Classroom;
