import {
  ReactText,
  useRef,
  useState,
} from 'react';

import axios from 'axios';
import {
  getUserWithPayPlan,
  getUserWithPayPlanVariables,
  User,
} from 'queries';
import { IconType } from 'react-icons';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { CgFolderAdd } from 'react-icons/cg';
import {
  FiEdit,
  FiHome,
  FiMenu,
  FiStar,
} from 'react-icons/fi';
import {
  MdAdminPanelSettings,
  MdOutlineMusicVideo,
  MdOutlineWorkOutline,
} from 'react-icons/md';
import {
  Link,
  useLocation,
  useMatch,
  useNavigate,
  useResolvedPath,
} from 'react-router-dom';
import {
  IsAuth,
  useAuth,
  useUser,
} from 'state/user';
import { UserRoutes } from 'user.routes';

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

export interface LinkItemProps {
  name: string;
  link: string;
  icon: IconType;
  isAuth?: boolean;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, link: "/" },
  { name: "Add Packs", icon: CgFolderAdd, link: "/new-pack", isAuth: true },
  { name: "My Packs", icon: MdOutlineMusicVideo, link: "/pack", isAuth: true },
  { name: "WishList", icon: FiStar, link: "/wishlist", isAuth: true },
  // { name: "Settings", icon: FiSettings, link: "/" },
];

export interface NavItemProps extends FlexProps {
  icon: IconType;
  link: string;
  children: ReactText;
}
export const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  let resolved = useResolvedPath(link);
  let match = useMatch({ path: resolved.pathname });
  return (
    <Link to={link} className={match && "active"}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="2"
        role="group"
        cursor="pointer"
        bg={match && "white"}
        color={match && "red.400"}
        textDecorationLine={match && "overline"}
        _hover={{
          bg: "red.400",
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

const TopNavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  let resolved = useResolvedPath(link);
  let match = useMatch({ path: resolved.pathname });
  return (
    <Link to={link} className={match && "active"}>
      <Flex
        w="100%"
        align="center"
        p="2"
        mx="1"
        borderRadius="5"
        role="group"
        cursor="pointer"
        bg={match && "white"}
        color={match && "red.400"}
        textDecorationLine={match && "overline"}
        _hover={{
          bg: "red.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr={{ base: "none", md: 2 }}
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        <Box display={{ base: "none", md: "block" }}>{children}</Box>
      </Flex>
    </Link>
  );
};

export const KabaflowLayout: React.FC = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { auth, logout } = useAuth();
  const { currentUser, setUser } = useUser();
  let location = useLocation();
  let history = useNavigate();

  console.count("called");
  console.log(currentUser, auth);
  const [loadUser] = useLazyQuery<{user: User}>(getUserWithPayPlan);
  const [called, setCalled] = useState(false);

  async function load() {
    const { data, error } = await loadUser(
      getUserWithPayPlanVariables(currentUser.id)
    );
    if (error) {
      console.error(error);
    }
    if (data) {
      setUser(data.user);
    }
  }

  if (auth && currentUser?.id && !called) {
    load();
    setCalled(true);
  }

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
      {/* <Skeleton isLoaded={loaded}> */}
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
              onClick={onOpen}
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
              <Link to="/" replace>
                Kabaflow
              </Link>
            </Text>
          </HStack>
          <Spacer />
          <HStack px="10" display={{ base: "none", md: "flex" }}>
            <TopNavItem icon={AiOutlineDollarCircle} link="payplans">
              Payplans
            </TopNavItem>
            <TopNavItem icon={MdOutlineWorkOutline} link="jobs">
              Jobs
            </TopNavItem>
          </HStack>
          {auth ? (
            <Flex alignItems={"center"} p={1}>
              {/* <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            > */}
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
            <DrawerHeader color="gray.700">Kabaflow</DrawerHeader>

            <DrawerBody>
              {LinkItems.map((link) => {
                if (link.isAuth) {
                  return (
                    <IsAuth userId={currentUser.id}>
                      <NavItem
                        link={link.link}
                        key={link.name}
                        icon={link.icon}
                      >
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
              <Box display={{ base: "block", md: "none" }}>
                <NavItem icon={AiOutlineDollarCircle} link="payplans">
                  Payplans
                </NavItem>
                <NavItem icon={MdOutlineWorkOutline} link="jobs">
                  Jobs
                </NavItem>
              </Box>
            </DrawerBody>

            <DrawerFooter>
              <>
                {currentUser?.role !== "user" && (
                  <NavItem icon={MdAdminPanelSettings} link="admin">
                    Admin Dashboard
                  </NavItem>
                )}
              </>
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
        <UserRoutes />
      {/* </Skeleton> */}
    </>
  );
};
