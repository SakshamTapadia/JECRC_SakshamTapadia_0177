import React, {useState} from "react";

function Counter() {
    const [count, setCount] = React.useState(0);
    const [step, setStep] = React.useState(1);

    const [lastAction, setLastAction] = React.useState("None");

    const increment = () => {
        setCount(count + step);
        setLastAction("Increment by " + step);
    }

    const decrement = () => {
        setCount(count - step);
        setLastAction("Decrement by " + step);
    }

    const reset = () => {
        setCount(0);
        setStep(1);
        setLastAction("Reset to 0");
    }

    return(
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", padding: "20px"}}>
            {/* Display Current State */}
            <div style={{fontSize: "48px", margin:"20px"}}>
                <h1>Count: {count}</h1>
            </div>
            {/* Step Input */}
            <div style={{alignItems: "center", marginBottom: "20px"}}>
                <label>Step : 
                <input
                    type="number"
                    value={step}
                    onChange={(e) => setStep(Number(e.target.value))}
                    style={{marginLeft: "10px", width: "60px"}}
                />
            </label>
            </div>
            {/* Action Buttons */}
            <div style={{display: "flex", gap: "10px"}}>
                <button onClick={increment} style={buttonStyle}>Increment</button>
                <button onClick={decrement} style={buttonStyle}>Decrement</button>
                <button onClick={reset} style={buttonStyle}>Reset</button>
            </div>
            {/* Last Action Display */}
            <div style={{fontSize: "24px", margin: "20px", fontStyle: "italic"}}>
                <p>Last Action: {lastAction}</p>
            </div>
            
        </div>
    )
}

const buttonStyle = {
    margin: "0 10px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px"
};
export default Counter;