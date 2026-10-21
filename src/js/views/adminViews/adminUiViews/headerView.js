class HeaderView {
  _calenderParentEl = document.querySelector(".calender");
  _currentDate = new Date();
  _currentYear = this._currentDate.getFullYear();
  _currentMonth = this._currentDate.getMonth();
  constructor() {
    // prettier-ignore
    this.months = ['January', 'February','March','April', 'May', 'June', 'July','August','September', 'October','November', 'December']
    this.weekDays = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    this._renderCalender();
    this._calenderParentEl.addEventListener(
      "click",
      this._addHandlerToggleCalender.bind(this),
    );
  }

  _addHandlerToggleCalender(e) {
    const btnId = e.target.id;
    if (btnId === "next" && this._currentMonth === 11) {
      this._currentYear++;
      this._currentMonth = 0;
    } else if (btnId === "prev" && this._currentMonth === 0) {
      this._currentYear--;
      this._currentMonth = 11;
    } else {
      this._currentMonth =
        btnId === "next" ? this._currentMonth + 1 : this._currentMonth - 1;
    }

    this._currentDate = new Date(
      this._currentYear,
      this._currentMonth,
      new Date().getDate(),
    );
    this._currentYear = this._currentDate.getFullYear();
    this._currentMonth = this._currentDate.getMonth();
    this._renderCalender();
  }

  _renderCalender() {
    const start = new Date(this._currentYear, this._currentMonth, 1).getDate();

    const endDate = new Date(
      this._currentYear,
      this._currentMonth + 1,
      0,
    ).getDate();
    const end = new Date(
      this._currentYear,
      this._currentMonth,
      endDate,
    ).getDay();

    let datesHtml = "";

    for (let i = start; i > 0; i--) {
      const endPrevDate = new Date(
        this._currentYear,
        this._currentMonth,
        0 - i + 1,
      );
      datesHtml += `<li class="calender__date calender__date--inactive">${endPrevDate.getDate()}</li>`;
    }

    let weekDay = null;

    for (let i = 1; i <= endDate; i++) {
      const activeClass =
        i === this._currentDate.getDate() &&
        this._currentMonth === new Date().getMonth() &&
        this._currentYear === new Date().getFullYear()
          ? "calender__date--active"
          : "";

      datesHtml += `<li class="calender__date ${activeClass}">${i}</li>`;
      if (this.weekDays[i]) weekDay = this.weekDays[i];
    }
    console.log(weekDay);

    for (let i = 1; i <= 7 - end; i++) {
      const nextDate = new Date(this._currentYear, this._currentMonth + 1, i);
      datesHtml += `<li class="calender__date calender__date--inactive">${nextDate.getDate()}</li>`;
    }

    document.querySelector(".calender__dates-wrapper").innerHTML = datesHtml;

    document.querySelector(".calender__month-year").textContent =
      `${this.months[this._currentMonth]} ${this._currentYear}`;

    document.querySelector(".calender__datetxt").textContent =
      `${weekDay}, ${this._currentDate.getDate()} ${this.months[this._currentMonth]} ${this._currentYear}`;
  }
}

export default new HeaderView();
