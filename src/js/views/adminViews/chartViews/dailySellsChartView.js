class DailySellsChartView {
  _canvas = document.getElementById("daily-sells-chart");
  _ctx = this._canvas.getContext("2d");
  _labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
  _datasets = [
    { label: "Sales Growth", data: [78, 34, 62, 12], color: "#00F5D4" },
    { label: "Customer Growth", data: [89, 30, 4, 81], color: "#F5C24A" },
    { label: "AOV Growth", data: [80, 20, 10, 70], color: "#ffffff" },
  ];
  /*  _datasets = [
    { label: "Sales Growth", data: [78, 34, 62, 12], color: "#7e2a53" },
    { label: "Customer Growth", data: [89, 30, 4, 81], color: "#ecd0ec" },
    { label: "AOV Growth", data: [80, 20, 10, 70], color: "#461D3A" },
  ]; */

  // A7FFEB

  _padding = 60;
  _ctxWidth = this._canvas.width - this._padding * 2;
  _ctxHeight = this._canvas.height - this._padding * 2 - 40; // Extra room at top for title
  _zeroY = this._canvas.height - this._padding; // The baseline Y coordinate for bars

  // Find max data point dynamically to scale the chart height perfectly
  _maxVal = Math.max(...this._datasets.flatMap((d) => d.data));
  _scaleMax = Math.ceil(this._maxVal / 5) * 5; // Rounds up to nearest 5

  constructor() {
    this._drawGrowth();
  }

  _drawGrowth() {
    // Draw GridLine X-Axis labels
    const ctx = this._ctx;

    ctx.beginPath();
    ctx.strokeStyle = "#e0e0e0";
    ctx.fillStyle = "#e5e2e2";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "right";

    const gridLine = 5;
    for (let i = 0; i <= gridLine; i++) {
      const val = (this._scaleMax / gridLine) * i;
      const yPixel = this._zeroY - (val / this._scaleMax) * this._ctxHeight;

      //

      // ctx.beginPath();
      ctx.moveTo(this._padding, yPixel);
      ctx.lineTo(this._canvas.width - this._padding, yPixel);
      ctx.stroke();

      // Draw the X-axis Text Value
      ctx.fillText(`${val}%`, this._padding - 10, yPixel);
    }

    //  Draw the grouped Bars and X-Axis labels
    const numGroups = this._labels.length;
    const groupWidth = this._ctxWidth / numGroups; // Total pixel width allocated per week
    const innerPadding = groupWidth * 0.2; // Blank gap space between weeks
    const availableBarWidth = groupWidth - innerPadding;
    const barWidth = availableBarWidth / this._datasets.length; // Width of a single isolated bar

    this._labels.forEach((label, i) => {
      // Find the starting horizontal position for this specific group/week
      const groupStartX = this._padding + i * groupWidth + innerPadding / 2;

      //Draw the week label underneath the group center

      ctx.beginPath();
      ctx.fillStyle = "#d4d4d4";
      ctx.font = `15px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(
        label,
        groupStartX + availableBarWidth / 2,
        this._zeroY + 20,
      );

      // Loop through each of the 3 metrics to draw their respective bars
      this._datasets.forEach((dataset, datasetIndex) => {
        const value = dataset.data[i];

        // Pixel math calculation to scale data to matching height
        const barHeight = (value / this._scaleMax) * this._ctxHeight;
        const xPixel = groupStartX + datasetIndex * barWidth;
        const yPixel = this._zeroY - barHeight;

        // Render the colored rectangle

        ctx.beginPath();
        ctx.fillStyle = dataset.color;
        ctx.fillRect(xPixel, yPixel, barWidth - 2, barHeight);
      });
    });

    this._datasets.forEach((data, i) => {
      const xpixel = this._padding + i * this._ctxWidth * 0.4;
      const yPixel = this._padding - 10;

      ctx.beginPath();
      ctx.fillStyle = data.color;
      ctx.arc(xpixel + this._padding + 10, yPixel, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "#d8cfc4";
      ctx.font = "15px sans-serif";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText(data.label, xpixel, yPixel);
    });
  }
}
export default new DailySellsChartView();
