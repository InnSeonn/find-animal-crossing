import SubTitle from '../components/SubTitle';
import Title from '../components/Title';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { ResultIcon, ResultLink } from './Result';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const getNumberArray = (min: number, max: number) => {
  let array: string[] = [];
  for (let i = min; i <= max; i++) {
    array = [...array, i.toString()];
  }
  return array;
};

export default function Birthday() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>();
  const [selectedDay, setSelectedDay] = useState<string | undefined>();
  const month = getNumberArray(1, 12);
  const day = getNumberArray(1, 31);

  const goToResult = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/birthday/result`, {
      replace: true,
      state: {
        month: selectedMonth,
        day: selectedDay,
      },
    });
  };

  return (
    <>
      <Title />
      <SubTitle text='나의 생일은' />
      <BirthdaySelectBox>
        <BirthdayOptionBox selected={selectedMonth ? true : false}>
          <Dropdown options={month} onChange={(e) => setSelectedMonth(e.value)} placeholder='-' />
          <span className='label'>월</span>
        </BirthdayOptionBox>
        <BirthdayOptionBox selected={selectedDay ? true : false}>
          <Dropdown options={day} onChange={(e) => setSelectedDay(e.value)} placeholder='-' />
          <span className='label'>일</span>
        </BirthdayOptionBox>
      </BirthdaySelectBox>
      <BirthdayLinkBox>
        <BirthdayLink to='/birthday/result' onClick={goToResult} $visible={selectedMonth && selectedDay ? true : false}>
          <span className='text'>결과 확인하기</span>
          <ResultIcon>
            <FaCheck className='icon' />
          </ResultIcon>
        </BirthdayLink>
      </BirthdayLinkBox>
    </>
  );
}

const BirthdaySelectBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--padding-x);
  margin-top: calc(var(--padding-x) * 2);
`;
const BirthdayOptionBox = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;

  &:first-child {
    margin-right: 0.5em;
  }
  &:last-child {
    margin-left: 0.5em;
  }

  .label {
    display: block;
    margin-left: 0.5em;
    font-size: var(--font-size-s);
  }
  .Dropdown-root {
    width: 100%;
  }
  .Dropdown-control {
    padding: 14px 18px;
    border: none;
    box-shadow: var(--box-shadow);
    font-size: var(--font-size-m);
    cursor: pointer;
  }
  .Dropdown-arrow {
    top: 50%;
    border-color: var(--color-grey) transparent transparent;
    transform: translateY(-50%);
  }
  .is-open .Dropdown-arrow {
    border-color: transparent transparent var(--color-grey);
  }
  .Dropdown-placeholder {
    color: var(--color-grey);

    &.is-selected {
      color: #000;
    }
  }
  .Dropdown-menu {
    font-size: var(--font-size-s);
    line-height: 1.5;
    border: none;
    border-top: 2px solid var(--color-light);
    box-shadow: var(--box-shadow);
  }
  .Dropdown-option {
    padding: 10px 18px;
    color: var(--color-grey);
    &:hover {
      background-color: #b1d1822e;
    }
    &.is-selected {
      background-color: #b1d1822e;
      color: #000;
    }
  }
`;
const BirthdayLinkBox = styled.div`
  text-align: right;
  padding-top: 1em;
`;
const BirthdayLink = styled(ResultLink)<{ $visible: boolean }>`
  visibility: hidden;
  opacity: 0;
  ${(props) =>
    props.$visible &&
    css`
      visibility: visible;
      opacity: 1;
      @media screen and (any-pointer: fine) {
        opacity: 0.6;
        &:hover {
          opacity: 1;
        }
      }
    `}
`;
