import React, { useState, useEffect } from "react";

const BasicHooks = () => {
  const [toggle, setToggle] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div>
      <p>hey hooks!</p>
      <button onClick={() => setToggle(!toggle)}>
        press me! {toggle.toString()}
      </button>
      <p>{mounted ? "I am mounted!" : "I am not yet mounted."}</p>
    </div>
  );
};

export default BasicHooks;
