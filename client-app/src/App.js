import React, { Suspense, useLayoutEffect } from 'react'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';

// Preloader
const Preloader = React.lazy(() => import("./components/layouts/Preloader"));

// Pages
const Home = React.lazy(() => import("./components/pages/Home"));
const About = React.lazy(() => import("./components/pages/About"));
const Cart = React.lazy(() => import("./components/pages/Cart"));
const Checkout = React.lazy(() => import("./components/pages/Checkout"));
const Login = React.lazy(() => import("./components/pages/Login"));
const Register = React.lazy(() => import("./components/pages/Register"));
const Error = React.lazy(() => import("./components/pages/Error"));
const Shop = React.lazy(() => import("./components/pages/Shop"));
const Productsingle = React.lazy(() => import("./components/pages/Productsingle"));
const Contact = React.lazy(() => import("./components/pages/Contact"));
const Account = React.lazy(() => import("./components/pages/Account"));


// Admin Pages:
const AdminHome = React.lazy(() => import ("./components/pages/AdminHome"));
const UpcomingOrders = React.lazy(() => import ("./components/pages/UpcomingOrders"));
const Workers = React.lazy(() => import ("./components/pages/AdminWorkers"));
const FinishedOrders = React.lazy(() => import ("./components/pages/FinishedOrders"));
const AdminStorage = React.lazy(() => import ("./components/pages/AdminStorage"));
const FlowerPage = React.lazy(() => import ("./components/pages/FlowerPage"));
const BouquetPage = React.lazy(() => import ("./components/pages/BouquetPage"));
const NewFlower = React.lazy(() => import ("./components/pages/NewFlower"));

// Scroll to Top
const ScrollToTop = withRouter(({ children, location: { pathname } }) => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return children || null
})


function App() {
  return (
    <Router basename={'/'}>
      <Suspense fallback={<div></div>}>
        <ScrollToTop>
          <Preloader />
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/error" component={Error} />
          <Route path="/shop" component={Shop} />
          <Route path="/product-single/:id" component={Productsingle} />
          <Route path="/contact" component={Contact} />
          <Route path="/admin" component={AdminHome} />
          <Route path="/upcoming" component={UpcomingOrders} />
          <Route path="/finished" component={FinishedOrders} />
          <Route path="/workers" component={Workers} />
          <Route path="/storage" component={AdminStorage} />
          <Route path="/account" component={Account} />
          <Route path="/flower/:productId" component={FlowerPage}/>
          <Route path="/bouquet/:productId" component={BouquetPage}/>
          <Route path="/newflower" component={NewFlower}/>
        </ScrollToTop>
      </Suspense>
    </Router>
  );
}

export default App;
