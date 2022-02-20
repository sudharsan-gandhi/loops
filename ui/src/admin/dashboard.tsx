import { IsAuth } from 'state/user';

import {
  Box,
  Header,
} from '@adminjs/design-system';

const Dashboard: React.FC = () => {

  return (
    <Header p="10px">
      Kabaflow Dashboard
      <IsAuth userId="1">
        <Box>not logged in</Box>
      </IsAuth>
    </Header>
  );
};

export default Dashboard;
