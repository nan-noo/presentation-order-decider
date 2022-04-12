import { generateTeamOrderListTemplate } from '../template/manualInputPageTemplate';
import { validatePrevInfo } from '../validator';

class ManualInputPage {
  constructor() {
    this.preInfoInputContainer = document.querySelector('.pre-info-input-container');
    this.preInfoInputList = document.querySelectorAll('.pre-info-input');
    this.errorMessageText = document.querySelector('.error-message-text');
    this.teamOrderListSection = document.querySelector('.team-order-list-section');

    this.preInfoInputContainer.addEventListener('input', this.#onInputPreInfo);

    this.inputDebounce = null;
  }

  #onInputPreInfo = () => {
    if (this.inputDebounce) {
      clearTimeout(this.inputDebounce);
    }

    this.inputDebounce = setTimeout(() => {
      this.errorMessageText.classList.remove('correct');
      const prevInfoObject = this.#converToPrevInfoObject(this.preInfoInputList);
      try {
        validatePrevInfo(prevInfoObject);
      } catch (error) {
        this.errorMessageText.textContent = error.message;
        return;
      }
      this.errorMessageText.classList.add('correct');
      this.errorMessageText.textContent = '올바른 입력값입니다.';

      this.preInfoInputList.forEach((preInfoInput) => (preInfoInput.disabled = true));
      this.#renderTeamOrderListSection(prevInfoObject);
    }, 500);
  };

  #renderTeamOrderListSection(prevInfoObject) {
    this.teamOrderListSection.replaceChildren();
    this.teamOrderListSection.insertAdjacentHTML(
      'afterbegin',
      generateTeamOrderListTemplate(prevInfoObject)
    );
  }

  #converToPrevInfoObject(preInfoInputList) {
    const [totalTeamCount, totalPriorities, totalOrder] = Array.from(preInfoInputList).map(
      (preInfoInput) => preInfoInput.value
    );
    return { totalTeamCount, totalPriorities, totalOrder };
  }
}

export default ManualInputPage;
