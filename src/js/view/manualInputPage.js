import {
  ORDER_LIST_ERROR_MESSAGE,
  PREV_INFO_ERROR_MESSAGE,
  REPLAY_MESSAGE,
} from '../constant/errorMessage';
import { INPUT_DEBOUNCE_TIME } from '../constant/rule';
import { CLASSNAME } from '../constant/selector';
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
      this.errorMessageText.classList.remove(CLASSNAME.CORRECT);

      const prevInfoObject = this.#converToPrevInfoObject(this.preInfoInputList);
      try {
        validatePrevInfo(prevInfoObject);
      } catch (error) {
        this.errorMessageText.textContent = error.message;
        this.teamOrderListSection.replaceChildren();
        return;
      }

      this.errorMessageText.classList.add(CLASSNAME.CORRECT);
      this.errorMessageText.textContent = PREV_INFO_ERROR_MESSAGE.CORRECT_INPUT;
      this.#renderTeamOrderListSection(prevInfoObject);

      this.teamOrderListForm = this.teamOrderListSection.querySelector('.team-order-list-form');
      this.orderInputList = this.teamOrderListForm.querySelectorAll('input');

      this.teamOrderListForm.addEventListener('submit', this.#onSubmitTeamOrderList);
    }, INPUT_DEBOUNCE_TIME);
  };

  #onSubmitTeamOrderList = (e) => {
    e.preventDefault();
    this.#renderResultTable();
    this.modal.classList.remove(CLASSNAME.HIDE);
  };

  #onClickModal = ({ target: { classList: targetClassList } }) => {
    if (targetClassList.contains('dimmer')) {
      this.modal.classList.add(CLASSNAME.HIDE);
      return;
    }

    if (targetClassList.contains('replay-button')) {
      this.#renderResultTable();
      alert(REPLAY_MESSAGE);
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

    const { totalTeamCount, totalPriorities } = this.#converToPrevInfoObject(this.preInfoInputList);

    const orderListByTeamCollection = this.orderDecider.convertToOrderListByTeamCollection(
      orderInputValueList,
      totalPriorities
    );

    if (!this.#isCorrectOrderList(orderListByTeamCollection)) {
      return;
    }
    const orderResult = this.orderDecider.getPresentationOrderResult(
      totalTeamCount,
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
    const { totalOrder } = this.#converToPrevInfoObject(this.preInfoInputList);
    return Object.entries(orderListByTeamCollection).every(([teamCount, orderListByTeam]) => {
      try {
        validateOrderList(orderListByTeam, totalOrder);
      } catch (error) {
        alert(ORDER_LIST_ERROR_MESSAGE.BY_TEAM(teamCount, error.message));
        return false;
      }
      return true;
    });
  }
}

export default ManualInputPage;
