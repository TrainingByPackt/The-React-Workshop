import React from "react";

const Component = props => {
  const fn = () => console.log(props.age);

  React.useEffect(() => {
    document.addEventListener("keydown", fn);

    return () => {
      document.removeEventListener("keydown", fn);
    };
  }, [props.age]);

  return (
    <div style={{ textAlign: "center" }}>
      press any button and check the console
    </div>
  );
};

const App = () => {
  const [age, setAge] = React.useState(20);

  React.useEffect(() => {
    const id = setInterval(() => {
      setAge(age => age + 1);
    }, 2500);

    return () => {
      clearInterval(id);
    };
  }, []);

  return <Component age={age} />;
};

export default App;
