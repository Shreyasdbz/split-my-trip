/** @format */

import { useContext } from "react";
import { TripDataContext } from "../../context/TripDataContext";
import { getColorById } from "../../lib/util/theme";
import { SplitsCalculationLib } from "../../lib/util/split";

interface ISplitTile {
  splitPerson: ISplitPerson;
}
const SplitTile = ({ splitPerson }: ISplitTile) => {
  const currentTrip = useContext(TripDataContext).currentTrip;

  const TransactionRow = ({
    transactionAmount,
    transactionPersonName,
    transactionType,
  }: ISplitTransaction) => {
    if (!currentTrip) {
      return <></>;
    }
    return (
      <div>
        {transactionType === "PAY" ? (
          <span>
            Pay{" "}
            <span className="font-semibold">
              ${SplitsCalculationLib.roundAmount(transactionAmount)}
            </span>{" "}
            to{" "}
            <span
              style={{
                color: `${getColorById(currentTrip.themeId).bgColor}`,
              }}
              className="font-semibold"
            >
              {transactionPersonName}
            </span>
          </span>
        ) : (
          <span>
            Receive{" "}
            <span className="font-semibold">
              ${SplitsCalculationLib.roundAmount(transactionAmount)}
            </span>{" "}
            from{" "}
            <span
              style={{
                color: `${getColorById(currentTrip.themeId).bgColor}`,
              }}
              className="font-semibold"
            >
              {transactionPersonName}
            </span>
          </span>
        )}
      </div>
    );
  };

  if (currentTrip) {
    return (
      <div
        style={{
          boxShadow: `0px 2px 15px 5px ${
            getColorById(currentTrip.themeId).bgColor
          }15`,
        }}
        className="rounded-md w-full overflow-hidden"
      >
        {/* Top Row */}
        <div
          style={{
            backgroundColor: `${getColorById(currentTrip.themeId).bgColor}`,
            backgroundImage: `${getColorById(currentTrip.themeId).bgImage}`,
          }}
          className="flex flex-row items-center justify-between px-2 py-2"
        >
          <span className="text-white font-semibold">
            {splitPerson.personName}
          </span>
          <span className="bg-white px-2 py-1 rounded-xl">
            {splitPerson.endingBalace >= 0 ? (
              <span
                className={`${
                  splitPerson.endingBalace === 0
                    ? "text-black"
                    : "text-green-600"
                }`}
              >
                + ${SplitsCalculationLib.roundAmount(splitPerson.endingBalace)}
              </span>
            ) : (
              <span className="text-red-600">
                - $
                {Math.abs(
                  SplitsCalculationLib.roundAmount(splitPerson.endingBalace)
                )}
              </span>
            )}
          </span>
        </div>

        {/* Transaction list */}
        {splitPerson.transactions.length > 0 ? (
          <div className="flex flex-col bg-white w-full items-start justify-center px-2 py-2 gap-1">
            {splitPerson.transactions.map((t) => {
              return (
                <TransactionRow
                  key={t.transactionPersonId}
                  transactionType={t.transactionType}
                  transactionPersonId={t.transactionPersonId}
                  transactionPersonName={t.transactionPersonName}
                  transactionAmount={t.transactionAmount}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col bg-white w-full items-start justify-center px-2 py-4">
            <span>{"No transactions to make :)"}</span>
          </div>
        )}
      </div>
    );
  } else {
    return <></>;
  }
};

export default SplitTile;
