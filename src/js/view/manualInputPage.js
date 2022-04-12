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
    this.orderRowList = null;

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
      this.orderRowList = this.teamOrderListForm.querySelectorAll('.team-row');

      this.teamOrderListForm.addEventListener('submit', this.#onSubmitTeamOrderList);
    }, 500);
  };

  #onSubmitTeamOrderList = (e) => {
    e.preventDefault();

    const isPassed = Array.from(this.orderRowList).every((orderRow, index) => {
      const teamCount = index + 1;
      const orderList = Array.from(orderRow.querySelectorAll('input')).map(
        (orders) => orders.valueAsNumber
      );

      try {
        validateOrderList(orderList, this.preInfoInputList[1].valueAsNumber);
      } catch (error) {
        this.orderDecider.orderListByTeamCollection = {};
        alert(`[${teamCount}번째 줄]: ${error.message}`);
        return false;
      }
      this.orderDecider.orderListByTeamCollection[teamCount] = orderList;
      return true;
    });

    if (isPassed) {
      const orderResult = this.orderDecider.getPresentationOrderResult(
        this.preInfoInputList[0].valueAsNumber
      );

      console.log(orderResult);
    }
  };

  #renderTeamOrderListSection(prevInfoObject) {
    this.teamOrderListSection.replaceChildren();
    this.teamOrderListSection.insertAdjacentHTML(
      'afterbegin',
      generateTeamOrderListTemplate(prevInfoObject)
    );
  }

  #converToPrevInfoObject(preInfoInputList) {
    const [totalTeamCount, totalOrder, totalPriorities] = Array.from(preInfoInputList).map(
      (preInfoInput) => preInfoInput.valueAsNumber
    );
    return { totalTeamCount, totalOrder, totalPriorities };
  }
}

export default ManualInputPage;
