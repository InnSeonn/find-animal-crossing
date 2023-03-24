import styled, { css } from 'styled-components';
import { HiCheck } from 'react-icons/hi';
import { scaleUpDown } from './AppBar';

type RadioButtonState = {
  select: string;
  setSelect: React.Dispatch<React.SetStateAction<string>>;
};
export type SelectButtonAttrs = {
  id: string;
  name: string;
  value: string;
  label: string;
};
type RadioButtonProps = RadioButtonState & SelectButtonAttrs;

export default function RadioButton(props: RadioButtonProps) {
  const { id, name, value, label, select, setSelect } = props;

  return (
    <SelectButtonFieldset checked={select === `${value}` ? true : false}>
      <input type='radio' id={id} name={name} value={value} onChange={(e) => setSelect(e.currentTarget.value)}></input>
      <label htmlFor={id}>
        {label} <HiCheck className='icon-check' />
      </label>
    </SelectButtonFieldset>
  );
}

export const SelectButtonFieldset = styled.fieldset<{ checked: boolean }>`
  border-radius: 2em;
  background-color: #fff;
  box-shadow: var(--box-shadow);
  font-size: var(--font-size-m);
  opacity: 0.6;
  & input {
    display: none;
  }
  & label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2em 1.8em;
    word-break: keep-all;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    .icon-check {
      display: none;
    }
  }
  ${(props) =>
    props.checked &&
    css`
      background-color: var(--color-green-dark);
      color: #fff;
      opacity: 1;
      animation: ${scaleUpDown(0.95, 1.05)} 0.3s;
      & label .icon-check {
        display: block;
      }
    `}
`;
