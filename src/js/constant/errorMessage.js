export const PREV_INFO_ERROR_MESSAGE = {
  NO_EMPTY_INPUT_ALLOWED: '입력값은 모두 공백이 아니어야 합니다.',
  OUT_OF_TEAM_COUNT_RANGE: '팀 수는 2팀 이상, 50팀 이하여야 합니다.',
  OUT_OF_PRIORITY_RANGE: '우선 순위 수는 1순위 이상, 10순위 이하여야 합니다.',
  OUT_OF_ORDER_RANGE(totalTeamCount) {
    return `총 발표 순서는 ${totalTeamCount}개 이상, 100개 이하여야 합니다.`;
  },
};

export const ORDER_LIST_ERROR_MESSAGE = {
  NO_EMPTY_INPUT_ALLOWED: '공백 없이 모두 입력해주세요.',
  NO_DUPLICATION_ALLOWED: '중복 없이 입력해주세요.',
  OUT_OF_RANGE(totalOrder) {
    return `1 이상, ${totalOrder} 이하의 값을 입력해야 합니다.`;
  },
};
