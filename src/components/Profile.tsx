import { useNavigate } from "react-router-dom";
import { IProfile } from "../pages/ProfileData";
import { useEffect, useState } from "react";

const urlProfile = 'http://localhost:7070/private/me';

export const Profile = () => {
  const navigate = useNavigate();
  const [ profile, setProfile ] = useState<IProfile | null>(null);

  useEffect(() => {
    const userToken = localStorage.getItem('token') as string;
    getProfile(userToken);
  }, []);

  const getProfile = async (token: string) => {
    try {
      const responseProfile = await fetch(urlProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (responseProfile.status === 401) {
        console.log('responseProfile: Ошибка 401! (Unauthorized)');
        logout();
      }

      const data: IProfile = await responseProfile.json();
      console.log(data);
      setProfile(data);
      localStorage.setItem('profile', JSON.stringify(data));

    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
    navigate("/");
  }

  return (
    <>
      {profile && 
        <div className="authentication">
          <h3>Neto Social</h3>
          <div className="out">
            <div>Hello, {profile.name}</div>
            <img className="avatar" src={profile.avatar} alt={`${profile.name} avatar`} />
            <button className="logout" onClick={logout}>Logout</button>
          </div> 
        </div>
      }
    </>
  )
}
