import { NOT_ASSIGNED_TEXT } from './constant/rule';
import { pickRandomElementInArray } from './util';

class OrderDecider {
  constructor() {
    this.orderResult = {};
    this.orderListByTeamCollection = {};
  }

  getPresentationOrderResult(totalTeamCount) {
    const orderListByPriorityCollection = this.#convertToOrderListByPriorityCollection(
      this.orderListByTeamCollection
    );
    return this.#decideOrder(orderListByPriorityCollection, totalTeamCount);
  }

  #decideOrder(orderListByPriorityCollection, teamCount) {
    this.orderResult = this.#initOrderResult(teamCount);
    let remainedTeam = Array.from({ length: teamCount }, (_, index) => index + 1);

    Object.values(orderListByPriorityCollection).every((orderListByPriority) => {
      if (!remainedTeam.length) return false;

      const candidateTeamByOrder = this.#sortTeamByOrder(orderListByPriority, remainedTeam);
      remainedTeam = this.#assignOrderToEachTeam(candidateTeamByOrder, remainedTeam);
      return true;
    });

    return this.orderResult;
  }

  #convertToOrderListByPriorityCollection(orderListByTeamCollection) {
    const orderListByPriorityCollection = {};

    Object.values(orderListByTeamCollection).forEach((orderListByTeam) => {
      orderListByTeam.every((order, index) => {
        const priority = index + 1;
        if (orderListByPriorityCollection[priority]) {
          orderListByPriorityCollection[priority].push(order);
          return true;
        }
        orderListByPriorityCollection[priority] = [order];
        return true;
      });
    });

    return orderListByPriorityCollection;
  }

  #sortTeamByOrder(orderListByPriority, remainedTeam) {
    const candidateTeamByOrder = {};

    orderListByPriority.every((order, index) => {
      const teamNumber = index + 1;

      if (!remainedTeam.includes(teamNumber) || Object.values(this.orderResult).includes(order)) {
        return true;
      }

      if (candidateTeamByOrder[order]) {
        candidateTeamByOrder[order].push(teamNumber);
        return true;
      }
      candidateTeamByOrder[order] = [teamNumber];
      return true;
    });

    return candidateTeamByOrder;
  }

  #assignOrderToEachTeam(candidateTeamByOrder, remainedTeam) {
    let newRemainedTeam = remainedTeam;

    Object.entries(candidateTeamByOrder).every(([order, candidateTeams]) => {
      const orderNumber = Number(order);
      let winnerTeam = candidateTeams[0];

      if (candidateTeams.length > 1) {
        winnerTeam = pickRandomElementInArray(candidateTeams);
      }

      this.orderResult[winnerTeam] = orderNumber;
      newRemainedTeam = newRemainedTeam.filter((team) => team !== winnerTeam);
      return true;
    });

    return newRemainedTeam;
  }

  #initOrderResult(teamCount) {
    const result = {};
    Array.from({ length: teamCount }, (_, team) => {
      result[team + 1] = NOT_ASSIGNED_TEXT;
      return '';
    });
    return result;
  }
}

export default OrderDecider;
