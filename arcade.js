// Edu ARCADE - 외부 사이트 점수 연동 & 게임 잠금 로직
// 사용법: 외부 사이트에서 유저를 아래처럼 링크로 보내면 됩니다.
//   https://your-domain.com/edu-arcade/index.html?score=650
// 받은 점수는 localStorage에 "최고 기록"으로 누적 저장되어
// 이후 어떤 페이지를 가도 잠금 상태가 유지됩니다.

const ARCADE_SCORE_KEY = 'eduArcadeUserScore';

// 게임별 필요 점수 (필요하면 숫자만 수정하세요)
const ARCADE_REQUIREMENTS = {
  memory:     0,
  snake:      100,
  '2048':     300,
  'neon-stack': 600
};

// URL의 ?score= 값을 읽어서 localStorage에 반영 (더 높은 값만 갱신)
function arcadeSyncScoreFromURL(){
  const params = new URLSearchParams(window.location.search);
  const incoming = params.get('score');
  if(incoming === null) return;
  const incomingNum = Math.floor(Number(incoming));
  if(isNaN(incomingNum) || incomingNum < 0) return;
  const current = arcadeGetScore();
  if(incomingNum > current){
    localStorage.setItem(ARCADE_SCORE_KEY, String(incomingNum));
  }
}

function arcadeGetScore(){
  return Number(localStorage.getItem(ARCADE_SCORE_KEY) || 0);
}

function arcadeRequiredScore(gameKey){
  return ARCADE_REQUIREMENTS.hasOwnProperty(gameKey) ? ARCADE_REQUIREMENTS[gameKey] : 0;
}

function arcadeIsUnlocked(gameKey){
  return arcadeGetScore() >= arcadeRequiredScore(gameKey);
}

// 페이지 로드 시 항상 최신 점수 반영
arcadeSyncScoreFromURL();
