const inputShuffleStyles: any = {
  listBox: {
    border: "5px solid white",
    width: "100%",
    borderRadius: "10px",

    height: "100%",
    boxShadow: "0 0 10px lightblue",
    backgroundColor: "white",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
  },
  outerContainer: {
    height: "500px",
    width: "500px",
    minWidth: "500px",
    border: "5px solid white",
    borderRadius: "20px",
    boxShadow: "0 0 10px lightblue",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
  },
  headerStyle: {
    margin: "0px 0px 20px 0px",
  },
  inputRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "20px",
    height: "25px",
    paddingTop: "5px",
  },
  nameInput: {
    height: "100%",
    width: "60%",
    border: "5px solid white",
    borderRadius: "5px",
    boxShadow: "0 0 10px lightblue",
  },
  addButton: {
    color: "grey",
    border: "1px solid lightgrey",
    height: "30px",
    width: "30px",
    marginLeft: "15px",
    marginRight: "5px",
    borderRadius: "5px",
    boxShadow: "0 0 2px lightblue",
  },
  listRow: {
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "5px",
    fontSize: "20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "space-between",
    justifyContent: "space-between",
  },
  nameText: {
    maxWidth: "250px",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  genderBubble: ({ selectedElement, small }: any = {}) => {
    let result = {};
    if (selectedElement === "?") {
      result = { backgroundColor: "lightgreen" };
    } else if (selectedElement === "male") {
      result = { backgroundColor: "lightblue" };
    } else if (selectedElement === "female") {
      result = { backgroundColor: "lightpink" };
    }
    return {
      color: "grey",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "35px",
      height: "30px",
      marginLeft: "5px",
      borderRadius: "25px",
      border: "1px solid lightgrey",
      padding: "5px",
      paddingBottom: "10px",
      fontSize: "30px",
      cursor: "pointer",
      ...result,
      ...(small
        ? {
            width: "25px",
            height: "20px",
          }
        : {}),
    };
  },
};

const infoTextStyle: any = {
  container: {
    border: "5px solid white",
    width: "275px",
    height: "250px",
    borderRadius: "20px",
    boxShadow: "0 0 10px lightblue",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  infoRow: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  startButton: {
    color: "white",
    backgroundColor: "rgb(251 195 21)",
    borderRadius: "5px",
    border: "0",
    height: "35px",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  littleInput: {
    width: "50px",
    borderRadius: "5px",
    border: "1px solid lightgrey",
  },
  genderCheck: {},
};

const resultStyles: any = {
  nameText: {
    marginLeft: "10px",
    marginRight: "10px",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  team: {
    width: "205px",
    height: "200px",
    border: "2px solid grey",
    borderTop: "0px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: '15px',
  },
  teamBorder: (teamNumber: number) => {
    return {
      backgroundColor: teamNumber % 2 === 0 ? "rgb(251 195 21)" : "darkgreen",
      borderTop: "2px solid grey",
      borderBottom: "2px solid grey",
      borderLeft: "2px solid grey",
      borderRight: "2px solid grey",
      width: "100%",
      paddingBottom: "5px",
      fontWeight: "bold",
      color: "white",
      borderRadius: "10px 10px 0 0",
    };
  },
  teamText: {
    paddingLeft: "10px",
    paddingBottom: "3px",
    paddingTop: "5px",
  },
  peopleList: {
    width: "100%",
    paddingTop: "5px",
    overflowX: "hidden",
    overflowY: "auto",
  },
  teamContainer: {
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    overflow: "auto",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  textContainer: {
    width: "100%",
    marginBottom: "20px",
  },
};

export { inputShuffleStyles, infoTextStyle, resultStyles };
