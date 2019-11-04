import React from "react";
import ReactDOM from "react-dom";

const App = props => {
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const loggedInFromLocalStorage = localStorage.getItem("loggedIn");

    if (JSON.parse(loggedInFromLocalStorage) === true) {
      setLoggedIn(true);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("loggedIn", loggedIn);
  }, [loggedIn]);

  if (loggedIn) {
    return (
      <>
        {`Welcome back, ${props.name} `}
        <button
          onClick={() => {
            setLoggedIn(false);
          }}
        >
          Log out
        </button>
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => {
          setLoggedIn(true);
        }}
      >
        Log in
      </button>
    </>
  );
};

ReactDOM.render(<App name="Endre" />, document.getElementById("root"));
