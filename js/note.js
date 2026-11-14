
// =========================
// ノート画面の管理
// =========================

// HTMLの要素を取得
const categoryButtons = document.querySelectorAll(".note-category");

const searchInput = document.getElementById("trivia-search");

const triviaList = document.getElementById("trivia-list");

const listTitle = document.getElementById("trivia-list-title");

const resultCount = document.getElementById("trivia-result-count");


// 現在選択しているカテゴリー
let selectedCategory = "すべて";


// =========================
// 豆知識を表示する関数
// =========================

function displayTrivia() {

  // 検索欄の文字を取得
  const searchWord = searchInput.value.trim().toLowerCase();


  // 豆知識を絞り込む
  const filteredTrivia = triviaData.filter(trivia => {

    // カテゴリーが一致しているか
    const categoryMatch =
      selectedCategory === "すべて" ||
      trivia.category === selectedCategory;


    // 検索文字が含まれているか
    const searchMatch =
      trivia.title.toLowerCase().includes(searchWord) ||
      trivia.summary.toLowerCase().includes(searchWord) ||
      trivia.detail.toLowerCase().includes(searchWord);


    // 両方の条件を満たすものだけ表示
    return categoryMatch && searchMatch;

  });


  // 見出しを変更
  if (selectedCategory === "すべて") {
    listTitle.textContent = "すべての豆知識";
  } else {
    listTitle.textContent = selectedCategory + "の豆知識";
  }


  // 件数を表示
  resultCount.textContent = filteredTrivia.length + "件";


  // 一覧をいったん空にする
  triviaList.innerHTML = "";


  // 検索結果がない場合
  if (filteredTrivia.length === 0) {

    triviaList.innerHTML = `
      <div class="no-trivia">
        該当する豆知識がありません。
      </div>
    `;

    return;
  }


  // 豆知識を1件ずつ表示
  filteredTrivia.forEach(trivia => {

    const card = document.createElement("article");

    card.className = "trivia-card";


    card.innerHTML = `
      <div class="trivia-card-top">

        <div class="trivia-card-icon">
          ${trivia.icon}
        </div>

        <div class="trivia-card-info">

          <span class="trivia-card-category">
            ${trivia.category}
          </span>

          <h3>${trivia.title}</h3>

        </div>

      </div>

      <p class="trivia-card-summary">
        ${trivia.summary}
      </p>

      <details>

        <summary>詳しく見る</summary>

        <p class="trivia-card-detail">
          ${trivia.detail}
        </p>

      </details>
    `;


    triviaList.appendChild(card);

  });

}


// =========================
// カテゴリーを選択したとき
// =========================

categoryButtons.forEach(button => {

  button.addEventListener("click", () => {

    // 選択したカテゴリーを取得
    selectedCategory = button.dataset.category;


    // すべてのカテゴリーの選択状態を解除
    categoryButtons.forEach(categoryButton => {
      categoryButton.classList.remove("active");
    });


    // 選択したカテゴリーを強調
    button.classList.add("active");


    // 豆知識を再表示
    displayTrivia();

  });

});


// =========================
// 検索したとき
// =========================

searchInput.addEventListener("input", () => {

  displayTrivia();

});


// =========================
// 最初の表示
// =========================

displayTrivia();
