import { validatePrevInfo } from '../validator';

class ManualInputPage {
  constructor() {
    this.preInfoInputContainer = document.querySelector('.pre-info-input-container');
    this.preInfoInputList = document.querySelectorAll('.pre-info-input');
    this.errorMessageText = document.querySelector('.error-message-text');

    this.preInfoInputContainer.addEventListener('input', this.#onInputPreInfo);

    this.inputDebounce = null;
  }

  #onInputPreInfo = () => {
    if (this.inputDebounce) {
      clearTimeout(this.inputDebounce);
    }

    this.inputDebounce = setTimeout(() => {
      try {
        validatePrevInfo(this.#converToPrevInfoObject(this.preInfoInputList));
      } catch (error) {
        this.errorMessageText.textContent = error.message;
        return;
      }
      this.errorMessageText.classList.add('correct');
      this.errorMessageText.textContent = '올바른 입력값입니다.';
    }, 500);
  };

  #converToPrevInfoObject(preInfoInputList) {
    const [totalTeamCount, totalPriorities, totalOrder] = Array.from(preInfoInputList).map(
      (preInfoInput) => preInfoInput.value
    );
    return { totalTeamCount, totalPriorities, totalOrder };
  }
}

export default ManualInputPage;
