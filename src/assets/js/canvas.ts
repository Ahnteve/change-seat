class Canvas {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor() {}

  clear(): void {}
  stop(): void {}
  reset(): void {}
}
//     canvas: document.getElementById("canvas"),
//     start: function() {
//       canvas.addEventListener("mousedown", startDrag, false);
//       this.context = this.canvas.getContext("2d");
//       this.interval = setInterval(updateArea, 20);
//     },
//     clear: function() {
//       this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     },
//     stop: function() {
//       clearInterval(this.interval);
//     },
//     reset: function() {
//       for (var i = 0; i < students.length; i++) {
//         students[i].reset();
//       }
//       for (var i = 0; i < desks.length; i++) {
//         desks[i].reset();
//       }
//     }
//   };
