import { ORDER_LIST_ERROR_MESSAGE, PREV_INFO_ERROR_MESSAGE } from '../constant/errorMessage.js';
import { validateOrderList, validatePrevInfo } from '../validator.js';

describe('사전 정보 입력값 유효성 테스트', () => {
  test('사전 정보 입력값은 일부 공백이면 에러가 발생한다.', () => {
    const prevInfo = {
      totalTeamCount: NaN,
      totalOrder: 10,
      totalPriorities: 3,
    };
    expect(() => validatePrevInfo(prevInfo)).toThrow(
      PREV_INFO_ERROR_MESSAGE.NO_EMPTY_INPUT_ALLOWED
    );
  });

  test('팀 수는 2팀 이상이 아니면 에러가 발생한다.', () => {
    const prevInfo = {
      totalTeamCount: 1,
      totalOrder: 10,
      totalPriorities: 3,
    };
    expect(() => validatePrevInfo(prevInfo)).toThrow(
      PREV_INFO_ERROR_MESSAGE.OUT_OF_TEAM_COUNT_RANGE
    );
  });

  test('팀 수는 50팀 이하가 아니면 에러가 발생한다.', () => {
    const prevInfo = {
      totalTeamCount: 51,
      totalOrder: 10,
      totalPriorities: 3,
    };
    expect(() => validatePrevInfo(prevInfo)).toThrow(
      PREV_INFO_ERROR_MESSAGE.OUT_OF_TEAM_COUNT_RANGE
    );
  });

  test('팀 수는 2팀 이상, 50팀 이하면 에러가 발생하지 않는다.', () => {
    const prevInfo = {
      totalTeamCount: 50,
      totalOrder: 10,
      totalPriorities: 3,
    };
    expect(() => validatePrevInfo(prevInfo)).not.toThrow(
      PREV_INFO_ERROR_MESSAGE.OUT_OF_TEAM_COUNT_RANGE
    );
  });

  test('우선 순위 수는 총 순서 개수 이하가 아니면 에러가 발생한다.', () => {
    const prevInfo = {
      totalTeamCount: 10,
      totalOrder: 10,
      totalPriorities: 11,
    };
    expect(() => validatePrevInfo(prevInfo)).toThrow(
      PREV_INFO_ERROR_MESSAGE.OUT_OF_PRIORITY_RANGE(prevInfo.totalOrder)
    );
  });

  test('총 발표 순서는 총 팀 수 이상이 아니면 에러가 발생한다.', () => {
    const prevInfo = {
      totalTeamCount: 10,
      totalOrder: 9,
      totalPriorities: 3,
    };
    expect(() => validatePrevInfo(prevInfo)).toThrow(
      PREV_INFO_ERROR_MESSAGE.OUT_OF_ORDER_RANGE(prevInfo.totalTeamCount)
    );
  });

  test('총 발표 순서는 100개 이하가 아니면 에러가 발생한다.', () => {
    const prevInfo = {
      totalTeamCount: 50,
      totalOrder: 101,
      totalPriorities: 10,
    };
    expect(() => validatePrevInfo(prevInfo)).toThrow(
      PREV_INFO_ERROR_MESSAGE.OUT_OF_ORDER_RANGE(prevInfo.totalTeamCount)
    );
  });
});

describe('원하는 순서 입력값 유효성 검사', () => {
  const prevInfo = {
    totalTeamCount: 5,
    totalOrder: 10,
    totalPriorities: 3,
  };

  test('공백이 있으면 에러가 발생한다.', () => {
    const orderList = [1, NaN, 3];
    expect(() => validateOrderList(orderList, prevInfo.totalOrder)).toThrow(
      ORDER_LIST_ERROR_MESSAGE.NO_EMPTY_INPUT_ALLOWED
    );
  });

  test('중복된 숫자가 있으면 에러가 발생한다.', () => {
    const orderList = [1, 1, 3];
    expect(() => validateOrderList(orderList, prevInfo.totalOrder)).toThrow(
      ORDER_LIST_ERROR_MESSAGE.NO_DUPLICATION_ALLOWED
    );
  });

  test('1이상, 총 발표 순서 이하의 값이 아니면 에러가 발생한다.', () => {
    const orderList = [1, 2, 11];
    expect(() => validateOrderList(orderList, prevInfo.totalOrder)).toThrow(
      ORDER_LIST_ERROR_MESSAGE.OUT_OF_RANGE(prevInfo.totalOrder)
    );
  });
});
