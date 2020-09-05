import galleryItemsArr from "./js/gallery-items.js";

const lightboxRef = document.querySelector(".js-lightbox");
const lightboxImageRef = document.querySelector("img.lightbox__image");
const listGalleryRef = document.querySelector(".js-gallery");
const buttonCloseRef = document.querySelector(
  'button[data-action="close-lightbox"]'
);

const fragment = document.createDocumentFragment();

const createGalleryItem = (item) => {
  const linkAttrs = {
    href: item.original,
    class: "gallery__link",
  };

  const imgAttrs = {
    "data-source": item.original,
    src: item.preview,
    alt: item.description,
    class: "gallery__image",
  };

  const li = createElement("li", { class: "gallery__item" });
  const a = createElement("a", linkAttrs);
  const img = createElement("img", imgAttrs);

  a.appendChild(img);
  li.appendChild(a);

  return li;
};

function createElement(name, attrs = {}) {
  const $el = document.createElement(name);
  $el.classList.add(attrs.class);

  if (name === "img") {
    $el.src = attrs.src;
    $el.alt = attrs.alt;
    $el.dataset.source = attrs["data-source"];
  }

  if (name === "a") {
    $el.href = attrs.href;
  }

  return $el;
}

const findTargetIndex = () =>
  galleryItemsArr.findIndex((el) => el.original === lightboxImageRef.src);

const createGalleryItemsMarkup = galleryItemsArr.forEach((item) => {
  fragment.appendChild(createGalleryItem(item));
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
  const idx = findTargetIndex();

  if (event.code === "Escape") {
    onCloseModal(event);
  }

  if (event.code === "ArrowLeft") {
    if (idx !== 0) {
      lightboxImageRef.src = galleryItemsArr[idx - 1].original;
    }
  }
  if (event.code === "ArrowRight") {
    if (idx !== galleryItemsArr.length - 1) {
      lightboxImageRef.src = galleryItemsArr[idx + 1].original;
    }
  }
}

listGalleryRef.addEventListener("click", onOpenModal);
lightboxRef.addEventListener("click", onCloseModal);
