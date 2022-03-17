import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { AdminRoutes } from 'admin.routes';
import {
  LinkItemProps,
  NavItem,
} from 'layouts/kabaflow.layout';
import { AiOutlineUser } from 'react-icons/ai';
import { BsFileMusic } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { GoPackage } from 'react-icons/go';
import {
  MdAttachMoney,
  MdOutlineContactPage,
  MdPayment,
  MdSecurity,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAccess } from 'state/user';

import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Skeleton,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

const AdminLayout = () => {
  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: "/auth/isLoggedIn",
  //     withCredentials: true,
  //   })
  //     .then((response) => {
  //       debugger;
  //       console.log(response.data);
  //       setCurrentAdmin(response.data);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);
  const {
    isOpen,
    onOpen: openMenu,
    onClose: closeMenu,
  } = useDisclosure();

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

  const [loading, setLoading] = useState(false);

  const { setAccess } = useAccess();

  useEffect(() => {
    async function loadAccess() {
      await setAccess();
      setLoading(true);
    }
    loadAccess();
  }, [setAccess]);

  return (
    <>
      <Skeleton isLoaded={loading}>
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
      </Skeleton>
    </>
  );
};

export default AdminLayout;
