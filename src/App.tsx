import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider } from '@mui/lab';

import MonthView from './components/monthView';
import './App.css';
import NavBar from "./components/navBar";


const App: React.FC = () => {

    return (
        <BrowserRouter>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className="App">
                    <NavBar/>
                    <Routes>
                        <Route element={<MonthView/>} path="/" />
                    </Routes>
                </div>
            </LocalizationProvider>
        </BrowserRouter>
    );
}

export default App;
