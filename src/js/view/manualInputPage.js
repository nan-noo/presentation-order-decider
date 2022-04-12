import { generateTeamOrderListTemplate } from '../template/manualInputPageTemplate';
import { validateOrderList, validatePrevInfo } from '../validator';

class ManualInputPage {
  constructor(orderDecider) {
    this.orderDecider = orderDecider;

    this.preInfoInputContainer = document.querySelector('.pre-info-input-container');
    this.preInfoInputList = this.preInfoInputContainer.querySelectorAll('.pre-info-input');
    this.errorMessageText = document.querySelector('.error-message-text');
    this.teamOrderListSection = document.querySelector('.team-order-list-section');
    this.teamOrderListForm = null;

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

      this.preInfoInputList.forEach((preInfoInput) => {
        preInfoInput.disabled = true;
      });
      this.#renderTeamOrderListSection(prevInfoObject);

      this.teamOrderListForm = this.teamOrderListSection.querySelector('.team-order-list-form');
      this.teamOrderListForm.addEventListener('submit', this.#onSubmitTeamOrderList);
    }, 500);
  };

  #onSubmitTeamOrderList = (e) => {
    e.preventDefault();

    this.orderRowList = this.teamOrderListForm.querySelectorAll('.team-row');
    try {
      this.orderRowList.forEach((orderRow) => {
        const orderList = Array.from(orderRow.querySelectorAll('input')).map(
          (orders) => orders.valueAsNumber
        );
        validateOrderList(orderList, this.preInfoInputList[2].valueAsNumber);
      });
    } catch (error) {
      alert(error.message);
      return;
    }

    console.log('hih');
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
