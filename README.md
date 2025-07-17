# 專案概述：YouTube 縮圖擷取工具

這個專案是一個 **YouTube 縮圖擷取工具**。

## 功能描述：

這個應用程式允許使用者輸入 YouTube 影片的網址，然後它會自動解析出影片 ID，並提供不同品質（最大解析度、標準解析度、高品質）的影片縮圖供使用者預覽和下載。

## 主要技術棧：

*   **前端框架：** React
*   **建置工具：** Vite
*   **UI 函式庫：** Material-UI (MUI)
*   **語言：** TypeScript
*   **套件管理：** Yarn
*   **部署：** GitHub Pages (透過 GitHub Actions 自動部署)

## 專案結構與核心組件：

*   **`src/App.tsx`**: 應用程式的根組件，負責設定整體佈局，並引入 `YoutubeThumbnailFetcher` 組件。
*   **`src/components/YoutubeThumbnailFetcher.tsx`**:
    *   這是應用程式的核心邏輯組件。
    *   包含一個文字輸入框 (`TextField`) 讓使用者貼上 YouTube 網址。
    *   一個按鈕 (`Button`) 用於觸發縮圖擷取。
    *   `getYouTubeVideoId` 函式用於從 YouTube 網址中提取影片 ID。
    *   根據影片 ID，生成不同品質縮圖的 URL。
    *   使用 `Snackbar` 顯示錯誤訊息（例如：無效的 YouTube 網址）。
    *   將生成的縮圖資料傳遞給 `ThumbnailCard` 組件進行顯示。
*   **`src/components/ThumbnailCard.tsx`**:
    *   負責顯示單個縮圖的組件。
    *   使用 Material-UI 的 `Card`、`CardMedia`、`CardContent` 和 `CardActions` 來呈現縮圖。
    *   顯示縮圖的品質和解析度。
    *   提供一個「下載圖片」按鈕，點擊後會觸發圖片下載功能。
    *   使用 `Snackbar` 顯示下載成功或失敗的提示。
*   **`package.json`**: 定義了專案的依賴項、腳本和元數據。
    *   `dependencies` 中包含了 React, Material-UI 等運行時依賴。
    *   `devDependencies` 中包含了 Vite, ESLint, TypeScript 等開發工具。
*   **`.github/workflows/deploy.yml`**: GitHub Actions 工作流程文件，用於自動化部署到 GitHub Pages。
    *   在 `main` 分支有新的 push 時觸發。
    *   設定 Node.js 環境，安裝依賴，執行 `yarn build`。
    *   使用 GitHub 官方的 `actions/configure-pages`、`actions/upload-pages-artifact` 和 `actions/deploy-pages` Actions 來處理部署。

## 總結：

這是一個實用的小工具，利用 React 和 Material-UI 提供了友好的使用者介面，並透過 GitHub Actions 實現了自動化部署，方便使用者快速獲取 YouTube 影片的縮圖。
