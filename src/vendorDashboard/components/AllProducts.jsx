import React,{useState,useEffect} from 'react'
import {API_URL} from '../data/apiPath';


const AllProducts = ({ firmId, showAllProducts }) => {
    console.log("AllProducts rendered with firmId:", firmId);
    const [products, setProducts] = useState([]);

    const productHandler= async () => {
        if (!firmId) {
            console.log("firmId not available, returning");
            return;
        }
        try{
            const response = await fetch(`${API_URL}/product/${firmId}/products`);
            const newProductData= await response.json();
            setProducts(newProductData.products);
            console.log("Products fetched successfully:", newProductData.products);
                
        }
        catch(error) {
            console.error("Error fetching products:", error);
            alert("Failed to fetch products. Please try again later.");
        }
    }

    const handleDelete = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await fetch(`${API_URL}/product/${productId}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    setProducts(products.filter(product => product._id !== productId));
                    alert("Product deleted successfully");
                } else {
                    alert("Failed to delete product.");
                }
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Failed to delete product. Please try again later.");
            }
        }
    }
    useEffect(() => {
        productHandler();
        console.log("this is useEffect");
    }, [firmId, showAllProducts]);
  return (
    <div>
      { !products ? (
        <p> No Products added</p>) : (
        <table className='product-table'>
            <thead>
                <tr>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Image</th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => {
                    return (
                        <>
                <tr key={product._id}>
                    <td>{product.productName}</td>
                    <td>{product.productPrice}</td>
                    <td>{product.image && (
                        <img src={`${API_URL}/${product.image}`} alt={product.productName} style={{ width: '50px', height: '50px' }} />
                    )}</td>
                    <td>
                        <button onClick={() => handleDelete(product._id)}>Delete</button>
                    </td>
                </tr>
                </>
                    )
})}
            </tbody>
        </table>
      )}

    </div>

  )
}

export default AllProducts