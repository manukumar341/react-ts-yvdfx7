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
  let pathId = [];
switch(disable){
  case 'verticalOne':
    pathId=[1,4,7]
    break;

  case 'verticalTwo':
    pathId=[2,5,8]
    break;

  case 'verticalThree':
    pathId=[3,6,9]
    break;

  case 'horizontalOne':
    pathId=[1,2,3]
    break;

  case 'horizontalTwo':
    pathId=[4,5,6]
    break;

  case 'horizontalThree':
    pathId=[7,8,9]
    break;

  case 'diagonalLeftToRight':
    pathId=[1,5,9]
    break;

  case 'diagonalRightToLeft':
    pathId=[3,5,7]
    break;

}
  const v1 = 'verticalOne';
  const v2 = 'verticalTwo';
  const v3 = 'verticalThree';
  const h1 = 'horizontalOne';
  const h2 = 'horizontalTwo';
  const h3 = 'horizontalThree';
  const ltr = 'diagonalLeftToRight';
  const rtl = 'diagonalRightToLeft';
  return (
    <StyledContainer>
      <span>
        <StyledDivL
          id="one"
          onClick={handleOnclickBoard}
          path={pathId}
          currentVal={(e) => e.target.id}
        >
          {values.one}
        </StyledDivL>

        <StyledDivL
          id="four"
          onClick={handleOnclickBoard}
          path={pathId}
          currentVal={(e) => e.target.id}
        >
          {values.four}
        </StyledDivL>
        <StyledDivBottom
          id="seven"
          onClick={handleOnclickBoard}
          path={pathId}
          currentVal={(e) => e.target.id}
        >
          {values.seven}
        </StyledDivBottom>
      </span>
      <span>
        <StyledDivL
          id="two"
          onClick={handleOnclickBoard}
          path={pathId}
          currentVal={(e) => e.target.id}
          storedVal={values.two}
        >
          {values.two}
        </StyledDivL>

        <StyledDivL
          id="five"
          onClick={handleOnclickBoard}
          path={pathId}
          currentVal={(e) => e.target.id}
          storedVal={values.five}
        >
          {values.five}
        </StyledDivL>

        <StyledDivBottom
          id="eight"
          onClick={handleOnclickBoard}
          path={pathId}
          currentVal={(e) => e.target.id}
        >
          {values.eight}
        </StyledDivBottom>
      </span>
      <span>
        <StyledDivR
          id="three"
          onClick={handleOnclickBoard}
          path={pathId}
          currentVal={(e) => e.target.id}
        >
          {values.three}
        </StyledDivR>
        <StyledDivR
          id="six"
          onClick={handleOnclickBoard}
          path={pathId}
          currentVal={(e) => e.target.id}
        >
          {values.six}
        </StyledDivR>
        <StyledDiv
          id="nine"
          onClick={handleOnclickBoard}
          path={pathId.find((id)=>{id==(e) => {e.target.id}})}
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
color:${prop=>path.}
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
