import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
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
