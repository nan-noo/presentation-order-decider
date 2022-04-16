import {
  generateModalResultTable,
  generateTeamOrderListTemplate,
} from '../template/manualInputPageTemplate';
import { validateOrderList, validatePrevInfo } from '../validator';

class ManualInputPage {
  constructor(orderDecider) {
    this.orderDecider = orderDecider;

    this.preInfoInputContainer = document.querySelector('.pre-info-input-container');
    this.preInfoInputList = this.preInfoInputContainer.querySelectorAll('.pre-info-input');
    this.errorMessageText = document.querySelector('.error-message-text');
    this.teamOrderListSection = document.querySelector('.team-order-list-section');
    this.teamOrderListForm = null;
    this.modal = document.querySelector('.modal');
    this.modalResultTable = this.modal.querySelector('table');

    this.preInfoInputContainer.addEventListener('input', this.#onInputPreInfo);
    this.modal.addEventListener('click', this.#onClickModal);

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
        this.teamOrderListSection.replaceChildren();
        return;
      }

      this.errorMessageText.classList.add('correct');
      this.errorMessageText.textContent = '올바른 입력값입니다.';
      this.#renderTeamOrderListSection(prevInfoObject);

      this.teamOrderListForm = this.teamOrderListSection.querySelector('.team-order-list-form');
      this.orderInputList = this.teamOrderListForm.querySelectorAll('input');

      this.teamOrderListForm.addEventListener('submit', this.#onSubmitTeamOrderList);
    }, 500);
  };

  #onSubmitTeamOrderList = (e) => {
    e.preventDefault();
    this.#renderResultTable();
    this.modal.classList.remove('hide');
  };

  #onClickModal = ({ target: { classList: targetClassList } }) => {
    if (targetClassList.contains('replay-button')) {
      this.#renderResultTable();
      alert('순서를 다시 할당했습니다 :D');
      return;
    }

    if (targetClassList.contains('dimmer')) {
      this.modal.classList.add('hide');
    }
  };

  #renderTeamOrderListSection(prevInfoObject) {
    this.teamOrderListSection.replaceChildren();
    this.teamOrderListSection.insertAdjacentHTML(
      'afterbegin',
      generateTeamOrderListTemplate(prevInfoObject)
    );
  }

  #renderResultTable() {
    const orderInputValueList = Array.from(this.orderInputList).map(
      (orderInput) => orderInput.valueAsNumber
    );

    const orderListByTeamCollection = this.orderDecider.convertToOrderListByTeamCollection(
      orderInputValueList,
      this.preInfoInputList[2].valueAsNumber
    );

    if (!this.#isCorrectOrderList(orderListByTeamCollection)) {
      return;
    }
    const orderResult = this.orderDecider.getPresentationOrderResult(
      this.preInfoInputList[0].valueAsNumber,
      orderListByTeamCollection
    );

    this.modalResultTable.replaceChildren();
    this.modalResultTable.insertAdjacentHTML('afterbegin', generateModalResultTable(orderResult));
  }

  #converToPrevInfoObject(preInfoInputList) {
    const [totalTeamCount, totalOrder, totalPriorities] = Array.from(preInfoInputList).map(
      (preInfoInput) => preInfoInput.valueAsNumber
    );
    return { totalTeamCount, totalOrder, totalPriorities };
  }

  #isCorrectOrderList(orderListByTeamCollection) {
    return Object.entries(orderListByTeamCollection).every(([teamCount, orderListByTeam]) => {
      try {
        validateOrderList(orderListByTeam, this.preInfoInputList[1].valueAsNumber);
      } catch (error) {
        alert(`[${teamCount}팀]: ${error.message}`);
        return false;
      }
      return true;
    });
  }
}

export default ManualInputPage;
