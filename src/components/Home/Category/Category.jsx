import "./Category.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategory,
  selectCategories,
  selectCategoryLoading,
  selectCategoryError,
} from "../../../redux/slicers/categorySlicer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Category = () => {
  
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoryLoading)
  // const isLoading = useSelector(selectCategoryLoading);
  // const error = useSelector(selectCategoryError);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  // console.log(categories);

  if(isLoading){
    return <div className="shop-by-category">
    <span>Categories</span>
    <div className="categories">
       <p>Fetching Categories ...</p>
    </div>
  </div>
  }

  
  return (
    <div className="shop-by-category">
      <span>Categories</span>
      <div className="categories">
        {categories?.data?.map((item) => {
          return (
            <div key={item.id} className="category" onClick={()=> navigate(`/category/${item.id}`)}>
              <h1>

              </h1>
              <img src={item?.attributes?.image?.data?.attributes?.url} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
