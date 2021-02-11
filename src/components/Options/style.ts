import { makeStyles } from "@material-ui/core";
import styled from "styled-components";

export const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

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

export const NormalText = styled.div`
  font-size: 30px;
  font-family: serif;
  width: 50%;
  margin: auto;
  margin-top: 2%;
  text-align: center;
`;

