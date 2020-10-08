import {debounce} from "./utils/debounce.js";

const ELEMENTS_COUNT_ON_SLIDE = 1;
const DEFAULT_TRANSITION = `transform 0.6s ease`;
const DEBOUNCE_INTERVAL = 100; // мс

const PlacingPosition = {
  START: `start`,
  END: `end`
};

const Direction = {
  RIGHT: -1,
  LEFT: 1
};

export const slider = (root) => {
  const sliderRoot = root;
  const sliderWrapper = sliderRoot.querySelector(`.slider__wrapper`);
  const sliderList = sliderWrapper.querySelector(`.slider__list`);
  const sliderItem = sliderList.querySelector(`.slider__item`);

  const sliderChildren = sliderList.children;
  const sliderStep = sliderItem.offsetWidth;
  console.log(sliderStep)
  let sliderDirection = Direction.RIGHT;

  const sliderNextButton = sliderRoot.querySelector(`.slider__button--next`);
  const sliderPrevButton = sliderRoot.querySelector(`.slider__button--prev`);

  const removeElements = (placing) => {
    const sliderElements = Array.from(sliderChildren);

    const newFragment = document.createDocumentFragment();
    const sliderLastGroup = sliderElements.slice(-ELEMENTS_COUNT_ON_SLIDE);
    const sliderFirstGroup = sliderElements.slice(0, ELEMENTS_COUNT_ON_SLIDE);

    if (placing === PlacingPosition.START) {
      for (const element of sliderLastGroup) {
        newFragment.appendChild(element);
      }

      sliderList.prepend(newFragment);
    }

    if (placing === PlacingPosition.END) {
      for (const element of sliderFirstGroup) {
        newFragment.appendChild(element);
      }

      sliderList.append(newFragment);
    }
  }

  const getTranslate = (shiftX = 0, shiftY = 0, shiftZ = 0) => {
    return `translate3d(${shiftX}px, ${shiftY}px, ${shiftZ}px)`;
  };

  const setTranslate = (direction) => {
    sliderList.style.transform = getTranslate(sliderStep * direction);
  };

  sliderNextButton.addEventListener(`click`, debounce(() => {
    if (sliderDirection === Direction.LEFT) {
      sliderDirection = Direction.RIGHT;
      removeElements(PlacingPosition.START);
    }

    sliderWrapper.style.justifyContent = `flex-start`;
    sliderList.style.justifyContent = `flex-start`;
    setTranslate(sliderDirection);
  }, DEBOUNCE_INTERVAL));

  sliderPrevButton.addEventListener(`click`, debounce(() => {
    if (sliderDirection === Direction.RIGHT) {
      sliderDirection = Direction.LEFT;
      removeElements(PlacingPosition.END);
    }

    sliderWrapper.style.justifyContent = `flex-end`;
    sliderList.style.justifyContent = `flex-end`;
    setTranslate(sliderDirection);
  }, DEBOUNCE_INTERVAL));

  sliderList.addEventListener(`transitionstart`, (evt) => {
    if (evt.target === sliderList) {
      sliderRoot.classList.add(`slider--in-move`);
    }
  });

  sliderList.addEventListener(`transitionend`, (evt) => {
    if (evt.target === sliderList) {
      removeElements(sliderDirection === Direction.RIGHT ? PlacingPosition.END : PlacingPosition.START);

      sliderRoot.classList.remove(`slider--in-move`);
      sliderList.style.transition = `none`;
      setTranslate(0);
      setTimeout(() => {
        sliderList.style.transition = DEFAULT_TRANSITION;
      });
    }

  });
};

