import { MdClose } from "react-icons/md";
import "./Search.scss";
import prod from "../../../assets/products/earbuds-prod-1.webp";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import { fetchDataFromApi } from "../../../utils/api";

const Search = ({ setShowSearch }) => {
    const [query,setQuery] = useState("")
    const [data,setData] = useState([])
    const navigate = useNavigate()

    const handleSearch = (e) => {
      setQuery(e.target.value)
    }

    useEffect(() => {
        if (query.length) {
          fetchSearchResults(query);
        } else {
          setData(null);
        }
      }, [query]);

    const fetchSearchResults = async(query) => {
        console.log(query);
        const data = await fetchDataFromApi(`/api/products?populate=*&filters[title][$contains]=${query}`)
        setData(data)
    }

    return (
        <div className="search-modal">
            <div className="form-field">
                <input type="text" value={query} onChange={handleSearch} autoFocus placeholder="Search for products" />
                <MdClose onClick={() => setShowSearch(false)} />
            </div>
            <div className="search-result-content">
                <div className="search-results">
                    {
                        data?.data?.map(item => (
                            <div key={item.id} className="search-result-item" onClick={() => {
                                setShowSearch(false)
                                navigate("/product/" + item.id)
                            }}>
                            <div className="img-container">
                                <img src={process.env.REACT_APP_DEV_URL + item.attributes.image.data[0].attributes.url} alt="" />
                            </div>
                            <div className="prod-details">
                                <span className="name">{item.attributes.title}</span>
                                <span className="desc">{item.attributes.description}</span>
                            </div>
                        </div>
                        ))
                    }
                   
                </div>
            </div>
        </div>
    );
};

export default Search;
