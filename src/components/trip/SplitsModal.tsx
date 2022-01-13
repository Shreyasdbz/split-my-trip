/** @format */

import { useContext } from "react";

import { SplitType } from "../../interfaces/splitObjects";
import { SplitModalTypes } from "../../interfaces/tripView";
import { ThemeContext } from "../../context/ThemeContext";
import { getTripColorById } from "../../helpers/colors";

type SplitsModalProps = {
  tripColorId: number;
  splitsList: SplitType[];
  totalCost: number;
  handler: (payload: SplitModalTypes) => void;
};

const SplitsModal = ({
  tripColorId,
  splitsList,
  totalCost,
  handler,
}: SplitsModalProps) => {
  const theme = useContext(ThemeContext).theme;

  return (
    <div
      className="splits-modal"
      style={{
        backgroundColor: `${theme.background}`,
        boxShadow: `0px 2px 15px 5px ${theme.text}15`,
      }}
    >
      <div className="title">
        <span>Splits Roundup</span>
      </div>
      <div className="total-cost">
        <span
          className="label"
          style={{
            color: `${theme.greyText}`,
          }}
        >
          Total trip cost:
        </span>
        <span
          className="amount"
          style={{
            color: `${theme.text}`,
          }}
        >
          ${totalCost}
        </span>
      </div>
      <div className="splits-list">
        {splitsList.map((split) => {
          return (
            <div
              key={split.personId}
              className="split"
              style={{
                boxShadow: `0px 2px 15px 5px ${theme.text}15`,
              }}
            >
              <div
                className="top-section"
                style={{
                  backgroundColor: `${
                    getTripColorById(tripColorId).backgroundColor
                  }`,
                  backgroundImage: `${
                    getTripColorById(tripColorId).backgroundImage
                  }`,
                }}
              >
                <span className="name">{split.name}</span>
                {split.endingBalance >= 0 ? (
                  <span
                    className="balance balance-positive"
                    style={{
                      color: `${theme.success}`,
                    }}
                  >
                    ${split.endingBalance}
                  </span>
                ) : (
                  <span
                    className="balance balance-negative"
                    style={{
                      color: `${theme.danger}`,
                    }}
                  >
                    -${Math.abs(split.endingBalance)}
                  </span>
                )}
              </div>
              <div className="bottom-section">
                {split.transactions.length > 0 ? (
                  split.transactions.map((transaction) => {
                    if (transaction.type === "PAY") {
                      return (
                        <div key={transaction.personId} className="transaction">
                          <span className="label">Pay</span>
                          <span
                            className="name"
                            style={{
                              color: `${
                                getTripColorById(tripColorId).backgroundColor
                              }`,
                            }}
                          >
                            {transaction.name}
                          </span>
                          <span className="amount">${transaction.amount}</span>
                        </div>
                      );
                    } else {
                      return (
                        <div key={transaction.personId} className="transaction">
                          <span className="label">Receive</span>
                          <span className="amount">${transaction.amount}</span>
                          <span className="label">from</span>
                          <span
                            className="name"
                            style={{
                              color: `${
                                getTripColorById(tripColorId).backgroundColor
                              }`,
                            }}
                          >
                            {transaction.name}
                          </span>
                        </div>
                      );
                    }
                  })
                ) : (
                  <div
                    className="no-trasnactions"
                    style={{
                      color: `${theme.greyText}`,
                    }}
                  >
                    Nothing to do here :)
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="actions">
        <button
          onClick={() => {
            handler({ action: "CLOSE" });
          }}
          className="btn-cancel"
          style={{
            backgroundColor: `${theme.background}`,
            border: `2px solid ${theme.text}`,
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SplitsModal;
