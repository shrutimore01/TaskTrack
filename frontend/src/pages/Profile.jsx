import { useState } from "react";
import Layout from "../components/Layout";

function Profile() {
  const [profile, setProfile] = useState({
    name: "Shruti More",
    email: "shruti@taskflow.com",
    role: "Project Manager",
    photo: "",
  });

  const [formData, setFormData] = useState(profile);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setFormData({
        ...formData,
        photo: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setProfile(formData);
    setMessage("Profile updated successfully.");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleRemovePhoto = () => {
    setFormData({
      ...formData,
      photo: "",
    });
  };

  return (
    <Layout>
      <div className="profile-page">
        <div className="profile-page-header">
          <h1>My Profile</h1>
          <p>Manage your personal information and profile photo.</p>
        </div>

        {message && <div className="profile-message">{message}</div>}

        <form className="profile-panel" onSubmit={handleSubmit}>
          <div className="profile-photo-section">
            <div className="profile-photo">
              {formData.photo ? (
                <img src={formData.photo} alt="Profile preview" />
              ) : (
                <span>
                  {formData.name
                    .split(" ")
                    .map((word) => word.charAt(0))
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
              )}
            </div>

            <div className="profile-photo-details">
              <h2>Profile Photo</h2>
              <p>Upload a JPG or PNG profile image.</p>

              <div className="profile-photo-actions">
                <label className="upload-photo-button">
                  Upload Photo
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handlePhotoChange}
                  />
                </label>

                {formData.photo && (
                  <button
                    type="button"
                    className="remove-photo-button"
                    onClick={handleRemovePhoto}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="profile-divider"></div>

          <div className="profile-form-grid">
            <div className="profile-field">
              <label htmlFor="profile-name">Full Name</label>
              <input
                id="profile-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="profile-field">
              <label htmlFor="profile-email">Email Address</label>
              <input
                id="profile-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="profile-field">
              <label htmlFor="profile-role">Role</label>
              <input
                id="profile-role"
                type="text"
                value={formData.role}
                disabled
              />
              <small>Your role can only be changed by an administrator.</small>
            </div>
          </div>

          <div className="profile-form-actions">
            <button type="submit" className="update-profile-button">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Profile;