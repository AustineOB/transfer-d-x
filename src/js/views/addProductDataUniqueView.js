class AddProductDataUniqueView {
  #data = {
    brands: ["Samsung", "Jbl", "Nasco", "Asano", "Apple"],
    tags: ["gadget", "Fridge", "Home", "Drinks"],
    categories: ["Winnery", "Accessory", "Computer", "Musical"],
  };

  render() {
    // Will later bring the data from the models
    this._setAddProductCategories();
    this._setAddProductBrands();
    this._setAddProductTags();
  }

  creatNdAppendOption(arrayData, selectElClass) {
    arrayData.map((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.innerHTML = category;
      document.querySelector(`.${selectElClass}`).appendChild(option);
    });
  }

  _setAddProductCategories() {
    this.creatNdAppendOption(
      this.#data.categories,
      "add-product-category-select",
    );
  }
  _setAddProductTags() {
    this.creatNdAppendOption(this.#data.tags, "add-product-tags-select");
  }
  _setAddProductBrands() {
    this.creatNdAppendOption(this.#data.brands, "add-product-brand-select");
  }
}
export default new AddProductDataUniqueView();
