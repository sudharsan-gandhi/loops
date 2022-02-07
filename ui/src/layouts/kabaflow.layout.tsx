import {
  ReactText,
  useEffect,
  useRef,
  useState,
} from 'react';

import axios from 'axios';
import { AppRouter } from 'index';
import {
  getUserWithPayPlan,
  getUserWithPayPlanVariables,
  MakeOptional,
  User,
} from 'queries';
import { IconType } from 'react-icons';
import { CgFolderAdd } from 'react-icons/cg';
import {
  FiEdit,
  FiHome,
  FiMenu,
  FiStar,
} from 'react-icons/fi';
import { MdOutlineMusicVideo } from 'react-icons/md';
import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  IsAuth,
  useAuth,
  useUser,
} from 'state/user';

import { useLazyQuery } from '@apollo/client';
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
  FlexProps,
  Heading,
  HStack,
  Icon,
  IconButton,
  Stack,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';

interface LinkItemProps {
  name: string;
  link: string;
  icon: IconType;
  isAuth?: boolean;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, link: "/" },
  { name: "Add Packs", icon: CgFolderAdd, link: "/new-pack", isAuth: true },
  { name: "My Packs", icon: MdOutlineMusicVideo, link: "/pack", isAuth: true },
  { name: "WishList", icon: FiStar, link: "/", isAuth: true },
  // { name: "Settings", icon: FiSettings, link: "/" },
];

interface NavItemProps extends FlexProps {
  icon: IconType;
  link: string;
  children: ReactText;
}
const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  return (
    <Link to={link}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export const KabaflowLayout: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { auth, logout } = useAuth();
  const { setUser } = useUser();
  let location = useLocation();
  let history = useNavigate();
  let [currentUser, setCurrentUser] = useState<MakeOptional<User, keyof User>>(
    {}
  );
  useUser.subscribe((state) => setCurrentUser(state.currentUser));
  const [loadedUser, setLoadedUser] = useState<User>();

  const [loadUser] = useLazyQuery<User>(getUserWithPayPlan);

  useEffect(() => {
    async function load() {
      if (auth && currentUser?.id) {
        const { data, error } = await loadUser(
          getUserWithPayPlanVariables(currentUser.id)
        );
        if (error) {
          console.error(error);
        }
        if (data) {
          setLoadedUser(data);
        }
      }
    }
    load();
  }, [auth, currentUser]);
  console.log("auth", auth);
  console.log("currentuser", currentUser);
  const {
    isOpen: isOpenRight,
    onOpen: onOpenRight,
    onClose: onCloseRight,
  } = useDisclosure();
  const btnRef = useRef();
  const btnRight = useRef();
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
      <Flex
        p={{ base: "5", md: "3" }}
        justifyContent={"space-between"}
        bg={useColorModeValue("white", "gray.800")}
      >
        <HStack>
          <IconButton
            ref={btnRef}
            display={{ base: "flex" }}
            onClick={onOpen}
            aria-label="open menu"
            icon={<FiMenu />}
          />
          <Text
            fontSize="2xl"
            fontFamily="monospace"
            fontWeight="bold"
            color={useColorModeValue("black", "white")}
          >
            <Link to="/" replace>
              Kabaflow
            </Link>
          </Text>
        </HStack>

        {auth ? (
          <Flex alignItems={"center"} p={1}>
            {/* <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            > */}
            <HStack ref={btnRight} onClick={onOpenRight}>
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
            {/* </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu> */}
          </Flex>
        ) : (
          <HStack>
            <Box display={{ base: "none", md: "block" }}>
              <Link to="/signup">
                <Button m={1}>new user?</Button>
              </Link>
            </Box>
            <Box>
              <Link to="/signin">
                <Button variant="solid" m={1}>
                  Sign in
                </Button>
              </Link>
            </Box>
          </HStack>
        )}
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"sm"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Kabaflow</DrawerHeader>

          <DrawerBody>
            {LinkItems.map((link) => {
              if (link.isAuth) {
                return (
                  <IsAuth userId={currentUser.id}>
                    <NavItem link={link.link} key={link.name} icon={link.icon}>
                      {link.name}
                    </NavItem>
                  </IsAuth>
                );
              } else {
                return (
                  <NavItem link={link.link} key={link.name} icon={link.icon}>
                    {link.name}
                  </NavItem>
                );
              }
            })}
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
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
                  <Heading fontSize={"xl"}>
                    {currentUser?.name?.toUpperCase()}{" "}
                  </Heading>
                  <Link
                    to={{ pathname: "/profile" }}
                    state={{ from: location }}
                    onClick={onCloseRight}
                  >
                    <IconButton aria-label="edit user" icon={<FiEdit />} />
                  </Link>
                </HStack>
                <Box>
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

                  {loadedUser?.payments?.edges.length > 0 ? (
                    <StatGroup>
                      <Stat>
                        <StatLabel>Current Plan</StatLabel>
                        <StatNumber>£0.00</StatNumber>
                        <StatHelpText>
                          {loadedUser?.payments?.edges[0]?.node?.planStartDate}{" "}
                          - {loadedUser?.payments?.edges[0]?.node?.planEndDate}
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
      <AppRouter />
    </>
  );
};
