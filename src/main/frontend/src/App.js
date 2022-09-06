import { Component } from "react";
import { getStudents } from './client';
import { Table, Avatar, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Container from "./Container";

const getLoadingIndicator = () => <LoadingOutlined style={{ fontSize: 24 }} spin />;

class App extends Component {

  state = {
    students: [],
    isFetching: false
  }

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents = () => {
    this.setState({
      isFetching: true
    });

    getStudents()
      .then(res => res.json()
        .then(students => {
          this.setState({
            students,
            isFetching: false
          });
        })
      );
  }

  render() {

    const { students, isFetching } = this.state;

    if (isFetching) {
      return (
        <Container>
          <Spin indicator={getLoadingIndicator()} />
        </Container>
      );
    }

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
