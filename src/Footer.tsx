import { Link } from 'react-router-dom';

export default function Footer(): JSX.Element {
  return (
    <div style={footerStyle}>
      <Link to="/admin">Admins</Link>
    </div>
  );
}
const footerStyle = {
  borderTop: '1px solid #ddd',
  display: 'flex',
  alignItems: 'center',
  padding: 20,
};
