import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';

function CourseCard() {
  return (
    <Card hoverable style={{ width: 240 }} cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
  );
}

export default CourseCard;
