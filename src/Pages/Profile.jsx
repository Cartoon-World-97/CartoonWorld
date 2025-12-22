import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Card from "../components/Card/Card";
import ShimmerLine from "../utility/ShimmerLine";
import httpClient from "../services/httpClient";
import useLogin from "../hooks/Login";
import "./Profile.css";
import CartoonSlider from "./Slider";
const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [activePlan, setActivePlan] = useState(null);
  const [lowestPlan, setLowestPlan] = useState(null);
  const [watchHistory, setWatchHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isLogin = useLogin();

  useEffect(() => {
    if (!isLogin) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await httpClient.post("/profile");

        if (response.data && Array.isArray(response.data)) {
          const data = response.data;

          if (data[0] && data[0].Email && data[0].Name) {
            setUserInfo(data[0]);
          }

          if (data[1].ACtive_Plan && data[1].ACtive_Plan.length > 0) {
            setActivePlan(data[1].ACtive_Plan[0]);
          }else {
            setLowestPlan(data[1].Lowest_Price);
          }
          console.log("Profile Data:", lowestPlan);
          if (data[2] && data[2].History_Video) {
            setWatchHistory(data[2].History_Video);
          }

          setProfileData(data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isLogin]);


  const handleLoginClick = () => {
    navigate("/signin");
  };

  const handleUpgradePlan = () => {
    navigate("/plans");
  };

  // Calculate days remaining for active plan
  const getDaysRemaining = () => {
    if (!activePlan) return 0;
    
    const startDate = new Date(activePlan.Start_Date);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + activePlan.Duration);
    
    const today = new Date();
    const remaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
    
    return remaining > 0 ? remaining : 0;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <>
      {loading && <ShimmerLine loading={loading} />}

      <Header />

      <main className="profile-main-content">
        {!isLogin ? (
          // Not logged in state
          <div className="profile-login-prompt">
            <i className="fas fa-user-lock"></i>
            <h2>Please Login to View Profile</h2>
            <p>Sign in to access your account information and watch history</p>
            <button className="login-btn" onClick={handleLoginClick}>
              Login
            </button>
          </div>
        ) : loading ? (
          // Loading state
          <div className="profile-loading">
            <div className="spinner"></div>
            <p>Loading your profile...</p>
          </div>
        ) : (
          // Profile content
          <>
            {/* Profile Header */}
            <section className="profile-header">
              <div className="profile-avatar">
                <i className="fas fa-user-circle"></i>
              </div>
              <div className="profile-info">
                <h1 className="profile-name">{userInfo?.Name || "User"}</h1>
                <p className="profile-email">
                  <i className="fas fa-envelope"></i>
                  {userInfo?.Email || "No email provided"}
                </p>
              </div>
              {activePlan ? (
               <div className="text-center">
             <button className="logout-btn no-plan-logout" onClick={handleUpgradePlan}>
                ${activePlan.Price}
              </button>
              <br />
              <span> {getDaysRemaining()} Days Remaining to end your plan</span>
              </div>
              ) : (
                <div className="text-center">
             <button className="logout-btn no-plan-logout" onClick={handleUpgradePlan}>
                Subscribe
              </button>
              <br />
              <span>plans start at {lowestPlan}</span>
              </div>
              )}
            </section>
            {watchHistory.length > 0 && (
              <CartoonSlider cartoons={watchHistory} heading="Watch History" istitleCard={false} isCard={true} />
            )}
          </>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Profile;