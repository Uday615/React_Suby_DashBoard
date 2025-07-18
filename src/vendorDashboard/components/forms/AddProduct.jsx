
import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((cat) => cat !== value));
    } else {
      setCategory([...category, value]);
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    } else {
      setImage(null);
    }
  }
  const handleBestSellerChange = (e) => {
    const value = e.target.value === 'true';
    setBestSeller(value);
  }


  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem('loginToken');
      if (!loginToken) {
        console.error("No login token found");
        return;
      }
      const firmId = localStorage.getItem('firmId');
      if (!firmId) {
        console.error("No firm ID found");
        return;
      }
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', price);
      if (image) {
        formData.append('image', image);
      }
      formData.append('description', description);
      category.forEach((cat) => {
        formData.append('category', cat);
      });
      formData.append('bestSeller', bestSeller);

      
      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: 'POST',
        headers: {
          'token': loginToken
        },
        body: formData
      });
      
      const data = await response.json();
      if (response.ok) {
        console.log("Product added successfully:", data);
        alert('Product added successfully');
        setProductName('');
        setPrice('');
        setCategory([]);
        setBestSeller(false);
        setImage(null);
        setDescription('');
        document.querySelector('.tableForm input[type="file"]').value = null;
      } else {
        console.error("Failed to add product:", data.message);
        alert(`Failed to add product: ${data.message}`);
      }
    } catch (err) {
      console.error("Error adding product:", err);

    }
    

  }

  return (
    <div className="firmSection">
        <form className="tableForm" onSubmit={handleAddProduct}>
            <h3>Add Product</h3>
            <label>Product Name</label>
            <input type="text" value={productName} onChange={(e)=>setProductName(e.target.value)} placeholder='Enter Product Name' required />
            <label>Price</label>
            <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder='Enter Price' required />
            <div className="checkInp"> 

          <label>Category</label>
          <div className="inputsContainer">
            <div className="checkBoxContainer">
            <label>Veg</label>
            <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={handleCategoryChange}/>
            </div>
          <div className="checkBoxContainer">
            <label>Non-Veg</label>
            <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange}/>
          </div>
          </div>
        </div>
        <div className="checkInp">
          <label>Best Seller</label>
          <div className="inputsContainer">
            <div className="checkBoxContainer">
            <label>Yes</label>
            <input type="radio" value="true" checked={bestSeller===true} onChange={handleBestSellerChange}/>
            </div>
            </div>
            <div className="inputsContainer">
            <div className="checkBoxContainer">
            <label>No</label>
            <input type="radio" value="false" checked={bestSeller===false} onChange={handleBestSellerChange}/>
            </div>
            </div>
        </div>
            <label>Image</label>
            <input type="file" onChange={handleImageChange} />
            
            <label>Description</label>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Enter Description' required />
            <br/>
            <div className="btnSubmit">
                <button type='submit'>Add Product</button>
            </div>
        </form>
    </div>
  )
}

export default AddProduct