import { Component } from "react";
import { getStudents } from './client';
import { Table } from 'antd'

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
          this.setState({
            students
          });
        })
      );
  }

  render() {

    const { students } = this.state;

    if (students && students.length) {

      const columns = [
        {
          title: 'id',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: 'firstName',
          dataIndex: 'firstName',
          key: 'firstName'
        },
        {
          title: 'age',
          dataIndex: 'age',
          key: 'age'
        }
      ];

      return (

        <Table
          dataSource={students}
          columns={columns}
          rowKey='id'
        />
        
      );
    }

    return <h1>No students</h1>
  }
}

export default App;
