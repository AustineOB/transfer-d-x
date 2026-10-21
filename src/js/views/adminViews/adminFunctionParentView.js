// import icons from "url:../../../img/sprite.svg";
import icons from "url:../../../../src/img/sprite.svg";

export default class AdminFunctionParentView {
  constructor() {
    this.productContainer = document.querySelector(".add-product");

    this.initilizer();
  }

  initilizer() {}

  addChildRow(parentElId) {
    const parentElement = document.querySelector(parentElId);
    const row = parentElement.firstElementChild;

    const newRow = row.cloneNode(true);

    newRow
      .querySelector(".add-product__bulk--icon-delete")
      .classList.add("delete-task");

    parentElement.appendChild(newRow);
  }

  addInnerHtmlElement(elementId, html) {
    // the method that PLus equal Html string (+=)
    const parentElement = document.querySelector(elementId);

    parentElement.innerHTML += html;
  }
  insertHtmlElement(parentId, markup, clean = false) {
    // The method that insert InerHtml
    const parentEL = document.querySelector(parentId, markup);

    if (clean) parentEL.innerHTML = "";

    parentEL.insertAdjacentHTML("afterbegin", markup);
  }

  inputFormater(input) {
    // Methods takes in Array or string then fotmat it
    const output = Array.isArray(input)
      ? input.map(
          (value) => value[0]?.toUpperCase() + value.toLowerCase().slice(1),
        )
      : input[0].toUpperCase() +
        input.toLowerCase().slice(1).replaceAll(" ", "");

    return output;
  }

  createAndAppendImage(imageContainer, imgFile) {
    const imgReader = new FileReader();
    // Listening for load event
    imgReader.addEventListener("load", (evnt) => {
      const picFile = evnt.target;

      // Creating a new div an HTML markup to insert in each layout for the image
      const div = document.createElement("div");
      div.className = "image-div to-delete";

      const markup = `
                        
                          <input type="file" name="image${imgFile.size}" accept="image/*" class="add-product__image-input hidden" id="files${imgFile.name}">
                          <label class="add-product__image-label" for="files${imgFile.name}">
                            <div class="add-product__image-view">
                              <img class="imgg" draggable="true" src="${picFile.result}" alt="${imgFile.name}" />
                            </div>                            
                          

                            <div class="add-product__image-modal"> <div class="add-product__image-drag">
                                  <p>Drag to sort</p>
                                  <p>Click to change</p>
                                  <p>Drag IN image to add</p>
                                </div>
                            </div>
                            <svg
                                  class="add-product__image-delete-icon delete-task"
                                >
                                  <use
                                    xlink:href="${icons}#icon-trash"
                                  ></use>
                            </svg>
                           
                          </label>

                            
        
        `;
      // Instead of appending the div element in the second time, to avoid nested PLUG in the Html markup direct to avoid duplicate to-delte calss for deleting images
      if (imageContainer.classList.contains("to-delete")) {
        imageContainer.innerHTML = markup;
      } else {
        div.innerHTML = markup;
        imageContainer.append(div);
      }
    });

    imgReader.readAsDataURL(imgFile);
  }
}
