import { GenerateRandom } from './utils';

class Student {
  public id: number;
  public x: number;
  public y: number;
  public image: HTMLImageElement;
  public name: string;
  public seated: boolean;
  public seatDesk: number;

  public static WIDTH: number = 64;
  public static HEIGHT: number = 100;

  constructor(
    id: number,
    name: string,
    row: number,
    image: HTMLImageElement,
    x?: number,
    y?: number,
    seated?: boolean,
    seatDesk?: number
  ) {
    this.id = id;
    this.name = name;
    if (x && y) {
      this.x = x;
      this.y = y;
    } else {
      console.log('random');
      this.x = GenerateRandom(0, 936);
      this.y = GenerateRandom(250 + row * 120, 250 + row * 120 + 50);
    }
    this.image = image;
    this.seated = seated;
    this.seatDesk = seatDesk;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.image,
      18,
      0,
      Student.WIDTH,
      Student.HEIGHT,
      this.x,
      this.y,
      Student.WIDTH,
      Student.HEIGHT
    );
    ctx.font = '15px 나눔고딕';
    ctx.textAlign = 'center';
    ctx.fillText(this.name, this.x + 32, this.y);
  }

  mouseover(mx: number, my: number): boolean {
    if (
      mx >= this.x &&
      mx <= this.x + Student.WIDTH &&
      my >= this.y &&
      my <= this.y + Student.HEIGHT
    ) {
      return true;
    } else return false;
  }

  reset(row: number): void {
    this.standUp();
    this.x = GenerateRandom(0, 936);
    this.y = GenerateRandom(250 + row * 120, 250 + row * 120 + 50);
  }

  seat(): void {
    this.seated = true;
  }

  standUp(): void {
    this.seated = false;
    this.seatDesk = undefined;
  }
}

export default Student;
