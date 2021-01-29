import * as React from "react";
import { Generator } from "./MusicGen/Generator";
import { CreditsText, NameLogo } from "./style";

export const Main = () => {
  return (
    <>
      <NameLogo>Music generator</NameLogo>
      <Generator/>
      <CreditsText>By Dawid Rydzewski</CreditsText>
    </>
  );
};
