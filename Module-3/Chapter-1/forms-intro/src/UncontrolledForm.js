import React from 'react';

class UncontrolledForm extends React.Component {
  constructor(props) {
    super(props);

    this.name = React.createRef();
    this.password = React.createRef();
  }

  handleSubmit(e) {
    e.preventDefault();
    console.info('A name was submitted: ' + this.name.current.value);
    console.info('A password was submitted: ' + this.password.current.value);
  }

  render() {
    const handleSubmit = (e) => this.handleSubmit(e);
    return (
      <form onSubmit={handleSubmit} noValidate={true}>
        <label>
          Email:
          <input type="text" ref={this.name}/>
        </label>
        <label>
          Password:
          <input type="password" ref={this.password}/>
        </label>
        <input type="submit" value="Login"/>
      </form>
    );
  }
}

export { UncontrolledForm }
