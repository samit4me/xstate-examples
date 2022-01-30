import styled from "@emotion/styled";

const Label = styled.div`
  display: block;
  position: relative;
  width: 70px;
  height: 100px;
  margin: 1rem;

  border-radius: 50px;
  background: #e6e3da;
  background: linear-gradient(#f7f6f4, #fff);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: none;

  box-shadow: inset 0 -5px 0 #dbd3c8, 0 6px 5px rgba(170, 160, 140, 0.75),
    3px 16px 5px rgba(170, 160, 140, 0.3);

  cursor: pointer;

  :before {
    content: "";
    position: absolute;
    top: -10px;
    bottom: -10px;
    left: -5px;
    right: -5px;
    z-index: -1;

    background: #f2f1ed;
    border-radius: inherit;

    box-shadow: 0 1px 1px rgba(#aea391, 0.2), 0 3px 3px rgba(170, 160, 140, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 0 5px rgba(170, 160, 140, 0.5);
  }

  :after {
    display: none;
  }
`;

const Input = styled.input`
  position: absolute;
  visibility: hidden;
`;

const Root = styled.div`
  ${Input}:checked + ${Label} {
    background: linear-gradient(#e6e3da, #fff);
    box-shadow: inset 0 7px 0 #fdfdfd, 0 2px 3px rgba(170, 160, 140, 0.3);
  }

  ${Input}:checked + ${Label}:after {
    content: "";
    position: absolute;
    width: 60px;
    height: 70px;
    border-radius: 50%;
    z-index: -1;
    left: 18px;
    top: 10px;
    background: linear-gradient(
      160deg,
      rgba(170, 160, 140, 0.7),
      rgba(170, 160, 140, 0)
    );
    background: -webkit-linear-gradient(
      290deg,
      rgba(170, 160, 140, 0.75),
      rgba(170, 160, 140, 0)
    );
  }
`;

interface Props {
  checked: boolean;
  onChange: () => void;
}

export default function LightSwitch({ checked, onChange }: Props) {
  return (
    <Root>
      <Input type="checkbox" name="switch" checked={checked} onChange={onChange} />
      <Label onClick={onChange} />
    </Root>
  );
}
