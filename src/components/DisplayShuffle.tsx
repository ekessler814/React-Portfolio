import { inputShuffleStyles, resultStyles as style } from "./teamShuffleCSS";

const TeamCell = ({ teamNumber, team }: any) => {
  const members = team.map((iter: any) => {
    return <div style={style.nameText}>{iter.name}</div>;
  });
  return (
    <div style={style.team}>
      <div style={style.teamBorder(teamNumber)}>
        <div style={style.teamText}>{"Team " + teamNumber}</div>
      </div>
      <div style={style.peopleList}>{members}</div>
    </div>
  );
};

const TeamTable = ({ run }: any) => {
  const cells = run.map((team: any, idx: any) => (
    <TeamCell teamNumber={idx + 1} team={team} />
  ));

  return <div style={style.teamContainer}>{cells}</div>;
};

const DisplayTeams = ({ run }: any) => {
  return (
    <div style={inputShuffleStyles.outerContainer}>
      <div style={style.textContainer}>
        <h1 style={{ margin: "0px" }}>3. Result</h1>
      </div>

      <TeamTable run={run} />
    </div>
  );
};

export default DisplayTeams;
