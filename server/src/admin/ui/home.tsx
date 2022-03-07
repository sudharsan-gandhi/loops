import { useEffect } from 'react';

import { useCurrentAdmin } from 'adminjs';
import axios from 'axios';

const Home = () => {
  const [currentAdmin, setCurrentAdmin] = useCurrentAdmin();

  useEffect(() => {
    axios({
      method: 'get',
      url: '/auth/isLoggedIn',
      withCredentials: true,
    })
      .then((response) => {
        debugger;
        console.log(response.data);
        setCurrentAdmin(response.data);
      })
      .catch((err) => {
        console.error(err);
        debugger;
        window.location.href = window.location.origin + "/signin"
      });
  }, []);

  return <h4>Kabaflow Dashboard</h4>;
};

export default Home;
