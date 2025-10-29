"use client"

import React, { useState } from "react";

export default function AuthBox(){

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    return(
        <div style={{height:"80%", width:"400px", outline:"1px solid gainsboro", borderRadius:"10px", display:"flex", flexDirection:"column", padding:"20px"}}>

            <h1 style={{}}>Hello</h1>

            <button style={{}}>Sign in with Google</button>

            <h1 style={{}}>Hello</h1>

        </div>
    )
}