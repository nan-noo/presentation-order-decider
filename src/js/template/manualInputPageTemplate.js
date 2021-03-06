const generateTableHeadByPriorities = (totalPriorities) =>
  Array.from({ length: totalPriorities }, (_, index) => `<th>${index + 1}순위</th>`).join(' ');

const generateTableRowByTeamCount = (totalTeamCount, totalPriorities, totalOrder) =>
  Array.from(
    { length: totalTeamCount },
    (_, index) => `
<tr class="team-row">
  <th scope="row">팀 ${index + 1}</th>
  ${Array.from(
    { length: totalPriorities },
    () => `<td><input type="number" min="1" max="${totalOrder}" placeholder="순서" /></td>`
  ).join(' ')}
</tr>
`
  ).join(' ');

export const generateTeamOrderListTemplate = ({ totalTeamCount, totalPriorities, totalOrder }) => `
  <form class="team-order-list-form">
    <label>원하는 순서부터 차례대로 입력해주세요.</label>
    <table>
      <tr>
        <th></th>
        ${generateTableHeadByPriorities(totalPriorities)}
      </tr>
      ${generateTableRowByTeamCount(totalTeamCount, totalPriorities, totalOrder)}
    </table>
    <button class="input-form-button result-button">결과 확인하기</button>
  </form>
`;

export const generateModalResultTable = (orderResult) => `
  <caption>
    발표 순서 결과
  </caption>
  <tr>
    <th>팀</th>
    <th>발표 순서</th>
  </tr>
  ${Object.entries(orderResult)
    .map(
      ([team, order]) => `
  <tr>
    <td>팀 ${team}</td>
    <td>${order}</td>
  </tr>
  `
    )
    .join(' ')}
`;
