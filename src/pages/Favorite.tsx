import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import axios, { isAxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CheckButton from '../components/CheckButton';
import Progress from '../components/Progress';
import RadioButton from '../components/RadioButton';
import SubTitle from '../components/SubTitle';
import Title from '../components/Title';
import { setColor, setHobby, setStyle } from '../store/favoriteSlice';
import { setInit, updateNext } from '../store/progressSlice';
import { RootState } from '../store/store';
import { ButtonBox } from './Feature';

type FavoriteParamsType = {
  hobby: string;
  color: string[];
  style: string[];
};

export default function Favorite() {
  const navigate = useNavigate();
  const { page } = useParams();
  const { favorite, progress } = useSelector((state: RootState) => state);
  const { hobby, color, style } = favorite;
  const dispatch = useDispatch();
  const timer = useRef<number | undefined>();
  const [myHobby, setMyHobby] = useState<string>('');
  const [myColor, setMyColor] = useState<Set<string>>(new Set());
  const [myStyle, setMyStyle] = useState<Set<string>>(new Set());

  const getData = async (name: string, action: ActionCreatorWithPayload<any>) => {
    return await axios
      .get(`http://localhost:8080/villagers/${name}`)
      .then((res) => dispatch(action(res.data)))
      .catch((e) => {
        if (isAxiosError(e)) {
          console.log(e);
        }
      });
  };

  useEffect(() => {
    if (page === '1' && !hobby) {
      (async () => {
        await getData('hobby', setHobby);
      })();
    } else if (page === '2' && !color) {
      (async () => {
        await getData('color', setColor);
      })();
    } else if (page === '3' && !style) {
      (async () => {
        await getData('style', setStyle);
      })();
    }
  }, [page]);

  useEffect(() => {
    dispatch(
      setInit({
        pages: 3,
        curr: Number(page),
        next: Number(page),
      })
    );
  }, [page]);

  const setNavigateTimer = (to: string, params?: FavoriteParamsType) => {
    timer.current = window.setTimeout(() => {
      navigate(`/favorite/${to}`, { replace: true, state: params });
    }, 500);
  };

  const clearNavigateTimer = () => {
    clearTimeout(timer.current);
  };

  useEffect(() => {
    if ((page === '1' && myHobby) || (page === '2' && myColor.size >= 2)) {
      dispatch(updateNext(progress.next + 1));
      setNavigateTimer(`${progress.curr + 1}`);
    } else if (page === '3' && myStyle.size >= 2) {
      dispatch(updateNext(progress.next + 1));
      setNavigateTimer('result', {
        hobby: myHobby,
        color: [...myColor],
        style: [...myStyle],
      });
    }
    return () => clearNavigateTimer();
  }, [myHobby, myColor, myStyle]);

  return (
    <>
      <Progress />
      <Title />
      {page === '1' && hobby && (
        <>
          <SubTitle text='내가 가장 좋아하는<br>취미 활동은' />
          <ButtonBox>
            {hobby.map((value, index) => (
              <RadioButton
                key={index}
                id={`hobby${index}`}
                name='hobby'
                value={value}
                label={value}
                select={myHobby}
                setSelect={setMyHobby}
              />
            ))}
          </ButtonBox>
        </>
      )}
      {page === '2' && color && (
        <>
          <SubTitle text='내가 좋아하는 색상을<br>두 가지 고른다면' />
          <ButtonBox>
            {color.map((value, index) => (
              <CheckButton
                key={index}
                id={`color${index}`}
                name={`color${index}`}
                value={value}
                label={value}
                select={myColor}
                setSelect={setMyColor}
              />
            ))}
          </ButtonBox>
        </>
      )}
      {page === '3' && style && (
        <>
          <SubTitle text='내가 좋아하는 스타일을<br>두 가지 고른다면' />
          <ButtonBox>
            {style.map((value, index) => (
              <CheckButton
                key={index}
                id={`style${index}`}
                name={`style${index}`}
                value={value}
                label={value}
                select={myStyle}
                setSelect={setMyStyle}
              />
            ))}
          </ButtonBox>
        </>
      )}
    </>
  );
}
