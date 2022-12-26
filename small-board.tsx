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
        <StyledDivL id="a1" onClick={handleOnclickBoard}>
          {values.a1}
        </StyledDivL>

        <StyledDivL id="b1" onClick={handleOnclickBoard}>
          {values.b1}
        </StyledDivL>
        <StyledDivBottom id="c1" onClick={handleOnclickBoard}>
          {values.c1}
        </StyledDivBottom>
      </span>
      <span>
        <StyledDivL id="a2" onClick={handleOnclickBoard}>
          {values.a2}
        </StyledDivL>

        <StyledDivL id="b2" onClick={handleOnclickBoard}>
          {values.b2}
        </StyledDivL>

        <StyledDivBottom id="c2" onClick={handleOnclickBoard}>
          {values.c2}
        </StyledDivBottom>
      </span>
      <span>
        <StyledDivR id="a3" onClick={handleOnclickBoard}>
          {values.a3}
        </StyledDivR>
        <StyledDivR id="b3" onClick={handleOnclickBoard}>
          {values.b3}
        </StyledDivR>
        <StyledDiv id="c3" onClick={handleOnclickBoard}>
          {values.c3}
        </StyledDiv>
      </span>
    </StyledContainer>
  );
}
const StyledDiv = styled.div`
height:50px;
width:50px;
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
display:flex
`;

export default Boards;
