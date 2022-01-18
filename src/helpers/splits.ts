/** @format */

import { TripType } from "../interfaces/tripObjects";
import { SplitTransactionType, SplitType } from "../interfaces/splitObjects";

type PersonBalanceObject = {
  id: string;
  name: string;
  pay: number;
  receive: number;
  balance: number;
};
type PersonPosNegObject = {
  id: string;
  name: string;
  balance: number;
};

//
// ** Builds the splits list for a trip given a
//      trip object
//
export const buildSplitsList = (trip: TripType): SplitType[] => {
  //

  // [Step 0]: Initialize needed lists
  //
  let splitsList: SplitType[] = [];
  let peopleBalanceList: PersonBalanceObject[] = [];
  let positiveList: PersonPosNegObject[] = [];
  let negativeList: PersonPosNegObject[] = [];

  for (let p of trip.peopleList) {
    // Initialize People Balance List with 0s
    let person_balance: PersonBalanceObject = {
      id: p.id,
      name: p.name,
      pay: 0,
      receive: 0,
      balance: 0,
    };
    peopleBalanceList.push(person_balance);
    // Initialize splits array with empty objects for each person
    let person_split: SplitType = {
      personId: p.id,
      name: p.name,
      endingBalance: 0,
      transactions: [],
    };
    splitsList.push(person_split);
  }

  // [Step 1]: Calculate the pay and receive for each person
  //
  for (let b of peopleBalanceList) {
    for (let a of trip.activityList) {
      // Check if person is the payer
      if (b.id === a.payerId) b.receive += a.cost;
      // Check if person participated
      if (a.participantList.includes(b.id)) {
        // Add the payer's portion of the split
        b.pay += a.cost / a.participantList.length;
      }
    }
  }

  // [Step 2]: Build the positive and negative list for the matrix
  //
  for (let b of peopleBalanceList) {
    b.balance = b.receive - b.pay;
    let person_posNeg: PersonPosNegObject = {
      id: b.id,
      name: b.name,
      balance: b.balance,
    };
    if (b.balance >= 0) positiveList.push(person_posNeg);
    else negativeList.push(person_posNeg);
  }

  // [Step 3]: From the positive and negative lists, keep
  //      equating till balances zero out
  //
  for (let p of positiveList) {
    for (let n of negativeList) {
      if (
        Math.abs(p.balance) > Math.abs(n.balance) &&
        p.balance !== 0 &&
        n.balance !== 0
      ) {
        // CASES 1 ****
        //   Positive > Negative
        p.balance = Math.abs(p.balance - Math.abs(n.balance));
        let oweAmount = n.balance;
        n.balance = 0;
        // Cycle through splits list to add
        for (let s of splitsList) {
          if (s.personId === n.id) {
            //   Paying someone
            let split: SplitTransactionType = {
              type: "PAY",
              personId: p.id,
              name: p.name,
              amount: Math.round(Math.abs(oweAmount) * 100) / 100,
            };
            s.transactions.push(split);
          }
          if (s.personId === p.id) {
            //   Receiving from someone
            let split: SplitTransactionType = {
              type: "RECEIVE",
              personId: n.id,
              name: n.name,
              amount: Math.round(Math.abs(oweAmount) * 100) / 100,
            };
            s.transactions.push(split);
          }
        }
      } else if (
        Math.abs(p.balance) < Math.abs(n.balance) &&
        p.balance !== 0 &&
        n.balance !== 0
      ) {
        // CASE 2 ****
        //   Positive < Negative
        n.balance = -1 * Math.abs(p.balance - Math.abs(n.balance));
        let oweAmount = p.balance;
        p.balance = 0;
        // Cycle through splits list to add
        for (let s of splitsList) {
          if (s.personId === n.id) {
            //   Paying someone
            let split: SplitTransactionType = {
              type: "PAY",
              personId: p.id,
              name: p.name,
              amount: Math.round(Math.abs(oweAmount) * 100) / 100,
            };
            s.transactions.push(split);
          }
          if (s.personId === p.id) {
            //   Receiving from someone
            let split: SplitTransactionType = {
              type: "RECEIVE",
              personId: n.id,
              name: n.name,
              amount: Math.round(Math.abs(oweAmount) * 100) / 100,
            };
            s.transactions.push(split);
          }
        }
      } else {
        // CASE 3 ****
        //   Positive === Negative
        if (p.balance !== 0 && n.balance !== 0) {
          // Cycle through splits list to add
          for (let s of splitsList) {
            if (s.personId === n.id) {
              //   Paying someone
              let split: SplitTransactionType = {
                type: "PAY",
                personId: p.id,
                name: p.name,
                amount: Math.round(Math.abs(p.balance) * 100) / 100,
              };
              s.transactions.push(split);
            }
            if (s.personId === p.id) {
              //   Receiving from someone
              let split: SplitTransactionType = {
                type: "RECEIVE",
                personId: n.id,
                name: n.name,
                amount: Math.round(Math.abs(n.balance) * 100) / 100,
              };
              s.transactions.push(split);
            }
          }

          // Indicates balaces distributed
          p.balance = 0;
          n.balance = 0;
        }
      }
    }
  }

  // [Step 4]: Calculate ending balances for everyone
  //
  for (let s of splitsList) {
    for (let t of s.transactions) {
      if (t.type === "PAY") {
        s.endingBalance -= t.amount;
      } else if (t.type === "RECEIVE") {
        s.endingBalance += t.amount;
      }
    }
    s.endingBalance = Math.round(s.endingBalance * 100) / 100;
  }

  return splitsList;

  //
};

//
// ** Calculates the total cost of the trip
//      by adding up all the activities
export const calculateTotalCost = (trip: TripType): number => {
  let totalCostRaw = 0;
  for (let a of trip.activityList) {
    totalCostRaw += a.cost;
  }
  let totalCost = Math.round(totalCostRaw * 100) / 100;
  return totalCost;
};
