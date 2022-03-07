import { AppRouter } from 'index';

const Dashboard = () => {
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

  return (
    <>
      <h4>Kabaflow Dashboard</h4>
      <AppRouter />
    </>
  );
};

export default Dashboard;
