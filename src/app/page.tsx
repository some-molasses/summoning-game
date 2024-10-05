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
      <p id="subtitle" style={{ marginBottom: "4px" }}>
        This game made by{" "}
        <span className="highlight">Locked Under The CN Tower Studios</span>
      </p>
      <p id="attribution" style={{ marginBottom: "20px", fontSize: "0.75em" }}>
        Art by Adrien Fraser.
      </p>
      <div id="game-content">
        <div id="narrative">
          <p className="narrative-line">Picture this...</p>
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
            [For best experience, ensure your volume is enabled.]
          </p>
          <p className="narrative-line instruction">[Press any key to play.]</p>
        </div>

        <div
          id="frame"
          style={{ position: "relative", width: "min-content", margin: "auto" }}
          className="invisible"
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
            <span id="score">0</span>
          </div>

          <div
            id="guy-and-speech"
            style={{ position: "absolute", bottom: "80px", left: "400px" }}
            className="invisible"
          >
            <div
              id="guy-speech-bubble"
              style={{
                background: "white",
                color: "black",
                borderRadius: 8,
                padding: 8,
              }}
            >
              <span>I heard you the first time.</span>
              <br />
              <span>Please. Go home.</span>
            </div>
            <Image
              width={1000}
              height={1000}
              src="/guy.png"
              alt="a drawing of the pizza guy"
              // className="invisible"
              id="bell-closed"
              style={{ width: "100px", height: "100%" }}
            />
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
