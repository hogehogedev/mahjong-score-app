let problems = [];
let currentIndex = 0;
let delay = 3;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateAllProblems(from, to) {
  const all = [];
  for (let han = 1; han <= 4; han++) {
    for (let fu = from; fu <= to; fu += 5) {
      if (!scoreTable[han][fu]) continue;
      all.push({ han, fu, isParent: true });
      all.push({ han, fu, isParent: false });
    }
  }
  shuffle(all);
  return all;
}

function startSession() {
  const from = parseInt(document.getElementById("from").value);
  const to = parseInt(document.getElementById("to").value);
  delay = parseInt(document.getElementById("time").value);

  problems = generateAllProblems(from, to);
  currentIndex = 0;
  showNext();
}

function showNext() {
  if (currentIndex >= problems.length) {
    document.getElementById("question").innerText = "終了！";
    document.getElementById("answer").innerText = "";
    return;
  }

  const q = problems[currentIndex];
  const scoreInfo = scoreTable[q.han][q.fu];
  const role = q.isParent ? '親' : '子';
  const cssClass = q.isParent ? 'parent' : 'child';
  const score = scoreInfo[q.isParent ? 'parent' : 'child'];

  document.getElementById("question").innerHTML = `<span class="${cssClass}">${role}</span> ${q.han}飜 ${q.fu}符`;
  document.getElementById("answer").innerText = "";

  setTimeout(() => {
    document.getElementById("answer").innerText = `${score[0]} (${score[1]})`;
    currentIndex++;
    setTimeout(showNext, 2000); // 1秒見せたあと次へ
  }, delay * 1000);
}