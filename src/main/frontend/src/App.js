import { Component } from "react";
import { getStudents } from './client';
import { Table, Avatar, Spin, Modal, Empty } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Container from "./Container";
import Footer from "./Footer";
import AddStudentForm from './forms/AddStudentForm';
import { errorNotification } from "./Notification";

const getLoadingIndicator = () => <LoadingOutlined style={{ fontSize: 24 }} spin />;

class App extends Component {

  state = {
    students: [],
    isFetching: false,
    isAddStudentModalVisible: false
  }

  componentDidMount() {
    this.fetchStudents();
  }

  openAddStudentModal = () => this.setState({ isAddStudentModalVisible: true })

  closeAddStudentModal = () => this.setState({ isAddStudentModalVisible: false })

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
      ).catch(error => {
        errorNotification(error.message);
        this.setState({ isFetching: false });
      })
  }

  render() {

    const { students, isFetching, isAddStudentModalVisible } = this.state;

    const commonElements = () => (
      <div>
        <Modal
          title='Add new student'
          visible={isAddStudentModalVisible}
          onOk={this.closeAddStudentModal}
          onCancel={this.closeAddStudentModal}
          width={1000}>
          <AddStudentForm
            onSuccess={() => {
              this.closeAddStudentModal();
              this.fetchStudents();
            }}
          />
        </Modal>
        <Footer
          numberOfStudents={students.length}
          handleAddStudentClickEvent={this.openAddStudentModal} />
      </div>
    );

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
          {commonElements()}
        </Container>

      );
    }

    return <Container>
      <Empty description='No students' />
      {commonElements()}
    </Container>
  }
}

export default App;
