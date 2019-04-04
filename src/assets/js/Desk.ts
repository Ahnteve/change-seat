class Desk {
  public id: number;
  public x: number;
  public y: number;
  public image: HTMLImageElement;

  public seated: boolean;
  public seatStudent: number;

  public static WIDTH: number = 64;
  public static HEIGHT: number = 120;

  constructor(
    id: number,
    x: number,
    y: number,
    image: HTMLImageElement,
    seated?: boolean,
    seatStudent?: number
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.image = image;
    if (seated) this.seated = seated;
    else this.seated = false;
    if (seatStudent) this.seatStudent = seatStudent;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this.x, this.y, Desk.WIDTH, Desk.HEIGHT);
  }

  mouseover(mx: number, my: number): boolean {
    if (
      mx >= this.x &&
      mx <= this.x + Desk.WIDTH &&
      my >= this.y &&
      my <= this.y + Desk.HEIGHT
    ) {
      return true;
    } else {
      return false;
    }
  }

  reset() {
    this.seated = false;
    this.seatStudent = undefined;
  }
}

export default Desk;
