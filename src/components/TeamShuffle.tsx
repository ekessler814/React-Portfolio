import "./Weather.css";
import { useState, createContext, useEffect } from "react";
import InputContainer from "./InputShuffle";
import ControllerShuffle from "./ControllerShuffle";
import DisplayTeams from "./DisplayShuffle";
import { shuffleTeams } from "../logicShuffle";
const TeamShuffleContext: any = createContext({});

const useRun = (
  { running, names, numPeoplePer, numGroups, genderCheck }: any,
  stop: any
) => {
  const empty: any[] = [];
  const [innerState, setState] = useState({
    computedRun: empty,
    finished: false,
  });

  useEffect(() => {
    if (!running) {
      return;
    }

    const computedRun = shuffleTeams({
      names,
      numPeoplePer,
      genderCheck,
      numGroups,
    });

    setState({
      computedRun,
      finished: true,
    });

    stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  return innerState;
};

const TeamShuffle = () => {
  const emptyArr: any[] = [];
  const [state, setState] = useState({
    names: emptyArr,
    currentInput: "",
    defaultGender: "?",
    balanceGender: false,
    running: false,
    numGroups: 2,
    numPeoplePer: "",
  });

  const run = () => {
    setState({
      ...state,
      running: true,
    });
  };

  const stop = () => {
    setState({
      ...state,
      running: false,
    });
  };

  const { computedRun } = useRun(state, stop);

  return (
    <TeamShuffleContext.Provider value={{ state, setState, run }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            paddingBottom: "50px",
            paddingTop: "50px",
            width: "85%",
          }}
        >
          <InputContainer />
          <ControllerShuffle />
          <DisplayTeams run={computedRun} />
        </div>
      </div>
    </TeamShuffleContext.Provider>
  );
};

export { TeamShuffleContext, TeamShuffle };
