import AdminFunctionParentView from "./adminFunctionParentView.js";

class AdminFunctionalityView extends AdminFunctionParentView {
  _allTabContents = document.querySelectorAll(".content-tab");

  // For Rich Text Editor
  _editorBtns = document.querySelectorAll(".rich-text-editor__btn");
  _advanceEditorBtns = document.querySelectorAll(".rich-text-editor__adv-btn");
  _alignEditorbtns = document.querySelectorAll(".text-align-btn");
  _formatEditorbtns = document.querySelectorAll(".text-format-btn");
  _fontNameEditor = document.getElementById("fontName");
  _fontSizeEditor = document.getElementById("fontSize");

  constructor() {
    super();
    this._addHandlerHashChange();
    this._richEditorInitializer();
  }

  _addHandlerHashChange() {
    window.addEventListener("hashchange", this._showTabContent.bind(this));
  }

  _richEditorInitializer() {
    const fontList = [
      "Courier New",
      "Courier",
      "monospace",
      "Times New Roman",
      "Times",
      "serif",
      "Segoe UI",
      "Tahoma",
      "Geneva",
      "Verdana",
      "sans-serif",
      "Franklin Gothic Medium",
      "Arial Narrow",
      "Arial",
      "Lucida Sans",
      "Lucida Sans Regular",
      "Lucida Grande",
      "Lucida Sans Unicode",
    ];
    // Highlighting the buutons and No hihlight for the buttons of one time operations
    this._richEditorHighLighter(this._alignEditorbtns, true);
    this._richEditorHighLighter(this._formatEditorbtns, false);
    this._richEditorHighLighter(this._advanceEditorBtns, true);

    // Getting the font Name for the font select
    fontList.map((font) => {
      const option = document.createElement("option");
      option.value = font;
      option.innerHTML = font;

      this._fontNameEditor.appendChild(option);
    });

    // Using the font List index to set the font Size of the Rich Text Editor
    fontList.map((_, i) => {
      const option = document.createElement("option");
      option.value = i + 1;
      option.innerHTML = i + 1;

      this._fontSizeEditor.appendChild(option);

      // default font Size
      this._fontSizeEditor.value = 3;
    });

    // A single Operand of no parameter
    this._editorBtns.forEach((btn) =>
      btn.addEventListener("click", () => {
        this._richEditorTextModifier(btn.id, false, null);
      }),
    );

    //Multiple Operand of many parameter unlike font size that needs to change
    this._advanceEditorBtns.forEach((btn) =>
      btn.addEventListener("change", () => {
        this._richEditorTextModifier(btn.id, false, btn.value);
      }),
    );
  }

  _richEditorHighLighter(buttons, needRmove) {
    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (needRmove) {
          let alreadyActive = false;

          // If the clicked is already active
          if (btn.classList.contains("active")) alreadyActive = true;

          // Then remove active from other buttons
          this._richEditorHighlightRemoval(buttons);

          // Highlight the clicked button
          if (!alreadyActive) btn.classList.add("active");
        } else {
          btn.classList.toggle("active");
        }
      });
    });
  }

  _richEditorHighlightRemoval(buttons) {
    buttons.forEach((btn) => {
      btn.classList.remove("active");
    });
  }

  _richEditorTextModifier(command, showUi, value) {
    // Method that Modify the Rich Text Editor Input Text
    document.execCommand(command, showUi, value);
  }
  _showTabContent() {
    const hash = location.hash;

    console.log(hash);
    if (!hash) return;
    this._allTabContents.forEach((tab) => tab.classList.add("hidden"));

    const currentTab = document.querySelector(hash);
    currentTab.classList.remove("hidden");

    setTimeout(() => {
      currentTab.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  }
}
export default new AdminFunctionalityView();
