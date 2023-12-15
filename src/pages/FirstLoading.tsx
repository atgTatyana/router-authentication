import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface IForm {
  login: string,
  password: string,
}

const url = 'http://localhost:7070/auth';

export const FirstLoading = () => {
  const navigate = useNavigate();

  const user = localStorage.getItem('profile');
  const userToken = localStorage.getItem('token');

  useEffect(() => {
    if (user && userToken) {
      navigate("/news");
    }
  }, []);

  const [form, setForm] = useState<IForm>({
    login: "",
    password: "",
  });
  const { login, password } = form;

  const authentication = async (form: IForm) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        localStorage.setItem('token', data.token);
        navigate("/news");
      }
      
    } catch (e) {
      console.log(e);
    }
  }
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form data:", form);
    authentication(form);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value} = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <>
      {!user && (
        <>
          <div className="authentication">
            <h3>Neto Social</h3>
            <form onSubmit={handleSubmit}>
              <input className="input" name="login" type="text" value={login}
                placeholder="Username" onChange={handleChange} required />
              <input className="input" name="password" type="password" value={password}
                placeholder="Password" onChange={handleChange} required />
              <button className="login" type="submit">Login</button>
            </form>
          </div>
          <div className="news">
            <h1>Neto Social</h1>
            <p>Facebook and VK killer</p>
          </div>
        </>
      )} 
    </>
  )
}
