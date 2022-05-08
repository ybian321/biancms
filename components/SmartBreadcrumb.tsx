import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deepClone } from '../lib/util/deepClone';

function SmartBreadcrumb() {
  const path = useRouter().asPath;
  const paths = path.split('/').slice(1);
  const role = path.split('/').slice(2, 3);
  const root = `/dashboard/` + role;
  const route = deepClone(paths).map((element: any) => ({
    path: element,
    breadcrumbName: element
  }));
  const routes = route;

  function itemRender(route: any, params: any, routes: any, paths: any) {
    const isOverviewPage = paths.length <= 2;
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? <span>{route.breadcrumbName}</span> : <Link href={isOverviewPage ? root : '/' + paths.join('/')}>{route.breadcrumbName}</Link>;
  }

  return <Breadcrumb itemRender={itemRender} routes={routes} style={{ margin: '16px 0' }} />;
}

export default SmartBreadcrumb;
