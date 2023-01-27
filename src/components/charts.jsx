import React from "react";
//import { useRef } from "react";
import { useState } from "react";
import { Chart } from "react-google-charts";
import "./charts.css";
let totalUsers = 0;

var matrixData = [[["day"]]];

export default function Bc() {
  const Cfhandlename = useState();

  //var idArray = [];
  //const [rating, setRating] = useState();
  //const [maindata, setMaindata] = useState();
  const [chart, setChart] = useState();
  async function handleClick() {
    //console.log(Cfhandlename.current);
    var name = "";
    if (Cfhandlename.current === null) {
      return;
    }
    name = await Cfhandlename.current.value;
    Cfhandlename.current.value = "";
    // const name = await Cfhandlename.current.value;
    const d = await fetch(
      "https://codeforces.com/api/user.rating?handle=" + name
    );
    const currUserData = await d.json();
    if (currUserData.status !== "OK") {
      alert("User Not Found");
      return;
    } else if (currUserData.result.length === 0) {
      alert("User has not participated any contest");
      return;
    } else {
      totalUsers++;
    }
    const currUserSize = currUserData.result.length;

    var copyTdata = matrixData[totalUsers - 1];
    var tempdata = [copyTdata[0]];
    tempdata[0].push(name);
    const currSize = copyTdata.length;

    var tdata = 1;
    var cdata = 0;
    // console.log(tempdata);
    while (tdata < currSize && cdata < currUserSize) {
      //console.log(copyTdata);
      var time1 = copyTdata[tdata][0];
      var time2 = currUserData.result[cdata].ratingUpdateTimeSeconds;

      var val = currUserData.result[cdata].newRating;

      if (time1 === time2) {
        var insertArray = copyTdata[tdata];
        insertArray.push(val);
        tempdata.push(insertArray);
        tdata++;
        cdata++;
      } else if (time1 < time2) {
        var insertArray2 = copyTdata[tdata];
        insertArray2.push(null);
        tempdata.push(insertArray2);
        tdata++;
      } else {
        var insertArray3 = [time2];
        for (var times = 1; times < totalUsers; times++) {
          insertArray3.push(null);
        }
        insertArray3.push(val);
        tempdata.push(insertArray3);
        cdata++;
      }
    }

    while (tdata < currSize) {
      var insertArray22 = copyTdata[tdata];
      insertArray22.push(null);
      tempdata.push(insertArray22);
      tdata++;
    }

    while (cdata < currUserSize) {
      var time22 = currUserData.result[cdata].ratingUpdateTimeSeconds;
      var val2 = currUserData.result[cdata].newRating;

      var insertArray33 = [time22];
      for (var times22 = 1; times22 < totalUsers; times22++) {
        insertArray33.push(null);
      }
      insertArray33.push(val2);
      tempdata.push(insertArray33);
      cdata++;
    }
    matrixData.push(tempdata);
    //console.log(tempdata);

    var options = {
      legend: {
        textStyle: { color: "white", fontSize: 12 }
      },
      curveType: "function",
      pointSize: 5,
      interpolateNulls: true,
      backgroundColor: "black",
      crosshair: { trigger: "focus" },
      hAxis: {
        gridlines: {
          color: "black"
        },
        title: "Time",
        titleTextStyle: {
          color: "white",
          // fontName: ,
          fontSize: 20,
          bold: true,
          italic: false
        },
        textStyle: {
          color: "white",
          // fontName: ,
          fontSize: 15,
          bold: true,
          italic: false,
          slantedText: true,
          slantedTextAngle: 30
        }
      },
      vAxis: {
        minorgridlines: {
          color: "white"
        },
        textStyle: {
          color: "white",
          // fontName: ,
          fontSize: 15,
          bold: true,
          italic: false
        },
        title: "Rating",
        titleTextStyle: {
          color: "white",
          // fontName: ,
          fontSize: 20,
          bold: true,
          italic: false
        }
      },
      animation: {
        duration: 1500,
        startup: true,
        easing: "inAndOut"
      }
    };
    const finalData = [];
    for (let i = 0; i < tempdata.length; i++) {
      var temp69 = [];
      for (let j = 0; j < tempdata[i].length; j++) {
        temp69.push(tempdata[i][j]);
      }
      finalData.push(temp69);
    }
    const finalLength = finalData.length;
    for (let i = 1; i < finalLength; i++) {
      finalData[i][0] = new Date(finalData[i][0] * 1000);
    }
    const chart = (
      <Chart
        chartType="LineChart"
        data={finalData}
        width="100%"
        height="400px"
        options={options}
        legendToggle
      />
    );
    setChart(chart);
    //console.log(chart);
    // const rate = data.result[0].rating;
    // setRating(rate);
  }
  window.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      handleClick();
    }
  });
  return (
    <div>
      {/* <div className="top">
        <div className="heading">
          <h1 className="heading">CF Rating Chart</h1>
        </div>
        <div className="box">
          <input
            className="input_field"
            ref={Cfhandlename}
            type="text"
            // placeholder="Add User"
          />
          <button className="add_button" onClick={handleClick}>
            <img src="../../search.png" className="button_image" alt="Button" />
          </button>
          {/* <h1>{rating}</h1> */}
      {/* </div> */}
      {/* </div> */}
      <div className="heading">
        <h1>CF Comparator</h1>
        <h5 className="subheading">compare codeforces graphs on the go...</h5>
      </div>
      <div>
        <div className="field">
          <input
            className="text-field"
            ref={Cfhandlename}
            type="text"
            placeholder="Handle"
          />
          {/* <button htmlFor="click" onClick={handleClick} className="btn-2">
          </button> */}
          <img
            className="search_btn"
            src="../../search.svg"
            alt=""
            onClick={handleClick}
          />
        </div>
      </div>
      <div className="chart_div">{chart}</div>
    </div>
  );
}
