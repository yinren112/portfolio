import React from "react";
import { Composition } from "remotion";
import { OpenBoss } from "./compositions/OpenBoss";
import { Bookworm } from "./compositions/Bookworm";
import { Learn } from "./compositions/Learn";
import { XhsScout } from "./compositions/XhsScout";
import { DURATION, FPS, WIDTH, HEIGHT } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="OpenBoss"
        component={OpenBoss}
        durationInFrames={DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Bookworm"
        component={Bookworm}
        durationInFrames={DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Learn"
        component={Learn}
        durationInFrames={DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="XhsScout"
        component={XhsScout}
        durationInFrames={DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
