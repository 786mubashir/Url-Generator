// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import TabsComponent from "./TabsComponent/TabsComponent";
import DrawerComponent from "./DrawerComponent/DrawerComponent";
import HeaderComponent from "./HeaderComponent/HeaderComponent";

function App() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <Router>
            <div className='app-component'>
                <HeaderComponent />
                <DrawerComponent isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
                <Routes>
                    <Route path="/" element={<TabsComponent />} />
                    <Route path="/tab/:tabIndex" element={<TabsComponent />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
