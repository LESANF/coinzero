import CoinLists from './Pages/CoinLists';
import Home from './Pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={Home} />
                <Route path="/coins" element={CoinLists} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
