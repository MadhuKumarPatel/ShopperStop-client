import { useDispatch,useSelector } from "react-redux";
import Products from "../../Products/Products"
import { fetchRelatedProducts, selectRelatedProducts} from "../../../redux/slicers/relatedProductsSlicer"; 
import { useEffect } from "react";

const RelatedProducts = ({productId,categoryId}) => {

    const dispatch = useDispatch()
    const data = useSelector(selectRelatedProducts)
    
    useEffect(() => {
        dispatch(fetchRelatedProducts({productId,categoryId}))
    } , [dispatch,productId,categoryId])

    return (
        <div className="related-products">
            <Products products={data} headingText="Related Products"/>
        </div>
    )
};

export default RelatedProducts;
