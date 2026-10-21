import AdminFunctionParentView from "./adminFunctionParentView.js";

class AddProductVideoImageView extends AdminFunctionParentView {
  #videoAdImageData = {
    videoData: [],
  };
  _videoFile = null;

  constructor() {
    super();
    this.draggingImage = null;

    this.productContainer.addEventListener(
      "change",
      this._uploadImages.bind(this),
    );
    this.productContainer.addEventListener(
      "drop",
      this._addHandlerDropDragInImage.bind(this),
    );

    // Three Handler Handling the Drag Sort image
    this.productContainer.addEventListener(
      "dragstart",
      this._addHandlerStartDragging.bind(this),
    );
    this.productContainer.addEventListener(
      "dragend",
      this._addHandlerEndDragging.bind(this),
    );
    this.productContainer.addEventListener(
      "dragover",
      this._addHandlerDragSortImage.bind(this),
    );

    // HANDLERS FOR VIDEO
    this.productContainer.addEventListener(
      "change",
      this._uploadVideos.bind(this),
    );
    this.productContainer.addEventListener(
      "click",
      this._addHandlerPushVideoToArray.bind(this),
    );
    this.productContainer.addEventListener(
      "click",
      this._resetVideoElement.bind(this),
    );
    this.productContainer.addEventListener(
      "click",
      this._adHandlerDisplaySlectedVideos.bind(this),
    );
    this.productContainer.addEventListener(
      "click",
      this._addHandlerDeleteVideo.bind(this),
    );

    this.productContainer.addEventListener(
      "click",
      this._addHandlerDisplayBackImages.bind(this),
    );
  }

  _addHandlerStartDragging(e) {
    if (!e.target.matches(".imgg")) return;
    this.draggingImage = e.target;
    e.target.classList.add("dragging");
  }
  _addHandlerEndDragging(e) {
    if (!e.target.matches(".imgg")) return;
    e.target.classList.remove("dragging");
  }

  _addHandlerDragSortImage(e) {
    e.preventDefault();

    if (!this.draggingImage) return;

    // Finding the element under the pointer
    const elementUnderPointer = document.elementFromPoint(e.clientX, e.clientY);
    if (!elementUnderPointer) return;

    // To locate the cloest image parent hover over
    const targetParent = elementUnderPointer?.closest(
      ".add-product__image-view",
    );

    // To make Sure the Correct Parent was located and its not the one am holding its image
    if (!targetParent || targetParent === this.draggingImage.parentElement)
      return;
    const targetChild = targetParent.querySelector(".imgg");

    // SWAPPING:
    if (!targetChild) return;
    this.draggingImage?.parentElement.appendChild(targetChild);

    // Replacing the image with the dragging one
    targetParent.appendChild(this.draggingImage);
  }
  _addHandlerDropDragInImage(e) {
    // Handles Functionality of Draging in new image in the image file
    e.preventDefault();
    if (!e.target.closest(".image-content-container")) return;
    const imagContainer = e.target.closest(".image-content-container");

    if (!imagContainer) return;
    const files = e.dataTransfer.files;
    const file = files[0];

    if (!file?.type.startsWith("image/")) return;
    Array.from(files).forEach((file) => {
      // if it is the multiple image file and there was no image on it
      const previousImages = imagContainer.querySelectorAll(".imgg");

      // Checking if the image already exist to prevent dublicate
      const alreadyExistImg = [...previousImages]?.some(
        (image) => image.alt === file.name,
      );

      if (alreadyExistImg) return;

      if (
        imagContainer.classList.contains("add-product__image-content") &&
        !imagContainer.querySelector(".imgg")
      ) {
        // clear and Append
        imagContainer.innerHTML = "";
        this.createAndAppendImage(imagContainer, file);
      }

      // if it is the multiple image file and there was image on it already
      if (
        imagContainer.classList.contains("add-product__image-content") &&
        imagContainer.querySelector(".imgg")
      ) {
        // only append
        this.createAndAppendImage(imagContainer, file);
      }
    });
    if (files.length > 0) {
      // if it is the Single image
      if (!imagContainer.classList.contains("add-product__image-content")) {
        // clear and Append
        imagContainer.innerHTML = "";
        this.createAndAppendImage(imagContainer, file);
      }
    }
  }

  _uploadImages(e) {
    // Checking the matches of the correct element
    if (!e.target.matches(".add-product__image-input")) return;

    // checking if the user PC accept our functionality
    if (!window.File && !window.FileReader && !window.FileList && !window.Blob)
      return;
    const imgFiles = e.target.files;

    // Using the Parent Element of the targeted input file as the next parent conatiner of the newly created div or layout
    const imageContainer = e.target.parentElement;

    imageContainer.innerHTML = "";
    Array.from(imgFiles).forEach((file, i) => {
      // if (!this._allImageView[i]) return;

      this.createAndAppendImage(imageContainer, file);
    });
  }

  _uploadVideos(e) {
    const inputEl = e.target.closest(".add-product__video--input");
    if (!inputEl) return;

    // Method that listend for change of videos
    // Change Event for video Element
    const file = e.target.files[0];

    if (!file) return;

    // Assigning the VideoFile As universal variable for user to push it into the array if he like
    this._videoFile = file;

    // Creating a URL for Video local file
    const fileURL = URL.createObjectURL(file);

    const videoWrapper = inputEl.closest(".add-product__video--wrapper");
    const videoEl = videoWrapper.querySelector(
      ".add-product__video--video-preview",
    );

    videoEl.id = "";

    videoEl.src = fileURL;
    videoEl.id = file.name;

    console.log(videoEl);

    // Pushing the video file straight into the array if the call was to change the already uploaded video
    if (e.target.classList.contains("change-video")) {
      this.#videoAdImageData.videoData.push(file);

      // Getting the videos parent Element in other to update the array
      const btnParentEl = inputEl.closest(
        ".add-product__video--video-container",
      );

      // Methods that Update the array
      this._upDateVideoArrayData(btnParentEl);
      console.log("Change");
    }
  }

  _addHandlerPushVideoToArray(e) {
    const button = e.target.closest(".add-product__video--button");
    if (!button) return;

    if (!this._videoFile) return;

    this.#videoAdImageData.videoData.push(this._videoFile);

    this._clearVideoElement(e);
  }

  _resetVideoElement(e) {
    const btn = e.target.closest(".add-product__video--clear");
    if (!btn) return;

    this._clearVideoElement(e);
  }

  _clearVideoElement(e) {
    const videoWrapper = e.target.closest(".add-product__video--wrapper");

    const videoEl = videoWrapper.querySelector(
      ".add-product__video--video-preview",
    );

    // Resesting the video element after pushing the video into video array
    videoEl.src = "";
    videoEl.load();
  }

  _adHandlerDisplaySlectedVideos(e) {
    const button = e.target.closest(".add-product__video--submit-btn");
    if (!button) return;

    if (this.#videoAdImageData.videoData.length === 0)
      return alert("Upload product Videos");

    const videoContainer = document.querySelector(
      ".add-product__video--video-container",
    );

    console.log(this.#videoAdImageData);

    videoContainer.innerHTML = "";

    this.#videoAdImageData.videoData.forEach((videoFile, i) => {
      const fileURL = URL.createObjectURL(videoFile);

      // Creating a div element to attach the videos markup and render at the top of the new product adding page
      const newDiv = document.createElement("div");
      newDiv.className = "add-product__video--wrapper";

      newDiv.innerHTML = `
                  <input class="add-product__video--input change-video hidden" type="file" name="video-${i}"  id="${videoFile.name}" accept="video/*" />

                  <video src="${fileURL}" id="${videoFile.name}" class="add-product__video--video-preview" controls autoplay loop muted >
                    Your browser does not support the video tag.
                  </video>

                  <div class="add-product__video-btn-wrapper">
                    <label class="add-product__video--label"
                      for="${videoFile.name}" > Change Video</label>

                    <span class="add-product__video--delete"
                      >Delete Video</span>
                  </div>            
      `;

      videoContainer.append(newDiv);
    });

    document.querySelector(".add-product__image-content").style.display =
      "none";
    document.querySelector(".add-product__image-button").style.display =
      "block";
    videoContainer.style.display = "grid";
  }

  _addHandlerDeleteVideo(e) {
    const button = e.target.closest(".add-product__video--delete");
    if (!button) return;

    // Getting the videos parent Element in other to update the array
    const btnParentEl = button.closest(".add-product__video--video-container");

    // then Deleteing the element
    button.closest(".add-product__video--wrapper").remove();

    // Update the array
    this._upDateVideoArrayData(btnParentEl);
  }

  _upDateVideoArrayData(videoPrentEl) {
    const allVideosEL = videoPrentEl.querySelectorAll(
      ".add-product__video--video-preview",
    );

    const videosIDs = new Set(Array.from(allVideosEL, (el) => el.id));

    console.log(videosIDs);
    console.log(this.#videoAdImageData.videoData);

    for (let i = this.#videoAdImageData.videoData.length - 1; i >= 0; i--) {
      if (!videosIDs.has(this.#videoAdImageData.videoData[i].name))
        this.#videoAdImageData.videoData.splice(i, 1);
    }
  }

  _addHandlerDisplayBackImages(e) {
    const button = e.target.closest(".add-product__image-button");
    if (!button) return;

    // Displaying Image Container
    document.querySelector(".add-product__image-content").style.display =
      "grid";

    // Removing Video Container
    document.querySelector(
      ".add-product__video--video-container",
    ).style.display = "none";

    // Removing Button Container
    document.querySelector(".add-product__image-button").style.display = "none";
  }
}
export default new AddProductVideoImageView();
