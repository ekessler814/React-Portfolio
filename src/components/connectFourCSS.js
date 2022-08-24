const styles = {
  // cells & turn/win text
  board: {
    display: "flex",
    flexDirection: "column",
    width: "800px",
    height: "800px",
  },
  // square that houses circle
  padInner: {
    alignSelf: "stretch",
    flex: "1 1 auto",
    flexBasis: "auto",
    padding: "8px",
    alignItems: "stretch",
    border: "2px solid grey",
  },
  // row of cells
  row: {
    alignSelf: "stretch",
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "row",
  },
  // outer container for app
  outer: {
    paddingLeft: "10px",
    display: "flex",
    flexDirection: "column",
    padding: 20,
    fontFamily: "Arial, Helvetica, sans-serif",
    border: "5px solid white",
    borderRadius: "20px",
    boxShadow: "0 0 2px lightblue",
  },
  // circle that represents slot for player tokens
  dot: {
    height: "100%",
    width: "100%",
    border: "1px solid grey",
    borderRadius: "50%",
    display: "inline-block",
    cursor: "pointer",
  },
  // reset button
  reset: {
    width: "120px",
    height: "40px",
    marginBottom: "10px",
    borderRadius: '5px',
    backgroundColor: 'rgb(251, 195, 21)',
    fontWeight: 'bold',
    color: 'white',
    border: '0',
    fontSize: '24px',
    cursor: 'pointer',
  },
  // font for our turn/win text
  shadowFont: {
//    textShadow: "#000 0px 0px 3px",
backgroundColor: 'grey',
    fontSize: "30px",
    width: 'fit-content',
    padding: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
    borderRadius: '10px'
  },
  cellsContainer: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    border: "10px solid grey",
    borderRadius: "10px",
  },
};
export default styles;
