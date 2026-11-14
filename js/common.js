
// =========================
// 画面切り替え
// =========================

// メニューのボタンを取得
const navButtons = document.querySelectorAll(".nav-button");

// 各画面を取得
const pages = document.querySelectorAll(".page");


// =========================
// メニューを押したときの処理
// =========================

navButtons.forEach(button => {

  button.addEventListener("click", () => {

    // 表示する画面の名前を取得
    const pageName = button.dataset.page;


    // すべての画面を非表示にする
    pages.forEach(page => {
      page.classList.remove("active");
    });


    // 選択した画面を表示する
    const targetPage = document.getElementById(pageName);

    if (targetPage) {
      targetPage.classList.add("active");
    }


    // すべてのメニューの選択状態を解除
    navButtons.forEach(navButton => {
      navButton.classList.remove("active");
    });


    // 押したメニューを選択状態にする
    button.classList.add("active");

    // ページの先頭に戻る
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

});
