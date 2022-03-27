import OrderDecider from '../orderDecider';

describe('순서 결정 테스트', () => {
  const orderDecider = new OrderDecider();

  test('입력한 순서 번호가 유일하면 그 값을 할당한다.', () => {
    const priorityCollection = {
      // 우선순위: [1팀, 2팀, 3팀]
      1: [1, 2, 3],
      2: [2, 3, 4],
      3: [3, 4, 5],
    };
    expect(orderDecider.decideOrder(priorityCollection, 3)).toEqual({ 1: 1, 2: 2, 3: 3 });
  });

  test('입력한 순서 번호가 겹치면 랜덤 할당한다.', () => {
    const priorityCollection = {
      1: [1, 1, 3],
      2: [2, 2, 4],
      3: [3, 3, 5],
    };
    expect(orderDecider.decideOrder(priorityCollection, 3)).toEqual(
      expect.objectContaining({ 3: 3 })
    );
  });

  test('순서가 할당되지 않은 팀은 `Not assigned`가 할당된다.', () => {
    const priorityCollection = {
      1: [1, 1, 1, 1],
      2: [2, 2, 2, 2],
      3: [3, 3, 3, 3],
    };
    expect(
      Object.values(orderDecider.decideOrder(priorityCollection, 4)).includes('Not assigned')
    ).toEqual(true);
  });
});
