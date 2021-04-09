import { CSSProperties } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { Button } from 'antd';

function Admin(): JSX.Element {
  async function signOut(): Promise<void> {
    await Auth.signOut();
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
