import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath'
const AddFirm = () => {
  const [firmName, setFirmName] = useState('');
  const [firmArea, setFirmArea] = useState('');
  const [firmCategory, setFirmCategory] = useState([]);
  const [firmRegion, setFirmRegion] = useState([]);
  const [firmOffer, setFirmOffer] = useState('');
  const [firmImages, setFirmImages] = useState([]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (firmCategory.includes(value)) {
      setFirmCategory(firmCategory.filter((category) => category !== value));
    } else {
      setFirmCategory([...firmCategory, value]);
    }
  }
  const handleRegionChange = (e) => {
    const value = e.target.value;
    if (firmRegion.includes(value)) {
      setFirmRegion(firmRegion.filter((category) => category !== value));
    } else {
      setFirmRegion([...firmRegion, value]);
    }
  }
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFirmImages(files);
  }
  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem('loginToken');
      if (!loginToken) {
        console.error("No login token found");
        return;
      }
      const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('firmArea', firmArea);
      firmCategory.forEach((category) => {
        formData.append('firmCategory', category)
      });
      firmRegion.forEach((region) => {
        formData.append('firmRegion', region)
      });
      formData.append('firmOffer', firmOffer);
      firmImages.forEach((image) => {
        formData.append('firmImages', image);
      });
      
      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: 'POST',
        headers: {
          'token': loginToken
        },
        body: formData
      });
      const data = await response.json()
      if (response.ok) {
        console.log(data);
        // Reset form fields
        alert("Firm added successfully");
        setFirmName('');
        setFirmArea('');
        setFirmCategory([]);
        setFirmRegion([]);
        setFirmOffer('');
        setFirmImages([]);
        const firmId = data.firmId;
        localStorage.setItem('firmId', firmId);
      } else if(data.message === 'Vendor already has a firm') {
        alert("You already have a firm. Please delete the existing firm before adding a new one.");
      }
      else {
        console.error("Failed to add firm:");
      }
    }
    catch (err) {
      console.error("Error adding firm:", err);
    }
  }
  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleFirmSubmit}>
        <h3>Add Firm</h3>
        <label>Firm Name</label>
        <input type="text" name="firmName" value={firmName} onChange={(e) => setFirmName(e.target.value)} placeholder='Enter Firm Name' required />
        <label>Firm Area</label>
        <input type="text" name="firmArea" value={firmArea} onChange={(e) => setFirmArea(e.target.value)} placeholder='Enter Firm Area' required />
        <div className="checkInp">
          <label>Category</label>
          <div className="inputsContainer">
            <div className="checkBoxContainer">
              <label>Veg</label>
              <input type="checkbox" checked={firmCategory.includes('veg')} value="veg" onChange={handleCategoryChange} />
            </div>
            <div className="checkBoxContainer">
              <label>Non-Veg</label>
              <input type="checkbox" checked={firmCategory.includes('non-veg')} value="non-veg" onChange={handleCategoryChange} />
            </div>
          </div>
        </div>
        <div className="checkInp">
          <label>Region</label>
          <div className="inputsContainer">
            <div className="regBoxContainer">
              <label>South Indian </label>
              <input type="checkbox" checked={firmRegion.includes('south-indian')} value="south-indian" onChange={handleRegionChange} />
            </div>
            <div className="regBoxContainer">
              <label>North Indian</label>
              <input type="checkbox" checked={firmRegion.includes('north-indian')} value="north-indian" onChange={handleRegionChange} />
            </div>
            <div className="regBoxContainer">
              <label>Chinese </label>
              <input type="checkbox" checked={firmRegion.includes('chinese')} value="chinese" onChange={handleRegionChange} />
            </div>
            <div className="regBoxContainer">
              <label>Bakery </label>
              <input type="checkbox" checked={firmRegion.includes('bakery')} value="bakery" onChange={handleRegionChange} />
            </div>
          </div>
        </div>
        <label>Firm Offer</label>
        <input type="text" name="firmOffer" value={firmOffer} onChange={(e) => setFirmOffer(e.target.value)} placeholder='Enter Firm Offer' required />
        <label>Firm Images</label>
        <input type="file" onChange={handleImageChange} multiple />
        <br />
        <div className="btnSubmit">
          <button type='submit'>Add Firm</button>
        </div>
      </form>
    </div>
  )
}

export default AddFirm