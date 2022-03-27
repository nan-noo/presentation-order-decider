import { ORDER_LIST_ERROR_MESSAGE, PREV_INFO_ERROR_MESSAGE } from './constant/errorMessage';
import { PREV_INFO_RULE } from './constant/rule';

export const validatePrevInfo = ({ totalTeamCount, totalPriorities, totalOrder }) => {
  if (!totalTeamCount || !totalPriorities || !totalOrder) {
    throw new Error(PREV_INFO_ERROR_MESSAGE.NO_EMPTY_INPUT_ALLOWED);
  }

  if (
    totalTeamCount < PREV_INFO_RULE.MIN_TEAM_COUNT ||
    totalTeamCount > PREV_INFO_RULE.MAX_TEAM_COUNT
  ) {
    throw new Error(PREV_INFO_ERROR_MESSAGE.OUT_OF_TEAM_COUNT_RANGE);
  }

  if (
    totalPriorities < PREV_INFO_RULE.MIN_PRIORITY ||
    totalPriorities > PREV_INFO_RULE.MAX_PRIORITY
  ) {
    throw new Error(PREV_INFO_ERROR_MESSAGE.OUT_OF_PRIORITY_RANGE);
  }

  if (totalOrder < totalTeamCount || totalOrder > PREV_INFO_RULE.MAX_ORDER) {
    throw new Error(PREV_INFO_ERROR_MESSAGE.OUT_OF_ORDER_RANGE(totalTeamCount));
  }
};

export const validateOrderList = (orderList, totalOrder) => {
  if (orderList.some((order) => !order)) {
    throw new Error(ORDER_LIST_ERROR_MESSAGE.NO_EMPTY_INPUT_ALLOWED);
  }

  if (new Set(orderList).size !== orderList.length) {
    throw new Error(ORDER_LIST_ERROR_MESSAGE.NO_DUPLICATION_ALLOWED);
  }

  if (orderList.some((order) => order > totalOrder)) {
    throw new Error(ORDER_LIST_ERROR_MESSAGE.OUT_OF_RANGE(totalOrder));
  }
};
