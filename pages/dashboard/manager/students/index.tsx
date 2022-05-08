import Dashboard from '../../../../components/Dashboard';
import StudentsTable from '../../../../components/StudentsTable';

export default function Student() {
  return (
    <Dashboard>
      <div className="site-layout-content">
        <StudentsTable />
      </div>
    </Dashboard>
  );
}
