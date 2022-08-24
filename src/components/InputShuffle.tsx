import { inputShuffleStyles as styles } from "./teamShuffleCSS.js";
import { TeamShuffleContext } from "./TeamShuffle";
import { useContext } from "react";
import _ from "lodash";

const GenderBubbles = ({ row, small }: any) => {
  const { state, setState } = useContext(TeamShuffleContext);

  const renderX = () => {
    return (
      <div
        onClick={() => {
          setState({
            ...state,
            names: state.names.filter((iter: any) => iter.name !== row.name),
          });
        }}
        style={{
          ...styles.genderBubble(),
          color: "red",
          fontSize: "40px",
          backgroundColor: "lightgrey",
        }}
      >
        X
      </div>
    );
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <GenderBubble
        small={small}
        name={row.name}
        gender={"?"}
        selected={row.selection === "?"}
      />
      <GenderBubble
        small={small}
        name={row.name}
        gender={"male"}
        selected={row.selection === "male"}
      />
      <GenderBubble
        small={small}
        name={row.name}
        gender={"female"}
        selected={row.selection === "female"}
      />
      {row.name ? renderX() : ""}
    </div>
  );
};

const GenderBubble = ({ name, selected, gender, small }: any) => {
  const { state, setState } = useContext(TeamShuffleContext);

  const updateGenderSelection = (name: string) => {
    const nameEntry = state.names.find((iter: any) => iter.name === name);
    const withoutName = state.names.filter((iter: any) => iter.name !== name);
    setState({
      ...state,
      names: [...withoutName, { ...nameEntry, selection: gender }],
    });
  };

  let showChar = undefined;
  if (gender === "?") {
    showChar = <div>?</div>;
  } else if (gender === "male") {
    showChar = <div>&#9794;</div>;
  } else if (gender === "female") {
    showChar = <div>&#9792;</div>;
  }
  const selectedElement = selected ? gender : undefined;
  return (
    <div
      onClick={() => {
        if (!name) {
          setState({
            ...state,
            defaultGender: gender,
          });
          return;
        }
        updateGenderSelection(name);
      }}
      style={styles.genderBubble({ selectedElement, small })}
    >
      {showChar}
    </div>
  );
};

const ListBox = () => {
  const { state } = useContext(TeamShuffleContext);

  const nameRows = _.sortBy(state.names, ["order"]).map((iter: any) => {
    return (
      <div style={styles.listRow}>
        <div style={styles.nameText}>{iter.name}</div>
        <GenderBubbles row={iter} />
      </div>
    );
  });
  return <div style={styles.listBox}>{nameRows}</div>;
};

const InputRow = () => {
  const { state, setState } = useContext(TeamShuffleContext);

  return (
    <div style={styles.inputContainer}>
      <h1 style={styles.headerStyle}>1. Inputs</h1>
      <div style={styles.inputRow}>
        <input
          value={state.currentInput}
          onChange={({ target }: any) => {
            setState({
              ...state,
              currentInput: target.value,
            });
          }}
          style={styles.nameInput}
        />
        <button
          onClick={() => {
            const stopCond = [
              state.currentInput === "",
              state.names.find((iter: any) => iter.name === state.currentInput),
            ];
            if (stopCond.some((a) => a)) {
              return;
            }
            setState({
              ...state,
              names: [
                ...state.names,
                {
                  name: state.currentInput,
                  selection: state.defaultGender,
                  order: state.names.length,
                },
              ],
              currentInput: "",
            });
          }}
          style={styles.addButton}
        >
          +
        </button>
        <GenderBubbles small={true} row={{ selection: state.defaultGender }} />
      </div>
    </div>
  );
};
const InputContainer = () => {
  return (
    <div style={styles.outerContainer}>
      <InputRow />
      <ListBox />
    </div>
  );
};

export default InputContainer;
