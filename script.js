import adminFunctionsView from "./src/js/views/adminViews/adminFunctionsView.js";
import adminAddProductFunction from "./src/js/views/adminViews/adminAddProductFunction.js";
import adminVariationViews from "./src/js/views/adminViews/adminVariationViews.js";
import addProductVideoImageView from "./src/js/views/adminViews/addProductVideoImageView.js";
import newProductFormView from "./src/js/views/adminViews/newProductFormView.js";
import addProductDataUniqueView from "./src/js/views/addProductDataUniqueView.js";
import headerView from "./src/js/views/adminViews/adminUiViews/headerView.js";
import dailySellsChartViews from "./src/js/views/adminViews/chartViews/dailySellsChartView.js";
import componentsViews from "./src/js/views/componentsViews.js";
import sellsDashboardView from "./src/js/views/adminViews/chartViews/sellsDashboardView.js";
import dashboardViews from "./src/js/views/adminViews/chartViews/dashboardViews.js";

import learningl from "./src/js/views/learning.js";

const controlAddProductUniqeData = function () {
  addProductDataUniqueView.render(["Tags", "Categories", "Brands"]);
};

const init = function () {
  controlAddProductUniqeData();
};

init();
