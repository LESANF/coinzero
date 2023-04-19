import { MoonLoader } from "react-spinners";
import styled from "styled-components";

interface ISpinnerProps {
  loading: boolean;
  size: number;
}

const LoadingFrame = styled.div`
  height: 100%;
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = ({ loading, size }: ISpinnerProps) => {
  return (
    <LoadingFrame>
      <MoonLoader color="#1772f8" loading={loading} size={size} />
    </LoadingFrame>
  );
};

export default Loading;
