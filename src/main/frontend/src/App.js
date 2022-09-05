import { Component } from "react";
import { getStudents } from './client'

class App extends Component {
  render() {
    getStudents()
      .then(res => res.json()
        .then(students => { console.log(students); })
      );
    return <h1>hello</h1>
  }
}

export default App;
