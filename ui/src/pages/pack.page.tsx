import { AllLoops } from "components/audio/loop.all";
import { AllPacks } from "components/audio/pack.all";
import { Link, useLocation } from "react-router-dom";

import {
  Button,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

const PackPage: React.FC = () => {
  let { state: activeTab } = useLocation();
  if (activeTab === undefined) activeTab = 0;
  return (
    <>
      <Container maxW="container.xl" pt="5">
        <Tabs isFitted defaultIndex={activeTab as number}>
          <TabList>
            <Tab>My Packs</Tab>
            <Tab>My Loops</Tab>
            <Button>
              <Link to="/new-pack">Add Pack/Audio</Link>
            </Button>
          </TabList>
          <TabPanels>
            <TabPanel>
              <AllPacks />
            </TabPanel>
            <TabPanel>
              <AllLoops />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
};

export { PackPage };
