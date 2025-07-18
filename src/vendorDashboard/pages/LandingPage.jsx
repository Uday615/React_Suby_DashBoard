import React,{useState,useEffect} from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import AllProducts from '../components/AllProducts'

const LandingPage = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [showRegister, setShowRegister] = useState(false);
    const [showAddFirm, setShowAddFirm] = useState(false);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showAllProducts, setShowAllProducts] = useState(false);
    const [showLogOut, setShowLogOut] = useState(false);
    const [firmId, setFirmId] = useState(null);
    const [firmName, setFirmName] = useState("");
    const [showFirmTitle, setShowFirmTitle] = useState(true);

    useEffect(() => {
        const loginToken= localStorage.getItem('loginToken');
        if (loginToken) {
            setShowLogin(false);
            setShowRegister(false);
            setShowAddFirm(false);
            setShowAddProduct(false);
            setShowLogOut(true);
            const storedFirmId = localStorage.getItem('firmId');
            const storedFirmName = localStorage.getItem('firmName');
            if (storedFirmId) {
                setFirmId(storedFirmId);
            }
            if (storedFirmName) {
                setFirmName(storedFirmName);
            }
        } else {
            setShowLogin(true);
        }
    }, []);

    useEffect(() => {
        const firmname= localStorage.getItem('firmName');
        if (firmname) {
            setShowFirmTitle(false);
        } 
    },[])
    
    const showLoginHandler = () => {
        setShowLogin(true);
        setShowRegister(false);
        setShowAddFirm(false);
        setShowAddProduct(false);
        setShowAllProducts(false);
    };
    const showRegisterHandler = () => {
        setShowRegister(true);
        setShowLogin(false);
        setShowAddFirm(false);
        setShowAddProduct(false);
        setShowAllProducts(false);
    };
    const showAddFirmHandler = () => {
        if(showLogOut)
        {
            setShowAddFirm(true);
        setShowLogin(false);
        setShowRegister(false);
        setShowAddProduct(false);
        setShowAllProducts(false);
    }
    else{
        alert("Please login to add a firm");
        setShowLogin(true);
    }
    };
    const showAddProductHandler = () => {
        if(showLogOut)
        {
        setShowAddProduct(true);
        setShowLogin(false);
        setShowRegister(false);
        setShowAddFirm(false);
        setShowAllProducts(false);
        }
        else{
            alert("Please login to add a product");
            setShowLogin(true);
        }
    };
    const showAllProductsHandler = () => {
        if(showLogOut){
        setShowAllProducts(true);
        setShowLogin(false);
        setShowRegister(false);
        setShowAddFirm(false);
        setShowAddProduct(false);
        }
        else{
            alert("Please login to view all products");
            setShowLogin(true);
        }
    };

    const showWelcomeHandler = (firmId, firmName) => {
        setFirmId(firmId);
        setFirmName(firmName);
        localStorage.setItem('firmId', firmId);
        localStorage.setItem('firmName', firmName);
        setShowAllProducts(true);
        setShowLogin(false);
        setShowLogOut(true);
    }

    const logoutHandler = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.removeItem('loginToken');
            localStorage.removeItem('firmId');
            localStorage.removeItem('firmName');
            setShowLogOut(false);
            setShowLogin(true);
            setShowRegister(false);
            setShowAddFirm(false);
            setShowAddProduct(false);
            setShowAllProducts(false);
            setFirmId(null);
            setShowFirmTitle(true);
        }
    }

  return (
    <>
    <section className='landingsection'>
        <NavBar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} showLogOut={showLogOut} logoutHandler={logoutHandler} />
        <div className="collectionSection">
        <SideBar showAddFirmHandler={showAddFirmHandler} showAddProductHandler={showAddProductHandler} showAllProductsHandler={showAllProductsHandler} showFirmTitle={showFirmTitle}/>
        {showLogin &&  <Login showWelcomeHandler={showWelcomeHandler}/>}
        {showRegister && <Register showLoginHandler={showLoginHandler} /> }
        {showAddFirm && showLogOut && <AddFirm />}
        {showAddProduct && showLogOut && <AddProduct /> }
        {showAllProducts && showLogOut &&  firmId && <AllProducts firmId={firmId} showAllProducts={showAllProducts} />}
        </div>
    </section>
    </>
  )
}

export default LandingPage