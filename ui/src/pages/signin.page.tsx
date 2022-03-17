import {
  useEffect,
  useReducer,
  useState,
} from 'react';

import axios from 'axios';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import {
  Link as Router,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  useAccess,
  useAuth,
  useUser,
} from 'state/user';

import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Skeleton,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useNavigate();
  let { state: location } = useLocation();
  let from = (location as any)?.from?.pathname || "/";
  const auth = useAuth.getState().auth;
  const { login, logout } = useAuth();
  const setUser = useUser((state) => state.setUser);
  const { setAccess, clearAccess } = useAccess();

  async function isLoggedIn() {
    try {
      const resp = await axios.get("/auth/isLoggedIn");
      console.log("isloggedin", resp);
      resp?.data?.id ? login() : logout();
      resp?.data?.id ? setUser(resp.data) : setUser({});
      await setAccess();
    } catch (e) {
      logout();
      setUser({});
      clearAccess();
    }
  }

  useEffect(() => {
    if (!auth) {
      isLoggedIn();
    }
  }, []);

  useEffect(() => {
    if (auth) {
      toast({
        title: `login sucessful`,
        description: "redirecting to user dashboard...",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
        variant: "left-accent",
      });
      isLoggedIn();
      history(from, { replace: true });
    }
  }, [auth, toast, history, from]);

  const reducer = (state, action) => {
    return { ...state, ...action };
  };
  const [form, dispatch] = useReducer(reducer, {});
  let backend = "";
  if (window.location.href.indexOf("localhost") >= 0) {
    backend = "http://localhost:3000";
  } else {
    backend = "";
  }
  const googleLogin = async () => {
    window.open(`${backend}/auth/google`, "_self");
  };

  const facebookLogin = () => {
    window.open(`${backend}/auth/facebook`, "_self");
  };

  const emailLogin = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const resp = await axios.post("/auth/login", form);
      console.log(resp);
      if (resp.status === 200) {
        console.log(resp.statusText);
      }
      login();
    } catch (err) {
      toast({
        title: `login failed`,
        description: err.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
        variant: "left-accent",
      });
      console.log(err);
    }
    setTimeout(() => setLoading(false), 1000);
  };

  const onChange = (event) => {
    event.preventDefault();
    dispatch({
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} py={12} px={6} w={"container.md"}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Kabaflow</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            SignIn
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          minBlockSize={"auto"}
        >
          {loading ? (
            <Stack>
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Stack>
          ) : (
            <form onSubmit={emailLogin}>
              <Stack w={"100%"} spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" name="email" onBlur={onChange} />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input type="password" name="password" onBlur={onChange} />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Link color={"blue.400"}>Forgot password?</Link>
                  </Stack>
                  <Stack spacing="3" align="center">
                    <Button
                      w="100%"
                      variant="solid"
                      color={"white"}
                      type="submit"
                    >
                      Sign in
                    </Button>
                    <Divider borderColor="#333" />
                    <Button
                      w="100%"
                      aria-label="fb"
                      variant={"outline"}
                      colorScheme={"facebook"}
                      leftIcon={<FaFacebook />}
                      onClick={facebookLogin}
                    >
                      Signin with Facebook
                    </Button>
                    <Button
                      w="100%"
                      aria-label="google"
                      variant={"outline"}
                      leftIcon={<FcGoogle />}
                      onClick={googleLogin}
                    >
                      Sign in with Google
                    </Button>
                    <Flex alignItems={"baseline"} justifyContent={"baseline"}>
                      <Text>Dont have an account?</Text>
                      <Spacer w={"2"} />
                      <Link as={Router} to="/signup">
                        Sign up now
                      </Link>
                    </Flex>
                  </Stack>
                </Stack>
              </Stack>
            </form>
          )}
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignIn;
