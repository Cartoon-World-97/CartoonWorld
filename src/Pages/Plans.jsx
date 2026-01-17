import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import httpClient from '../services/httpClient';
import ShimmerCard from '../utility/ShimmerCard';
import './Plans.css';

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [billingType, setBillingType] = useState('monthly');
  const navigate = useNavigate();

  // Fetch plans from API
  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const response = await httpClient.post('/plans/');
        if (response.data.status && response.data.content) {
          setPlans(response.data.content);
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // Toggle billing type
  const toggleBilling = () => {
    setBillingType(prev => prev === 'monthly' ? 'annual' : 'monthly');
  };

  // Calculate annual price (20% discount)
  const getAnnualPrice = (monthlyPrice) => {
    return Math.floor(monthlyPrice * 12 * 0.8);
  };

  // Get price based on billing type
  const getDisplayPrice = (price) => {
    if (price === 0) return 'Free';
    if (billingType === 'annual') {
      return `$${getAnnualPrice(price)}`;
    }
    return `$${price}`;
  };

  // Get duration text
  const getDurationText = () => {
    return billingType === 'annual' ? '/year' : '/month';
  };

  // Handle plan selection
  const handleSelectPlan = (plan) => {
    if (plan.Price === 0) {
      // Free plan - just navigate or show message
      alert(`You've selected the ${plan.Program_Name} plan!`);
    } else {
      // Paid plan - navigate to payment
      navigate(`/payments/${plan.Program_ID}`, { state: { plan, billingType } });
    }
  };

  // Get plan icon based on index or price
  const getPlanIcon = (index, price) => {
    if (price === 0) return 'fa-play-circle';
    if (index === 0 || index === 1) return 'fa-star';
    if (index === 2) return 'fa-crown';
    return 'fa-gift';
  };

  // Get plan color based on index
  const getPlanColor = (index) => {
    const colors = ['#4ecdc4', '#ff6b6b', '#ffd700', '#9b59b6', '#3498db', '#e74c3c', '#2ecc71'];
    return colors[index % colors.length];
  };

  // Check if plan is featured (second plan or highest price in paid plans)
  const isFeatured = (plan, index) => {
    const paidPlans = plans.filter(p => p.Price > 0);
    if (paidPlans.length === 0) return false;
    const highestPrice = Math.max(...paidPlans.map(p => p.Price));
    return plan.Price === highestPrice && plan.Price > 0;
  };

  return (
    <>
      <Header />

      <main className="plans-main-content">
        {/* Hero Section */}
        <section className="plans-hero">
          <h1>Choose Your Perfect Plan</h1>
          <p>Unlock unlimited entertainment for the whole family.</p>
        </section>

        {/* Billing Toggle */}
        <div className="billing-toggle">
          <span className={`toggle-label ${billingType === 'monthly' ? 'active' : ''}`}>
            Monthly
          </span>
          <div className="toggle-switch" onClick={toggleBilling}>
            <div className={`toggle-slider ${billingType === 'annual' ? 'active' : ''}`}></div>
          </div>
          <span className={`toggle-label ${billingType === 'annual' ? 'active' : ''}`}>
            Annual <span className="savings-badge">Save 20%</span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-container">
          {loading ? (
            // Show shimmer cards while loading
            [...Array(3)].map((_, index) => (
              <div key={index} className="plan-card-shimmer">
                <ShimmerCard />
              </div>
            ))
          ) : plans.length === 0 ? (
            // No plans available
            <div className="no-plans">
              <i className="fas fa-inbox"></i>
              <p>No plans available at the moment.</p>
            </div>
          ) : (
            // Display plans
            plans.map((plan, index) => (
              <div
                key={plan.Program_ID}
                className={`plan-card ${isFeatured(plan, index) ? 'featured' : ''}`}
              >
                {isFeatured(plan, index) && (
                  <span className="popular-badge">MOST POPULAR</span>
                )}

                <div className="plan-header">
                  <div className="plan-icon">
                    <i
                      className={`fas ${getPlanIcon(index, plan.Price)}`}
                      style={{ color: getPlanColor(index) }}
                    ></i>
                  </div>
                  <h3 className="plan-name">{plan.Program_Name}</h3>
                  <p className="plan-description">{plan.Program_Details}</p>
                </div>

                <div className="plan-pricing">
                  <div className="plan-price">
                    {plan.Price === 0 ? (
                      'Free'
                    ) : (
                      <>
                        {getDisplayPrice(plan.Price)}
                        <span className="plan-duration">{getDurationText()}</span>
                      </>
                    )}
                  </div>
                  {plan.prev_price > 0 && plan.Price > 0 && (
                    <div className="plan-original-price">
                      Was ${billingType === 'annual' ? getAnnualPrice(plan.prev_price) : plan.prev_price}
                    </div>
                  )}
                </div>

                <ul className="plan-features">
                  <li>
                    <i className="fas fa-check-circle"></i>
                    <span>{plan.Duration} days access</span>
                  </li>
                  <li>
                    <i className="fas fa-check-circle"></i>
                    <span>Full HD streaming</span>
                  </li>
                  <li>
                    <i className="fas fa-check-circle"></i>
                    <span>Ad-free experience</span>
                  </li>
                  <li>
                    <i className="fas fa-check-circle"></i>
                    <span>Multiple device support</span>
                  </li>
                  {plan.Price === 0 ? (
                    <>
                      <li className="unavailable">
                        <i className="fas fa-times-circle"></i>
                        <span>Download for offline viewing</span>
                      </li>
                      <li className="unavailable">
                        <i className="fas fa-times-circle"></i>
                        <span>4K Ultra HD quality</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <i className="fas fa-check-circle"></i>
                        <span>Download content</span>
                      </li>
                      <li>
                        <i className="fas fa-check-circle"></i>
                        <span>Priority support</span>
                      </li>
                    </>
                  )}
                </ul>

                <button
                  className={`plan-button ${
                    isFeatured(plan, index) ? 'primary' : 'secondary'
                  }`}
                  onClick={() => handleSelectPlan(plan)}
                >
                  {plan.Price === 0 ? 'Start Free' : 'Get Started'}
                </button>
              </div>
            ))
          )}
        </div>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>

          <div className="faq-item">
            <div className="faq-question">
              Can I change my plan anytime?
              <i className="fas fa-chevron-down"></i>
            </div>
            <div className="faq-answer">
              Yes! You can upgrade or downgrade your plan at any time. Changes will take effect
              immediately, and you'll be charged (or credited) on a prorated basis.
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              What payment methods do you accept?
              <i className="fas fa-chevron-down"></i>
            </div>
            <div className="faq-answer">
              We accept all major credit cards, PayPal, and various digital payment methods. All
              transactions are secure and encrypted.
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              Is there a free trial available?
              <i className="fas fa-chevron-down"></i>
            </div>
            <div className="faq-answer">
              We offer a free plan with limited features. You can also try any paid plan with our
              30-day money-back guarantee.
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">
              Can I cancel my subscription?
              <i className="fas fa-chevron-down"></i>
            </div>
            <div className="faq-answer">
              Absolutely! You can cancel your subscription at any time from your account settings.
              You'll continue to have access until the end of your billing period.
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Plans;