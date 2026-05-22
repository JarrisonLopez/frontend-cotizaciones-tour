import React from "react";

export default function Panel({ title, icon, children, className = "" }) {
  return (
    <div className={`panel ${className}`}>
      {title && (
        <h2>
          {icon}
          {title}
        </h2>
      )}

      {children}
    </div>
  );
}