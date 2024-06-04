import "./Category.scss";
import Products from "../Products/Products"
import { useDispatch, useSelector } from "react-redux";
import {selectCategoryProducts,fetchCategoryProducts} from "../../redux/slicers/categoryProductsSlicer"
import { useEffect } from "react";
import { useParams } from "react-router-dom";


const Category = () => {
    const dispatch = useDispatch()
    const data = useSelector(selectCategoryProducts)
    const {id} = useParams();
    

    useEffect(() => {
        if (id) {
            dispatch(fetchCategoryProducts(id));
          }
    } , [dispatch,id])
  
    return (
        <div className="category-main-content">
            <div className="layout">
                <div className="category-title">
                    {data?.data[0].attributes.categories.data[0].attributes.title}
                </div>
                <Products products={data} innerpage={true}/>
            </div>
        </div>
    )
};

export default Category;
