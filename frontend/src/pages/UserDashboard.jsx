
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./UserDashboard.css";

function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    try {
      setUser(JSON.parse(savedUser));
    } catch (error) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return (
      <main className="user-dashboard-page">
        <div className="user-dashboard-loading">
          Loading...
        </div>
      </main>
    );
  }

  return (
    <main className="user-dashboard-page">

      {/* HEADER */}
      <section className="user-dashboard-header">

        <div>
          <p className="user-dashboard-label">
            GRITIKE ACCOUNT
          </p>

          <h1>
            Welcome, <span>{user.name || "User"}</span>
          </h1>

          <p className="user-dashboard-subtitle">
            Manage your account, orders and shopping activity.
          </p>
        </div>

        <button
          className="user-dashboard-logout"
          onClick={handleLogout}
        >
          Logout
        </button>

      </section>


      {/* QUICK ACTIONS */}
      <section className="user-dashboard-content">

        <p className="user-section-label">
          MY ACCOUNT
        </p>

        <h2>
          Account Overview
        </h2>


        <div className="user-dashboard-cards">

          {/* PROFILE */}
          <Link
            to="/profile"
            className="user-dashboard-card"
          >
            <div className="user-card-icon">
              01
            </div>

            <div>
              <h3>My Profile</h3>

              <p>
                View and manage your personal account information.
              </p>
            </div>

            <span className="user-card-arrow">
              →
            </span>
          </Link>


          {/* ORDERS */}
          <Link
            to="/orders"
            className="user-dashboard-card"
          >
            <div className="user-card-icon">
              02
            </div>

            <div>
              <h3>My Orders</h3>

              <p>
                View your previous orders and track your purchases.
              </p>
            </div>

            <span className="user-card-arrow">
              →
            </span>
          </Link>


          {/* CART */}
          <Link
            to="/cart"
            className="user-dashboard-card"
          >
            <div className="user-card-icon">
              03
            </div>

            <div>
              <h3>My Cart</h3>

              <p>
                Review the products you've selected for purchase.
              </p>
            </div>

            <span className="user-card-arrow">
              →
            </span>
          </Link>


          {/* COLLECTION */}
          <Link
            to="/products"
            className="user-dashboard-card"
          >
            <div className="user-card-icon">
              04
            </div>

            <div>
              <h3>Explore Collection</h3>

              <p>
                Discover the latest GRITIKE fashion collection.
              </p>
            </div>

            <span className="user-card-arrow">
              →
            </span>
          </Link>

        </div>


        {/* ACCOUNT INFORMATION */}
        <section className="user-account-info">

          <div>
            <p>ACCOUNT NAME</p>
            <strong>
              {user.name || "Not available"}
            </strong>
          </div>

          <div>
            <p>EMAIL ADDRESS</p>
            <strong>
              {user.email || "Not available"}
            </strong>
          </div>

          <div>
            <p>ACCOUNT TYPE</p>
            <strong>
              {user.role || "USER"}
            </strong>
          </div>

        </section>

      </section>

    </main>
  );
}

export default UserDashboard;

