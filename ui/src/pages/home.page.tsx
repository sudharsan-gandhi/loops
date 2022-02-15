import React, {
  useEffect,
  useState,
} from 'react';

import { PackCardV2 } from 'components/cards';
import { LoopCardWithPack } from 'components/cards/loop.card';
import * as _ from 'lodash';
import Carousel from 'nuka-carousel';
import {
  getAllPacksForHome,
  getAllPacksForHomeVariables,
  PackConnection,
  PackEdge,
} from 'queries';
import {
  MdArrowRight,
  MdArrowRightAlt,
} from 'react-icons/md';

import { useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Container,
  HStack,
  IconButton,
  Skeleton,
  Spacer,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';

// function groupBy(list, keyGetter) {
//   const map = {};
//   list.forEach((item) => {
//     const key = keyGetter(item);
//     const collection = map[key];
//     if (key)
//       if (!collection) {
//         map[key] = [item];
//       } else {
//         map[key].push(item);
//       }
//   });
//   return map;
// }

const Home: React.FC = () => {
  const [group, setGroup] = useState<{ [any: string]: PackEdge[] }>();
  const [currentSlide, setCurrentSlide] = useState({});
  const [audioList, setAudioList] = useState<{ [any: string]: PackEdge[] }>();
  const slideSetting: { show: number; slide: number } = useBreakpointValue({
    base: { show: 2.5, slide: 2 },
    md: { show: 3.5, slide: 2 },
    lg: { show: 4.5, slide: 2.5 },
    xl: { show: 5.5, slide: 3 },
  });
  const { loading, data } = useQuery<{ packs: PackConnection }>(
    getAllPacksForHome,
    getAllPacksForHomeVariables()
  );

  useEffect(() => {
    if (data) {
      const packs = _.filter(
        data.packs.edges,
        (data) => data?.node?.audio?.edges[0]?.node && !data.node.isLoop
      );
      const loops = _.filter(
        data.packs.edges,
        (data) => data?.node?.audio?.edges[0]?.node && data.node.isLoop
      );
      const map = _.groupBy(
        packs,
        (pack: PackEdge) => pack?.node?.audio?.edges[0]?.node?.genre
      ) as { [any: string]: PackEdge[] };
      // const map = { uncategorized: data.packs.edges };
      setGroup(map);
      setAudioList({ "Audio Loops": loops });
      console.log(map);
    }
  }, [data]);
  return (
    <Container maxW="container.xl">
      {loading ? (
        <HStack>
          <Skeleton height="100px" />
          <Skeleton height="100px" />
          <Skeleton height="100px" />
        </HStack>
      ) : (
        <>
          <HStack
            bg="gray.700"
            w="100%"
            color="white"
            borderRadius="2"
            boxShadow="lg"
            alignItems="center"
            py="5"
            mt="5"
          >
            <Text px="5" m="0" fontSize="xl" fontWeight="bold">
              Kabaflow Kits
            </Text>
            <Spacer />
            <Box px="5">
              <Button
                display={{ base: "none", sm: "flex" }}
                colorScheme="white"
                rightIcon={<MdArrowRight />}
              >
                find more
              </Button>
              <IconButton
                fontSize="3xl"
                aria-label="more"
                display={{ base: "flex", sm: "none" }}
                colorScheme="white"
                icon={<MdArrowRightAlt />}
              />
            </Box>
          </HStack>
          {group &&
            Object.entries(group).map(([groupName, packs]) => (
              <>
                <Text
                  w="95%"
                  fontSize="xl"
                  fontWeight="bold"
                  pt="3"
                  pb="3"
                  color="red.600"
                  borderBottom="1px var(--chakra-colors-red-400)"
                  borderBottomStyle="dashed"
                >
                  {groupName.toUpperCase()}
                </Text>
                <Box>
                  {/* <ChakraCarousel gap={10}> */}
                  <Carousel
                    framePadding="0px"
                    slidesToShow={slideSetting.show}
                    slidesToScroll={slideSetting.slide}
                    afterSlide={(i) =>
                      setCurrentSlide({ ...currentSlide, [groupName]: i })
                    }
                    cellSpacing={1}
                    transitionMode="scroll"
                    withoutControls
                  >
                    {packs?.map(({ node }, index) => (
                      <Box key={index} p="1">
                        <PackCardV2 key={node.id} pack={node} />
                      </Box>
                    ))}
                  </Carousel>
                  {/* </ChakraCarousel> */}
                </Box>
              </>
            ))}

          {audioList &&
            Object.entries(audioList).map(([groupName, packs]) => (
              <>
                <HStack
                  bg="gray.700"
                  w="100%"
                  color="white"
                  borderRadius="2"
                  boxShadow="lg"
                  alignItems="center"
                  py="5"
                  mt="5"
                >
                  <Text fontSize="xl" fontWeight="bold" px="5" m="0">
                    {groupName}
                  </Text>
                  <Spacer />
                  <Box px="5">
                    <Button
                      display={{ base: "none", sm: "flex" }}
                      colorScheme="white"
                      rightIcon={<MdArrowRight />}
                    >
                      find more
                    </Button>
                    <IconButton
                      fontSize="3xl"
                      aria-label="more"
                      display={{ base: "flex", sm: "none" }}
                      colorScheme="white"
                      icon={<MdArrowRightAlt />}
                    />
                  </Box>
                </HStack>
                <VStack justifyContent="center">
                  {packs?.map(({ node }) => (
                    <>
                      <LoopCardWithPack
                        key={node.id}
                        pack={node}
                        packId={node.id}
                        refetch={() => {}}
                      />
                    </>
                  ))}
                </VStack>
              </>
            ))}
        </>
      )}
    </Container>
  );
};

export default Home;
