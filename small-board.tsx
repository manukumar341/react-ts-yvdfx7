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

        <StyledDivL id="two" onClick={handleOnclickBoard}>
          {values.two}
        </StyledDivL>
        <StyledDivBottom id="three" onClick={handleOnclickBoard}>
          {values.three}
        </StyledDivBottom>
      </span>
      <span>
        <StyledDivL id="four" onClick={handleOnclickBoard}>
          {values.four}
        </StyledDivL>

        <StyledDivL id="five" onClick={handleOnclickBoard}>
          {values.five}
        </StyledDivL>

        <StyledDivBottom id="six" onClick={handleOnclickBoard}>
          {values.six}
        </StyledDivBottom>
      </span>
      <span>
        <StyledDivR id="seven" onClick={handleOnclickBoard}>
          {values.seven}
        </StyledDivR>
        <StyledDivR id="eight" onClick={handleOnclickBoard}>
          {values.eight}
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
