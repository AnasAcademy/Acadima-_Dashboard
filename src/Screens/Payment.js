import React, { useContext, useState, useEffect } from "react";
import "../Styles/Payment/Payment.css";
import { apiUrl } from "../API";
import { UserContext } from "../Context/UserContext"; // Import UserContext
import { useParams, useNavigate, useLocation } from "react-router-dom";

import Navbar from "../Components/Main/Navbar";
import Hero from "../Components/Payment/Hero";
import Container from "../Components/Payment/Container";

import visa from "../Images/visa.svg";

function Payment() {
  const { order_id } = useParams(); // Retrieve order_id from the URL

  const [totalAmount, settotalAmount] = useState(0);
  const [isCouponSectionVisible, setIsCouponSectionVisible] = useState(true);
  const [paymentData, setPaymentData] = useState(null);
  const [couponDetails, setCouponDetails] = useState(null);
  const [coupon, setCoupon] = useState(""); // To store the entered coupon
  const [couponMsg, setCouponMsg] = useState("");
  const [charge, setCharge] = useState(0);
  const [isCouponValid, setCouponValid] = useState(false);
  const [userCharge, setUserCharge] = useState(0);
  const [type, setType] = useState("");
  const [data, setData] = useState({ gateway: "27", order_id: order_id });

  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation hook
  const [menuOpen, setMenuOpen] = useState(false); // Sidebar toggle state
const { userBriefData, notifications } = useContext(UserContext); // Consume userBriefData from context
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

  useEffect(() => {
    const unreadExists = notifications?.some(
      (notification) => notification.status === "unread" // Check for unread status
    ) || false;
  
    setHasUnreadNotifications(unreadExists);
  }, [notifications]);
  
  
  

  // Function to toggle the sidebar
  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  if (!order_id) {
    navigate("/notfound");
  }

  const token = localStorage.getItem("token");

  const fetchPaymentData = async () => {
    try {
      const response = await fetch(apiUrl + "/checkout/" + order_id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
      });
      // console.log(response);
      const result = await response.json();
      if (result.data.order.status === "paid") {
        navigate("/");
      }
      // console.log(result);
      setPaymentData(result.data);
      settotalAmount(result?.data?.order?.total_amount);
      setUserCharge(result?.data?.userCharge);
      setCouponDetails({
        total_amount: result?.data?.order?.total_amount,
      });
      if (result?.data?.order?.item?.type === "program") {
        setType("البرنامج الدراسى ");
      } else if (result?.data?.order?.item?.type === "service") {
        setType("الخدمة");
      } else {
        setType("الرسوم");
      }
      // console.log("order", paymentData?.order?.total_amount);
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };

  const checkCoupon = async () => {
    try {
      const response = await fetch(apiUrl + "/panel/cart/coupon/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          coupon,
          order_id: order_id, // Replace with the dynamic order ID if needed
        }),
      });

      const result = await response.json();
      console.log(response);
      if (result.success) {
        setCouponDetails(result.data);
        settotalAmount(result?.data?.total_amount);
        setCouponMsg(result?.message);
        console.log(result);
        setCouponValid(true);
        setData({ ...data, coupon: coupon });
      } else {
        setCouponMsg(result?.message);
        setCouponDetails({
          total_amount: paymentData?.order?.total_amount,
        });
        settotalAmount(paymentData?.order?.total_amount);
        console.log("jj", paymentData?.order?.total_amount);

        setCouponValid(false);
      }
    } catch (error) {
      console.error("Error checking coupon:", error);
      setCouponDetails({
        total_amount: paymentData?.order?.total_amount,
      });
      console.log("hh", paymentData?.order?.total_amount);
      setCouponValid(false);
    }
  };
  useEffect(() => {
    fetchPaymentData();
  }, []);

  function useCharge(event) {
    event.target.setAttribute("disabled", true);
    setData({ ...data, use_charge: true });
    if (userCharge > 0) {
      if (totalAmount > paymentData?.userCharge) {
        setCharge(paymentData?.userCharge);
        console.log(charge);
        settotalAmount((prevTotalAmount) => {
          const newTotal = prevTotalAmount - paymentData?.userCharge;
          console.log("New Total Amount:", newTotal);
          return newTotal;
        });
        setUserCharge(0);
        console.log(totalAmount);
      } else {
        setCharge(totalAmount);
        console.log(charge);
        settotalAmount(0);
        console.log(totalAmount);
        setUserCharge((prevCharge) => {
          const newCharge = prevCharge - totalAmount;
          return newCharge;
        });
      }
    }
  }

  function resetCharge() {
    setCharge(0);
    settotalAmount(couponDetails?.total_amount);
    console.log(couponDetails);
    console.log(totalAmount);
    setUserCharge(paymentData?.userCharge);
  }
  function returnBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      let previousUrl = document.referrer || "/";
      console.log("Referrer:", previousUrl);
      window.location.href = previousUrl;
    }
  }

  const checkout = async () => {
    try {
      console.log("Location state in checkout:", location.state);

      const response = await fetch(apiUrl + "/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result?.data?.order?.status === "paid") {
        navigate("/", {
          state: { showPopup: true, popupMessage: "تم دفع القسط بنجاح" },
        });
      } else {
        console.log("Order not paid. Displaying error...");
        navigate("/", {
          state: { showPopup: true, popupMessage: "فشل الدفع. حاول مرة أخرى." },
        });
      }

      if (result?.data?.url) {
        window.location.href = result?.data?.url;
      }
    } catch (error) {
      console.error("Error in checkout:", error);
      navigate("/", {
        state: { showPopup: true, popupMessage: "حدث خطأ أثناء معالجة الدفع." },
      });
    }
  };

  if (!paymentData) {
    // Show a loading state until paymentData is available
    return <p>Loading...</p>;
  }

  return (
    <div className="payment">
      <Navbar
        menuOpen={menuOpen}
        onMenuToggle={handleMenuToggle}
        userBriefData={userBriefData}
        hasUnreadNotifications={hasUnreadNotifications}
      />
      <Hero />

      <div className="payment-main-container">
        {/* Program Details */}
        <div className="payment-one">
          <h3 className="hero-subtitle">تفاصيل البرنامج</h3>
          <Container>
            <div className="payment-details-container">
              <p className="payment-details-title">
                {type} : <span>{paymentData?.order?.item?.title}</span>
              </p>
              <p className="payment-details-title">
                رسوم البرنامج :{" "}
                <span>{paymentData?.order?.total_amount} $</span>
              </p>
            </div>
          </Container>
        </div>

        {/* Payment Channels */}
        <div className="payment-one">
          <h3 className="hero-subtitle">أختر بوابة الدفع</h3>

          {paymentData?.paymentChannels?.map((channel) => (
            <div
              className="payment-channel charge-account-radio"
              key={channel?.id}
            >
              <input
                type="radio"
                name="gateway"
                className="online-gateway"
                id={`channel-${channel?.id}`}
                value={channel?.id}
                defaultChecked
              />
              <label
                className="payment-details-container-two"
                htmlFor={`channel-${channel?.id}`}
              >
                <img src={visa} alt="visa" className="visa" />
                <p className="payment-details-title">
                  ادفع بواسطة {channel?.title}
                </p>
              </label>
            </div>
          ))}
        </div>

        {paymentData?.enableCoupon && (
          <div className="coupon-section-container">
            <div className="coupon-section">
              <h3 className="hero-subtitle">تفاصيل عملية الدفع</h3>
              <Container>
                <div className="row">
                  <p className="details-title">المجموع الفرعى</p>
                  <span>{paymentData?.order?.total_amount} $</span>
                </div>
                <div className="row" id="coupon">
                  <div className="coupon-percent">
                    <p className="details-title"> تخفيض</p>
                    <span>( %{couponDetails?.discount_percent || 0})</span>
                  </div>
                  <span>{couponDetails?.total_discount || 0} $</span>
                </div>

                <div className="charge-row" id="charge">
                  <p
                    className="details-title"
                    style={{
                      color:
                        !paymentData?.enableCoupon || !isCouponSectionVisible
                          ? "#fff"
                          : "#9da6a8",
                    }}
                  >
                    خصم من المحفظة
                  </p>
                  <span
                    style={{
                      color:
                        !paymentData?.enableCoupon || !isCouponSectionVisible
                          ? "#fff"
                          : "#9da6a8",
                    }}
                  >
                    {charge}$
                  </span>
                </div>
                <div
                  className="row coupon-row"
                  style={{ display: isCouponSectionVisible ? "flex" : "none" }}
                >
                  <div className="couponMsg">
                    <input
                      type="text"
                      placeholder="أدخل كود الكوبون هنا"
                      className="coupon-input"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                    <input
                      type="text"
                      name="coupon"
                      id="coupon_input"
                      className=" form-control border-pink p-3 d-none"
                    ></input>
                    <p
                      className={`coupon-msg-p ${
                        !isCouponValid ? "danger" : ""
                      }`}
                    >
                      {couponMsg}
                    </p>
                  </div>

                  <button className="verify-button" onClick={checkCoupon}>
                    تحقق
                  </button>
                </div>
                <div
                  className="row wallet-row"
                  style={{
                    display:
                      !paymentData?.enableCoupon || !isCouponSectionVisible
                        ? "flex"
                        : "none",
                  }}
                >
                  <div className="wallet-input">
                    <p>رصيد المحفظة: {userCharge}$</p>
                  </div>
                  <button className="wallet-button" onClick={useCharge}>
                    استخدام الرصيد
                  </button>
                </div>
                <div className="row total-row">
                  <p className="details-title">الإجمالى</p>
                  <span>{totalAmount} $</span>
                </div>
              </Container>
            </div>
            <div
              className="action-buttons-container"
              style={{ display: isCouponSectionVisible ? "flex" : "none" }}
            >
              <button className="prev-button" onClick={returnBack}>
                السابق
              </button>
              <button
                className="next-button"
                onClick={() => setIsCouponSectionVisible(false)}
              >
                التالى
              </button>
            </div>
            <div
              className="action-buttons-container"
              style={{
                display:
                  !paymentData?.enableCoupon || !isCouponSectionVisible
                    ? "flex"
                    : "none",
              }}
            >
              <button
                className="prev-button"
                onClick={() => {
                  setIsCouponSectionVisible(true);
                  resetCharge();
                }}
              >
                السابق
              </button>
              <button className="next-button" onClick={checkout}>
                الدفع
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
