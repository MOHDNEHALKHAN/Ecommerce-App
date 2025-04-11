import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import '../index.css'

export default function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        selectedCategory === 'all'
          ? 'https://fakestoreapi.com/products'
          : `https://fakestoreapi.com/products/category/${selectedCategory}`
      )
      const data = await res.json()
      setProducts(data)
    }

    fetchProducts()
  }, [selectedCategory])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(setCategories)
  }, [])

  return (
    <div className="home">
      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="all">All</option>
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>
      <div className="grid">
        {products.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="card">
            <img src={product.image} alt={product.title} />
            <h4>{product.title}</h4>
            <p>${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
