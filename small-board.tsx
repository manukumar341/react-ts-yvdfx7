import { observer } from 'mobx-react';
import React = require('react');
import styled from 'styled-components/';

function Boards({
  handleOnclickBoard,
  values,
  disable,
}: {
  handleOnclickBoard: (id: any) => void;
  values: any;
  disable: boolean;
}) {
  return (
    <StyledContainer>
      <span>
        <StyledDivL id="one" onClick={handleOnclickBoard}>
          {values.one}
        </StyledDivL>

        <StyledDivL id="four" onClick={handleOnclickBoard}>
          {values.four}
        </StyledDivL>
        <StyledDivBottom id="seven" onClick={handleOnclickBoard}>
          {values.seven}
        </StyledDivBottom>
      </span>
      <span>
        <StyledDivL id="two" onClick={handleOnclickBoard}>
          {values.two}
        </StyledDivL>

        <StyledDivL id="five" onClick={handleOnclickBoard}>
          {values.five}
        </StyledDivL>

        <StyledDivBottom id="eight" onClick={handleOnclickBoard}>
          {values.eight}
        </StyledDivBottom>
      </span>
      <span>
        <StyledDivR id="three" onClick={handleOnclickBoard}>
          {values.three}
        </StyledDivR>
        <StyledDivR id="six" onClick={handleOnclickBoard}>
          {values.six}
        </StyledDivR>
        <StyledDiv id="nine" onClick={handleOnclickBoard}>
          {values.nine}
        </StyledDiv>
      </span>
    </StyledContainer>
  );
}
const StyledDiv = styled.div`
height:50px;
width:50px;
text-align: center;
padding-top:20px;
`;
const StyledDivR = styled(StyledDiv)`
border-bottom:solid 1px;
`;
const StyledDivL = styled(StyledDivR)`
border-right:solid 1px;
`;
const StyledDivBottom = styled(StyledDivR)`
border-bottom:unset;
border-right:solid 1px;
`;

const StyledContainer = styled.div`
display:flex;
justify-content: center;
`;

export default Boards;
