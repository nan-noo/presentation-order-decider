import { SNACKBAR_MS_TIME } from '../constant/rule';
import { CLASSNAME } from '../constant/selector';

export const pickRandomElementInArray = (array) => array[Math.floor(Math.random() * array.length)];

const setSnackbarDebounce = () => {
  let rafId = null;

  return (snackbarElement, messsage) => {
    if (rafId) {
      return;
    }

    snackbarElement.classList.add(CLASSNAME.SHOW);
    snackbarElement.textContent = messsage;

    const snackbarStartTime = new Date().getTime();
    const snackbarAnimation = () => {
      const snackbarCurrentTime = new Date().getTime();
      if (snackbarCurrentTime < snackbarStartTime + SNACKBAR_MS_TIME) {
        requestAnimationFrame(snackbarAnimation);
        return;
      }
      snackbarElement.classList.remove(CLASSNAME.SHOW);
      rafId = null;
    };
    rafId = requestAnimationFrame(snackbarAnimation);
  };
};

export const showSnackbar = setSnackbarDebounce();
