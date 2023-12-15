import { Routes, Route } from "react-router-dom"
import './App.css'
import { FirstLoading } from "./pages/FirstLoading"
import { ProfileData } from "./pages/ProfileData"
import { NewsItem } from "./pages/NewsItem"
import { NotFound } from "./pages/NotFound"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<FirstLoading />}></Route>
        <Route path="/news" element={<ProfileData />}></Route>
        <Route path="/news/:id" element={<NewsItem />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  )
}

export default App
