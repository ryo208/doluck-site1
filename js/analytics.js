/* Google Analytics 4 (GA4) 共通ローダー
 *
 * 使い方:
 * 1. https://analytics.google.com/ で GA4 プロパティを作成し、
 *    「G-」で始まる測定IDを取得する
 * 2. 下の GA_MEASUREMENT_ID を取得した測定IDに書き換える（このファイルだけでOK）
 * 3. Google Search Console (https://search.google.com/search-console) に
 *    プロパティを追加し、「Google アナリティクス」経由で所有権を確認、
 *    sitemap.xml を送信する
 *
 * 測定IDが未設定（G-XXXXXXXXXX のまま）の間は何も読み込まず、動作に影響しません。
 */
(function () {
  var GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // ← ここを自分の測定IDに書き換える

  if (GA_MEASUREMENT_ID.indexOf('XXXXXXXXXX') !== -1) return; // 未設定なら何もしない

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);

  // 電話タップ（＝予約アクション）をコンバージョンとして計測
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="tel:"]');
    if (a) gtag('event', 'tel_click', { link_url: a.getAttribute('href') });
  });
})();
