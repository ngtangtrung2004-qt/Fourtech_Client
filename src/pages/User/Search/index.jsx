import  { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Product_item from '../../../components/Item_Mouse/Item_Mouse';
function SearchProducts() {
    const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [results, setResults] = useState([]);
  console.log('kết quả',query)

  useEffect(() => {
    if (query) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/search?query=${query}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          console.error('Lỗi khi tìm kiếm:', error);
        });
    }
  }, [query]);
    return ( <>
    <div>
      <h2>Kết quả tìm kiếm cho: {query}</h2>
      {results.length > 0 ?(

        <Product_item data={results}></Product_item>
        
      // <ul>
      //   {results.map((product) => (
      //     <li key={product.id}>
      //       <h3>{product.name}</h3>
      //       <p>{product.description}</p>
      //       <p>Giá: {product.price}₫</p>
      //     </li>
      //   ))}
      // </ul>
      ):(
        <p>Khong tim thay ket qua nao</p>
      )}
    </div>
    </> );
}

export default SearchProducts;