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
  disable: string;
}) {
  return (
    <StyledContainer>
      <span>
        <StyledDivL
          id="one"
          onClick={handleOnclickBoard}
          currentVal={(e) => e.target.id}
        >
          {values.one}
        </StyledDivL>

        <StyledDivL
          id="four"
          onClick={handleOnclickBoard}
          currentVal={(e) => e.target.id}
        >
          {values.four}
        </StyledDivL>
        <StyledDivBottom
          id="seven"
          onClick={handleOnclickBoard}
          currentVal={(e) => e.target.id}
        >
          {values.seven}
        </StyledDivBottom>
      </span>
      <span>
        <StyledDivL
          id="two"
          onClick={handleOnclickBoard}
          currentVal={(e) => e.target.id}
          storedVal={values.two}
        >
          {values.two}
        </StyledDivL>

        <StyledDivL
          id="five"
          onClick={handleOnclickBoard}
          currentVal={(e) => e.target.id}
          storedVal={values.five}
        >
          {values.five}
        </StyledDivL>

        <StyledDivBottom
          id="eight"
          onClick={handleOnclickBoard}
          currentVal={(e) => e.target.id}
        >
          {values.eight}
        </StyledDivBottom>
      </span>
      <span>
        <StyledDivR
          id="three"
          onClick={handleOnclickBoard}
          currentVal={(e) => e.target.id}
        >
          {values.three}
        </StyledDivR>
        <StyledDivR
          id="six"
          onClick={handleOnclickBoard}
          currentVal={(e) => e.target.id}
        >
          {values.six}
        </StyledDivR>
        <StyledDiv
          id="nine"
          onClick={handleOnclickBoard}
          currentVal={(e) => e.target.id}
        >
          {values.nine}
        </StyledDiv>
      </span>
    </StyledContainer>
  );
}
interface IProp {
  path: Array<number>;
  currentVal: string;
}

const StyledDiv = styled.div<IProp>`
height:50px;
width:50px;
text-align: center;
padding-top:20px;
color:${(props) => {
  props.currentVal ? 'green' : 'red';
}};
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
