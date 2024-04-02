
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const user = jwtDecode(localStorage.getItem("token"));
    setUserName(user.name);
    setUserRole(user.role);
    setUserId(user.id);
  }, []);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage && isImageAllowed(selectedImage.name)) {
      setImage(selectedImage);
    } else {
      alert("Please select a valid image file (jpg, png, jpeg)");
    }
  };

  const isImageAllowed = (fileName) => {
    const allowedExtensions = ["jpg", "jpeg", "png"];
    const extension = fileName.split(".").pop().toLowerCase();
    return allowedExtensions.includes(extension);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="text-center">
                <label htmlFor="fileInput">
                  <img
                    src={image ? URL.createObjectURL(image) : require("../../images/profile.jpg")}
                    className="profile rounded-circle mb-3"
                    alt="profile"
                  />
                </label>
                <input id="fileInput" type="file" accept=".jpg, .jpeg, .png" onChange={handleImageChange} style={{ display: "none" }} />
              </div>
              <h2 className="text-center mb-4">
                Name: <span className="text-success">{userName}</span>
              </h2>
              <h6 className="text-center mb-3">
                ID: <span className="text-success">{userId}</span>
              </h6>
              <h5 className="text-center mb-3">
                Role: <span className="text-success">{userRole}</span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

