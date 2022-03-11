import { ShowPack } from 'components/audio/pack.show';
import EditUser from 'components/user/user.edit';
import Home from 'pages/home.page';
import JobsPage from 'pages/job.page';
import { NewAudioPage } from 'pages/newAudio.page';
import { PackPage } from 'pages/pack.page';
import { ExploreAudio } from 'pages/pack/audio.explore';
import { ExplorePacks } from 'pages/pack/pack.explore';
import { PayplanPage } from 'pages/payplan.page';
import SignIn from 'pages/signin.page';
import SignUp from 'pages/signup.page';
import {
  Route,
  Routes,
} from 'react-router-dom';
import {
  LoadAuth,
  RequireAuth,
} from 'state/user';

export const UserRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LoadAuth>
            <Home />
          </LoadAuth>
        }
      />
      <Route path="signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="explore" element={<ExplorePacks />} />
      <Route path="explore/audio" element={<ExploreAudio />} />
      <Route
        path="profile"
        element={
          <RequireAuth>
            <EditUser />
          </RequireAuth>
        }
      />
      <Route
        path="pack"
        element={
          <RequireAuth>
            <PackPage />
          </RequireAuth>
        }
      />

      <Route
        path="pack/:id"
        element={
          <LoadAuth>
            <ShowPack />
          </LoadAuth>
        }
      />
      <Route
        path="new-pack"
        element={
          <RequireAuth>
            <NewAudioPage />
          </RequireAuth>
        }
      />
      <Route path="payplans" element={<PayplanPage />} />
      <Route path="jobs" element={<JobsPage />} />
    </Routes>
  );
};
