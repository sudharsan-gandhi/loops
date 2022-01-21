import { AllPacks } from 'components/audio/pack.all';

import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

const PackPage: React.FC = () => {
  return (
    <>
      <Tabs isFitted>
        <TabList>
          <Tab>My Packs</Tab>
          <Tab>My Loops</Tab>
        </TabList>
        <TabPanels>
          <TabPanel><AllPacks/></TabPanel>
          <TabPanel>My loops</TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export { PackPage };
