import { NOT_ASSIGNED_TEXT } from './constant/rule';
import { pickRandomElementInArray } from './util';

class OrderDecider {
  constructor() {
    this.orderResult = {};
  }

  decideOrder(priorityCollection, teamCount) {
    this.orderResult = this.#initOrderResult(teamCount);
    let remainedTeam = Array.from({ length: teamCount }, (_, index) => index + 1);

    Object.values(priorityCollection).every((orderListByPriority) => {
      if (!remainedTeam.length) return false;

      const candidateTeamByOrder = this.#sortTeamByOrder(orderListByPriority, remainedTeam);
      this.#assignOrderToEachTeam(candidateTeamByOrder, remainedTeam);
    });
  }

  #sortTeamByOrder(orderListByPriority, remainedTeam) {
    const candidateTeamByOrder = {};
    orderListByPriority.every((order, index) => {
      const teamNumber = index + 1;
      if (remainedTeam.includes(teamNumber) && !Object.values(this.orderResult).includes(order)) {
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

  #assignOrderToEachTeam(candidateTeamByOrder, remainedTeam) {
    Object.entries(candidateTeamByOrder).every(([order, candidateTeams]) => {
      const orderNumber = Number(order);
      if (candidateTeams.length === 1) {
        this.orderResult[candidateTeams[0]] = orderNumber;
        remainedTeam = remainedTeam.filter((team) => team !== candidateTeams[0]);
        return true;
      }
      const winnerTeam = pickRandomElementInArray(candidateTeams);
      this.orderResult[winnerTeam] = orderNumber;
      remainedTeam = remainedTeam.filter((team) => team !== winnerTeam);
      return true;
    });
  }

  #initOrderResult(teamCount) {
    const result = {};
    Array.from({ length: teamCount }, (_, team) => (result[team + 1] = NOT_ASSIGNED_TEXT));
    return result;
  }
}

export default OrderDecider;
