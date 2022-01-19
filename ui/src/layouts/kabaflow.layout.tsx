import {
  ReactText,
  useRef,
} from 'react';

import { AppRouter } from 'index';
import { IconType } from 'react-icons';
import { CgFolderAdd } from 'react-icons/cg';
import {
  FiHome,
  FiMenu,
  FiSettings,
  FiStar,
} from 'react-icons/fi';
import { MdOutlineMusicVideo } from 'react-icons/md';
import { Link } from 'react-router-dom';

import {
  Avatar,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

interface LinkItemProps {
  name: string;
  link: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, link: "/" },
  { name: "Add Packs", icon: CgFolderAdd, link: '/new-pack' },
  { name: "My Packs", icon: MdOutlineMusicVideo, link: "/pack"  },
  { name: "WishList", icon: FiStar, link: "/"  },
  { name: "Settings", icon: FiSettings, link: "/"  },
];

interface NavItemProps extends FlexProps {
  icon: IconType;
  link: string;
  children: ReactText;
}
const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  return (
    <Link to={link} >
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
  const {
    isOpen: isOpenRight,
    onOpen: onOpenRight,
    onClose: onCloseRight,
  } = useDisclosure();
  const btnRef = useRef();
  const btnRight = useRef();
  return (
    <>
      <Flex
        p={{base: "5", md: "3"}}
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
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color={useColorModeValue("black", "white")}>
            Kabaflow
          </Text>
        </HStack>

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
                "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
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
            {LinkItems.map((link) => (
              <NavItem link={link.link} key={link.name} icon={link.icon}>
                {link.name}
              </NavItem>
            ))}
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
          <DrawerHeader>User Name</DrawerHeader>

          <DrawerBody>My details</DrawerBody>

          <DrawerFooter>Sign out</DrawerFooter>
        </DrawerContent>
      </Drawer>
      <AppRouter />
    </>
  );
};
