import {
  ReactElement,
  useEffect,
} from 'react';

import axios from 'axios';
import {
  Navigate,
  useNavigate,
} from 'react-router-dom';
import {
  useAuth,
  useUser,
} from 'state/user';

import { useToast } from '@chakra-ui/react';

export const IsLoggedIn: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  const { login, logout } = useAuth();
  const auth = useAuth.getState().auth;
  const setUser = useUser((state) => state.setUser);

  const toast = useToast();
  const history = useNavigate();

  async function isLoggedIn() {
    const resp = await axios.get("/auth/isLoggedIn");
    console.log("isloggedin", resp);
    resp?.data?.id ? login() : logout();
    resp?.data?.id ? setUser(resp.data) : setUser({});
  }

  try {
    if (!auth) {
      isLoggedIn();
    }
  } catch (e) {
    logout();
    setUser({});
  }

  useEffect(() => {
    if (auth) {
      toast({
        title: `login sucessful`,
        description: "redirecting to user dashboard...",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
        id: "login",
        variant: "left-accent",
      });
      history("/", { replace: true });
    }
  }, [auth]);

  return auth === false ? children : <Navigate to="/" replace />;
};
