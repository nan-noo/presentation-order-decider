export const validatePrevInfo = ({ totalTeamCount, totalPriorities, totalOrder }) => {
  if (!totalTeamCount || !totalPriorities || !totalOrder) {
    throw new Error('입력값은 모두 공백이 아니어야 합니다.');
  }

  if (totalTeamCount < 2 || totalTeamCount > 50) {
    throw new Error('팀 수는 2팀 이상, 50팀 이하여야 합니다.');
  }

  if (totalPriorities < 1 || totalPriorities > 10) {
    throw new Error('우선 순위 수는 1순위 이상, 10순위 이하여야 합니다.');
  }

  if (totalOrder < totalTeamCount || totalOrder > 100) {
    throw new Error(`총 발표 순서는 ${totalTeamCount}개 이상, 100개 이하여야 합니다.`);
  }
};

export const validateOrderList = (orderList, totalOrder) => {
  if (orderList.some((order) => !order)) {
    throw new Error('공백 없이 모두 입력해주세요.');
  }

  if (new Set(orderList).size !== orderList.length) {
    throw new Error('중복 없이 입력해주세요.');
  }

  if (orderList.some((order) => order > totalOrder)) {
    throw new Error(`1 이상, ${totalOrder} 이하의 값을 입력해야 합니다.`);
  }
};
