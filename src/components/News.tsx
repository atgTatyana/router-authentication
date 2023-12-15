import { INews } from "../pages/ProfileData";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const urlNews = 'http://localhost:7070/private/news';

export const News = () => {
  const [ news, setNews ] = useState<INews[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem('token') as string;
    getNews(userToken);
  }, []);

  const getNews = async (token: string) => {
    const responseNews = await fetch(urlNews, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    if (responseNews.status === 401) {
      console.log('responseNews: Ошибка 401! (Unauthorized)');
      handleLogout();
    }

    const data = await responseNews.json();
    console.log(data)
    setNews(data);
  }

  const handleLogout = () => {
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
    navigate("/");
  }

  const handleNews = (id: string) => {
    navigate(`/news/${id}`)
  }

  return (
    <div className="cards">
      {news.map((item) => (
        <div className="card" key={item.id} onClick={() => handleNews(item.id)}>
          <img src={item.image} alt="news image" width='320px' height='240' />
          <h3 style={{padding: '20px', margin: 0}}>{item.title}</h3>
          <div style={{padding: '0 20px 20px'}}>{item.content}</div>
        </div>
      ))}
    </div>
  )
}
