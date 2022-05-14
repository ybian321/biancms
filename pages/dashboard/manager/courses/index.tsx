import CourseList from '../../../../components/CourseList';
import Dashboard from '../../../../components/Dashboard';

export default function Course() {
    return (
        <Dashboard>
            <div className="site-layout-content">
                <CourseList />
            </div>
        </Dashboard>
    );
}
