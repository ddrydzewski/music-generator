import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';

export const GenButton = styled.button`
  font-size: 40px;
  font-family: serif;
  text-align: justify;
  display: flex;
  margin: auto;
  margin-top: 10%;
  text-align: center;
  color: black;
`;

export const LoadingText = styled.div`
  font-size: 50px;
  font-family: serif;
  width: 50%;
  margin: auto;
  margin-top: 5%;
  text-align: center;
`;

export const StyledContainer = styled.div`
  font-size: 40px;
  font-family: serif;
  text-align: justify;
  margin: auto;
  margin-top: 5%;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const useStyles = makeStyles({
  root: {
    width: 300,
  },
});