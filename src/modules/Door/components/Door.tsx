import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

interface DoorFrontProps {
  $timeToOpen: number;
}

const DoorFront = styled.div<DoorFrontProps>`
  width: 170px;
  height: 270px;
  overflow: hidden;
  transform-origin: left;
  box-shadow: 30px 0 50px rgba(0, 0, 0, 0.2);
  position: absolute;
  background-color: #924500;
  z-index: 1;
  transition: ${props => `${props.$timeToOpen}ms`};

  :before,
  :after {
    content: "";
    position: absolute;
    background-color: #924500;
    width: 105px;
    height: 75px;
    border: 10px ridge #b05500;
    left: 22.5px;
  }

  :before {
    top: 25px;
  }

  :after {
    top: 155px;
  }
`;

const DoorKnob = styled.div`
  position: absolute;
  width: 20px;
  height: 30px;
  background-color: #eeba0b;
  top: 122px;
  left: 145px;
  border-radius: 2px;

  :before {
    content: "";
    position: absolute;
    border-radius: 50%;
    background-color: #f1c83c;
    width: 18px;
    height: 18px;
    left: -1px;
    box-shadow: 2px 2px rgba(0, 0, 0, 0.2);
  }

  :after {
    content: "";
    position: absolute;
    width: 4px;
    height: 7px;
    background-color: #333;
    top: 20px;
    left: 8.5px;
  }
`;

const DoorBack = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 10px solid #edf2f4;
  position: relative;
  overflow: hidden;
  background-color: #50befa;
`;

interface BaseDoorProps {
  $opening: boolean;
}

const BaseDoor = styled.div<BaseDoorProps>`
  position: relative;
  width: 170px;
  height: 270px;
  cursor: pointer;
  transform-style: preserve-3d;
  transform: perspective(2500px);
  margin: 20px;

  ${DoorFront} {
    transform: ${props => props.$opening ? "rotateY(-160deg)" : "none"};
  }

  // :hover ${DoorFront} {
  //   transform: rotateY(-160deg);
  // }
`;

const moveAnimation = keyframes`
 0% { transform: translateY(0) rotateX(0); }
 25% { transform: translateY(-30px) rotateX(40deg); }
 50% { transform: rotateX(0) translateY(0); 
 75% { transform: rotateX(-40deg) translateY(30px); }
 100% { transform: rotateX(0) translateY(0); }
`;

const Plane = styled.div`
  position: absolute;
  left: 100px;
  top: 100px;
  animation: ${moveAnimation} 3s linear infinite;
`;

const WingLeft = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-bottom: 135px solid white;
  transform: rotate(78deg) skewY(-35deg);
  left: -18.5px;
  z-index: 3;
  top: -30px;
`;

const WingRight = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 22.5px solid transparent;
  border-right: 12.5px solid transparent;
  border-bottom: 115px solid white;
  transform: rotate(61deg);
  z-index: 4;
`;

const Top = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 30px solid #c1c7c9;
  top: 65px;
  transform: rotate(5deg);
  left: -60px;
  z-index: 1;
`;

const Middle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 135px solid #c1c7c9;
  top: -13.5px;
  transform: rotate(72deg);
  left: -7.5px;
  z-index: 2;
`;

const Bottom = styled.div`
  position: relative;
  width: 0;
  height: 0;
  border-left: 12.5px solid transparent;
  border-right: 12.5px solid transparent;
  border-bottom: 25.5px solid #676d70;
  top: 71px;
  transform: rotate(-5deg);
  left: -52.5px;
  z-index: 3;
`;

const Clouds = styled.div`
  position: absolute;
  top: 10px;
  left: 100px;
`;

const Cloud = css`
  position: absolute;
  width: 50px;
  height: 25px;
  background-color: #fff;
  border-radius: 100px 100px 0 0;
`;

const CloudBefore = css`
  content: "";
  position: absolute;
  width: 25px;
  height: 12.5px;
  background-color: #fff;
  border-radius: 100px 100px 0 0;
  left: -20px;
  top: 12.5px;
  box-shadow: 65px 0 #fff;
`;

const cloudAnimation = keyframes`
 from { left:-200px; }
 to { left: 300px; }
`;

const CloudOne = styled.div`
  ${Cloud}
  top: 0;
  left: 0;
  animation: ${cloudAnimation} 3s linear infinite reverse;
  :before {
    ${CloudBefore}
  }
`;

const CloudTwo = styled.div`
  ${Cloud}
  top:50px;
  left: 100px;
  animation: ${cloudAnimation} 2.5s linear infinite reverse;
  :before {
    ${CloudBefore}
  }
`;

const CloudThree = styled.div`
  ${Cloud}
  top:225px;
  left: 50px;
  animation: ${cloudAnimation} 2.8s linear infinite reverse;
  :before {
    ${CloudBefore}
  }
`;

interface Props {
  opening?: boolean;
  timeToOpen?: number;
}

export default function Door({ opening = false, timeToOpen = 1000 }: Props) {
  return (
    <div>
      <BaseDoor $opening={opening}>
        <DoorFront $timeToOpen={timeToOpen}>
          <DoorKnob />
        </DoorFront>
        <DoorBack>
          <Plane>
            <WingRight />
            <WingLeft />
            <Bottom />
            <Top />
            <Middle />
          </Plane>
          <Clouds>
            <CloudOne />
            <CloudTwo />
            <CloudThree />
          </Clouds>
        </DoorBack>
      </BaseDoor>
    </div>
  );
}
