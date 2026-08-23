// Edu ARCADE - 점수 연동 & 게임 잠금 로직
//
// 원본 사이트에서 아래 형태로 링크를 보내면 됩니다.
//   https://your-arcade-site.com/index.html?score=350
//
// 최초 진입 시 URL의 score를 이 탭의 세션에 잠깐 기억해두고 주소창은 정리합니다.
// 그래서 게임 들어갔다가 메인으로 돌아와도 점수가 유지되고,
// 탭을 닫으면 세션 기록도 같이 사라집니다.

const SESSION_KEY = 'eduArcadeSessionScore';

const ARCADE_REQUIREMENTS = {
  memory:     0,
  snake:      10,
  '2048':     5,
  'neon-stack': 15,
  'bottle-flip' : 20,
  'rhythm_game' : 30
};

let _arcadeScore = 0;

function arcadeInit(){
  const params = new URLSearchParams(window.location.search);
  const scoreStr = params.get('score');

  if(scoreStr !== null){
    const num = Math.floor(Number(scoreStr));
    if(!isNaN(num) && num >= 0){
      _arcadeScore = num;
      try{ sessionStorage.setItem(SESSION_KEY, String(num)); } catch(e){}
    }
    const cleanUrl = window.location.origin + window.location.pathname + window.location.hash;
    window.history.replaceState({}, '', cleanUrl);
  } else {
    try{
      const saved = sessionStorage.getItem(SESSION_KEY);
      if(saved !== null){
        const num = Number(saved);
        if(!isNaN(num) && num >= 0) _arcadeScore = num;
      }
    } catch(e){}
  }
}

function arcadeGetScore(){
  return _arcadeScore;
}

function arcadeRequiredScore(gameKey){
  return ARCADE_REQUIREMENTS.hasOwnProperty(gameKey) ? ARCADE_REQUIREMENTS[gameKey] : 0;
}

function arcadeIsUnlocked(gameKey){
  return arcadeGetScore() >= arcadeRequiredScore(gameKey);
}

arcadeInit();
