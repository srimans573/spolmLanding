import "./globals.css";
import { Libre_Baskerville, Poppins, Barlow, Inter } from "next/font/google";
import InteractiveComponent from "./(interactive)/InteractiveComponent";
import Image from "next/image";
import Link from "next/link";

import type { Metadata } from 'next';

export const metadata: Metadata = {
title: 'Spolm',
description: 'The QA platform for building better agents.',
};

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-baskerville",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
});

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div
        className="navbar"
        style={{
          borderBottom: "1px solid",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0px 70px",
        }}
      >
        <h1 className={libreBaskerville.className}>spolm</h1>
        <div>
            <Link
              href={
                "https://docs.google.com/forms/d/e/1FAIpQLScO7CHs2O2i8MMqXhFJIhP6waXzvFVVrqjzCVMWDcjJ3agh-g/viewform?usp=dialog"
              }
              style={{ textDecoration: "none", color: "black" }}
            >
              <button className={`${poppins.className} button`}>
                Join Waitlist
              </button>
            </Link>
        </div>
      </div>
      <div
        className="hero-section"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          margin: "0px 10%",
          borderLeft: "1px solid black",
          borderRight: "1px solid black",
          padding: "30px 50px",
          backgroundColor: "#ffffff",
          overflow: "hidden",
          position: "relative",
          height: "80vh",
          justifyContent: "center",
        }}
      >
        <div className="hero-content" style={{ width: "60%" }}>
          <h1
            className={`${libreBaskerville.className} hero-title-1`}
            style={{ fontSize: "40px", margin: "0px", marginBottom: "30px" }}
          >
            the QA platform
          </h1>
          <h1
            className={`${libreBaskerville.className} hero-title-2`}
            style={{ fontSize: "40px", margin: "0px", marginBottom: "20px" }}
          >
            for building
          </h1>
          <h1
            className={`${libreBaskerville.className} hero-title-3`}
            style={{
              fontSize: "80px",
              margin: "0px",
              marginBottom: "0px",
              background:
                "linear-gradient(to right, #fbbf24, #f97316, #ef4444, #dc2626)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            better agents.
          </h1>
          <p
            className={`${poppins.className} hero-paragraph`}
            style={{ lineHeight: "36px" }}
          >
            Building exceptional AI agents is difficult.
          </p>
          <p
            className={`${poppins.className} hero-paragraph`}
            style={{ lineHeight: "20px" }}
          >
            <span
              className={`${libreBaskerville.className}`}
              style={{ fontWeight: "bold" }}
            >
              Spolm
            </span>{" "}
            is what makes that easy.
          </p>
          <div>
            <Link
              href={
                "https://docs.google.com/forms/d/e/1FAIpQLScO7CHs2O2i8MMqXhFJIhP6waXzvFVVrqjzCVMWDcjJ3agh-g/viewform?usp=dialog"
              }
              style={{ textDecoration: "none", color: "black" }}
            >
              <button className={`${poppins.className} button`}>
                Join Waitlist
              </button>
            </Link>
            <Link
              href={
                "https://cal.com/srirammanikandan"
              }
              style={{ textDecoration: "none", color: "black" }}
            >
              <button className={`${poppins.className} button`}>
                Book Demo
              </button>
            </Link>
          </div>
          <p
            className={`${libreBaskerville.className}`}
            style={{ fontSize: "14px", marginTop: "30px", marginBottom: "0px" }}
          >
            Built by students, researchers and engineers from:{" "}
          </p>
          <div
            style={{
              display: "flex",
              width: "15vw",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Image
              src="./assets/berkeley.svg" // Path relative to the public directory
              alt="Berkeley Logo"
              width={100} // Specify width
              height={80} // Specify height
              style={{ filter: "grayscale(100%)" }}
            />
            <Image
              src="./assets/gt.svg" // Path relative to the public directory
              alt="Georgia Tech Logo"
              width={60} // Specify width
              height={60} // Specify height
              style={{ filter: "grayscale(100%)" }}
            />
          </div>
        </div>
        <InteractiveComponent />
      </div>
      <div className="about-container" style={{ display: "flex" }}>
        <div
          className="about about-section"
          style={{
            borderTop: "1px solid",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginLeft: "70px",
            width: "50%",
            borderRight: "1px solid black",
            padding: "0px 70px",
          }}
        >
          <h3 className={libreBaskerville.className}>About</h3>
          <p
            className={`${poppins.className} about-paragraph`}
            style={{ lineHeight: "36px", whiteSpace: "pre-line" }}
          >{` Spolm is the QA platform for pinpointing where, when, why, and how AI agents fail and help you fix them automatically. Instead of notifiying engineering teams that things broke, Spolm actively tries to resolve the underlying issue before it ever hits in production.
          `}</p>
        </div>
        <div
          className="about about-section"
          style={{
            borderTop: "1px solid",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "50%",
            marginRight: "70px",
            padding: "0px 70px",
          }}
        >
          <h3
            className={libreBaskerville.className}
            style={{ alignSelf: "flex-end" }}
          >
            Team
          </h3>
          <p
            className={`${poppins.className} about-paragraph`}
            style={{
              lineHeight: "36px",
              whiteSpace: "pre-line",
              textAlign: "right",
            }}
          >{`We are a small, tight-knit team of students, researchers and engineers from various prestigious institutions. We enjoy building, thinking big and having fun. If you are aligned with our mission, reach out to us!`}</p>
          <Link
              href={
                "https://cal.com/srirammanikandan"
              }
              style={{ textDecoration: "none", color: "black", alignSelf:"flex-end" }}
            >
              <button className={`${poppins.className} button`}>
                Contact Us
              </button>
            </Link>
        </div>
      </div>
      <div>
        <p
          className={`${poppins.className}`}
          style={{ textAlign: "center", fontSize: "14px", color: "gray" }}
        >
          © Spolm 2025
        </p>
      </div>
    </div>
  );
}
