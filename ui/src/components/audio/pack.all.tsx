import {
  useContext,
  useEffect,
} from 'react';

import { Cookies } from 'index';
import {
  CursorPaging,
  getAllPacks,
  getAllPacksVariables,
  InputMaybe,
  PackFilter,
  PackSort,
} from 'queries';
import { Link } from 'react-router-dom';

import { useLazyQuery } from '@apollo/client';
import {
  Box,
  Flex,
  Skeleton,
  Stack,
  VStack,
} from '@chakra-ui/react';

export const AllPacks: React.FC = () => {
  const { cookies } = useContext(Cookies);
  const userId = cookies.get("userId");
  const [loadGreeting, { called, loading, data }] = useLazyQuery(getAllPacks);

  const paging: CursorPaging = {
    first: 10,
  };

  const filter: PackFilter = {};

  const sorting: InputMaybe<Array<PackSort>> = [];

  useEffect(() => {
    loadGreeting(getAllPacksVariables(userId, paging, filter, sorting));
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
              <Box>No Packs added</Box>
            ) : (
              data?.packs?.edges.map(({ node }) => (
                <Box key={node.id}>
                  <Link to={`/pack/${node.id}`} key={node.id}>
                    {node.name}
                  </Link>
                </Box>
              ))
            )}
          </Box>
        </VStack>
      </Flex>
    </>
  );
};
