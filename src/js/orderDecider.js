import { pickRandomElementInArray } from './util';

class OrderDecider {
  decideOrder(priorityCollection, teamCount) {
    let orderResult = this.#initOrderResult(teamCount); // 팀: 순서
    let remainedTeam = Array.from({ length: teamCount }, (_, index) => index + 1);

    Object.values(priorityCollection).every((orderListByPriority) => {
      if (!remainedTeam.length) return false;

      const candidateTeamByOrder = this.#sortTeamByOrder(
        orderListByPriority,
        remainedTeam,
        orderResult
      );
      orderResult = this.#assignOrderToEachTeam(candidateTeamByOrder, remainedTeam, orderResult);
    });

    return orderResult;
  }

  #sortTeamByOrder(orderListByPriority, remainedTeam, orderResult) {
    const candidateTeamByOrder = {};
    orderListByPriority.every((order, index) => {
      const teamNumber = index + 1;
      if (remainedTeam.includes(teamNumber) && !Object.values(orderResult).includes(order)) {
        if (!candidateTeamByOrder[order]) {
          candidateTeamByOrder[order] = [teamNumber];
          return true;
        }
        candidateTeamByOrder[order].push(teamNumber);
      }
      return true;
    });
    return candidateTeamByOrder;
  }

  #assignOrderToEachTeam(candidateTeamByOrder, remainedTeam, orderResult) {
    Object.entries(candidateTeamByOrder).every(([order, candidateTeams]) => {
      const orderNumber = Number(order);
      if (candidateTeams.length === 1) {
        orderResult[candidateTeams[0]] = orderNumber;
        remainedTeam = remainedTeam.filter((team) => team !== candidateTeams[0]);
        return true;
      }
      const winnerTeam = pickRandomElementInArray(candidateTeams);
      orderResult[winnerTeam] = orderNumber;
      remainedTeam = remainedTeam.filter((team) => team !== winnerTeam);
      return true;
    });
    return orderResult;
  }

  #initOrderResult(teamCount) {
    const result = {};
    Array.from({ length: teamCount }, (_, team) => (result[team + 1] = 'Not assigned'));
    return result;
  }
}

export default OrderDecider;
