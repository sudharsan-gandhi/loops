import {
  useEffect,
  useState,
} from 'react';

import {
  genres,
  musicalNotes,
} from 'components/audio/audio.model';
import { PaginationButton } from 'components/button/pagination.button';
import { LoopCard } from 'components/cards';
import {
  FilterUI,
  KBFilterInterface,
  KBSortInterface,
} from 'components/pagination';
import { reducer } from 'components/pagination/paginate.reducer';
import {
  LoopConnection,
  LoopFilter,
  LoopSortFields,
  PackAudioArgs,
} from 'queries';
import { exploreLoops } from 'queries/explore';

import { useLazyQuery } from '@apollo/client';
import {
  Box,
  Center,
  Container,
  HStack,
  Spacer,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';

export const ExploreAudio: React.FC = () => {
  const pagination = [10, 20, 50];
  const searchFields: KBFilterInterface<
    Omit<LoopFilter, "or" | "and" | "id">
  >[] = [
    { key: "name", label: "Audio Name" },
    { key: "genre", label: "Genre", type: "select", options: genres },
    { key: "key", label: "Audio Notes", type: "select", options: musicalNotes },
    { key: "tempo", label: "Tempo", type: "number" },
    { key: "bpm", label: "BPM", type: "number" },
  ];
  const sortFields: KBSortInterface<LoopSortFields>[] = [
    { key: LoopSortFields.Name, label: "Pack Name" },
    { key: LoopSortFields.Genre, label: "Genre" },
    { key: LoopSortFields.Tempo, label: "Tempo" },
    { key: LoopSortFields.Bpm, label: "BPM" },
  ];

  const initialLoopVariables: PackAudioArgs = {
    paging: {
      first: pagination[0],
    },
    filter: {},
    sorting: [],
  };

  const alwaysReducePackVariables: PackAudioArgs = {
    filter: {
      pack: {
        // isLoop: {
        //   is: true,
        // },
      },
    },
  };

  const toast = useToast();
  const [getLoops, { loading, fetchMore }] =
    useLazyQuery<{ loops: LoopConnection }>(exploreLoops);
  const [loops, setLoops] = useState<LoopConnection>();
  const [loopVariables, dispatch] = useState({...initialLoopVariables, ...alwaysReducePackVariables});

  useEffect(() => {
    try {
      getLoops({ variables: loopVariables }).then((resp) => {
        setLoops(resp.data.loops);
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
  // whenever loopVariables fetchMore data from backend
  useEffect(() => {
    console.log("variables", loopVariables);
    try {
      fetchMore({ variables: loopVariables }).then((resp) => {
        setLoops(resp.data.loops);
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
  }, [loopVariables]);

  const formReducer = (form: any) => {
    if (form?.paging?.first) {
      form.paging.first = parseInt(form.paging.first);
    }
    let newState: PackAudioArgs = {
      paging: { ...loopVariables.paging, ...(form.paging || {}) },
    };
    Object.entries(form).forEach(([key, value]) => {
      Object.entries(value).forEach(([k, v]) => {
        newState = reducer<PackAudioArgs>(
          newState,
          loops?.pageInfo,
          {
            type: key as keyof PackAudioArgs | "clear",
            key: k,
            value: v,
          },
          initialLoopVariables
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
          visibility={!loops?.pageInfo?.hasPreviousPage ? "hidden" : "visible"}
        >
          <PaginationButton dispatch={formReducer} isPrev />
        </Box>
        <Spacer />
        <VStack>
          <HStack alignItem="baseline">
            <Text fontSize={{ base: "lg", md: "2xl" }} m="0">
              Explore Audio
            </Text>
            <Box display={loops?.edges?.length > 0 ? "block" : "none"}>
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
        <Box visibility={!loops?.pageInfo?.hasNextPage ? "hidden" : "visible"}>
          <PaginationButton dispatch={formReducer} />
        </Box>
      </HStack>
      <Center pt="5" w="100%">
        <VStack>
          {loops?.edges?.map(({ node: loop }) => (
            <LoopCard
              audio={loop}
              user={loop.pack.author}
              packId={loop.pack.id}
              refetch={undefined}
              showPackLink = {true}
            />
          ))}
        </VStack>
      </Center>
    </Container>
  );
};
