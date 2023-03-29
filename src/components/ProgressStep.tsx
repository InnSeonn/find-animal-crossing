import { HiCheck } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { RootState } from '../store/store';

export default function ProgressStep({ step }: { step: number }) {
  const { curr, next } = useSelector((state: RootState) => state.progress);
  return (
    <ProgressStepBox active={step === curr ? true : false}>
      {step < next && <HiCheck />}
      {step >= next && step >= curr && <p>{step}</p>}
    </ProgressStepBox>
  );
}

const ProgressStepBox = styled.div<{ active: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.4em;
  height: 2.4em;
  margin: 0 0.5em;
  border: 1.6px solid var(--color-green-dark);
  border-radius: 50%;
  background-color: #fff;
  color: var(--color-green-dark);
  font-size: var(--font-size-s);
  font-family: var(--font-b);
  &:not(:last-child) {
    &::after {
      position: absolute;
      inset: 50% auto auto 100%;
      width: 100%;
      height: 1.4px;
      display: block;
      background-color: var(--color-green-dark);
      transform: translateY(-50%);
      content: '';
    }
  }
  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-green-dark);
      color: #fff;
    `}
`;
