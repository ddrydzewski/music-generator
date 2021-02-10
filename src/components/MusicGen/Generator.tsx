import { GenButton, LoadingText, StyledContainer } from "./style";
import { useState } from "react";
import { postDataToApi } from "../../api/post";
import { getDataFromApi } from "../../api/get";
import Worker from "../../worker";
import Loader from "react-loader-spinner";
import { initStartText } from "../../utils/initText";
import React from "react";
import { useEffect } from "react";

const instance = new Worker();

export const Generator = () => {
  const [enableGen, setEnableGen] = useState(true);
  const [enableDownload, setEnableDownload] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isActiveTimer, setIsActiveTimer] = useState(false);

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
    setEnableGen(false);
    toggleTimer();
    const startText = initStartText();
    const TextFromClient = await instance.predictWithWebWorker(startText);
    await afterPredict(TextFromClient);
  };

  const afterPredict = async (TextFromClient: string) => {
    await postDataToApi(TextFromClient)
      .then(getDataFromApi)
      .then(afterPostData);
  };

  const afterPostData = () => {
    setEnableGen(true);
    setEnableDownload(true);
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
          {enableDownload && (
            <>
              <GenButton onClick={handleDownload}>Download</GenButton>
              <StyledContainer style={{ fontSize: 20, margin: 2 }}>
                Download here if your browser is blocking automatic downloads
              </StyledContainer>
            </>
          )}
        </>
      ) : (
        <>
          <LoadingText>Generating music... Please wait</LoadingText>
          <StyledContainer>
            <Loader type="Oval" color="#88e354" height={100} width={100} />
          </StyledContainer>
          <StyledContainer>Timer: {timer}s - About 60 - 120 s</StyledContainer>
        </>
      )}
    </div>
  );
};
