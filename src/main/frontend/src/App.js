import { Component } from "react";
import { getStudents } from './client';
import { Table, Avatar } from 'antd';
import Container from "./Container";

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
          title: '',
          key: 'avatar',
          render: (text, student) => (
            <Avatar size='large'>
              {`${student.firstName.charAt(0).toUpperCase()}`}
            </Avatar>
          )
        },
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

        <Container>
          <Table
            dataSource={students}
            columns={columns}
            rowKey='id'
            pagination={false}
          />
        </Container>

      );
    }

    return <h1>No students</h1>
  }
}

export default App;
