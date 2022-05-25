import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Input, message, Modal, Popconfirm, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { formatDistanceToNow } from 'date-fns';
import { deleteStudentById, getStudents, searchStudentsByName } from '../../../../lib/api/students.api';
import AddStudent from '../../../../components/studentList/AddStudent';
import UpdateStudent from '../../../../components/studentList/UpdateStudent';
import { Course, Student, Type } from '../../../../lib/types/students.type';

export default function StudentListPage() {
   const [data, setData] = useState<Student[]>([]);
   const [student, setStudent] = useState();
   const [modal1Visible, setModal1Visible] = useState(false);
   const [modal2Visible, setModal2Visible] = useState(false);

   const handleStudent = (record: any) => {
      setStudent(record);
   };

   const handleCancel = () => {
      setModal1Visible(false);
      setModal2Visible(false);
   };

   useEffect(() => {
      getStudents().then((response) => {
         setData(response.data.data.students);
      });
   }, []);

   const deleteStudent = (record: Student) => {
      const id = record.id;
      deleteStudentById(id)
         .then(() => {
            message.info('delete success');
         })
         .catch(() => {
            message.info('delete fail');
         });
   };

   const { Search } = Input;
   const onSearch = (value: string) => {
      searchStudentsByName(value)
         .then((response) => {
            setData(response.data.data.students);
         })
         .catch(() => {
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
         render(_1: any, record: Student, _3: number) {
            return (
               <Link href={`/dashboard/manager/students/${record.id}`}>
                  <a>{record.name}</a>
               </Link>
            );
         },
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
                  type="link"
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
