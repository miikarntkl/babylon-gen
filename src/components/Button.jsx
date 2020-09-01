import React from "react";
import "./button.css";

const STYLES = ["btn-primary", "btn-secondary"];

const SIZES = ["btn-small", "btn-medium"];

export const Button = ({ children, type, onClick, style, size }) => {
    const checkStyle = STYLES.includes(style) ? style : STYLES[0];
    const checkSize = SIZES.includes(size) ? size : SIZES[0];
    return (
        <button
            className={"btn ${checkStyle} ${checkSize}"}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
};
