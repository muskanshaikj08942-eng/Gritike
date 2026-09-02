import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const savedUser = localStorage.getItem("user");

  if (!savedUser) {
    navigate("/login");
    return null;
  }

  const user = JSON.parse(savedUser);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <main className="profile-page">

      <section className="profile-container">

        <p className="profile-label">
          GRITIKE ACCOUNT
        </p>

        <h1>
          My <span>Profile</span>
        </h1>

        <p className="profile-subtitle">
          Manage your Gritike account information.
        </p>


        <div className="profile-card">

          <div className="profile-avatar">
            {user.name
              ? user.name.charAt(0).toUpperCase()
              : "G"}
          </div>


          <div className="profile-info">

            <div className="profile-item">
              <span>Name</span>
              <strong>
                {user.name || "Not available"}
              </strong>
            </div>


            <div className="profile-item">
              <span>Email Address</span>
              <strong>
                {user.email || "Not available"}
              </strong>
            </div>


            <div className="profile-item">
              <span>Role</span>
              <strong>
                {user.role || "USER"}
              </strong>
            </div>

          </div>


          <div className="profile-actions">

            <Link
              to="/"
              className="profile-home-btn"
            >
              Back to Home
            </Link>

            <button
              onClick={handleLogout}
              className="profile-logout-btn"
            >
              Logout
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Profile;