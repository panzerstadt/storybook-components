import React from "react";

import "./index.css";

const FloorPlan = () => {
  return (
    <>
      <div class="main-content">
        <div class="door-hor" />
        <div class="utility">
          <div class="door-hor" />
          <div class="name">utility room</div>
        </div>
        <div class="kitchen">
          <div class="ref" />
          <div class="rug" />
          <div class="cabinets">
            <div class="stove" />
          </div>
          <div class="sink">
            <div class="sink-tap-1" />
            <div class="sink-tap-2" />
          </div>
          <div class="island">
            <div class="chair" />
          </div>
          <div class="name">kitchen</div>
        </div>
        <div class="bathroom-2">
          <div class="window-hor" />
          <div class="door-hor" />
          <div class="shower" />
          <div class="toilet" />
          <div class="vanity" />
          <div class="rug" />
          <div class="name">bath #1</div>
        </div>
        <div class="bedroom-2">
          <div class="door-ver" />
          <div class="window-hor" />
          <div class="bed-table" />
          <div class="bed">
            <div class="blanket" />
            <div class="pillow" />
          </div>
          <div class="table" />
          <div class="name">guest bedroom</div>
        </div>
        <div class="living-room">
          <div class="rug" />
          <div class="window-ver" />
          <div class="sofa" />
          <div class="coffee-table" />
          <div class="tv-set" />
          <div class="name">living room</div>
        </div>
        <div class="bedroom-1">
          <div class="rug" />
          <div class="door-hor" />
          <div class="window-hor" />
          <div class="bed">
            <div class="blanket" />
            <div class="pillow" />
            <div class="pillow" />
          </div>
          <div class="bed-table" />
          <div class="bed-table" />
          <div class="name">master bedroom</div>
        </div>
        <div class="closet">
          <div class="wall-gap" />
          <div class="name">walk-in closet</div>
        </div>
        <div class="bathroom-1">
          <div class="door-ver" />
          <div class="door-ver" />
          <div class="window-hor" />
          <div class="rug" />
          <div class="bathtub" />
          <div class="vanity" />
          <div class="toilet" />
          <div class="name">bath #2</div>
        </div>
        <div class="office">
          <div class="door-hor" />
          <div class="window-hor" />
          <div class="table" />
          <div class="name">home office</div>
        </div>
        <div class="patio">
          <div class="door-sliding" />
          <div class="real-patio">
            <div class="name">balcony</div>
          </div>
          <div class="patio-table" />
          <div class="patio-chair" />
          <div class="patio-chair" />
        </div>
      </div>
      <aside class="context">
        <div class="explanation">
          Part of the{" "}
          <a href="https://codepen.io/collection/DQvYpQ/" target="_blank">
            CSS Grid collection here
          </a>
          .
        </div>
      </aside>
      <footer>
        <a href="https://twitter.com/meowlivia_" target="_blank">
          <i class="icon-social-twitter icons" />
        </a>
        <a href="https://github.com/oliviale" target="_blank">
          <i class="icon-social-github icons" />
        </a>
        <a href="https://dribbble.com/oliviale" target="_blank">
          <i class="icon-social-dribbble icons" />
        </a>
      </footer>
    </>
  );
};

export default FloorPlan;
