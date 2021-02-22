import {
  DownloadButton,
  GenButton,
  LoadingText,
  StyledContainer,
} from "./style";
import { useState } from "react";
import { postDataToApi } from "../../api/post";
import { getDataFromApi } from "../../api/get";
import Worker from "../../worker";
import Loader from "react-loader-spinner";
import { initStartText } from "../../utils/initText";
import React from "react";
import { useEffect } from "react";
import { OptionsSliders } from "../Options/OptionsSliders";

export const Generator = () => {
  const [enableGen, setEnableGen] = useState(true);
  const [enableDownload, setEnableDownload] = useState(false);
  const [isActiveTimer, setIsActiveTimer] = useState(false);
  const [timer, setTimer] = useState(0);
  const [temperature, setTemperature] = useState(1.0);
  const [musicLength, setMusicLength] = useState(500);

  useEffect(() => {
    let interval: any;
    if (isActiveTimer) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    } else if (!isActiveTimer && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActiveTimer, timer]);

  const handleGenButton = async () => {
    const instance = new Worker();
    setEnableGen(false);
    toggleTimer();
    const startText = initStartText();
    const TextFromClient = await instance.predictWithWebWorker(
      startText,
      musicLength,
      temperature
    );
    await afterPredict(TextFromClient);
  };

  const afterPredict = async (TextFromClient: string) => {
    await postDataToApi(TextFromClient).then(afterPostData);
  };

  const afterPostData = () => {
    setEnableGen(true);
    setEnableDownload(true);
    setMusicLength(500);
    setTemperature(1.0);
    resetTimer();
  };

  const handleDownload = () => {
    getDataFromApi();
  };

  const toggleTimer = () => {
    setIsActiveTimer(!isActiveTimer);
  };

  const resetTimer = () => {
    setTimer(0);
    setIsActiveTimer(false);
  };

  return (
    <div>
      {enableGen ? (
        <>
          <GenButton onClick={handleGenButton}>Generate music!</GenButton>
          <OptionsSliders
            setTemperature={setTemperature}
            setMusicLength={setMusicLength}
          />
          {enableDownload && (
            <>
              <DownloadButton onClick={handleDownload}>Download</DownloadButton>
              <StyledContainer style={{ fontSize: 20, margin: 2 }}>
                Download here generated music
              </StyledContainer>
            </>
          )}
        </>
      ) : (
        <>
          <LoadingText>Generating music... Please wait</LoadingText>
          <StyledContainer>
            <Loader type="Oval" color="#5755d9" height={100} width={100} />
          </StyledContainer>
          <StyledContainer>Timer: {timer}s</StyledContainer>
          <StyledContainer style={{ fontSize: 25, margin: 5 }}>
            Waiting time depends on the length of music and CPU power
          </StyledContainer>
        </>
      )}
    </div>
  );
};
