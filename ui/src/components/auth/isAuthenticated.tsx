import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from 'state/user';

import { useToast } from '@chakra-ui/react';

export const IsAuthenticated: React.FC = ({ children }) => {
  const { auth } = useAuth();
  const toast = useToast();
  const history = useNavigate();
  useEffect(() => {
    if (!auth) {
      toast({
        title: `Session expired`,
        description: "redirecting to Home page...",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
        variant: "subtle",
      });
      history("/", { replace: true });
    }
  }, [auth]);

  return <>{children}</>;
};
