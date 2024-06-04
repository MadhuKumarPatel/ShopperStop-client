import "./Home.scss";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";

import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, selectProducts, selectProductsLoading, selectProductsError} from '../../redux/slicers/productsSlicer';
import { useEffect } from "react";


const Home = () => {

  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  useEffect(() => {
      dispatch(fetchProducts());
    }, [dispatch]);

 
  return (
    <div>
      <Banner />
      <div className="main-content">
        <div className="layout">
          <Category />
          <Products products={products} headingText="Popular Products"/>
        </div>
      </div>
    </div>
  );
};

export default Home;
