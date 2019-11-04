import React from "react";
import ReactDOM from "react-dom";

const url = `https://images.unsplash.com/photo-1562051036-e0eea191d42f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80` 

const useToggle = initialValue => {
  const [value, setValue] = React.useState(initialValue);

  const toggle = () => setValue(prevValue => !prevValue);

  return { value, toggle };
};

const Base = props => {
  const { value, toggle } = useToggle(props.initialValue);

  return (
    <>
      <div>
        {value && (
          <img style={{ width: 200 }} src={props.src} alt={props.alt} />
        )}
      </div>

      <button onClick={toggle}>toggle</button>
    </>
  );
};

ReactDOM.render(<Base src={url}  />, document.getElementById('root'));