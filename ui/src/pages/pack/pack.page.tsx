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
      <Tabs>
        <TabList>
          <Tab>My Packs</Tab>
          <Tab>My Loops</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>my packs</TabPanel>
          <TabPanel>My loops</TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export { PackPage };
