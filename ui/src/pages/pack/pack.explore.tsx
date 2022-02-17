import {
  useEffect,
  useState,
} from 'react';

import { AllPacksWithCards } from 'components/audio/pack.all';
import { PaginationButton } from 'components/button/pagination.button';
import {
  FilterUI,
  KBFilterInterface,
  KBSortInterface,
} from 'components/pagination';
import { reducer } from 'components/pagination/paginate.reducer';
import {
  LoopFilter,
  PackConnection,
  PackFilter,
  PackSortFields,
  UserPacksArgs,
} from 'queries';
import { explorePacks } from 'queries/explore';

import { useLazyQuery } from '@apollo/client';
import {
  Box,
  Container,
  HStack,
  Spacer,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';

export const ExplorePacks: React.FC = () => {
  const pagination = [10, 20, 50];
  const searchFields: KBFilterInterface<
    Omit<PackFilter & LoopFilter, "or" | "and" | "id">
  >[] = [
    { key: "name", label: "pack name" },
    { key: "price", label: "price", type: "number" },
    // { key: "genre", label: "Genre", type: "select", options: genres, parent: "audio" },
  ];
  const sortFields: KBSortInterface<PackSortFields>[] = [
    { key: PackSortFields.Name, label: "Pack Name" },
    { key: PackSortFields.Price, label: "Price" },
  ];

  const initialPackVariables: UserPacksArgs = {
    paging: {
      first: pagination[0],
    },
    filter: {},
    sorting: [],
  };
  const alwaysReducePackVariables: UserPacksArgs = {
    filter: {
      isLoop: {
        isNot: true,
      },
    },
  };
  const toast = useToast();
  const [getPacks, { loading, fetchMore }] =
    useLazyQuery<{ packs: PackConnection }>(explorePacks);
  const [packs, setPacks] = useState<PackConnection>();
  const [packVariables, dispatch] = useState({
    ...initialPackVariables,
    ...alwaysReducePackVariables,
  });

  useEffect(() => {
    try {
      getPacks({ variables: packVariables }).then((packs) => {
        setPacks(packs.data.packs);
      });
    } catch (e) {
      console.error(e);
      toast({
        title: "Error fetching jobs",
        description: e.message,
        duration: 4000,
        isClosable: true,
        position: "top",
        status: "error",
      });
    }
  }, []);
  // whenever packVariables fetchMore data from backend
  useEffect(() => {
    console.log("variables", packVariables);
    try {
      fetchMore({ variables: packVariables }).then((packs) => {
        setPacks(packs.data.packs);
      });
    } catch (e) {
      console.error(e);
      toast({
        title: "Error fetching jobs",
        description: e.message,
        duration: 4000,
        isClosable: true,
        position: "top",
        status: "error",
      });
    }
  }, [packVariables]);

  const formReducer = (form: any) => {
    if (form?.paging?.first) {
      form.paging.first = parseInt(form.paging.first);
    }
    let newState: UserPacksArgs = {
      paging: { ...packVariables.paging, ...(form.paging || {}) },
    };
    Object.entries(form).forEach(([key, value]) => {
      Object.entries(value).forEach(([k, v]) => {
        newState = reducer<UserPacksArgs>(
          newState,
          packs?.pageInfo,
          {
            type: key as keyof UserPacksArgs | "clear",
            key: k,
            value: v,
          },
          initialPackVariables
        );
      });
    });
    // add default filters here
    dispatch({
      filter: {
        ...(newState.filter || {}),
        ...(alwaysReducePackVariables.filter || {}),
      },
      paging: {
        ...(newState.paging || {}),
        ...(alwaysReducePackVariables.paging || {}),
      },
      sorting: [
        ...(newState.sorting || []),
        ...(alwaysReducePackVariables.sorting || []),
      ],
    });
  };

  return (
    <Container maxW="container.xl" pt="5">
      <HStack
        w="100%"
        justify="space-between"
        alignItems="center"
        // boxShadow="dark-lg"
        color="white"
        bg="gray.700"
        p="2"
      >
        <Box
          visibility={!packs?.pageInfo?.hasPreviousPage ? "hidden" : "visible"}
        >
          <PaginationButton dispatch={formReducer} isPrev />
        </Box>
        <Spacer />
        <VStack>
          <HStack alignItem="baseline">
            <Text fontSize={{ base: "lg", md: "2xl" }} m="0">
              Explore Packs
            </Text>
            <Box display={packs?.edges?.length > 0 ? "block" : "none"}>
              <FilterUI
                formReducer={formReducer}
                pagination={pagination}
                searchFields={searchFields}
                sortFields={sortFields}
              />
            </Box>
          </HStack>
        </VStack>
        <Spacer />
        <Box visibility={!packs?.pageInfo?.hasNextPage ? "hidden" : "visible"}>
          <PaginationButton dispatch={formReducer} />
        </Box>
      </HStack>
      <Box pt="5">
        <AllPacksWithCards packs={packs} />
      </Box>
    </Container>
  );
};
