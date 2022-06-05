import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Input, message, Modal, Popconfirm, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { formatDistanceToNow } from 'date-fns';
import { deleteStudentById, getStudents, searchStudentsByName } from '../../../../lib/api/students.api';
import StudentDetailForm from '../../../../components/studentList/StudentDetailForm';
import { StudentCourse, Student, Type } from '../../../../lib/model/students.type';
import ModalForm from '../../../../components/common/ModalForm';

export default function StudentListPage() {
   const [data, setData] = useState<Student[]>([]);
   const [student, setStudent] = useState();
   const [isModalDisplay, setModalDisplay] = useState(false);

   const handleStudent = (record: any) => {
      setStudent(record);
   };

   const cancel = () => {
      setModalDisplay(false);
      setStudent(undefined);
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
         render(value: StudentCourse[]) {
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
                     setModalDisplay(true);
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
         <div className="flex-container">
            <Button
               type="primary"
               onClick={() => {
                  setModalDisplay(true);
                  setStudent(undefined);
               }}
            >
               + Add
            </Button>

            <Search placeholder="Search by name" onSearch={onSearch} style={{ width: 200, marginBottom: 20 }} />
         </div>

         <Table columns={columns} dataSource={data} pagination={pagination} />

         <ModalForm title={!!student ? 'Edit Student' : 'Add Student'} centered visible={isModalDisplay} cancel={cancel}>
            <StudentDetailForm
               onFinish={(student: Student) => {
                  /**
                   * update local data if editing success
                   */
                  if (!!data) {
                     const index = data.findIndex((item) => item.id === student.id);

                     data[index] = student;
                     setData([...data]);
                  }

                  setModalDisplay(false);
               }}
               student={student}
            />
         </ModalForm>
      </>
   );
}
