import { CreateLoop } from 'components/audio/loop.create';
import { CreatePack } from 'components/audio/pack.create';

import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

const NewAudioPage: React.FC = () => {
  return (
    <>
      <Tabs isFitted>
        <TabList>
          <Tab>Add Pack</Tab>
          <Tab>Add Loop</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <CreatePack />
          </TabPanel>
          <TabPanel>
            <CreateLoop />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export { NewAudioPage };
