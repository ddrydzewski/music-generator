import { BodyText, Button, Container, styled } from "precise-ui";

export const GenButton = styled(Button)`
  font-size: 25px;
  font-family: sans-serif;
  text-align: justify;
  display: flex;
  margin: auto;
  margin-top: 10%;
  text-align: center;
`;

export const GenTextBox = styled(BodyText)`
  font-size: 15px;
  font-family: sans-serif;
  display: flex;
  overflow-wrap: break-word;
  word-wrap: break-word;
  margin: auto;
  text-align: center;
`;

export const StyledContainer = styled(Container)`
  background: grey;
  margin-top: 5%;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;
