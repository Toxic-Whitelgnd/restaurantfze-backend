import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const FoodImageChange = () => {
    const { foodid } = useParams();
    const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
    //   reader.onloadend = () => {
    //     setSelectedImage(reader.result);
    //   };
    //   reader.readAsDataURL(file);
    setSelectedImage(file);
    }
  };

  const handleImageUpload = async () => {
    try {
        console.log(selectedImage.name);
      if (selectedImage) {
        // Post the Base64-encoded image to the Node.js server
        await axios.put(`https://restogenius.onrender.com/update-food-image/${foodid}`,{foodImage: selectedImage},
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        } );

        alert('Image uploaded successfully!');
        window.location.href = "/#/admin/edit-fooddata/"
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
    return (
        <div>
            <h1>Change your image here</h1>
            <div>
                <label>
                    Select Image:
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </label>

                {selectedImage && (
                    <div>
                       {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Food Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                    </div>
                )}

                <button onClick={handleImageUpload}>Upload Image</button>
            </div>
        </div>
    );
}

export default FoodImageChange;
