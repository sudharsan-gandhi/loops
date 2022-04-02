import {
  useContext,
  useEffect,
} from 'react';

import { LoopCardWithPack } from 'components/cards/loop.card';
import { AppContext } from 'index';
import {
  CursorPaging,
  getAllPacks,
  getAllPacksVariables,
  Maybe,
  PackFilter,
  PackSort,
} from 'queries';

import { useLazyQuery } from '@apollo/client';
import {
  Box,
  Flex,
  Skeleton,
  Stack,
  VStack,
} from '@chakra-ui/react';

export const AllLoops: React.FC = () => {
  const { cookies } = useContext(AppContext);
  const userId = cookies.get("userId");
  const [loadLoops, { called, loading, data, refetch }] =
    useLazyQuery(getAllPacks);

  const paging: CursorPaging = {
    first: 10,
  };

  const filter: PackFilter = {};

  const sorting: Maybe<Array<PackSort>> = [];

  useEffect(() => {
    loadLoops(getAllPacksVariables(userId, paging, filter, sorting, true));
  }, []);
  return (
    <>
      <Flex alignItems={"flex-start"} justifyContent={"center"} mt="2">
        <VStack>
          <Box w={{ base: "full", md: "container.md", lg: "container.lg" }}>
            {called && loading ? (
              <Stack>
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
              </Stack>
            ) : data?.packs?.edges.length === 0 ? (
              <>
                <Box mb="10">No Audio Loops added</Box>
              </>
            ) : (
              <VStack>
                {data?.packs?.edges.map(({ node }, index) => (
                  <>
                    {/* <Link key={index} to={`/pack/${node.id}`}> */}
                    <LoopCardWithPack
                      key={node.id}
                      pack={node}
                      packId={node.id}
                      refetch={refetch}
                    />
                    {/* </Link> */}
                  </>
                ))}
              </VStack>
            )}
          </Box>
        </VStack>
      </Flex>
    </>
  );
};
