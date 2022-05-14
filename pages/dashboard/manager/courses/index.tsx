import CourseCard from '../../../../components/CourseCard';
import Dashboard from '../../../../components/Dashboard';

export default function Course() {
  return (
    <Dashboard>
      <div className="site-layout-content">
        <CourseCard />
      </div>
    </Dashboard>
  );
}
