const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const express = require('express');
const cors = require('cors');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const app = express();
const port = 8080;

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true, //다른 도메인간 쿠키 공유
  })
);

//나와 닮은 조건에 해당하는 주민 가져오기
app.get('/villagers/feature', async (req, res) => {
  const { gender, personality, species } = req.query;

  try {
    const matchGender = await db.collection('villagers')
    .where('species', '==', `${species}`)
    .where('gender', '==', `${gender}`)
    .get();
    //일치하는 성별이 없을 경우
    if(matchGender.size <= 0) {
      return res.status(404).send({ message: `${species} 주민은 ${gender}가 없어요` })
    }
    //성격 체크
    let matchResult = [];
    personality.map((value) => {
      if(matchResult.length > 0) return ;
      matchGender.docs.map((doc) => {
        if(doc.data().personality === value) {
          return matchResult = [...matchResult, doc.data()];
        }
      })
    });
    //일치하는 성격이 없을 경우
    if(matchResult.length <= 0) {
      return res.status(404).send({ message: `${species} 주민과 일치하는 성격이 없어요` });
    }
    res.status(200).send(matchResult);
  } catch (e) {
    // console.error(e);
    res.send(e);
  }
});

//주민 종류 가져오기
app.get('/villagers/species', async (req, res) => {
  res.send(['새', '다람쥐', '돼지', '고릴라', '악어', '코알라', '독수리', '개미핥기', '소', '쥐', '고양이', '말', '햄스터', '캥거루', '늑대', '펭귄', '닭', '코끼리', '코뿔소', '양', '사슴', '호랑이', '꼬마곰', '개', '곰', '하마', '오리', '염소', '타조', '토끼', '사자', '개구리', '문어', '원숭이'])
  // try {
  //   const snapshot = await db.collection('villagers').get();
  //   const value = new Set(snapshot.docs.map((doc) => doc.data().species));
  //   if(value) {
  //     res.send([...value]);
  //   }
  // } catch(e) {
  //   // console.error(e);
  //   res.send(e);
  // }
})

//주민 성격 가져오기
app.get('/villagers/personality', async (req, res) => {
  res.send(['운동광', '무뚝뚝', '아이돌', '단순활발', '먹보', '친절함', '성숙함', '느끼함']);
  // try {
  //   const snapshot = await db.collection('villagers').get();
  //   const value = new Set(snapshot.docs.map((doc) => doc.data().personality));
  //   if(value) {
  //     res.send([...value]);
  //   }
  // } catch(e) {
  //   // console.error(e);
  //   res.send(e);
  // }
})

app.use(express.json());
app.listen(port, () => {
  console.log(`listening to ${port}`);
});