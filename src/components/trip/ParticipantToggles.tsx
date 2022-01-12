/** @format */

import {
  ActivityParticipantType,
  PersonType,
} from "../../interfaces/tripObjects";
import { getPersonNameById } from "../../helpers/trips";
import ParticipantToggleBox from "./ParticipantToggleBox";

type ParticipantTogglesProps = {
  participantList: ActivityParticipantType[];
  peopleList: PersonType[];
  tripColorId: number;
  handleToggle: (personId: string) => void;
};

const ParticipantToggles = ({
  participantList,
  peopleList,
  tripColorId,
  handleToggle,
}: ParticipantTogglesProps) => {
  return (
    <div className="participant-toggles">
      {participantList.map((p) => {
        return (
          <ParticipantToggleBox
            key={p.participantId}
            participantId={p.participantId}
            participantName={getPersonNameById(p.participantId, peopleList)}
            participating={p.participating}
            tripColorId={tripColorId}
            handleToggle={handleToggle}
          />
        );
      })}
    </div>
  );
};

export default ParticipantToggles;
