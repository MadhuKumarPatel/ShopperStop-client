import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./components/Home/Home";
import Category from "./components/Category/Category"
import SingleProduct from "./components/SingleProduct/SingleProduct"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer";
import Newsletter from "./components/Footer/Newsletter/Newsletter"
import LoginPage from "./components/Login/Login";
import { selectUsers } from "./redux/slicers/userSlice";
import { useSelector } from "react-redux";
import Success from "./components/Success/Success";

const Layout = ({ children }) => (
    <>
        <Header />
        {children}
        <Newsletter />
        <Footer />
    </>
);

function App() {

    const user = useSelector(selectUsers);

    return (
        <>
        {
            user.currentUser ?
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout><Home /></Layout>} />
                        <Route path="/category/:id" element={<Layout><Category /></Layout>} />
                        <Route path="/product/:id" element={<Layout><SingleProduct /></Layout>} />
                        <Route path="/success"  element={<Success/>}/>
                    </Routes>
                </BrowserRouter>
                :
                <LoginPage />
        }
        </>
    )
}

export default App;
