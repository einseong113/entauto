// Edu ARCADE - 외부 사이트 점수 연동 & 게임 잠금 로직
// 사용법: 외부 사이트에서 유저를 아래처럼 링크로 보내면 됩니다.
//   https://your-domain.com/edu-arcade/index.html?score=650
// 점수는 저장하지 않고, 매번 URL의 ?score= 값을 그대로 읽어서 사용합니다.

// 게임별 필요 점수 (필요하면 숫자만 수정하세요)
const ARCADE_REQUIREMENTS = {
  memory:     0,
  snake:      100,
  '2048':     300,
  'neon-stack': 600
};

function arcadeGetScore(){
  const params = new URLSearchParams(window.location.search);
  const incoming = params.get('score');
  const num = Math.floor(Number(incoming));
  return (incoming !== null && !isNaN(num) && num >= 0) ? num : 0;
}

function arcadeRequiredScore(gameKey){
  return ARCADE_REQUIREMENTS.hasOwnProperty(gameKey) ? ARCADE_REQUIREMENTS[gameKey] : 0;
}

function arcadeIsUnlocked(gameKey){
  return arcadeGetScore() >= arcadeRequiredScore(gameKey);
}
