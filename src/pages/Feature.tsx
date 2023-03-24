import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CheckButton from '../components/CheckButton';
import Progress from '../components/Progress';
import RadioButton from '../components/RadioButton';
import SubTitle from '../components/SubTitle';
import Title from '../components/Title';
import { RootState, set, updateNext } from '../store';
import { personality, species } from './App';

export type FeatureParamsType = {
  state: {
    gender: string;
    personal: string[];
    species: string;
  };
};

export default function Feature() {
  const navigate = useNavigate();
  const { page } = useParams();
  const progress = useSelector((state: RootState) => state.progress);
  const dispatch = useDispatch();
  const timer = useRef<number | undefined>();
  const [gender, setGender] = useState('');
  const [personal, setPersonal] = useState<Set<string>>(new Set());
  const [features, setFeatures] = useState('');

  useEffect(() => {
    dispatch(
      set({
        pages: 3,
        curr: Number(page),
        next: Number(page),
      })
    );
  }, [page]);

  const setNavigateTimer = (to: string, params?: FeatureParamsType) => {
    timer.current = window.setTimeout(() => {
      navigate(`/feature/${to}`, { replace: true, ...params });
    }, 500);
  };

  const clearNavigateTimer = () => {
    clearTimeout(timer.current);
  };

  useEffect(() => {
    if ((page === '1' && gender) || (page === '2' && personal.size >= 3)) {
      dispatch(updateNext(progress.next + 1));
      setNavigateTimer(`${progress.curr + 1}`);
    } else if (page === '3' && features) {
      dispatch(updateNext(progress.next + 1));
      setNavigateTimer('result', {
        state: {
          gender: gender,
          personal: [...personal],
          species: features,
        },
      });
    }
    return () => clearNavigateTimer();
  }, [gender, personal, features]);

  return (
    <div>
      <Progress />
      <Title />
      {page === '1' && (
        <>
          <SubTitle text={'나의 성별은'} />
          <FeatureBox>
            <RadioButton id='female' name='gender' value='Female' label='여자' select={gender} setSelect={setGender} />
            <RadioButton id='male' name='gender' value='Male' label='남자' select={gender} setSelect={setGender} />
          </FeatureBox>
        </>
      )}
      {page === '2' && (
        <>
          <SubTitle text={'나와 가장 어울리는<br>성격을 순서대로<br>세 가지 고른다면'} />
          <FeatureBox>
            {Object.keys(personality).map((key, index) => (
              <CheckButton
                key={index}
                id={key}
                name={key}
                value={key}
                label={personality[key]}
                select={personal}
                setSelect={setPersonal}
              />
            ))}
          </FeatureBox>
        </>
      )}
      {page === '3' && (
        <>
          <SubTitle text={'나와<br>가장 닮은 동물은'} />
          <FeatureBox>
            {Object.keys(species).map((key, index) => (
              <RadioButton
                key={index}
                id={key}
                name='species'
                value={key}
                label={species[key]}
                select={features}
                setSelect={setFeatures}
              />
            ))}
          </FeatureBox>
        </>
      )}
    </div>
  );
}

const FeatureBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--padding-x);
  margin-top: calc(var(--padding-x) * 2);
  @media screen and (max-width: 400px) {
    margin-top: var(--padding-x);
  }
`;
