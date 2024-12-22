import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MessagePage from './pages/MessagePage';

const App = () => {
    return (
        <Router>
            <div>
                <header></header>
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/message/:userId" element={<MessagePage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
