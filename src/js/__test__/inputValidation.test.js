import { validatePrevInfo } from '../validator.js';

describe('사전 정보 입력값 유효성 테스트', () => {
  test('사전 정보 입력값은 모두 공백이 아니어야 한다.', () => {
    const prevInfo = {
      totalTeamCount: NaN,
      totalPriorities: 3,
      totalOrder: 10,
    };
    expect(() => validatePrevInfo(prevInfo)).toThrow('입력값은 모두 공백이 아니어야 합니다.');
  });

  test('팀 수는 2팀 이상이어야 한다.', () => {
    const prevInfo = { totalTeamCount: 1, totalPriorities: 3, totalOrder: 10 };
    expect(() => validatePrevInfo(prevInfo)).toThrow('팀 수는 2팀 이상, 50팀 이하여야 합니다.');
  });

  test('팀 수는 50팀 이하이어야 한다.', () => {
    const prevInfo = { totalTeamCount: 51, totalPriorities: 3, totalOrder: 10 };
    expect(() => validatePrevInfo(prevInfo)).toThrow('팀 수는 2팀 이상, 50팀 이하여야 합니다.');
  });

  test('팀 수는 2팀 이상, 50팀 이하이어야 한다.', () => {
    const prevInfo = { totalTeamCount: 50, totalPriorities: 3, totalOrder: 10 };
    expect(() => validatePrevInfo(prevInfo)).not.toThrow('팀 수는 2팀 이상, 50팀 이하여야 합니다.');
  });

  test('우선 순위 수는 1순위 이상, 10순위 이하여야 한다.', () => {
    const prevInfo = {
      totalTeamCount: 50,
      totalPriorities: 11,
      totalOrder: 10,
    };
    expect(() => validatePrevInfo(prevInfo)).toThrow(
      '우선 순위 수는 1순위 이상, 10순위 이하여야 합니다.'
    );
  });

  test('총 발표 순서는 총 팀 수 이상이어야 한다.', () => {
    const prevInfo = {
      totalTeamCount: 50,
      totalPriorities: 10,
      totalOrder: 9,
    };
    expect(() => validatePrevInfo(prevInfo)).toThrow(
      `총 발표 순서는 ${prevInfo.totalTeamCount}개 이상, 100개 이하여야 합니다.`
    );
  });

  test('총 발표 순서는 100개 이하이어야 한다.', () => {
    const prevInfo = {
      totalTeamCount: 50,
      totalPriorities: 10,
      totalOrder: 101,
    };
    expect(() => validatePrevInfo(prevInfo)).toThrow(
      `총 발표 순서는 ${prevInfo.totalTeamCount}개 이상, 100개 이하여야 합니다.`
    );
  });
});
