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
          //랭킹 추가
          db.collection('villagers').doc(doc.id).update({
            rank: {
              feature: doc.data().rank.feature + 1,
              favorite: doc.data().rank.favorite,
            }
          });
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

//생일이 같은 주민 가져오기
app.get('/villagers/birthday', async(req, res) => {
  const { month, day } = req.query;
  
  try {
    const match = await db.collection('villagers')
    .where('birthday_month', '==', `${month}`)
    .where('birthday_day', '==', `${day}`)
    .get();

    if(match.size <= 0) {
      return res.status(404).send({message: '생일이 일치하는 주민이 없어요'})
    } else {
      return res.status(200).send(match.docs.map(doc => doc.data()));
    }
  } catch (e) {
    res.send(e);
  }
})

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

//랭킹 가져오기
app.get('/rank/feature', async(req, res) => {
  //내림차순으로 10개까지 가져온 다음 같은 랭킹이 3개 초과면 그 랭킹부터 표시 X
  try {
    const order = await db.collection('villagers').orderBy('rank.feature', 'desc').limit(10).get();
    const rankArray = order.docs.map(doc => (doc.data().rank.feature));
    const first = rankArray.lastIndexOf(rankArray[0]) + 1;
    const second = rankArray.lastIndexOf(rankArray[first]) - first + 1;
    const last = rankArray.lastIndexOf(rankArray[first + second]) - first - second + 1;
    
    if(first > 3) {
      return res.status(404).send({ message: '데이터가 부족해요' })
    } else {
      const firstItems = order.docs.slice(0, first).map(doc => { return { ranking: 1, ...doc.data() }});
      const secondItems = order.docs.slice(first, second + 1).map(doc => { return { ranking: 2, ...doc.data() }});
      const lastItems = order.docs.slice(second, last + 1).map(doc => { return { ranking: 3, ...doc.data() }});
      if(second <= 3 && last <= 3) {
        return res.status(200).send([...firstItems, ...secondItems, ...lastItems])
      } else if(second <= 3) {
        return res.status(200).send([...firstItems, ...secondItems])
      } else {
        return res.status(200).send(firstItems)
      }
    }
  } catch(e) {
    res.send(e);
  }
})

app.use(express.json());
app.listen(port, () => {
  console.log(`listening to ${port}`);
});
