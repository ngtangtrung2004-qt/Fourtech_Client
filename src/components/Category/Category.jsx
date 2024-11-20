import { useEffect, useState } from 'react'
import './Category.css'
import CategoryService from '../../services/categoryService'

function Category() {

    const [category, setCategory] = useState([]);

    useEffect(() => {
        fetchAPICategory()
    }, [

    ])

    const fetchAPICategory = async () => {
        const dataCategory = await CategoryService.getAllCategory();
<<<<<<< HEAD
        console.log(dataCategory.data.data);
        setCategory(dataCategory.data)
=======
        console.log(dataCategory.data);
        setCategory(dataCategory.data);
>>>>>>> deb203552a2e29b6908d356a3e6609735254d42c
    }

    return (
        <>
            <div className="product-grid">
                {category.map((item) => (
                    <a key={item.id}>
                        <div className="product-item">
                            <img src={import.meta.env.VITE_API_URL + '/uploads/' + item.image} alt="Laptop" />
                            <p>{item.name}</p>
                        </div>
                    </a>
                ))}
            </div>

        </>
    )
}

export default Category;