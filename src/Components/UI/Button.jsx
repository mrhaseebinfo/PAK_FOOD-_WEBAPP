import React from "react";

export default function Button({ children, textOnly, className, ...props }) {
  // Determine the CSS classes based on props
  let cssClasses = textOnly ? 'text-button' : 'button';
  if (className) {
    cssClasses += ' ' + className;
  }

  // Render button with calculated classes and other props
  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}
