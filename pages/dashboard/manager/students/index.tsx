import Dashboard from '../../../../components/Dashboard';
import StudentTable from '../../../../components/StudentTable';

export default function Student() {
    return (
        <Dashboard>
            <div className="site-layout-content">
                <StudentTable />
            </div>
        </Dashboard>
    );
}
