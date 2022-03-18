import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { AdminRoutes } from 'admin.routes';
import axios from 'axios';
import {
  LinkItemProps,
  NavItem,
} from 'layouts/kabaflow.layout';
import { AiOutlineUser } from 'react-icons/ai';
import { BsFileMusic } from 'react-icons/bs';
import {
  FiEdit,
  FiMenu,
} from 'react-icons/fi';
import { GoPackage } from 'react-icons/go';
import {
  MdAttachMoney,
  MdOutlineContactPage,
  MdPayment,
  MdSecurity,
} from 'react-icons/md';
import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  useAccess,
  useAuth,
  useUser,
} from 'state/user';

import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  IconButton,
  Skeleton,
  Spacer,
  Stack,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';

const AdminLayout = () => {
  const toast = useToast();
  const { auth, logout } = useAuth();
  const { currentUser, setUser } = useUser();
  const { isOpen, onOpen: openMenu, onClose: closeMenu } = useDisclosure();
  let history = useNavigate();
  let location = useLocation();

  const LinkItems: Array<LinkItemProps> = [
    { name: "User", icon: AiOutlineUser, link: "/admin/users" },
    { name: "Packs", icon: GoPackage, link: "/admin/packs" },
    { name: "Loops", icon: BsFileMusic, link: "/admin/loops" },
    { name: "Payments", icon: MdAttachMoney, link: "/admin/payments" },
    { name: "PayPlans", icon: MdPayment, link: "/admin/payplans" },
    { name: "Jobs", icon: MdPayment, link: "/admin/jobs" },
    { name: "User Permissions", icon: MdSecurity, link: "/admin/grants" },
    // { name: "Settings", icon: FiSettings, link: "/" },
  ];

  const btnRef = useRef();

  const [loaded, setLoaded] = useState(false);

  // const { access, setAccess } = useAccess(state => state);

  // console.log("access", access);
  // console.count("access");

  // useEffect(() => {
  //   if (setAccess) {
  //     loadAccess();
  //   }
  //   async function loadAccess() {
  //     await setAccess();
  //     setLoading(true);
  //   }
  // }, [setAccess]);

  const { setAccess } = useAccess();

  useEffect(() => {
    accessData();
    async function accessData() {
      await setAccess();
      setLoaded(true);
    }
  }, []);

  const btnRight = useRef();

  const {
    isOpen: isOpenRight,
    onOpen: onOpenRight,
    onClose: onCloseRight,
  } = useDisclosure();

  const signOut = async () => {
    try {
      const resp = await axios.get("/auth/logout");
      if (resp.status === 200) {
        toast({
          title: "Logged out user",
          description: "redirecting to home page",
          duration: 4000,
          id: "signout",
          status: "success",
        });
        logout();
        setUser({});
        history("/");
      } else {
        toast({
          title: "Error terminating session",
          description: `${resp.statusText}`,
          duration: 4000,
          status: "error",
          position: "top",
        });
      }
    } catch (e) {
      toast({
        title: "Error terminating session",
        description: e.message,
        duration: 4000,
        status: "error",
        position: "top",
      });
    }
    onCloseRight();
  };


  return (
    <>
      <Skeleton isLoaded={loaded}>
        <Flex
          p={{ base: "5", md: "3" }}
          justifyContent={"space-between"}
          // bg={useColorModeValue("white", "gray.800")}
          boxShadow="xl"
        >
          <HStack>
            <IconButton
              ref={btnRef}
              display={{ base: "flex" }}
              onClick={openMenu}
              aria-label="open menu"
              colorScheme="black"
              variant="ghost"
              icon={<FiMenu />}
            />
            <Text
              fontSize="2xl"
              fontFamily="monospace"
              fontWeight="bold"
              color="gray.700"
            >
              <Link to="/admin" replace>
                Kabaflow Admin
              </Link>
            </Text>
          </HStack>
          <Spacer />
          <HStack ref={btnRight} cursor="pointer" onClick={onOpenRight}>
                <Avatar
                  size={"sm"}
                  src={
                    currentUser?.image
                      ? currentUser.image.startsWith("http")
                        ? currentUser?.image
                        : `/static/avatars/${currentUser?.image}`
                      : ""
                  }
                />
              </HStack>
        </Flex>
        <Box width="100%">
          <AdminRoutes />
        </Box>

        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={closeMenu}
          finalFocusRef={btnRef}
          size={"sm"}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader color="gray.700">Kabaflow Admin</DrawerHeader>
            <DrawerBody>
              <Box>
                {LinkItems.map((link) => {
                  return (
                    <NavItem link={link.link} key={link.name} icon={link.icon}>
                      {link.name}
                    </NavItem>
                  );
                })}
              </Box>
            </DrawerBody>
            <DrawerFooter>
              <NavItem icon={MdOutlineContactPage} link="/">
                User Dashboard
              </NavItem>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Drawer
          isOpen={isOpenRight}
          placement="right"
          onClose={onCloseRight}
          finalFocusRef={btnRight}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>User Details</DrawerHeader>

            <DrawerBody>
              <Flex>
                <VStack w="full" justifyContent="center">
                  <HStack>
                    <Heading fontSize={{ base: "lg", md: "xl" }}>
                      {currentUser?.name?.toUpperCase()}{" "}
                    </Heading>
                    <Box>
                      <Link
                        to={{ pathname: "/profile" }}
                        state={{ from: location }}
                        onClick={onCloseRight}
                      >
                        <IconButton
                          aria-label="edit user"
                          size="sm"
                          icon={<FiEdit />}
                        />
                      </Link>
                    </Box>
                  </HStack>
                  <Box pt="5">
                    <Avatar
                      size={"xl"}
                      src={
                        currentUser?.image
                          ? currentUser.image.startsWith("http")
                            ? currentUser?.image
                            : `/static/avatars/${currentUser?.image}`
                          : ""
                      }
                    />
                  </Box>
                  <Heading fontSize={"sm"}>{currentUser?.email}</Heading>
                  <Text>role: {currentUser?.role}</Text>
                  <Stack w="100%" pt="10" spacing={"1"}>
                    <Heading fontSize={"lg"} textAlign={"center"}>
                      About
                    </Heading>
                    <Text mb={10}>{currentUser?.about}</Text>
                    <Heading fontSize={"lg"} textAlign={"center"}>
                      Payplan
                    </Heading>
                    <Box
                      p={5}
                      m={"0.5em !important"}
                      boxShadow="2xl"
                      bg="yellow.400"
                    >
                      <Stat>
                        <StatLabel>Current Plan</StatLabel>
                        <StatNumber>£0.00</StatNumber>
                        <StatHelpText>12-01 - 12-21</StatHelpText>
                      </Stat>
                    </Box>

                    {currentUser?.payments?.edges.length > 0 ? (
                      <StatGroup>
                        <Stat>
                          <StatLabel>Current Plan</StatLabel>
                          <StatNumber>£0.00</StatNumber>
                          <StatHelpText>
                            {
                              currentUser?.payments?.edges[0]?.node
                                ?.planStartDate
                            }{" "}
                            -{" "}
                            {currentUser?.payments?.edges[0]?.node?.planEndDate}
                          </StatHelpText>
                        </Stat>
                      </StatGroup>
                    ) : (
                      <StatGroup>
                        <Stat>
                          <StatLabel>No plans found</StatLabel>
                          <StatHelpText mt="2" textAlign={"center"}>
                            <Button
                              w="100%"
                              variant="ghost"
                              color="black"
                              bg="yellow.400"
                            >
                              buy subscription?
                            </Button>
                          </StatHelpText>
                        </Stat>
                      </StatGroup>
                    )}
                  </Stack>
                </VStack>
              </Flex>
            </DrawerBody>
            <DrawerFooter>
              {auth && (
                <Button w="full" onClick={signOut}>
                  Signout
                </Button>
              )}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Skeleton>
    </>
  );
};

export default AdminLayout;
