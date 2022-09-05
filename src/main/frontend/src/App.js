import { Component } from "react";
import { getStudents } from './client'

class App extends Component {

  state = {
    students: []
  }

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents = () => {
    getStudents()
      .then(res => res.json()
        .then(students => {
          console.log(students);
          this.setState({
            students
          });
        })
      );
  }

  render() {

    const { students } = this.state;

    if (students && students.length) {
      return students.map((student, id) => {
        return (
          <div id={id}>
            <h1>{student.id}</h1>
            <p>{student.firstName}</p>
          </div>
        );
      })
    }
    return <h1>No students</h1>
  }
}

export default App;
