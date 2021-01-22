import * as React from "react";
import { Generator } from "./MusicGen/Generator";
import { NameLogo } from "./style";

export const Main = () => {
  return (
    <>
      <NameLogo>Classical music generator</NameLogo>
      <Generator/>
    </>
  );
};
