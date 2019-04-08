import React, { useState, useEffect, useRef } from "react";

import styles from "./index.module.css";

import CursorComponent from "./Cursor";
import CircleBtn, { SettingsBtn, HamburgerBtn } from "./Buttons";

const Canvas = () => {
  // https://tympanus.net/codrops/2019/01/31/custom-cursor-effects/
  const menuRef1 = useRef(null);
  const menuRef2 = useRef(null);

  const [refs, setRefs] = useState([]);

  useEffect(() => {
    setRefs([menuRef1, menuRef2]);
  }, []);

  // how to use it:
  // place CursorComponent somewhere
  // place your Menus anywhere you want
  // link them with

  // your standard app in here
  return (
    <div className={styles.tutorial}>
      <div className={styles.page}>
        <CursorComponent interactionRefs={refs} />
        {/* cursor anywhere */}
        <div className={styles.page__inner}>
          {/* menu place based on your design */}
          <nav className={styles.nav} ref={menuRef1}>
            <SettingsBtn />
            <CircleBtn />
            <CircleBtn />
            <HamburgerBtn />
            <SettingsBtn />
          </nav>
          <br />
          <br />
          <nav className={styles.nav} ref={menuRef2} />
        </div>
      </div>
    </div>
  );
};

export default Canvas;
