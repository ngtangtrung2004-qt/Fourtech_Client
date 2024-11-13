import { useEffect } from 'react'
import'./Category.css'
import CategoryService from '../../services/categoryService'

function Category (){

    useEffect(() =>  {
        fetchAPICategory()
    },  [
        
    ])

    const fetchAPICategory = async () => {
        const dataCategory = await CategoryService.getAllCategory();

        console.log(dataCategory);
    }

    const category = [
        {
            id: 1,
            name: 'Laptop',
            image:'../laptop.webp',
        },
        {
            id: 1,
            name: 'Laptop',
            image:'../laptop.webp',
        },
        {
            id: 1,
            name: 'Laptop',
            image:'../laptop.webp',
        },
        {
            id: 1,
            name: 'Laptop',
            image:'../laptop.webp',
        },
        {
            id: 1,
            name: 'Laptop',
            image:'../laptop.webp',
        },
        {
            id: 1,
            name: 'Laptop',
            image:'../laptop.webp',
        },    
        {
            id: 1,
            name: 'Laptop',
            image:'../laptop.webp',
        },
        {
            id: 1,
            name: 'Laptop',
            image:'../laptop.webp',
        },
        {
            id: 1,
            name: 'Laptop',
            image:'../laptop.webp',
        },
        {
            id: 1,
            name: 'Laptop',
            image:'../laptop.webp',
        },
        {
            id: 1,
            name: 'Laptop',
            image:'../laptop.webp',
        },
        {
            id: 1,
            name: 'Laptop',
            image:'../laptop.webp',
        },
        {
            id: 1,
            name: 'Laptop',
            image:'../laptop.webp',
        },
        {
            id: 1,
            name: 'Laptop',
            image:'../laptop.webp',
        },
        
    
    ]
    return (
        <>
              <div className="product-grid">
                {category.map((item) => (
                    <a key={category.id}>
                        <div className="product-item">
                            <img src={item.image} alt="Laptop" />
                            <p>{item.name}</p>
                        </div>
                    </a>
                ))}
                </div>

        </>
    )
}

export default Category;