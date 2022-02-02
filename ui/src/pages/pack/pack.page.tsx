import { AllLoops } from 'components/audio/loop.all';
import { AllPacks } from 'components/audio/pack.all';
import { useLocation } from 'react-router-dom';

import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

const PackPage: React.FC = () => {
  let { state: activeTab } = useLocation();
  debugger;
  if(activeTab === undefined) activeTab = 0;
  return (
    <>
      <Tabs isFitted defaultIndex={activeTab as number}>
        <TabList>
          <Tab>My Packs</Tab>
          <Tab>My Loops</Tab>
        </TabList>
        <TabPanels>
          <TabPanel><AllPacks/></TabPanel>
          <TabPanel><AllLoops/></TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export { PackPage };
