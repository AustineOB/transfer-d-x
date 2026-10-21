import icons from "url:../../../img/sprite.svg";
import AdminFunctionParentView from "./adminFunctionParentView.js";

class AdminVariationViews extends AdminFunctionParentView {
  #variationData = {
    varKeys: [],
    varValues: [],
    finalVarKey: null,
    finalVarValue: null,
  };

  initilizer() {
    // Two Handler that Handles the Input Attrivute Keys // Keyboard and button click
    this.productContainer.addEventListener(
      "click",
      this._getProductAttributeKeys.bind(this),
    );
    this.productContainer.addEventListener(
      "keydown",
      this._getProductAttributeKeys.bind(this),
    );

    // The Two handler that Handle the input attributes Value // Keyborad and button click
    this.productContainer.addEventListener(
      "click",
      this._getProductAttributeValues.bind(this),
    );
    this.productContainer.addEventListener(
      "keydown",
      this._getProductAttributeValues.bind(this),
    );

    // The handler of event delegation that generates the attrubutes as Variation
    this.productContainer.addEventListener(
      "click",
      this._setAttributeKeysAndValues.bind(this),
    );
  }

  _getProductAttributeValues(e) {
    // Checking if the click happen on the keyboard or the button to submit the input values attributes
    const button = e.target.closest(".submit-attribute-btn");
    if (button) this._attributesValues();

    // Keyborad Handler
    if (e.target.matches(".attribute-values") && e.key === "Enter")
      this._attributesValues();
  }
  _attributesValues() {
    const attributeValues = document.querySelector(".attribute-values").value;
    console.log(attributeValues);
    if (!attributeValues) return;

    // InputFormater formats arrys or strin input from ui and then returns it Camocase
    const restructuredValue = attributeValues.replaceAll("\n", "").split(",");
    console.log(restructuredValue);
    this.#variationData.varValues.push(this.inputFormater(restructuredValue));

    // joining the whole values into one single array
    this.#variationData.finalVarValue = this.#variationData.varValues.flatMap(
      (varVal) => {
        return varVal;
      },
    );

    console.log(this.#variationData);
    document.querySelector(".attribute-values").value = "";
  }

  _getProductAttributeKeys(e) {
    // Checking if the click happen on the keyboard or the button to submit the input keys attributes
    const button = e.target.closest(".submit-attribute-btn");
    if (button) this._attributesKeys();

    // Keyborad Handler
    if (e.target.matches(".attribute-keys") && e.key === "Enter")
      this._attributesKeys();
  }
  _attributesKeys(e) {
    // Get Attribute of Varioues of type of Product type in the add Product section
    const attributeKey = document.querySelector(".attribute-keys").value;
    if (!attributeKey) return;

    const formatedKey = this.inputFormater(attributeKey);

    // storing the keys
    this.#variationData.varKeys.push(formatedKey);

    // Joining the keys into one big array
    this.#variationData.finalVarKey = this.#variationData.varKeys.flatMap(
      (key) => {
        return key;
      },
    );

    console.log(this.#variationData);
    // The HTML of Attributes row that is to be delete or re-edeit by the user
    const markup = `      
      <div 
         class="add-product__input-content--input-group to-delete"
      >
         <div class="row-space-between">
            <h3
            class="add-product__variation--label"
            >
          ${formatedKey}
            </h3>

            <p
            
            class="add-product__form--delete-price"
            >
            <svg
               class="delete-task"
            >
               <use
               xlink:href="${icons}#icon-trash"
               ></use>
            </svg>
            </p>
         </div>
      </div>
   `;

    this.addInnerHtmlElement(".add-product__variation", markup);

    //  Clearing the input fields
    document.querySelector(".attribute-keys").value = "";
  }

  _setAttributeKeysAndValues(e) {
    const button = e.target.closest(".generate-variation-btn");
    if (!button) return;

    if (!this.#variationData.finalVarValue)
      return alert("No Varities to generate!");

    //Inserting the varities form loop for Variable Product
    const markup = this._generatVariationMarkup(
      this.#variationData.finalVarValue,
    );

    this.insertHtmlElement(".variation-container", markup, true);

    // Selecting the Added form to Insert the Option select element
    const allSelect = document.querySelectorAll(".select-variation-values");

    // Apending the Varities input as option element to the select element
    allSelect.forEach((el) => {
      this.#variationData.finalVarValue.forEach((value) => {
        const option = new Option(value);
        el.appendChild(option);
      });
    });
  }

  _generatVariationMarkup(variationData) {
    return variationData
      .map((_, i) => {
        return `
            <div
              class="add-product__input-content--input-group-content to-delete"
            >
              <div class="helper-flex expand-btn row-space-between">
                <div class="helper-flex">
                  <select
                    class="select-variation-values selectel"
                    name="variation-varities"
                    id=""
                  ></select>
                  <select
                    class="select-variation-values selectel"
                    name="variation-varities"
                    id=""
                  ></select>
                </div>
                <span
                  class="add-product__form--delete-price"
                >
                  <svg class="delete-task">
                    <use
                      xlink:href="${icons}#icon-trash"
                    ></use>
                  </svg>
                </span>
              </div>

              <div
                class="accordion-container accordion-collaps"
              >
                <div
                  class="add-product__input-content--content"
                >
                  <div class="row-space-between">
                    <div
                      class="add-product__variation-img-content"
                    >

                      <input
                          type="file"
                          class="add-product__image-input"
                          id="input-file-variation${i}"
                        />
                      <label
                        for="input-file-variation${i}"
                        class="add-product__image-label w-25rem"
                      >
                        
                        <div
                          class="add-product__image-view add-product__image-view--3"
                        ></div>
                        <p>Close Up</p>
                      </label>
                    </div>

                    <div
                      class="add-product__variation-input-content column"
                    >
                      <div class="column">
                        <label
                          for="sku-varition${i}"
                          class="add-product__input-content--label"
                          >SKU</label
                        >
                        <input
                          id="sku-varition${i}"
                          type="text"
                          class="add-product__input-content--input"
                        />
                      </div>
                      <div class="column">
                        <label
                          for="isbn-varition${i}"
                          class="add-product__input-content--label w-100"
                          >GTIN, UPC, EAN or ISBN</label
                        >
                        <input
                          id="isbn-varition${i}"
                          type="text"
                          class="add-product__input-content--input"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="add-product__input-content--input-group row-space-between"
                  >
                    <p>Variation gallary</p>
                    <div
                      class="add-product__variation--custom-content helper-flex"
                    >
                      <p
                        class="add-product__variation--custom-btn"
                      >
                        Default
                      </p>
                      <p
                        class="add-product__variation--custom-btn"
                      >
                        Custom
                      </p>
                    </div>
                  </div>
                  <div
                    class="add-product__input-content--input-group"
                  >
                    <!-- inside -->
                    <div class="">
                      <input
                        id="enable-varit${i}"
                        type="checkbox"
                        class="add-product__input-content--input hidden"
                      />
                      <label
                        for="enable-varit${i}"
                        class="add-product__input-content--label"
                        ><span
                          class="add-product__input-content--label-radio"
                        ></span>
                        Enable</label
                      >
                    </div>
                    <!-- inside -->

                    <!-- inside -->
                    <div class="">
                      <input
                        id="download${i}"
                        type="checkbox"
                        class="add-product__input-content--input hidden"
                      />
                      <label
                        for="download${i}"
                        class="add-product__input-content--label"
                        ><span
                          class="add-product__input-content--label-radio"
                        ></span>
                        Downloadable</label
                      >
                    </div>
                    <!-- inside -->
                    <div class="">
                      <input
                        id="virtual${i}"
                        type="checkbox"
                        class="add-product__input-content--input hidden"
                      />
                      <label
                        for="virtual${i}"
                        class="add-product__input-content--label"
                        ><span
                          class="add-product__input-content--label-radio"
                        ></span>
                        Virtual</label
                      >
                    </div>
                    <!-- inside -->
                    <div class="">
                      <input
                        id="manage-varit${i}"
                        type="checkbox"
                        class="add-product__input-content--input hidden"
                      />
                      <label
                        for="manage-varit${i}"
                        class="add-product__input-content--label"
                        ><span
                          class="add-product__input-content--label-radio"
                        ></span>
                        Managa stock?</label
                      >
                    </div>
                    <!-- inside -->
                  </div>
                  <div
                    class="add-product__input-content--input-group row-space-between"
                  >
                    <div class="column">
                      <p>Regular price(s)</p>
                      <label
                        for="varprice${i}"
                        class="hidden"
                      ></label>
                      <input
                        id="varprice${i}"
                        type="number"
                        class="add-product__input-content--input"
                        placeholder="Variation price required"
                      />
                    </div>
                    <div class="column">
                      <p>Sale price (s) SCHEDULE</p>
                      <input
                        class="add-product__input-content--input"
                        type="text"
                        placeholder="schedule"
                      />
                    </div>
                  </div>

                  <div
                    class="add-product__input-content--input-group"
                  >
                    <div class="column w-100">
                      <p>Stock status</p>
                      <input
                        class="add-product__input-content--input"
                        type="text"
                        placeholder="In stock"
                      />
                    </div>
                  </div>

                  <div
                    class="add-product__input-content--input-group row-space-between"
                  >
                    <div class="column">
                      <p>Weight(lbs)</p>
                      <input
                        type="text"
                        class="add-product__input-content--input"
                      />
                    </div>
                    <div class="column">
                      <p>Dimensions (LxWxH) (in)</p>

                      <div class="row-space-between">
                        <input
                          class="add-product__input-content--input"
                          type="text"
                          placeholder="Length"
                        />
                        <input
                          class="add-product__input-content--input"
                          type="text"
                          placeholder="Width"
                        />
                        <input
                          class="add-product__input-content--input"
                          type="text"
                          placeholder="Height"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    class="add-product__input-content--input-group"
                  >
                    <div class="column w-100">
                      <p>description</p>
                      <textarea
                        class="add-product__variation--description"
                        name="sigle-variation-description"
                        id="variation-description${i}"
                        placeholder="Enter spacific description"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row-space-between expand-btn">
                <div class="row-space-between">
                  <div class="helper-flex">
                    <p
                      class="add-product__btn-submit-input"
                    >
                      Save changes
                    </p>
                    <p
                      class="add-product__btn-submit-input"
                    >
                      Cancel
                    </p>
                  </div>

                  <p>Expand / Cancel</p>
                </div>
              </div>
            </div>

    `;
      })
      .join("");
  }
}

export default new AdminVariationViews();
