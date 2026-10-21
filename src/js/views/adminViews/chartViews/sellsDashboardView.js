class DeviationCategoryChartView {
  _canvasCategory = document.getElementById("category-chart");
  _categoryCtx = this._canvasCategory.getContext("2d");

  _canvasDeviation = document.getElementById("deviation-chart");
  _deviationCtx = this._canvasDeviation.getContext("2d");
  _devLabels = ["Q1", "Q2", "Q3", "Q4"];
  _allScrubber = document.querySelectorAll(".scrubber");

  _labels = ["Q1", "Q2", "Q3", "Q4"];
  _devProfitData = [500, 300, -2000, 6000];
  _devCashData = [400, -6000, 5000, -1000];
  /* 
  _streamYellow = [500, 300, -2000, 6000];
  _streamBlue = [400, -6000, 5000, -1000];
 */
  _catData = [
    { label: "Category A", value: 500, color: "#d8cfc4" },
    { label: "Category B", value: 300, color: "#800020" },
    { label: "Category C", value: 200, color: "#c9a227" },
  ];

  constructor() {
    this._drawCategory();
    this._drawDeviation();
  }

  _drawCategory() {
    const ctx = this._categoryCtx;

    ctx.clearRect(
      0,
      0,
      this._canvasCategory.width,
      this._canvasCategory.height,
    );
    // Chart Styling Coordinate
    const centerX = this._canvasCategory.width / 2;
    const centerY = this._canvasCategory.height / 2;
    const radius = Math.min(centerX, centerY) * 0.7; // 70% of the available space

    //  Total sum of all the values
    const total = this._catData.reduce((sum, data) => sum + data.value, 0);

    // Drawing the Pie Slice
    // Starting at -90 degres(-Math.PI / 2) to beging pointing straight up
    let startAngle = -Math.PI / 2;

    this._catData.forEach((slice) => {
      // Calculate slice size in radius base on its portion of the total
      const sliceAngle = (slice.value / total) * (2 * Math.PI);
      const endAngle = startAngle + sliceAngle;

      // Begin drawing slice path
      ctx.beginPath();
      ctx.fillStyle = slice.color;
      ctx.moveTo(centerX, centerY); // Move to center point
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.fill();

      // Border Line
      // ctx.beginPath();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 4;
      ctx.stroke();

      // Calculate coordinate to draw label outside the slices
      const midAngle = startAngle + sliceAngle / 2;
      const textRadius = radius + 25; //Pushing text a little past the perimeter
      const textX = centerX + Math.cos(midAngle) * textRadius;
      const textY = centerY + Math.sin(midAngle) * textRadius;

      // Apply Text styling
      ctx.beginPath();
      ctx.fillStyle = "#333333";
      ctx.font = "12px sans-serif";
      // Adjust Text alignment dynamically depending on which side of the circle it fall on
      ctx.textAlign = Math.cos(midAngle) > 0 ? "left" : "right";
      ctx.textBaseline = "middle";

      // Format Text
      const percentage = Math.round((slice.value / total) * 100);
      ctx.fillText(`${slice.label} (${percentage})%`, textX, textY);

      // Icreamenting the starting Angle
      startAngle = endAngle;
    });

    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.arc(centerX, centerY, radius * 0.5, 0, 2 * Math.PI);
    ctx.fill();
  }

  _drawDeviation() {
    const ctx = this._deviationCtx;

    const cWidth = this._canvasDeviation.width;
    const cHeight = this._canvasDeviation.height;

    // Esctablish strict vertical grid padding limits
    const ceilingY = 30;
    const floorY = cHeight - 40;
    const totalUsableheight = floorY - ceilingY;

    const maxLimitScale = 15000;
    /* 
  // Find absolute global Array Max value to lock chart scale steady during srcubbing animations
    const globalMax = Math.max(...[...this._streamYellow, ...this._streamBlue]); */

    const drawLiveDashboard = () => {
      // Fetch values live straight out of each ecrubber inout node
      const streamYellow = [
        parseInt(document.getElementById("revQ1").value),
        parseInt(document.getElementById("revQ2").value),
        parseInt(document.getElementById("revQ3").value),
        parseInt(document.getElementById("revQ4").value),
      ];

      const streamBlue = [
        parseInt(document.getElementById("expQ1").value),
        parseInt(document.getElementById("expQ2").value),
        parseInt(document.getElementById("expQ3").value),
        parseInt(document.getElementById("expQ4").value),
      ];
      // Refresh label readout text components alogside scrub tracks
      for (let i = 0; i < 4; i++) {
        const qnum = i + 1;
        document.getElementById("lbl_revQ" + qnum).innerText =
          "\$" + streamYellow[i].toLocaleString();
        document.getElementById("lbl_revQ" + qnum).innerText =
          "\$" + streamBlue[i].toLocaleString();
      }

      // Clear canvas
      ctx.clearRect(0, 0, cWidth, cHeight);
      ctx.strokeStyle = "#f4f6f7";
      ctx.lineWidth = 1;
      for (let g = 0; g <= 4; g++) {
        const lineY = ceilingY + g * (totalUsableheight / 4);
        ctx.beginPath();
        ctx.moveTo(35, lineY);
        ctx.lineTo(cWidth - 20, lineY);
        ctx.stroke();
      }
      // Solid baseline ground boundary layout parameters
      ctx.beginPath();
      ctx.strokeStyle = "#95a5a6";
      ctx.lineWidth = 2;
      ctx.moveTo(35, floorY);
      ctx.lineTo(cWidth - 20, floorY);
      ctx.stroke();

      // Darw column loops alculations parameters logic
      const sectionWidth = (cWidth - 55) / this._labels.length;
      const barW = 45;
      for (let j = 0; j <= this._labels.length; j++) {
        // prettier-ignore
        const sectionCenter = 30 + (j * sectionWidth )+( sectionWidth / 2);

        const yellowX = sectionCenter - barW - 2;
        const blueX = sectionCenter + 2;

        // Scale line limits tracking mapping operations variables transformations
        const yHeight = (streamYellow[j] / maxLimitScale) * totalUsableheight;
        const bHeight = (streamBlue[j] / maxLimitScale) * totalUsableheight;

        // Paint Revenue (Yellow Bar)
        ctx.beginPath();
        ctx.fillStyle = "#f1c40f";
        ctx.fillRect(yellowX, floorY - yHeight, barW, yHeight);

        // Paint Expenses (Blue Bar)
        ctx.beginPath();
        ctx.fillStyle = "#3498db";
        ctx.fillRect(blueX, floorY - bHeight, barW, bHeight);

        // Axis string label positions layout transformations
        ctx.fillStyle = "#34495e";
        ctx.font = "bold 12px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(this._labels[j], sectionCenter, floorY + 22);

        // Floating numbers directly above each bar group
        ctx.beginPath();
        ctx.font = "bold 12px sans-serif";
        ctx.fillStyle = "#df8639";
        //e67e22
        ctx.fillText(
          `₵${streamYellow[j]}`,
          yellowX + barW / 2,
          floorY - yHeight - 6,
        );
        ctx.beginPath();
        ctx.font = "bold 12px sans-serif";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#063453";
        //2980b9
        ctx.fillText(
          `₵${streamBlue[j]}`,
          blueX + barW / 2,
          floorY - bHeight - 6,
        );
      }
    };
    drawLiveDashboard();
    this._allScrubber.forEach((scrubber) =>
      scrubber.addEventListener("input", drawLiveDashboard),
    );
  }
}
export default new DeviationCategoryChartView();
