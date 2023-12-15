import { Profile } from "../components/Profile";
import { News } from "../components/News";

export interface IProfile {
  id: string,
  login: string,
  name: string,
  avatar: string,
}

export interface INews {
  id: string,
  content: string,
  image: string,
  title: string,
}

export const ProfileData = () => {
  const userToken = localStorage.getItem('token') as string;

  return (
    <>
      {userToken && <Profile />}
      <News />
    </>
  )
}
