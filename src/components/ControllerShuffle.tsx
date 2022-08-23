import { useContext } from "react";
import { TeamShuffleContext } from "./TeamShuffle";
import { infoTextStyle } from "./TeamShuffleCSS";

const {
  container,
  infoRow,
  startButton,
  littleInput,
  genderCheck,
} = infoTextStyle;
const InfoRow = ({ elementFunc = () => {}, text }: any) => {
  return (
    <div style={{ ...infoRow, whiteSpace: "nowrap" }}>
      <div style={infoTextStyle}>{text}</div>
      {elementFunc()}
    </div>
  );
};

const ControllerShuffle = () => {
  const { state, setState, run } = useContext(TeamShuffleContext);
  return (
    <div style={{ ...container }}>
      <h1 style={{ fontSize: "24px", margin: "0px" }}>2. Controller</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <InfoRow
          elementFunc={() => (
            <input
              onChange={() => {
                setState({
                  ...state,
                  genderCheck: !state.genderCheck,
                });
              }}
              checked={state.genderCheck}
              style={genderCheck}
              type="checkbox"
            />
          )}
          text={"Balance gender distribution"}
        />
        <InfoRow
          elementFunc={() => (
            <input
              onChange={({ target }: any) => {
                if (!/^[0-9]*$/.test(target.value)) {
                  return;
                }

                setState({
                  ...state,
                  numPeoplePer: "",
                  numGroups: target.value,
                });
              }}
              value={state.numGroups}
              style={littleInput}
            />
          )}
          text={"Number of groups"}
        />
        <InfoRow text={"OR (set either one)"} />
        <InfoRow
          text={"Number of people/group"}
          elementFunc={() => (
            <input
              value={state.numPeoplePer}
              onChange={({ target }: any) => {
                if (!/^[0-9]*$/.test(target.value)) {
                  return;
                }
                setState({
                  ...state,
                  numGroups: "",
                  numPeoplePer: target.value,
                });
              }}
              style={littleInput}
            />
          )}
        />
      </div>
      <button
        onClick={() => {
          run();
        }}
        style={startButton}
      >
        START
      </button>
    </div>
  );
};

export default ControllerShuffle;
