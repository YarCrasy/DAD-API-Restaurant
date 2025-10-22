import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import MenuPage from './pages/menuPage/MenuPage'

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MenuPage />} />
                    <Route path="*" element={<h2>Página no encontrada</h2>} />
                </Routes>
            </BrowserRouter>
            
        </>
    )
}

export default App
