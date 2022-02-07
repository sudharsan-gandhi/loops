import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { User } from 'queries';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import {
  Box,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';

// import {
//   createContext,
//   useState,
// } from 'react';

// export const AuthContext = createContext(false);

// export function useAuth() {
//   const [auth, setAuth] = useState(false);

//   return {
//     auth,
//     login() {
//       setAuth(true);
//     },
//     logout() {
//       setAuth(false);
//     },
//   };
// }

export const LoadAuth: React.FC = ({ children }: { children: JSX.Element }) => {
  const { auth, login } = useAuth();

  const [loading, setLoading] = useState(true);
  const setUser = useUser((state) => state.setUser);

  useEffect(() => {
    if (auth) {
      setLoading(false);
    }
  }, [auth]);

  useEffect(() => {
    if (!auth) {
      isLoggedIn();
    }
    async function isLoggedIn() {
      try {
        const resp = await axios.get("/auth/isLoggedIn");
        console.log("isloggedin", resp);
        login();
        setUser(resp.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
  }, []);

  if (loading) {
    return (
      <Box padding="6" boxShadow="lg" bg="white">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={6} spacing="4" />
      </Box>
    );
  }

  return children;
};

export const IsAuth: React.FC<{
  hide?: boolean;
  userId: string;
  children: JSX.Element;
}> = ({ hide = false, userId, children }) => {
  const { auth } = useAuth();
  const currentUser = useUser.getState().currentUser as User;
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (!auth || (auth && hide)) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [auth, currentUser?.id, hide, userId]);

  if (show) {
    return children;
  }
  return <></>;
};

export const IsOwn: React.FC<{
  hide?: boolean;
  userId: string;
  children: JSX.Element;
}> = ({ hide = false, userId, children }) => {
  const { auth } = useAuth();
  const currentUser = useUser.getState().currentUser as User;
  const [show, setShow] = useState(true);
  useEffect(() => {
    debugger;
    if (!auth || (auth && currentUser?.id === userId && hide)) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [auth, currentUser?.id, hide, userId]);

  if (show) {
    return children;
  }
  return <></>;
};

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { auth, login, logout } = useAuth();
  let location = useLocation();

  const [loading, setLoading] = useState(true);
  const setUser = useUser((state) => state.setUser);

  const history = useNavigate();

  useEffect(() => {
    if (auth) {
      setLoading(false);
    }
  }, [auth]);

  useEffect(() => {
    if (!auth) {
      isLoggedIn();
    }
    async function isLoggedIn() {
      try {
        const resp = await axios.get("/auth/isLoggedIn");
        console.log("isloggedin", resp);
        login();
        setUser(resp.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        logout();
        setUser({});
        console.log("auth error", err);
        history("/signin", { replace: true, state: { from: location } });
      }
    }
  }, []);

  if (loading) {
    return (
      <Box padding="6" boxShadow="lg" bg="white">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={6} spacing="4" />
      </Box>
    );
  }

  return children;
}

export const useAuth = create((set: any, get) => ({
  auth: false,
  login: () => set(() => ({ auth: true })),
  logout: () => set({ auth: false }),
}));

export const useUser = create(
  persist(
    (set: any) => ({
      currentUser: {},
      setUser: (currentUser) => set({ currentUser }),
    }),
    { name: "user" }
  )
);
