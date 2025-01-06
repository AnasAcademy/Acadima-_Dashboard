import React, { useState, useEffect } from "react";
import { apiUrl } from "../API";

function Test() {
  const [testdata, settestdata] = useState(null); // Brief user data
  const token = localStorage.getItem("token");

  // Fetch full user data
  const fetchtestData = async () => {
    try {
      const response = await fetch(`${apiUrl}/test`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
          "ngrok-skip-browser-warning": true,
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      settestdata(result.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
      if (token) {
        fetchtestData();
      }
    }, [token]);

  return <div><p style={{color: "white"}}>{testdata}</p></div>;
}

export default Test;