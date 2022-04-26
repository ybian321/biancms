import { Button, Input, message, Modal, Popconfirm, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';
import AddStudent from './studentList/AddStudent';
import UpdateStudent from './studentList/UpdateStudent';

export interface Student {
  data: Data;
  code: number;
  msg: string;
}

export interface Data {
  total: number;
  students: Student[];
  paginator: Paginator;
}

export interface Student {
  createdAt: string;
  updatedAt: string;
  id: number;
  email: string;
  name: string;
  country: string;
  profileId: number;
  type: Type;
  courses: Course[];
}

export interface Type {
  id: number;
  name: string;
}

export interface Course {
  id: number;
  courseId: number;
  name: string;
}

export interface Paginator {
  page: number;
  limit: number;
}

const url = 'http://cms.chtoma.com/api/students?page=1&limit=100';

export default function StudentsTable() {
  const [data, setData] = useState<Student[]>([]);

  const [student, setStudent] = useState();
  const handleStudent = (record: any) => {
    setStudent(record);
    console.log(record.id);
  };

  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);

  const handleCancel = () => {
    setModal1Visible(false);
    setModal2Visible(false);
  };

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then((response) => {
        console.log(response);
        setData(response.data.data.students);
      })
      .catch((error) => {
        console.log(error);
        message.error('Unknown Error');
      });
  }, []);

  const deleteStudent = (record: any) => {
    const id = record.id;
    console.log(id);
    const token = localStorage.getItem('token');
    const urlDelete = 'http://cms.chtoma.com/api/students/' + id;
    axios
      .delete(urlDelete, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then((response) => {
        console.log(response);
        message.success('This is a success message.');
      })
      .catch((error) => {
        console.log(error);
        message.error('Unknown Error');
      });
  };

  const { Search } = Input;
  const onSearch = (value: any) => {
    const token = window.localStorage.getItem('token');
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*'
        },
        params: {
          query: value
        }
      })
      .then((response) => {
        console.log(response);
        setData(response.data.data.students);
        message.success('This is a success message.');
      })
      .catch((error) => {
        console.log(error);
        message.error('Unknown Error');
      });
  };

  const columns: ColumnType<Student>[] = [
    {
      title: 'No.',
      dataIndex: 'key',
      width: '5%',
      render: (_1: any, _2: any, index: number) => index + 1
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a: { name: string }, b: { name: string }) => a.name.length - b.name.length,
      width: '15%'
    },
    {
      title: 'Area',
      dataIndex: 'country',
      filters: [
        { text: 'China', value: 'China' },
        { text: 'New Zealand', value: 'New Zealand' },
        { text: 'Canada', value: 'Canada' },
        { text: 'Australia', value: 'Australia' }
      ],
      onFilter: (value, record) => record.country === value,
      width: '10%'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '20%'
    },
    {
      title: 'Selected Curriculum',
      dataIndex: 'courses',
      width: '20%',
      render(value: Course[]) {
        return value.map((item) => item.name).join(',');
      }
    },
    {
      title: 'Student Type',
      dataIndex: 'type',
      filters: [
        { text: 'developer', value: 'developer' },
        { text: 'tester', value: 'tester' }
      ],
      onFilter: (value, record) => record.type.name === value,
      width: '10%',
      render(value: Type) {
        return value?.name;
      }
    },
    {
      title: 'Join Time',
      dataIndex: 'createdAt',
      width: '10%',
      render(value: string) {
        return formatDistanceToNow(new Date(value));
      }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '10%',
      render: (_value: any, record: Student) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setModal1Visible(true);
              handleStudent(record);
            }}
          >
            Edit
          </Button>

          <Popconfirm
            title="Are you sure to delete this record?"
            okText="Confirm"
            onConfirm={() => {
              deleteStudent(record);
            }}
            cancelText="Cancel"
          >
            <a href="#">Delete</a>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const pagination = { defaultCurrent: 1, pageSize: 20 };

  return (
    <>
      <Modal
        title="Edit Student"
        style={{ top: 20 }}
        visible={modal1Visible}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>
        ]}
      >
        <UpdateStudent record={student} />
      </Modal>

      <Modal
        title="Add Student"
        style={{ top: 20 }}
        visible={modal2Visible}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>
        ]}
      >
        <AddStudent />
      </Modal>

      <div className="flex-container">
        <Button type="primary" onClick={() => setModal2Visible(true)}>
          + Add
        </Button>

        <Search placeholder="Search by name" onSearch={onSearch} style={{ width: 200, marginBottom: 20 }} />
      </div>

      <Table columns={columns} dataSource={data} pagination={pagination} />
    </>
  );
}
