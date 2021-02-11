import { Slider } from "@material-ui/core";
import * as React from "react";
import { NormalText, StyledContainer, useStyles } from "./style";

interface IProps {
  setTemperature: (temperature: number) => void;
  setMusicLength: (musicLength: number) => void;
}

export const OptionsSliders = React.memo<IProps>(
  ({ setTemperature, setMusicLength }) => {
    const handleSliderTemperature = (event: any, newValue: number | number[]) => {
      setTemperature(newValue as number);
    };

    const handleSliderMusicLength = (event: any, newValue: number | number[]) => {
      setMusicLength(newValue as number);
    };

    const classes = useStyles();

    return (
      <>
        <StyledContainer style={{marginTop:2}}>
          <NormalText>Temperature ratio</NormalText>
          <Slider
            className={classes.root}
            defaultValue={1.0}
            onChange={handleSliderTemperature}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={0.1}
            marks
            min={0.7}
            max={1.3}
          />
        </StyledContainer>
        <StyledContainer style={{marginTop:2}} >
          <NormalText>Number of characters = Length of music</NormalText>
          <Slider
            className={classes.root}
            defaultValue={500}
            onChange={handleSliderMusicLength}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={50}
            marks
            min={200}
            max={1000}
          />
        </StyledContainer>
      </>
    );
  }
);
