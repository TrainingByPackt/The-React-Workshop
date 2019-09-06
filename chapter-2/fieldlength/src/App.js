import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { field: "" };
  }
  renderFieldLength() {
    return <p>{`${this.state.field.length} character(s)!`}</p>
  }
  updateFieldLength(event) {
    const field = event.target.value;
    this.setState({ field });
  }
  render() {
    return (
      <div className="App">
        <textarea cols="80" rows="25" onChange={this.updateFieldLength.bind(this)}></textarea>
        <br />
        {this.renderFieldLength()}
      </div>
    );
  }
}

export default App;
