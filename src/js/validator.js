import { ORDER_LIST_ERROR_MESSAGE, PREV_INFO_ERROR_MESSAGE } from './constant/errorMessage';
import { PREV_INFO_RULE } from './constant/rule';

const isBlankInput = (totalTeamCount, totalPriorities, totalOrder) =>
  !totalTeamCount || !totalPriorities || !totalOrder;

const isOutOfTeamRange = (totalTeamCount) =>
  totalTeamCount < PREV_INFO_RULE.MIN_TEAM_COUNT || totalTeamCount > PREV_INFO_RULE.MAX_TEAM_COUNT;

const isOutOfPriorityRange = (totalPriorities) =>
  totalPriorities < PREV_INFO_RULE.MIN_PRIORITY || totalPriorities > PREV_INFO_RULE.MAX_PRIORITY;

const isOutOfOrderRange = (totalOrder, totalTeamCount) =>
  totalOrder < totalTeamCount || totalOrder > PREV_INFO_RULE.MAX_ORDER;

export const validatePrevInfo = ({ totalTeamCount, totalPriorities, totalOrder }) => {
  if (isBlankInput(totalTeamCount, totalPriorities, totalOrder)) {
    throw new Error(PREV_INFO_ERROR_MESSAGE.NO_EMPTY_INPUT_ALLOWED);
  }

  if (isOutOfTeamRange(totalTeamCount)) {
    throw new Error(PREV_INFO_ERROR_MESSAGE.OUT_OF_TEAM_COUNT_RANGE);
  }

  if (isOutOfPriorityRange(totalPriorities)) {
    throw new Error(PREV_INFO_ERROR_MESSAGE.OUT_OF_PRIORITY_RANGE);
  }

  if (isOutOfOrderRange(totalOrder, totalTeamCount)) {
    throw new Error(PREV_INFO_ERROR_MESSAGE.OUT_OF_ORDER_RANGE(totalTeamCount));
  }
};

export const validateOrderList = (orderListByTeam, totalOrder) => {
  if (orderListByTeam.some((order) => !order)) {
    throw new Error(ORDER_LIST_ERROR_MESSAGE.NO_EMPTY_INPUT_ALLOWED);
  }

  if (new Set(orderListByTeam).size !== orderListByTeam.length) {
    throw new Error(ORDER_LIST_ERROR_MESSAGE.NO_DUPLICATION_ALLOWED);
  }

  if (orderListByTeam.some((order) => order > totalOrder)) {
    throw new Error(ORDER_LIST_ERROR_MESSAGE.OUT_OF_RANGE(totalOrder));
  }
};
