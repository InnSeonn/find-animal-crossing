import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store/store';
import ProgressStep from './ProgressStep';

export default function Progress() {
  const state = useSelector((state: RootState) => state.progress);
  const setProgressStep = () => {
    let elements = [];
    for (let i = 1; i <= state.pages; i++) {
      elements.push(<ProgressStep key={i} step={i} />);
    }
    return elements;
  };
  return <ProgressBox>{setProgressStep()}</ProgressBox>;
}

const ProgressBox = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: var(--font-size-xxl);
`;
