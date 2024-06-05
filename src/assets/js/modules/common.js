export function common() {

	//ページ読み込み後にbodyのpreloadを外す
	window.addEventListener('load', function() {
		var body = document.querySelector('body');
		body.classList.remove('preload');
	});

	//common
	const htmlElement = document.querySelector('html'); //bodyタグの要素を取得


	//header
	const scrollTarget = document.querySelector('#js-scroll-target');
	const header = document.querySelector('#js-header');

	const headerMenu = document.querySelector('#js-header-menu-btn');
	const menu = document.querySelector('#js-header-menu');
	const menuLink = document.querySelector('.js-menu-link');


	// 特定の位置にスクロールするとヘッダーの色を変える
	window.addEventListener('scroll', () => {
		// 特定要素の上端の座標を取得
		const targetTop = scrollTarget.getBoundingClientRect().top;

		// もし要素が画面内に入ってきたらヘッダーにクラスを付与、それ以外はクラスを削除
		if (targetTop <= 0) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	});

	// ハンバーガーメニューの開閉
	headerMenu.addEventListener('click', () => {
		header.classList.toggle('active');
		menu.classList.toggle('open');
		htmlElement.classList.toggle('fixed');
	});

	menuLink.addEventListener('click', () => {
		header.classList.remove('active');
		menu.classList.remove('open');
		htmlElement.classList.remove('fixed');
	});

	document.addEventListener("DOMContentLoaded", function(event) {
    // ページが読み込まれた後に実行されるコード
    // 指定のアンカーリンク先のIDを取得
    var targetAnchor = document.getElementById("company");

    // アンカーリンク先が存在するか確認
    if (targetAnchor) {
        // アンカーリンク先へのスクロール
        targetAnchor.scrollIntoView({
            behavior: "smooth", // スムーズにスクロールする
            block: "start"      // アンカーリンク先をビューポートの先頭に配置する
        });
    }
});

}

