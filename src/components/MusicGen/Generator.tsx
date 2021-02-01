import { GenButton, LoadingText, StyledContainer } from "./style";
import { useState } from "react";
import { postDataToApi } from "../../api/post";
import { getDataFromApi } from "../../api/get";
import Worker from "../../worker";
import Loader from "react-loader-spinner";
import { initStartText } from "../../utils/initText";

const instance = new Worker();

export const Generator = () => {
  const [enableGen, setEnableGen] = useState(true);

  const handleGenButton = async () => {
    setEnableGen(false);
    const startText = initStartText();
    const TextFromClient = await instance.predictWithWebWorker(startText);
    await afterPredict(TextFromClient);
  };

  const afterPredict = async (TextFromClient: string) => {
    await postDataToApi(TextFromClient).then(getDataFromApi).then(afterPostData);
  };

  const afterPostData = () => {
    setEnableGen(true);
  };

  return (
    <div>
      {enableGen ? (
        <>
          <GenButton onClick={handleGenButton}>Generate music!</GenButton>
        </>
      ) : (
        <>
          <LoadingText>Generating music... Please wait</LoadingText>
          <StyledContainer>
            <Loader type="Oval" color="#88e354" height={100} width={100} />
          </StyledContainer>
        </>
      )}
    </div>
  );
};
