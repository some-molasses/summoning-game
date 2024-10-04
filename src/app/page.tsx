"use client";

import React, { useEffect } from "react";
import { Controller } from "./main";
import Image from "next/image";

const BELL_SIZE = {
  w: 100,
  h: 100,
};

export default function Home() {
  useEffect(() => {
    Controller.init();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        textAlign: "center",
        margin: "20px",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>summoning</h1>
      <p id="subtitle" style={{ marginBottom: "20px" }}>
        This game made by{" "}
        <span className="highlight">
          I Was At The Ontario Universities Fair All Weekend Studios
        </span>
      </p>
      <div id="game-content">
        {/* <p className="narrative-line">Picture this...</p>
        <p className="narrative-line">You&apos;re at a pizza restaurant...</p>
        <p className="narrative-line">
          But there&apos;s no one at the counter...
        </p>
        <p className="narrative-line">
          Alas! Your pizza dreams are almost vanquished...
        </p>
        <p className="narrative-line">
          But fear not! The means of salvation stand before you...
        </p>
        <p className="narrative-line">In the form of a silver bell...</p>
        <p className="narrative-line instruction">
          [Press any key to ring the bell]
        </p> */}

        <div
          id="frame"
          style={{ position: "relative", width: "min-content", margin: "auto" }}
        >
          <Image
            width="800"
            height="600"
            src="/red-swan.jpg"
            alt="the inside of red swan pizza"
            id="red-swan"
          />

          <div
            id="bells"
            style={{ position: "absolute", left: "630px", top: "460px" }}
          >
            <Image
              width={BELL_SIZE.w}
              height={BELL_SIZE.h}
              src="/bell_open.png"
              alt="a bell that has not been pressed"
              id="bell-open"
            />
            <Image
              width={BELL_SIZE.w}
              height={BELL_SIZE.h}
              src="/bell_closed.png"
              alt="a bell that has been pressed"
              className="invisible"
              id="bell-closed"
            />
          </div>

          <div
            id="score-tracker"
            style={{ position: "absolute", top: "20px", left: "20px" }}
          >
            <span id="score">100</span>
          </div>
        </div>
        <audio style={{ display: "none" }} id="bell-ring-audio">
          <source src="/ding.wav" type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}
