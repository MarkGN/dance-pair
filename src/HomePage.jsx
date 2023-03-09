// import axios from "axios";
import React, { useState, useEffect } from "react";

export default function HomePage() {
  const [helloData, setHelloData] = useState(null);

  useEffect(() => {
    async function fetchHelloData() {
      // const url = "https://us-central1-dance-pair-server-42dc0.cloudfunctions.net/helloWorld";
      // const response = await axios.get(url);
      // setHelloData(response.data);
      setHelloData("placeholder")
    }

    fetchHelloData();
  }, []);

  return (
    <div>
      <p>{helloData ? String(helloData) : "Loading..."}</p>
    </div>
  );
}