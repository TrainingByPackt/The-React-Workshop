import React from "react";
import ReactDOM from "react-dom";

class Example extends React.Component {
  message = "message using this";

  componentDidMount() {
    console.log(this.message);
  }

  handleClick = () => {
    console.log(this.message);
  };

  render() {
    return <button onClick={this.handleClick}>hey</button>;
  }
}

class IsMounted extends React.Component {
  mounted = false;

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = true;
  }

  handleClick = () => {
    if (this.mounted) console.log("<Component /> is alive and well.");
  };

  render() {
    return <button onClick={this.handleClick}>hey</button>;
  }
}

const SafeChild = () => {
  const [counter, setCounter] = React.useState(0);
  const mounted = React.useRef(false);

  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <div>
      Child: {counter}
      <button
        onClick={() => {
          setTimeout(() => {
            if (mounted.current) {
              setCounter(x => x + 1);
            }
          }, 3000);
        }}
      >
        increment after 3 seconds
      </button>
    </div>
  );
};

const Child = () => {
  const [counter, setCounter] = React.useState(0);

  return (
    <div>
      Child: {counter}
      <button
        onClick={() => {
          setTimeout(() => {
            setCounter(x => x + 1);
          }, 3000);
        }}
      >
        increment after 3 seconds
      </button>
    </div>
  );
};

const App = () => {
  const [visible, setVisible] = React.useState(true);

  return (
    <>
      <button onClick={() => setVisible(false)}>
        {`Unmount <Child /> component`}
      </button>
      {visible && <Child />}
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
