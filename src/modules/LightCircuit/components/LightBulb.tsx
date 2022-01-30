import styled from "@emotion/styled";

interface LightProps {
    $on: boolean;
    $broken: boolean;
}

const Light = styled.div<LightProps>`
  position: relative;
  display: inline-block;
  padding: 0 0 70px 0;
  cursor: pointer;

  div:first-of-type {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    background-color: ${props => {
        if (props.$broken) return "#666";
        if (props.$on) return "#e1cf53";
        return "#dcdcdc";
    }};
    position: relative;
    border-bottom-left-radius: 30px;
    transform: rotateZ(-45deg);
  }

  div:first-of-type:after {
    content: "";
    width: 94px;
    height: 94px;
    top: 3px;
    left: 3px;
    position: absolute;
    background: linear-gradient(
      rgba(255, 255, 255, 0.6),
      transparent,
      transparent
    );
    border-radius: 100px;
  }

  div:first-of-type:before {
    content: "";
    position: absolute;
    top: 63px;
    right: 36px;
    border-top: 32px solid;
    border-top-color: ${props => {
        if (props.$broken) return "#666";
        if (props.$on) return "#e1cf53";
        return "#dcdcdc";
    }};
    border-left: 16px solid transparent;
    border-right: 16px solid transparent;
    z-index: 0;
    height: 0;
    width: 54px;
    transform: rotateZ(45deg);
  }

  div:last-child {
    position: absolute;
    top: 106px;
    left: 23px;
    background-color: ${props => {
        if (props.$broken) return "#666";
        if (props.$on) return "#e1cf53";
        return "#dcdcdc";
    }};
    width: 54px;
    height: 30px;
    border-radius: 20px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  div:last-child:before {
    content: "";
    position: absolute;
    top: 25px;
    left: 6px;
    background: #888;
    width: 42px;
    height: 30px;
    border-radius: 2px;
    border-bottom-left-radius: 17px;
    border-bottom-right-radius: 17px;
  }

  div:last-child:after {
    content: "";
    position: absolute;
    top: 51px;
    left: 12px;
    border-top: 8px solid #444;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    height: 0;
    width: 10px;
  }
`;

interface Props {
  on?: boolean;
  broken?: boolean;
}

export default function LightBulb({ broken = false, on = false }: Props) {
  return (
    <Light $broken={broken} $on={on}>
      <div />
      <div />
    </Light>
  );
}
