class NewProductFormView {
  _parentEl = document.querySelector(".add-product__form");
  _productType = document.getElementById("product-type");
  _formSubmitButton = document.querySelector(".add-product__submit-button");

  constructor() {
    this._productType.addEventListener(
      "change",
      this._toggleProductType.bind(this),
    );

    this._formSubmitButton.addEventListener(
      "click",
      this.addHandlerAddNewProduct.bind(this),
    );
  }

  _toggleProductType(e) {
    if (!e.target.matches(".add-product__form-type--input")) return;
    const productType = e.target.value;

    //  Navbar buttons that hold the Variations inputs form
    const variatonButtons = document.querySelectorAll(
      ".add-product__variation-type",
    );

    //  hidding the Buttons
    variatonButtons.forEach((btn) => btn.classList.add("hidden"));

    switch (productType) {
      case "variable":
        variatonButtons.forEach((btn) => btn.classList.remove("hidden"));
        console.log("Variables");
        break;

      case "group":
        console.log("Group");
        break;

      case "affiliate":
        console.log("Affiliate");
        break;

      case "simple":
        console.log("Simple");
        break;
    }
  }
  addHandlerAddNewProduct(e) {
    if (!e.target.matches(".add-product__submit-button")) return;
    e.preventDefault();
    console.log(e.target);
    console.log(this._parentEl);

    const formData = [...new FormData(this._parentEl)];

    console.log(formData);
    const data = Object.fromEntries(formData);
    console.log(data);
    // e();
  }
}
export default new NewProductFormView();
