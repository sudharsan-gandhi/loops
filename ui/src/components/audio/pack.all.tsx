import {
  useContext,
  useEffect,
} from 'react';

import { PackCard } from 'components/cards';
import { AppContext } from 'index';
import {
  CursorPaging,
  getAllPacks,
  getAllPacksVariables,
  Maybe,
  PackFilter,
  PackSort,
} from 'queries';
import { Link } from 'react-router-dom';

import { useLazyQuery } from '@apollo/client';
import {
  Box,
  Flex,
  SimpleGrid,
  Skeleton,
  Stack,
  VStack,
} from '@chakra-ui/react';

export const AllPacks: React.FC = () => {
  const { cookies } = useContext(AppContext);
  const userId = cookies.get("userId");
  const [loadGreeting, { called, loading, data }] = useLazyQuery(getAllPacks);

  const paging: CursorPaging = {
    first: 10,
  };

  const filter: PackFilter = {};

  const sorting: Maybe<Array<PackSort>> = [];

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
              <SimpleGrid columns={{base: 2, md: 3, lg: 4}} spacing={10} px={{base: 5, md: 10}} py={10}>
                {data?.packs?.edges.map(({ node }, index) => (
                  <>
                    <Link key={index} to={`/pack/${node.id}`}>
                      <PackCard key={node.id} pack={node} />
                    </Link>
                  </>
                ))}
              </SimpleGrid>
            )}
          </Box>
        </VStack>
      </Flex>
    </>
  );
};
