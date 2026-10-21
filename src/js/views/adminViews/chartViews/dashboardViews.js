class DashboardViews {
  _allDashboard = document.querySelectorAll(".inventory__content");
  _dashboardBtnsContent = document.querySelector(".inventory__left");
  _allDashboardBtns = document.querySelectorAll(".inventory__group");
  constructor() {
    this._dashboardBtnsContent.addEventListener(
      "click",
      this._toggleToDashboards.bind(this),
    );
  }

  _toggleToDashboards(e) {
    const button = e.target.closest(".inventory__group");
    if (!button) return;

    //  Hide the Tabs
    this._allDashboard.forEach((dashboard) =>
      dashboard.classList.add("hidden"),
    );

    // Read Data from the click
    const clicked = button.dataset.dashboard;
    console.log(clicked);

    // Reveal the Tab with clicked Dataset
    document
      .querySelector(`.inventory__content--${clicked}`)
      .classList.remove("hidden");

    // Remove Active class from All the Button
    this._allDashboardBtns.forEach((btn) =>
      btn.classList.remove("inventory__group--active"),
    );

    // Then add it at the selected
    button.classList.add("inventory__group--active");
  }
}
export default new DashboardViews();
