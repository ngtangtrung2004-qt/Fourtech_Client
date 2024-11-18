import { useEffect, useState } from 'react'
import'./Category.css'
import CategoryService from '../../services/categoryService'

function Category (){

    const [category, setCategory] = useState([])

    useEffect(() =>  {
        fetchAPICategory()
    },  [
        
    ])

    const fetchAPICategory = async () => {
        const dataCategory = await CategoryService.getAllCategory();
        console.log(dataCategory.data);
        setCategory(dataCategory.data)
    }

    // const category = [
    //     {
    //         id: 1,
    //         name: 'Laptop',
    //         image:'../laptop.webp',
    //     },
    //     {
    //         id: 1,
    //         name: 'Laptop',
    //         image:'../laptop.webp',
    //     },
    //     {
    //         id: 1,
    //         name: 'Laptop',
    //         image:'../laptop.webp',
    //     },
    //     {
    //         id: 1,
    //         name: 'Laptop',
    //         image:'../laptop.webp',
    //     },
    //     {
    //         id: 1,
    //         name: 'Laptop',
    //         image:'../laptop.webp',
    //     },
    //     {
    //         id: 1,
    //         name: 'Laptop',
    //         image:'../laptop.webp',
    //     },    
    //     {
    //         id: 1,
    //         name: 'Laptop',
    //         image:'../laptop.webp',
    //     },
    //     {
    //         id: 1,
    //         name: 'Laptop',
    //         image:'../laptop.webp',
    //     },
    //     {
    //         id: 1,
    //         name: 'Laptop',
    //         image:'../laptop.webp',
    //     },
    //     {
    //         id: 1,
    //         name: 'Laptop',
    //         image:'../laptop.webp',
    //     },
    //     {
    //         id: 1,
    //         name: 'Laptop',
    //         image:'../laptop.webp',
    //     },
    //     {
    //         id: 1,
    //         name: 'Laptop',
    //         image:'../laptop.webp',
    //     },
    //     {
    //         id: 1,
    //         name: 'Laptop',
    //         image:'../laptop.webp',
    //     },
    //     {
    //         id: 1,
    //         name: 'Laptop',
    //         image:'../laptop.webp',
    //     },
        
    
    // ]
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