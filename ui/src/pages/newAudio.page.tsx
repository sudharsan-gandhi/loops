import { CreateLoop } from "components/audio/loop.create";
import { CreatePack } from "components/audio/pack.create";
import { Link } from "react-router-dom";

import {
  Button,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

const NewAudioPage: React.FC = () => {
  return (
    <>
      <Container maxW="container.xl" pt="5">
        <Tabs isFitted>
          <TabList>
            <Tab>Add Pack</Tab>
            <Tab>Add Loop</Tab>
            <Button>
              <Link to="/pack">My Packs/Audio</Link>
            </Button>
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
      </Container>
    </>
  );
};

export { NewAudioPage };
