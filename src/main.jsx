import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import CreateTrip from './pages/CreateTrip'
import ViewTrip from './pages/ViewTrip'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Header from './components/Header'
import { AuthProvider } from './context/AuthContext'

// Using HashRouter for GitHub Pages compatibility
function Root() {
    return (
        <HashRouter>
            <AuthProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/create-trip" element={<CreateTrip />} />
                    <Route path="/view-trip" element={<ViewTrip />} />
                </Routes>
            </AuthProvider>
        </HashRouter>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
)
