import styled, { css } from 'styled-components';
import { SelectButtonFieldset, SelectButtonAttrs } from './RadioButton';
import { HiPlus } from 'react-icons/hi';
import { scaleUpDown } from './AppBar';

type CheckButtonState = {
  select: Set<string>;
  setSelect: React.Dispatch<React.SetStateAction<Set<string>>>;
};
type CheckButtonProps = CheckButtonState & SelectButtonAttrs;

export default function CheckButton(props: CheckButtonProps) {
  const { id, name, value, label, select, setSelect } = props;

  const selectItem = (e: React.ChangeEvent) => {
    if (!(e.currentTarget instanceof HTMLInputElement)) return;
    const item = e.currentTarget.value;
    if (select.has(item)) {
      select.delete(item);
    } else if (select.size < 3) {
      select.add(item);
    } else {
      return;
    }
    setSelect(new Set(select));
  };

  return (
    <CheckButtonFieldset checked={select.has(`${value}`) ? true : false}>
      <input type='checkbox' id={id} name={name} value={value} onChange={selectItem}></input>
      <label htmlFor={id}>
        {label}
        <HiPlus className='icon-plus' />
        <span className='icon-num'>{[...select].map((selected, index) => (selected === value ? index + 1 : ''))}</span>
      </label>
    </CheckButtonFieldset>
  );
}

const CheckButtonFieldset = styled(SelectButtonFieldset)`
  & .icon-num {
    display: none;
    width: 1em;
    font-family: var(--font-b);
    text-align: center;
  }
  ${(props) =>
    props.checked &&
    css`
      & .icon-plus {
        display: none;
      }
      & .icon-num {
        display: block;
      }
      animation: ${scaleUpDown(0.95, 1.05)} 0.3s;
    `}
`;
