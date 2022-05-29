import { VerticalAlignTopOutlined } from '@ant-design/icons';
import { BackTop } from 'antd';

export default function BackToTop() {
   return (
      <BackTop className="back-to-top item-center">
         <VerticalAlignTopOutlined style={{ color: 'white', fontSize: '50px' }} />
      </BackTop>
   );
}
