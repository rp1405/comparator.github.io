import React from "react";
import { useRef } from "react";
import { useState } from "react";
// import "./top.css";
function Top() {
  const Cfhandlename = useState();
  const [rating, setRating] = useState();
  async function handleClick() {
    const name = Cfhandlename.current.value;
    //const data=fetch("https://codeforces.com/api/user.info?handles="+name);
    const d = await fetch(
      "https://codeforces.com/api/user.info?handles=" + name
    );
    const data = await d.json();
    if (data.status !== "OK") {
      alert("User Not Found");
      return;
    }
    const rating = data.result[0].rating;
    setRating(rating);
  }
  return (
    <div className="top">
      <div className="heading">
        <h1>CF Rating</h1>
        <input ref={Cfhandlename} type="text" />
        <button onClick={handleClick}>Search</button>
        <h1>{rating}</h1>
      </div>
    </div>
  );
}
export default Top;
