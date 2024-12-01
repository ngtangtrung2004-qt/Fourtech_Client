import { useEffect, useState } from 'react'
import './Category.css'
import CategoryService from '../../services/categoryService'
import { Link } from 'react-router-dom';

function Category() {

    const [category, setCategory] = useState([]);

    useEffect(() => {
        fetchAPICategory()
    }, [

    ])

    const fetchAPICategory = async () => {
        const dataCategory = await CategoryService.getAllCategory();
        setCategory(dataCategory.data);
    }

    return (
        <>
            <div className="product-grid">
                {category && category.map((item) => (
                    <Link to={`/allproduct?category=${item.name}`} key={item.id}>
                        <div className="product-item">
                            <img src={import.meta.env.VITE_API_URL + '/uploads/' + item.image} />
                            <p>{item.name}</p>
                        </div>
                    </Link>
                ))}
            </div>

        </>
    )
}

export default Category;