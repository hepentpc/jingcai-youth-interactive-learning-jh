# 經彩青春 SET｜國中青春心日記

本教材以《【概念形成】_經彩青春Set-國中篇(11.10.21版)》正式劇本為基礎，延續國小版互動劇場的操作方式。

## 教材與互動

- 23 幕：首頁人物介紹 1 幕，以及 11 道互動題目與 11 幕對應知識回饋。
- 角色：青青、大春、小芯、護理師；每幕依劇本情境安排在場人物。
- 三選一：答錯可再答，答對才能前往下一幕，解鎖 Well done 經彩知識徽章。
- 操作：手機與電腦適用；返回上一幕、清除並重新開始、單一分頁進度恢復、複製通關密碼。
- 通關密碼：**0451（你是唯一）**。
- 正式角色圖尚未製作，初版使用圖片預留框，未挪用國小版角色圖。

## 使用網站

預定公開網址：https://kaoelvmpvm.github.io/jingcai-youth-interactive-learning-jh/

首次部署：在 GitHub 儲存庫 Settings → Pages → Build and deployment → Source 選取 **GitHub Actions**，再於 Actions → Deploy junior-high SET to GitHub Pages 選取 **Run workflow**。啟用後，main 分支更新即可自動部署。

## 原始資料與維護

- `data/scenes.js`：劇本文字、對話、11 題題目選項、標準答案與經彩知識回饋。以 2026-10-21 提供的 Word 內容為來源，保留原稿待校訂用語，未另行改寫醫學或制度性說明。
- `data/presence.js`：角色與舞臺場景。
- `data/character-poses.js`：待匯入圖片的角色姿勢代碼。
- `data/character-assets.js`：圖片來源與版本設定，初始為空白圖預留。
- `assets/app.js`：題目判定、回饋、徽章與通關控制。
- `assets/style.css`：沿用國小版的互動舞臺風格。
- `tests/scenes.test.cjs`：題目、場景及互動邏輯基本檢核。

本地測試：`node --test tests/scenes.test.cjs`。本網站採 GitHub Pages 靜態託管，不需 API 或後端。

## 17 張角色圖 ZIP 一鍵匯入

未來完成角色立繪後，請將 17 張透明 PNG 依固定代碼命名：

- 青青：`C01_G01.png` ～ `C01_G06.png`（6張）
- 小芯：`C02_X01.png` ～ `C02_X04.png`（4張）
- 大春：`C03_C01.png` ～ `C03_C04.png`（4張）
- 護理師：`C04_N01.png` ～ `C04_N03.png`（3張）

壓縮成 `characters.zip` 並上傳至儲存庫 `uploads/characters.zip`，即可觸發「匯入經彩青春國中角色圖片」Actions，自動驗證 PNG、解壓縮、替換圖像清單並重新部署。GitHub Pages 仍需先在 Settings → Pages 選取 GitHub Actions。
