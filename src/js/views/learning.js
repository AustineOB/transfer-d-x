class Learning {
  /* 
  _canvas = document.getElementById("lerning-canvas");
  _ctx = this._canvas.getContext("2d");
 */
  _labels = [
    "Week 1",
    "Week 2",
    "Week 3",
    "Week 4",
    "Week 5",
    "Week 6",
    "Week 7",
  ];
  //2F3E46
  _datasets = [
    {
      label: "Customer Growth",
      data: [68, 37, 30, 54, 55, 76, 34],
      color: "#3498db",
    },
    {
      label: "Service Growth",
      data: [98, 64, 32, 43, 87, 23, 80],
      color: "#1D3557",
    },
    {
      label: "AOV Growth",
      data: [50, 24, 43, 68, 45, 63, 33],
      color: "#006D77",
    },
  ];

  // ////////////////////////////////////////////
  /////FOR HORIZONTAL BAR CHARTS
  _horCanvas = document.querySelector(".learning-canvas");
  _horCtx = this._horCanvas.getContext("2d");
  _horDatasets = [
    { label: "Item A", price: 120, qty: 45 },
    { label: "Item B", price: 280, qty: 12 },
    { label: "Item C", price: 190, qty: 89 },
    { label: "Item D", price: 340, qty: 24 },
  ];

  constructor() {
    this._drawHorizontalBar();
  }

  _drawGrids() {
    // Draw Grid Lines and Y-Axis Labels
    const context = this._ctx;

    _padding = 60;
    _ctxWidth = this._canvas.width - this._padding * 2;
    _ctxHeight = this._canvas.height - this._padding * 2 - 40; // Extra room at top for title
    _zeroY = this._canvas.height - this._padding; // The baseline Y coordinate for bars

    // Find max data point dynamically to scale the chart height perfectly
    _maxVal = Math.max(...this._datasets.flatMap((d) => d.data));
    _scaleMax = Math.ceil(this._maxVal / 5) * 5; // Rounds up to nearest 5

    context.beginPath();
    context.strokeStyle = "#e0e0e0";
    context.fillStyle = "#666";
    context.font = "12px sans-serif";
    context.textAlign = "right";

    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const val = (this._scaleMax / gridLines) * i;
      const yPixel = this._zeroY - (val / this._scaleMax) * this._ctxHeight;

      // Draw Horizontal line
      context.beginPath();
      context.moveTo(this._padding, yPixel);
      context.lineTo(this._canvas.width - this._padding, yPixel);
      context.stroke();

      // Draw the text Value
      context.fillText(`${val}%`, this._padding - 10, yPixel);
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

      // Draw the week label underneath the group center
      context.beginPath();
      context.fillStyle = "#333";
      context.textAlign = "center";
      context.fillText(
        label,
        groupStartX + availableBarWidth / 2,
        this._zeroY + 20,
      );

      // Loop through each of the 3 metrics to draw their respective bars
      this._datasets.forEach((dataset, datasetI) => {
        const value = dataset.data[i];

        // Pixel math calculation to scale data to matching height
        const barHeight = (value / this._scaleMax) * this._ctxHeight;
        const xPixel = groupStartX + datasetI * barWidth;
        const yPixel = this._zeroY - barHeight;

        // Render the colored rectangle
        context.beginPath();
        context.fillStyle = dataset.color;
        context.fillRect(xPixel, yPixel, barWidth - 2, barHeight); // '- 4' adds a subtle sliver gap between grouped bars

        //draw labels on the bars
        context.beginPath();
        context.fillStyle = "#e1e1e1";
        context.textBaseline = "top";
        context.fillText(dataset.data[i], xPixel + barWidth / 2, yPixel + 2);
      });
    });

    // Draw title

    this._datasets.forEach((data, i) => {
      const xPixel = this._padding + i * this._ctxWidth * 0.2;
      const yPixel = this._padding;

      context.beginPath();
      context.fillStyle = data.color;
      context.arc(xPixel + this._padding, yPixel, 8, 0, Math.PI * 2);
      context.fill();

      context.beginPath();
      context.fillStyle = "#666";
      context.font = "12px sans-serif";
      context.textBaseline = "middle";
      context.textAlign = "center";
      context.fillText(data.label, xPixel, yPixel);
    });

    /* 
    Lavender 
    Best for single-series charts or gradients.
    #4A2E5B, #8A4FFF, #A38ED1

    Best for highlighting specific key data points.
    #4D7C5B, #D4AF37,  #E07A5F

    Best for multi-category corporate or tech charts.
    #2F3E46, #1D3557, #006D77

    BURGANDY
    burgandy background
    #F5C24A #EAA021

    #00F5D4 #A7BEAE

    #FFFFFF #E0F7FA
    */
  }

  _drawHorizontalBar() {
    const ctx = this._horCtx;

    const width = 600;
    const barHeight = 35;
    const barSpacing = 15;
    const labelWidth = 60; //Space reserved on the left for items names
    const rightPadding = 80; // Extra room on the right for end-of-bar data
    const height = this._horDatasets.length * (barHeight + barSpacing);

    // Find max price to scale bars horizontall
    const maxPrice = Math.max(...this._horDatasets.map((d) => d.price));
    const maxBarWidth = width - labelWidth - rightPadding;

    // Helper functions to create SVG element inside the correct namesace
    const createSVGElement = (tag) => {
      return document.createAttributeNS("http://w3.org", tag);
    };
    // Initallize Svg container
    const svg = createSVGElement("svg");
    // svg.setAttribute("width", width);
    // svg.setAttribute("width", width);

    // svg.setAttribute("height", height);
    console.log(svg);
  }
}
export default new Learning();
