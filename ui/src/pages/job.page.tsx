import 'styles/global.scss';

import {
  useEffect,
  useState,
} from 'react';

import { PaginationButton } from 'components/button/pagination.button';
import {
  FilterUI,
  KBFilterInterface,
} from 'components/pagination';
import {
  CursorPaging,
  Job,
  JobConnection,
  JOBS,
  JobSortFields,
  SortDirection,
  UserJobsArgs,
} from 'queries';
import { AiOutlineCalendar } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import { GrContact } from 'react-icons/gr';
import { TiArrowMaximise } from 'react-icons/ti';

import { useLazyQuery } from '@apollo/client';
import {
  Box,
  Container,
  Heading,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spacer,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';

const JobModal: React.FC<{ job: Job; isModalOpen: any; closeModal: any }> = ({
  job,
  isModalOpen,
  closeModal,
}) => {
  return (
    <Box width="100%" position="relative">
      <Modal isOpen={isModalOpen} onClose={closeModal} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading
              w="full"
              textAlign={"center"}
              fontSize={"2xl"}
              fontFamily={"body"}
            >
              {job.title.toUpperCase()}
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <HStack justify="space-between" w="100%" py="3">
              {job.location && (
                <HStack align="baseline">
                  <Box>
                    <IconButton
                      variant="link"
                      fontSize="sm"
                      colorScheme="black"
                      aria-label="geo"
                      cursor="default"
                      icon={<GoLocation />}
                    />
                  </Box>
                  <Box>
                    <Text mb={0}>{job.location}</Text>
                  </Box>
                </HStack>
              )}
              {job?.expirationDate && (
                <HStack align="baseline">
                  <Box>
                    <IconButton
                      variant="link"
                      colorScheme="black"
                      aria-label="date"
                      cursor="default"
                      icon={<AiOutlineCalendar />}
                    />
                  </Box>
                  <Box>
                    <Box>
                      <Text mb="0">
                        {new Intl.DateTimeFormat("en-GB", {
                          year: "2-digit",
                          month: "short",
                          day: "2-digit",
                        }).format(job.postDate)}{" "}
                        -{" "}
                        {new Intl.DateTimeFormat("en-GB", {
                          year: "2-digit",
                          month: "short",
                          day: "2-digit",
                        }).format(job.expirationDate)}
                      </Text>
                    </Box>
                  </Box>
                </HStack>
              )}
            </HStack>
            <HStack align="baseline" w="100%" pl="1" pb="3">
              <Box>
                <IconButton
                  variant="link"
                  size={"sm"}
                  aria-label="contact"
                  cursor="default"
                  icon={<GrContact />}
                />
              </Box>
              <Box>
                <Text isTruncated>{job.contact}</Text>
              </Box>
            </HStack>
            <Box mb="20">
              <Heading fontSize="2xl">Description</Heading>
              <Text>{job.description}</Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

function JobsPage(): JSX.Element {
  const [getJobs, { loading, fetchMore }] =
    useLazyQuery<{ jobs: JobConnection }>(JOBS);
  const [data, setData] = useState<JobConnection>();
  const [modalData, setModalData] = useState<Job>();
  const toast = useToast();
  const {
    isOpen: isModalOpen,
    onOpen: OpenModal,
    onClose: closeModal,
  } = useDisclosure();

  const pagination = [10, 20, 50];
  const searchFields: KBFilterInterface[] = [
    { key: "title", label: "title" },
    { key: "location", label: "location" },
  ];
  const sortFields: KBFilterInterface[] = [
    { key: "title", label: "title" },
    { key: "expirationDate", label: "expiration date" },
  ];

  const listData = (d) =>
    d?.edges?.map(({ node }) => (
      <Box boxShadow="2xl" p="5">
        <VStack>
          <HStack alignItems="baseline" w="100%" borderBottom="1px solid black">
            <Spacer />
            <Box>
              <Text fontWeight={"bold"} fontSize="lg" isTruncated>
                {node.title.toUpperCase()}
              </Text>
            </Box>
            <Spacer />
            <Box>
              <IconButton
                variant="link"
                colorScheme={"black"}
                aria-label="open"
                icon={<TiArrowMaximise />}
                onClick={() => {
                  setModalData(node);
                  OpenModal();
                }}
              />
            </Box>
          </HStack>
          <HStack justify="space-between" w="100%" py="3">
            {node.location && (
              <HStack align="baseline">
                <Box>
                  <IconButton
                    variant="link"
                    fontSize="sm"
                    colorScheme="black"
                    aria-label="geo"
                    cursor="default"
                    icon={<GoLocation />}
                  />
                </Box>
                <Box>
                  <Text mb={0}>{node.location}</Text>
                </Box>
              </HStack>
            )}
            {node?.expirationDate && (
              <HStack align="baseline">
                <Box>
                  <IconButton
                    variant="link"
                    colorScheme="black"
                    aria-label="date"
                    cursor="default"
                    icon={<AiOutlineCalendar />}
                  />
                </Box>
                <Box>
                  <Box>
                    <Text mb="0">
                      {new Intl.DateTimeFormat("en-GB", {
                        year: "2-digit",
                        month: "short",
                        day: "2-digit",
                      }).format(node.postDate)}{" "}
                      -{" "}
                      {new Intl.DateTimeFormat("en-GB", {
                        year: "2-digit",
                        month: "short",
                        day: "2-digit",
                      }).format(node.expirationDate)}
                    </Text>
                  </Box>
                </Box>
              </HStack>
            )}
          </HStack>
          <HStack align="baseline" w="100%" pl="1" pb="3">
            <Box>
              <IconButton
                variant="link"
                size={"sm"}
                aria-label="contact"
                cursor="default"
                icon={<GrContact />}
              />
            </Box>
            <Box>
              <Text isTruncated>{node.contact}</Text>
            </Box>
          </HStack>
        </VStack>
      </Box>
    ));

  const initialJobVariables: UserJobsArgs = {
    paging: {
      first: pagination[0],
    },
    filter: {},
    sorting: [],
  };
  const [jobVariables, dispatch] = useState(initialJobVariables);

  const formReducer = (form: any) => {
    if (form?.paging?.first) {
      form.paging.first = parseInt(form.paging.first);
    }
    let newState: UserJobsArgs = {
      paging: { ...jobVariables.paging, ...(form.paging || {}) },
    };
    Object.entries(form).forEach(([key, value]) => {
      Object.entries(value).forEach(([k, v]) => {
        newState = reducer(newState, {
          type: key as keyof UserJobsArgs | "clear",
          key: k,
          value: v,
        });
      });
    });
    dispatch(newState);
  };

  const reducer = (
    state: UserJobsArgs,
    payload: { type: keyof UserJobsArgs | "clear"; key: string; value: any }
  ) => {
    const key = payload.key;
    const value = payload.value;
    if (!value && value === "") {
      return { ...state };
    }
    switch (payload.type) {
      case "paging": {
        debugger;
        const key = payload.key;
        let paging: CursorPaging = { first: state.paging.first };
        if (key === "before" || key === "after") {
          const cursor =
            key === "before"
              ? data?.pageInfo?.startCursor
              : data?.pageInfo?.endCursor;
          paging = {
            [key]: cursor,
            ...paging,
          };
        }
        return { ...state, paging };
      }
      case "filter": {
        const filter = { ...state.filter, [key]: { like: `%${value}%` } };
        return { ...state, filter };
      }
      case "sorting": {
        if (!value) {
          return state;
        }
        const index = state?.sorting?.findIndex((v) => v.field === key);
        if (index && index > -1) {
          state.sorting.splice(index, 1);
        }
        state.sorting = [
          ...(state.sorting || []),
          ...[
            {
              field: key as JobSortFields,
              direction: value as SortDirection,
            },
          ],
        ];
        return { ...state };
      }
      case "clear": {
        return { ...initialJobVariables };
      }
      default: {
        return state;
      }
    }
  };

  useEffect(() => {
    try {
      getJobs({ variables: jobVariables }).then((jobs) => {
        setData(jobs.data.jobs);
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
  // whenever jobVariables fetchMore data from backend
  useEffect(() => {
    console.log("variables", jobVariables);
    try {
      fetchMore({ variables: jobVariables }).then((jobs) => {
        setData(jobs.data.jobs);
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
  }, [jobVariables]);

  if (loading) return <p>Loading...</p>;

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
          visibility={!data?.pageInfo?.hasPreviousPage ? "hidden" : "visible"}
        >
          <PaginationButton dispatch={formReducer} isPrev />
        </Box>
        <Spacer />
        <VStack>
          <HStack alignItem="baseline">
            <Text fontSize={{ base: "lg", md: "2xl" }} m="0">
              Jobs Search
            </Text>
            <Box display={data?.edges?.length > 0 ? "block" : "none"}>
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
        <Box visibility={!data?.pageInfo?.hasNextPage ? "hidden" : "visible"}>
          <PaginationButton dispatch={formReducer} />
        </Box>
      </HStack>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mt="10">
        {data?.edges?.length > 0 ? (
          <>{listData(data)}</>
        ) : (
          <Box>no data found</Box>
        )}
      </SimpleGrid>
      {isModalOpen && modalData && (
        <Box width="100%" position="relative">
          <JobModal
            job={modalData}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
          />
        </Box>
      )}
    </Container>
  );
}

export default JobsPage;
