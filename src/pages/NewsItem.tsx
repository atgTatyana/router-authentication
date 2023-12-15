import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { INews } from "./ProfileData";

const urlNews = 'http://localhost:7070/private/news';

export const NewsItem = () => {
  const [ news, setNews ] = useState<INews | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    (async () => {
        const responseItem = await fetch(`${urlNews}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        
        if (responseItem.status === 401) {
          console.log('responseProfile: Ошибка 401! (Unauthorized)');
          localStorage.removeItem('profile');
          localStorage.removeItem('token');
          navigate("/");
        }

        if (responseItem.status === 404) {
          console.log('responseProfile: Ошибка 404! (Not Found)');
          navigate("*");
        }

        const data = await responseItem.json();
        setNews(data);
    })();  
  }, []);

  return (
    <>
      {news && 
        <div className="card" key={id}>
          <img src={news.image} alt="news image" width='320px' height='240' />
          <h3 style={{padding: '20px', margin: 0}}>{news.title}</h3>
          <div style={{padding: '0 20px 20px'}}>{news.content}</div>
        </div>
      }
    </>
  )
}
