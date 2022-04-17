import { NOT_ASSIGNED_TEXT } from './constant/rule';
import { pickRandomElementInArray } from './util';

class OrderDecider {
  getPresentationOrderResult(totalTeamCount, orderListByTeamCollection) {
    const orderListByPriorityCollection =
      this.#convertToOrderListByPriorityCollection(orderListByTeamCollection);

    return this.#decideOrder(orderListByPriorityCollection, totalTeamCount);
  }

  convertToOrderListByTeamCollection(orderInputValueList, totalPriorities) {
    return orderInputValueList.reduce((acc, cur, index) => {
      const teamCount = Math.floor(index / totalPriorities) + 1;

      if (!acc[teamCount]) {
        acc[teamCount] = [];
      }

      acc[teamCount].push(cur);
      return acc;
    }, {});
  }

  #decideOrder(orderListByPriorityCollection, teamCount) {
    let orderResult = this.#initOrderResult(teamCount);
    let remainedTeam = Array.from({ length: teamCount }, (_, index) => index + 1);

    Object.values(orderListByPriorityCollection).every((orderListByPriority) => {
      if (!remainedTeam.length) return false;

      const candidateTeamByOrder = this.#sortTeamByOrder(
        orderListByPriority,
        remainedTeam,
        orderResult
      );
      const { newRemainedTeam, newOrderResult } = this.#assignOrderToEachTeam(
        candidateTeamByOrder,
        remainedTeam,
        orderResult
      );
      remainedTeam = newRemainedTeam;
      orderResult = newOrderResult;
      return true;
    });

    return orderResult;
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

  #sortTeamByOrder(orderListByPriority, remainedTeam, orderResult) {
    const candidateTeamByOrder = {};

    orderListByPriority.every((order, index) => {
      const teamNumber = index + 1;

      if (!remainedTeam.includes(teamNumber) || Object.values(orderResult).includes(order)) {
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

  #assignOrderToEachTeam(candidateTeamByOrder, remainedTeam, orderResult) {
    let newRemainedTeam = remainedTeam;
    const newOrderResult = orderResult;

    Object.entries(candidateTeamByOrder).every(([order, candidateTeams]) => {
      const orderNumber = Number(order);
      let winnerTeam = candidateTeams[0];

      if (candidateTeams.length > 1) {
        winnerTeam = pickRandomElementInArray(candidateTeams);
      }

      newOrderResult[winnerTeam] = orderNumber;
      newRemainedTeam = newRemainedTeam.filter((team) => team !== winnerTeam);
      return true;
    });

    return { newRemainedTeam, newOrderResult };
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
