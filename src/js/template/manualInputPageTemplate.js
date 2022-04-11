const generateTableHeadByPriorities = (totalPriorities) =>
  Array.from({ length: totalPriorities }, (_, index) => `<th>${index + 1}순위</th>`).join(' ');

const generateTableRowByTeamCount = (totalTeamCount, totalPriorities) =>
  Array.from(
    { length: totalTeamCount },
    (_, index) => `
<tr>
  <th scope="row">팀 ${index + 1}</th>
  ${Array.from(
    { length: totalPriorities },
    () => `<td><input type="number" min="${totalTeamCount}" max="100" placeholder="순서" /></td>`
  ).join(' ')}
</tr>
`
  ).join(' ');

export const generateTeamOrderListTemplate = ({ totalTeamCount, totalPriorities }) => `
  <form class="team-order-list-form">
    <label>원하는 순서부터 차례대로 입력해주세요.</label>
    <table>
      <tr>
        <th></th>
        ${generateTableHeadByPriorities(totalPriorities)}
      </tr>
      ${generateTableRowByTeamCount(totalTeamCount, totalPriorities)}
    </table>
    <button class="input-form-button result-button">결과 확인하기</button>
  </form>
`;
