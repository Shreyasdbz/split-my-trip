/** @format */

import PillButton from "../core/PillButton";
import { XIcon, TrashIcon, SaveIcon } from "@heroicons/react/solid";

interface IPilButtonsRow {
  useIcons: boolean;
  iconsSize: "MINI" | "SMALL" | "MEDIUM" | "LARGE";
  arrangement: "ROW" | "COL";
  outlineButtonText?: string;
  dangerButtonText?: string;
  fillButtonText?: string;
  outlineButtonAction?: () => void;
  dangerButtonAction?: () => void;
  fillButtonAction?: () => void;
}
const PillButtonsRow = ({
  useIcons,
  iconsSize,
  arrangement,
  outlineButtonText,
  dangerButtonText,
  fillButtonText,
  outlineButtonAction,
  dangerButtonAction,
  fillButtonAction,
}: IPilButtonsRow) => {
  return (
    <div
      className={`w-full flex ${
        arrangement === "ROW"
          ? "flex-row items-center justify-evenly gap-2 mt-8"
          : "flex-col items-center justify-evenly gap-3 mt-4"
      }`}
    >
      {outlineButtonText &&
        outlineButtonAction &&
        (useIcons ? (
          <PillButton
            label={`${outlineButtonText} button`}
            text={outlineButtonText}
            type={"OUTLINE"}
            size={iconsSize}
            onClickAction={outlineButtonAction}
          >
            <XIcon className="w-5 h-5" />
          </PillButton>
        ) : (
          <PillButton
            label={`${outlineButtonText} button`}
            text={outlineButtonText}
            type={"OUTLINE"}
            size={iconsSize}
            onClickAction={outlineButtonAction}
          />
        ))}
      {dangerButtonText &&
        dangerButtonAction &&
        (useIcons ? (
          <PillButton
            label={`${dangerButtonText} button`}
            text={dangerButtonText}
            type={"DANGER"}
            size={iconsSize}
            onClickAction={dangerButtonAction}
          >
            <TrashIcon className="w-5 h-5" />
          </PillButton>
        ) : (
          <PillButton
            label={`${dangerButtonText} button`}
            text={dangerButtonText}
            type={"DANGER"}
            size={iconsSize}
            onClickAction={dangerButtonAction}
          />
        ))}
      {fillButtonText &&
        fillButtonAction &&
        (useIcons ? (
          <PillButton
            label={`${fillButtonText} button`}
            text={fillButtonText}
            type={"FILL"}
            size={iconsSize}
            onClickAction={fillButtonAction}
          >
            <SaveIcon className="w-5 h-5" />
          </PillButton>
        ) : (
          <PillButton
            label={`${fillButtonText} button`}
            text={fillButtonText}
            type={"FILL"}
            size={iconsSize}
            onClickAction={fillButtonAction}
          />
        ))}
    </div>
  );
};
export default PillButtonsRow;
