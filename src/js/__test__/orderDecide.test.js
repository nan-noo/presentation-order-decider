import { NOT_ASSIGNED_TEXT } from '../constant/rule';
import OrderDecider from '../orderDecider';

describe('순서 결정 테스트', () => {
  const orderDecider = new OrderDecider();

  test('입력한 순서 번호가 유일하면 그 값을 할당한다.', () => {
    const orderListByTeamCollection = {
      // 팀: [1순위, 2순위, 3순위]
      1: [1, 2, 3],
      2: [2, 3, 4],
      3: [3, 4, 5],
    };

    expect(orderDecider.getPresentationOrderResult(3, orderListByTeamCollection)).toEqual({
      1: 1,
      2: 2,
      3: 3,
    });
  });

  test('입력한 순서 번호가 겹치면 랜덤 할당한다.', () => {
    const orderListByTeamCollection = {
      1: [1, 2, 3],
      2: [1, 2, 3],
      3: [3, 4, 5],
    };

    expect(orderDecider.getPresentationOrderResult(3, orderListByTeamCollection)).toEqual(
      expect.objectContaining({ 3: 3 })
    );
  });

  test('순서가 할당되지 않은 팀은 `Not assigned`가 할당된다.', () => {
    const orderListByTeamCollection = {
      1: [1, 2, 3],
      2: [1, 2, 3],
      3: [1, 2, 3],
      4: [1, 2, 3],
    };

    expect(
      Object.values(orderDecider.getPresentationOrderResult(4, orderListByTeamCollection)).includes(
        NOT_ASSIGNED_TEXT
      )
    ).toEqual(true);
  });
});
