import {
  Paymentplan,
  PaymentplanConnection,
} from 'queries';
import {
  getActivePayplans,
  getActivePayplansVariables,
} from 'queries/payplan';

import { useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';

const PayplanCard: React.FC<{ payplan: Paymentplan }> = ({ payplan }) => {
  return (
    <>
      <Box
        mb="4"
        shadow="base"
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius={"xl"}
        boxShadow="2xl"
        w="100%"
      >
        <Box py={4} px={2}>
          <Text fontWeight="500" fontSize="2xl" textAlign="center">
            {payplan?.title.toUpperCase()}
          </Text>
          <HStack justifyContent="center">
            <Text fontSize="3xl" fontWeight="600">
              $
            </Text>
            <Text fontSize="5xl" fontWeight="900">
              {payplan?.amount}
            </Text>
          </HStack>
          <HStack justifyContent="center" alignItems="baseline">
            <Text fontSize="2xl" color="gray.500">
              for {payplan?.month} month
            </Text>
          </HStack>
        </Box>
        <VStack bg="gray.50" py={4} borderBottomRadius={"xl"}>
          <Box w="100%">
            <Text textAlign="center">{payplan?.description}</Text>
          </Box>
          {/* <List spacing={3} textAlign="start" px={12}>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="green.500" />
              unlimited build minutes
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="green.500" />
              Lorem, ipsum dolor.
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="green.500" />
              5TB Lorem, ipsum dolor.
            </ListItem>
          </List> */}
          <Box w="80%" py={7}>
            <Button w="full" colorScheme="red" variant="outline">
              Get Plan
            </Button>
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export const PayplanPage: React.FC = () => {
  const { loading, error, data } = useQuery<{
    paymentplans: PaymentplanConnection;
  }>(getActivePayplans, getActivePayplansVariables());

  return (
    <>
      <Container maxW="container.xl" p="10">
        <Skeleton isLoaded={!loading}>
          {(data?.paymentplans?.edges?.length === 0 || error) && (
            <>
              <Flex
                justifyContent="center"
                alignItems="center"
                boxShadow="2xl"
                minH="150px"
              >
                <Box>
                  <Text fontWeight="bold" fontSize="xl">
                    No payment plans found. Please try again later
                  </Text>
                </Box>
              </Flex>
            </>
          )}
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={5}
            placeContent="center"
            placeItems="center"
          >
            {data?.paymentplans?.edges?.map(({ node }) => (
              <PayplanCard payplan={node} />
            ))}
          </SimpleGrid>
        </Skeleton>
      </Container>
    </>
  );
};
