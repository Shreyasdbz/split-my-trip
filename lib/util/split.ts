/** @format */

// TODO: Describe each library

interface IPeronBalance {
  id: string;
  name: string;
  payAmount: number;
  receiveAmount: number;
  balance: number;
}
interface IPersonDifference {
  id: string;
  name: string;
  balance: number;
}

/**
 *
 * @param trip
 * @returns
 */
function buildSplitsList(trip: ITripData): ISplitPerson[] {
  //
  // Step 1 -- Initialize needed lists
  let splitsList: ISplitPerson[] = [];
  let personBalanceList: IPeronBalance[] = [];
  let positiveList: IPersonDifference[] = [];
  let negativeList: IPersonDifference[] = [];

  if (!trip.personList || !trip.activityList) return splitsList;

  for (let p of trip.personList) {
    // initialize each person with a balance of 0
    personBalanceList.push({
      id: p.id,
      name: p.name,
      payAmount: 0,
      receiveAmount: 0,
      balance: 0,
    });
    // initialize splits array with empty objects for each person
    splitsList.push({
      personId: p.id,
      personName: p.name,
      endingBalace: 0,
      transactions: [],
    });
  }

  //
  // Step 2 -- calculate the pay and receive for each person
  for (let b of personBalanceList) {
    for (let a of trip.activityList) {
      // check if person is payer
      if (b.id === a.payerId) {
        b.receiveAmount += a.cost;
      }
      // check if person participated
      let participantListIds: string[] = [];
      for (let p of a.participantList) {
        if (p.isParticipating) {
          participantListIds.push(p.participantId);
        }
      }
      // add the payer's portion to the split
      if (participantListIds.includes(b.id)) {
        b.payAmount += a.cost / participantListIds.length;
      }
    }
  }

  //
  // Step 3 -- build the positive and negative list for the matrix
  for (let b of personBalanceList) {
    b.balance = b.receiveAmount - b.payAmount;
    let personDifference: IPersonDifference = {
      id: b.id,
      name: b.name,
      balance: b.balance,
    };
    if (b.balance >= 0) positiveList.push(personDifference);
    else negativeList.push(personDifference);
  }

  //
  // Step 4 -- From the positive & negative lists,
  //                  keep equating till balance = 0
  for (let p of positiveList) {
    for (let n of negativeList) {
      if (
        Math.abs(p.balance) > Math.abs(n.balance) &&
        p.balance !== 0 &&
        n.balance !== 0
      ) {
        // case 1 ::: positive > negative
        p.balance = Math.abs(p.balance - Math.abs(n.balance));
        let oweAmount: number = n.balance;
        n.balance = 0;
        // cycle through splits list to add
        for (let s of splitsList) {
          if (s.personId === n.id) {
            // paying someone
            s.transactions.push({
              transactionType: "PAY",
              transactionPersonId: p.id,
              transactionPersonName: p.name,
              transactionAmount: Math.abs(oweAmount),
            });
          }
          if (s.personId === p.id) {
            // receiving from someone
            s.transactions.push({
              transactionType: "RECEIVE",
              transactionPersonId: n.id,
              transactionPersonName: n.name,
              transactionAmount: Math.abs(oweAmount),
            });
          }
        }
      } else if (
        Math.abs(p.balance) < Math.abs(n.balance) &&
        p.balance !== 0 &&
        n.balance !== 0
      ) {
        // case 2 ::: positive < negative
        n.balance = -1 * Math.abs(p.balance - Math.abs(n.balance));
        let oweAmount: number = p.balance;
        p.balance = 0;
        //   cycle through splits to add
        for (let s of splitsList) {
          if (s.personId === n.id) {
            // paying someone
            s.transactions.push({
              transactionType: "PAY",
              transactionPersonId: p.id,
              transactionPersonName: p.name,
              transactionAmount: Math.abs(oweAmount),
            });
          }
          if (s.personId === p.id) {
            // receiving from soneone
            s.transactions.push({
              transactionType: "RECEIVE",
              transactionPersonId: n.id,
              transactionPersonName: n.name,
              transactionAmount: Math.abs(oweAmount),
            });
          }
        }
      } else {
        // case 3 ::: positive === negative
        if (p.balance !== 0 && n.balance !== 0) {
          // cycle through splits to add
          for (let s of splitsList) {
            if (s.personId === n.id) {
              // paying someone
              s.transactions.push({
                transactionType: "PAY",
                transactionPersonId: p.id,
                transactionPersonName: p.name,
                transactionAmount: Math.abs(p.balance),
              });
            }
            if (s.personId === p.id) {
              // receiving from someone
              s.transactions.push({
                transactionType: "RECEIVE",
                transactionPersonId: n.id,
                transactionPersonName: n.name,
                transactionAmount: Math.abs(n.balance),
              });
            }
          }

          // equate balances when reached
          p.balance = 0;
          n.balance = 0;
        }
      }
    }
  }

  //
  // Step 4 -- calculate ending balances for everyone
  for (let s of splitsList) {
    for (let t of s.transactions) {
      if (t.transactionType === "PAY") {
        s.endingBalace -= t.transactionAmount;
      } else if (t.transactionType == "RECEIVE") {
        s.endingBalace += t.transactionAmount;
      }
    }
  }

  //
  //
  return splitsList;
}

/**
 *
 * @param trip
 * @returns
 */
function calculateTotalTripCost(trip: ITripData): number {
  let finalCost = 0;

  if (!trip || !trip.activityList) {
    return finalCost;
  }

  for (let a of trip.activityList) {
    finalCost += a.cost;
  }

  return finalCost;
}

function roundAmount(amount: number): number {
  let final = 0;
  final = Math.floor(amount * 100) / 100;
  return final;
}

/**
 *
 */
export const SplitsCalculationLib = {
  buildSplitsList,
  calculateTotalTripCost,
  roundAmount,
};
