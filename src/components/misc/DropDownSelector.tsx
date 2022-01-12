/** @format */

import { useContext, useState } from "react";
import { IoChevronForward } from "react-icons/io5";

import { PersonType } from "../../interfaces/tripObjects";
import { ThemeContext } from "../../context/ThemeContext";

type DropDownSelectorProps = {
  selectedValue: string;
  onSelect: (personId: string) => void;
  selectionList: PersonType[];
};

const DropDownSelector = ({
  selectedValue,
  onSelect,
  selectionList,
}: DropDownSelectorProps) => {
  const theme = useContext(ThemeContext).theme;
  const [selectionMenuOpen, setSelectionMenuOpen] = useState(false);

  function showNameFromId(id: string) {
    for (let p of selectionList) {
      if (p.id === id) {
        return p.name;
      }
    }
    return "";
  }

  return (
    <div
      className="drop-down-selector"
      style={{
        backgroundColor: `${theme.background}`,
        border: `2px solid ${theme.greyBackground}`,
      }}
    >
      <button
        className="selection-btn"
        style={{
          backgroundColor: `${theme.background}`,
        }}
        onClick={() => {
          setSelectionMenuOpen(!selectionMenuOpen);
        }}
      >
        <span>{showNameFromId(selectedValue)}</span>
        <IoChevronForward className="icon" />
      </button>
      {selectionMenuOpen && (
        <div className="selection-list">
          {selectionList.map((person) => {
            return (
              <button
                key={person.id}
                className="selection-option"
                style={{
                  backgroundColor: `${theme.background}`,
                  color: `${theme.greyText}`,
                }}
                onClick={() => {
                  onSelect(person.id);
                  setSelectionMenuOpen(!selectionMenuOpen);
                }}
              >
                {person.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default DropDownSelector;
