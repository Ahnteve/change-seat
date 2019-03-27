class Desk {
  private id: number;
  private x: number;
  private y: number;
  private image: HTMLImageElement;
  private seated: boolean;

  private static WIDTH: number = 64;
  private static HEIGHT: number = 120;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = "image/desk.png";
    this.seated = false;
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
    //this.studentId = -1;
  }
}

export default Desk;
