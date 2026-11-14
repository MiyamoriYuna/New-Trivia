
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

    // -------------------------
    // 検索欄に文字が入力されている場合
    // -------------------------

    if (searchWord !== "") {

      // カテゴリーに関係なく検索する
      return (
        trivia.title.toLowerCase().includes(searchWord) ||
        trivia.summary.toLowerCase().includes(searchWord) ||
        trivia.detail.toLowerCase().includes(searchWord)
      );

    }


    // -------------------------
    // 検索欄が空の場合
    // -------------------------

    // 選択中のカテゴリーで絞り込む
    return (
      selectedCategory === "すべて" ||
      trivia.category === selectedCategory
    );

  });


  // =========================
  // 見出しを変更
  // =========================

  if (searchWord !== "") {

    listTitle.textContent = "検索結果";

  } else if (selectedCategory === "すべて") {

    listTitle.textContent = "すべての豆知識";

  } else {

    listTitle.textContent = selectedCategory + "の豆知識";

  }


  // =========================
  // 件数を表示
  // =========================

  resultCount.textContent = filteredTrivia.length + "件";


  // 一覧をいったん空にする
  triviaList.innerHTML = "";


  // =========================
  // 検索結果がない場合
  // =========================

  if (filteredTrivia.length === 0) {

    triviaList.innerHTML = `
      <div class="no-trivia">
        該当する豆知識がありません。
      </div>
    `;

    return;

  }


  // =========================
  // 豆知識を1件ずつ表示
  // =========================

  filteredTrivia.forEach(trivia => {

    // カードを作成
    const card = document.createElement("article");

    card.className = "trivia-card";


    // カードの内容を設定
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


    // 一覧にカードを追加
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

  // カテゴリーに関係なく検索結果を表示
  displayTrivia();

});


// =========================
// 最初の表示
// =========================

displayTrivia();
