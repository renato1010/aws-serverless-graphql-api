import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const Nav = (props: { current: string }): JSX.Element => {
  const { current } = props;
  return (
    <div>
      <Menu selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home">
          <Link to={`/`}>
            <HomeOutlined />
            Home
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};
export default Nav;
