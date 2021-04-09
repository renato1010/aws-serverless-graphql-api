import { CSSProperties } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { Button } from 'antd';
import { useHistory } from 'react-router';

function Admin(): JSX.Element {
  const history = useHistory();

  async function signOut(): Promise<void> {
    try {
      await Auth.signOut();
      history.push('/');
    } catch (error) {
      console.log(`Error: ${error?.message ?? error.toString()}`);
    }
  }
  return (
    <div>
      <h1 style={titleStyle}>Admin</h1>
      <Button type="primary" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}
type TittleStyleProps = {
  fontWeight: CSSProperties['fontWeight'];
  margin: string;
};
const titleStyle: TittleStyleProps = {
  fontWeight: 'normal',
  margin: '0px 0px 10px 0px',
};
export default withAuthenticator(Admin);
