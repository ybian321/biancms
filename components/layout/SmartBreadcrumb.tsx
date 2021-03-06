import Link from 'next/link';
import { useRouter } from 'next/router';
import { Breadcrumb } from 'antd';

interface Route {
   path: string;
   breadcrumbName: string;
   parentBreadcrumb?: string;
   grandparent?: string;
}

export default function SmartBreadcrumb() {
   const path = useRouter().pathname;
   const paths = path.split('/').slice(1);

   const role = path.split('/').slice(2, 3).toString();
   const root = `/dashboard/` + role;
   const thirdLayer = path.split('/').slice(3, 4).toString();
   const forthLayer = path.split('/').slice(4, 5).toString();

   const routes: Route[] = [
      {
         path: root,
         breadcrumbName: 'Overview'
      },
      {
         path: root + '/students',
         breadcrumbName: 'Student List',
         parentBreadcrumb: 'Student'
      },
      {
         path: root + '/students/' + forthLayer,
         grandparent: 'Student',
         parentBreadcrumb: 'Student List',
         breadcrumbName: 'Detail'
      },
      {
         path: root + '/teachers',
         parentBreadcrumb: 'Teacher',
         breadcrumbName: 'Teacher List'
      },
      {
         path: root + '/courses',
         parentBreadcrumb: 'Course',
         breadcrumbName: 'All Courses'
      },
      {
         path: root + '/courses/' + 2,
         grandparent: 'Course',
         parentBreadcrumb: 'All Courses',
         breadcrumbName: 'Detail'
      },
      {
         path: root + '/courses/add-course',
         parentBreadcrumb: 'Course',
         breadcrumbName: 'Add Course'
      },
      {
         path: root + '/courses/edit-course',
         parentBreadcrumb: 'Course',
         breadcrumbName: 'Edit Course'
      },
      {
         path: root + '/message',
         breadcrumbName: 'Message'
      }
   ];

   function deepSearch(path: string, data: Route[]) {
      return data.map((item: any) => {
         if (item.path === path && !forthLayer) {
            return (
               <>
                  <Breadcrumb.Item>{item.parentBreadcrumb}</Breadcrumb.Item>
                  <Breadcrumb.Item>
                     <Link href={root + '/' + thirdLayer}>
                        <a>{item.breadcrumbName}</a>
                     </Link>
                  </Breadcrumb.Item>
               </>
            );
         }
         if (item.path === path && forthLayer) {
            return (
               <>
                  <Breadcrumb.Item>{item.grandparent}</Breadcrumb.Item>
                  <Breadcrumb.Item>
                     <Link href={root + '/' + thirdLayer}>
                        <a>{item.parentBreadcrumb}</a>
                     </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>{item.breadcrumbName}</Breadcrumb.Item>
               </>
            );
         }
      });
   }

   function setBreadcrumb() {
      const isOverviewPage = paths.length <= 2;

      if (isOverviewPage) {
         return <Breadcrumb.Item>Overview</Breadcrumb.Item>;
      } else {
         return <>{deepSearch(path, routes)}</>;
      }
   }

   return (
      <Breadcrumb style={{ margin: '16px 0' }}>
         <Breadcrumb.Item>
            <Link href={root}>
               <a>CMS MANAGER SYSTEM</a>
            </Link>
         </Breadcrumb.Item>
         {setBreadcrumb()}
      </Breadcrumb>
   );
}
