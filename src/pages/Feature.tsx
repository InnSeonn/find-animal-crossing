import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CheckButton from '../components/CheckButton';
import Progress from '../components/Progress';
import RadioButton from '../components/RadioButton';
import SubTitle from '../components/SubTitle';
import Title from '../components/Title';
import { setPersonality, setSpecies } from '../store/featureSlice';
import { setInit, updateNext } from '../store/progressSlice';
import { RootState } from '../store/store';

export type FeatureParamsType = {
  gender: string;
  personality: string[];
  species: string;
};

export default function Feature() {
  const navigate = useNavigate();
  const { page } = useParams();
  const { feature, progress } = useSelector((state: RootState) => state);
  const { species, personality } = feature;
  const dispatch = useDispatch();
  const timer = useRef<number | undefined>();
  const [gender, setGender] = useState('');
  const [personal, setPersonal] = useState<Set<string>>(new Set());
  const [features, setFeatures] = useState('');

  useEffect(() => {
    if (page === '2' && !personality) {
      axios
        .get(`http://localhost:8080/villagers/personality`)
        .then((res) => dispatch(setPersonality(res.data)))
        .catch((e) => {
          if (axios.isAxiosError(e)) {
            console.log(e);
          }
        });
    }
    if (page === '3' && !species) {
      axios
        .get(`http://localhost:8080/villagers/species`)
        .then((res) => dispatch(setSpecies(res.data)))
        .catch((e) => {
          if (axios.isAxiosError(e)) {
            console.log(e);
          }
        });
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

  const setNavigateTimer = (to: string, params?: FeatureParamsType) => {
    timer.current = window.setTimeout(() => {
      navigate(`/feature/${to}`, { replace: true, state: params });
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
        gender: gender,
        personality: [...personal],
        species: features,
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
          <ButtonBox>
            <RadioButton id='female' name='gender' value='여자' label='여자' select={gender} setSelect={setGender} />
            <RadioButton id='male' name='gender' value='남자' label='남자' select={gender} setSelect={setGender} />
          </ButtonBox>
        </>
      )}
      {page === '2' && personality && (
        <>
          <SubTitle text={'나와 가장 어울리는<br>성격을 순서대로<br>세 가지 고른다면'} />
          <ButtonBox>
            {personality.map((key, index) => (
              <CheckButton
                key={index}
                id={`personality${index}`}
                name={`personality${index}`}
                value={key}
                label={key}
                select={personal}
                setSelect={setPersonal}
              />
            ))}
          </ButtonBox>
        </>
      )}
      {page === '3' && species && (
        <>
          <SubTitle text={'나와<br>가장 닮은 동물은'} />
          <ButtonBox>
            {species.map((key, index) => (
              <RadioButton
                key={index}
                id={`species${index}`}
                name='species'
                value={key}
                label={key}
                select={features}
                setSelect={setFeatures}
              />
            ))}
          </ButtonBox>
        </>
      )}
    </div>
  );
}

export const ButtonBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--padding-x);
  margin-top: calc(var(--padding-x) * 2);
  @media screen and (max-width: 400px) {
    margin-top: var(--padding-x);
  }
`;
