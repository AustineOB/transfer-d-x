import icons from "url:../../../img/sprite.svg";

import AdminFunctionParentView from "./adminFunctionParentView.js";

// The View that Handle all the Admin add-Product functionality The navigation and the toggling of the class
class AdminAddPductFunction extends AdminFunctionParentView {
  /* A data to be sent to the models which will loop over it or to use set to remove a duplicate 
  from previous  sending it direct or to pick it from the for submit*/
  #addProductData = {
    brands: ["Samsung", "Jbl", "Nasco", "Asano", "Apple"],
    tags: ["gadget", "Fridge", "Home", "Drinks"],
    categories: ["Winnery", "Accessory", "Computer", "Musical"],
  };

  _allTabContents = document.querySelectorAll(".add-product-input-tab-content");
  _allTabButtons = document.querySelectorAll(".add-product__nav__item");

  initilizer() {
    // Adding a big parent event handler to navigate to all the click on the children
    this.productContainer.addEventListener(
      "click",
      this._openTabContent.bind(this),
    );

    this.productContainer.addEventListener(
      "click",
      this._toggleAccordionContainer.bind(this),
    );
    this.productContainer.addEventListener(
      "click",
      this._getProductDiscoutPriceRow.bind(this),
    );
    this.productContainer.addEventListener(
      "click",
      this._deleteParentNode.bind(this),
    );

    // The 2 handler for getting category
    this.productContainer.addEventListener(
      "click",
      this._addHandlerProductCategory.bind(this),
    );
    this.productContainer.addEventListener(
      "keydown",
      this._addHandlerProductCategory.bind(this),
    );

    // The 2 handler for getting Product Tags Both the click and the Keyboard Press
    this.productContainer.addEventListener(
      "click",
      this._addHandlerProductTag.bind(this),
    );
    this.productContainer.addEventListener(
      "keydown",
      this._addHandlerProductTag.bind(this),
    );

    // The 2 handler for getting Product Tags Both the click and the Keyboard Press
    this.productContainer.addEventListener(
      "click",
      this._getProductBrand.bind(this),
    );
    this.productContainer.addEventListener(
      "keydown",
      this._getProductBrand.bind(this),
    );
  }

  _openTabContent(e) {
    const button = e.target.closest(".add-product__nav__item");
    if (!button) return;

    //  Removing the active classes in both the buttons and tabs
    this._allTabContents.forEach((tab) => tab.classList.add("hidden"));
    this._allTabButtons.forEach((btn) =>
      btn.classList.remove("add-product__nav__item-active"),
    );

    //  targeting the current one to add the active class
    const curentBtn = button.dataset.tab;

    button.classList.add("add-product__nav__item-active");
    document
      .querySelector(`.add-product-input-content--${curentBtn}`)
      .classList.remove("hidden");
  }

  _toggleAccordionContainer(e) {
    const button = e.target.closest(".expand-btn");
    if (!button) return;

    if (
      button.previousElementSibling?.classList.contains("accordion-container")
    )
      button.previousElementSibling.classList.toggle("accordion-collaps");
    if (button.nextElementSibling?.classList.contains("accordion-container"))
      button.nextElementSibling.classList.toggle("accordion-collaps");
  }

  _getProductDiscoutPriceRow(e) {
    const button = e.target.closest(".add-product__bulk--foot-btn");
    if (!button) return;

    // More Price row to be programmatically added with cloneNode
    this.addChildRow(".add-product__bulk");
  }

  _deleteParentNode(e) {
    const button = e.target.closest(".delete-task");
    if (!button) return;

    button.closest(".to-delete")?.remove();
    // if (parentElement) parentElement;
  }

  _addHandlerProductCategory(e) {
    const button = e.target.closest(".add-category-btn");
    if (button) this._getProductCategory();

    // Keyborad Handler
    if (e.target.matches(".add-product__category") && e.key === "Enter")
      this._getProductCategory();
  }

  _getProductCategory() {
    const inputCategory = document.querySelector(
      ".add-product__category",
    ).value;

    if (!inputCategory) return;

    // InputFormster Format the inputs
    const newCategory = this.inputFormater(inputCategory);

    this.#addProductData.categories.push(newCategory);

    document.querySelector(".add-product__category").value = "";

    const markup = `
            <div
              class="helper-flex to-delete row-space-between"
            >
              <input
                id="${newCategory}" name="${newCategory}"
                type="checkbox"
                class="add-product__input-content--input hidden"
              />
              <label
                for="${newCategory}"
                class="add-product__input-content--label"
                ><span
                  class="add-product__input-content--label-radio"
                ></span>
                ${newCategory}</label
              >

              <span class="add-product__form--delete-price">
                <svg class="delete-task">
                  <use
                    xlink:href="${icons}#icon-trash"
                  ></use>
                </svg>
              </span>
            </div>
    `;

    this.insertHtmlElement(".add-product__sidebar--category", markup);
  }

  _addHandlerProductTag(e) {
    // Checking if the click happen on the keyboard or the button to submit the input keys attributes
    const button = e.target.closest(".add-product-tag-btn");

    if (button) this._getProductTags();

    // Keyborad Handler
    if (e.target.matches(".add-product__input-tag") && e.key === "Enter")
      this._getProductTags();
  }

  _getProductTags() {
    // Adding Tags for In editing product form
    const inputTags = document.querySelector(".add-product__input-tag").value;
    if (!inputTags) return;

    // Formating the input
    const formatedInput = this.inputFormater(inputTags);
    // Sending the input to the array for u
    // pdate
    this.#addProductData.tags.push(formatedInput);

    // clearing inpus field
    document.querySelector(".add-product__input-tag").value = "";

    console.log("Created");

    const markup = `
      <li class="add-product__tags--item to-delete">
        <svg class="delete-task">
          <use
            xlink:href="${icons}#icon-trash"
          ></use>
        </svg>
        <p class="add-product__tags--tag">${formatedInput}</p>
      </li>
    `;

    this.insertHtmlElement(".add-product__tags", markup);
  }

  _getProductBrand(e) {
    const button = e.target.closest(".add-brand-btn");
    if (button) this._getProductBrands();

    // Keyboard Handler
    if (e.target.matches(".add-product__brand-input") && e.key === "Enter")
      this._getProductBrands();
  }

  _getProductBrands() {
    const brand = document.querySelector(".add-product__brand-input").value;

    if (!brand) return;

    // InputFormster Format the inputs
    const formatBrand = this.inputFormater(brand);

    this.#addProductData.brands.push(formatBrand);

    document.querySelector(".add-product__brand-input").value = "";
    const markup = `
            <div
              class="helper-flex to-delete row-space-between"
            >
              <input
                id="${formatBrand}" name="${formatBrand}"
                type="checkbox"
                class="add-product__input-content--input hidden"
              />
              <label
                for="${formatBrand}"
                class="add-product__input-content--label"
                ><span
                  class="add-product__input-content--label-radio"
                ></span>
                ${formatBrand}</label
              >

              <span class="add-product__form--delete-price">
                <svg class="delete-task">
                  <use
                    xlink:href="${icons}#icon-trash"
                  ></use>
                </svg>
              </span>
            </div>
    `;

    this.insertHtmlElement(".add-product__sidebar--brand", markup);
  }
}

export default new AdminAddPductFunction();
