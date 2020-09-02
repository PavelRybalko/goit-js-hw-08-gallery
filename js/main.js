import galleryItemsArr from "/js/gallery-items.js";

const lightboxRef = document.querySelector(".js-lightbox");
const lightboxImageRef = document.querySelector("img.lightbox__image");
const listGalleryRef = document.querySelector(".js-gallery");
const buttonCloseRef = document.querySelector(
  'button[data-action="close-lightbox"]'
);

const fragment = document.createDocumentFragment();

const createGalleryItemsMarkup = galleryItemsArr.forEach((item) => {
  const listRef = document.createElement("li");
  listRef.classList.add("gallery__item");

  const linkRef = document.createElement("a");
  linkRef.classList.add("gallery__link");
  linkRef.href = item.original;

  const imgRef = document.createElement("img");
  imgRef.classList.add("gallery__image");
  imgRef.src = item.preview;
  imgRef.dataset.source = item.original;
  imgRef.alt = item.description;

  listRef.appendChild(linkRef);
  linkRef.appendChild(imgRef);
  fragment.appendChild(listRef);
});

listGalleryRef.append(fragment);

const onOpenModal = ({ target }) => {
  event.preventDefault();
  if (target.nodeName !== "IMG") return;
  lightboxRef.classList.add("is-open");
  lightboxImageRef.src = target.dataset.source;
  window.addEventListener("keydown", onPressESC);
};

const onCloseModal = ({ target, code }) => {
  if (
    target === buttonCloseRef ||
    code === "Escape" ||
    target !== lightboxImageRef
  ) {
    lightboxImageRef.src = "";
    lightboxRef.classList.remove("is-open");
    window.removeEventListener("keydown", onPressESC);
  }
};

function onPressESC(event) {
  if (event.code === "Escape") {
    onCloseModal(event);
  }
}

listGalleryRef.addEventListener("click", onOpenModal);
lightboxRef.addEventListener("click", onCloseModal);
