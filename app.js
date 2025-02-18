document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({ currentWindow: true, active: true }, async function(tab) {
        const url = tab[0].url;
        const title = tab[0].title;
        
        // 設定初始文字，使用新的格式
        const textarea = document.getElementById('share-content');
        textarea.value = `"${title}" ( ${url} )`;
        
        try {
            // 在目標頁面執行腳本來獲取 Open Graph 資訊
            const [result] = await chrome.scripting.executeScript({
                target: { tabId: tab[0].id },
                func: () => {
                    return {
                        ogImage: document.querySelector('meta[property="og:image"]')?.content,
                        ogTitle: document.querySelector('meta[property="og:title"]')?.content,
                        ogDescription: document.querySelector('meta[property="og:description"]')?.content
                    };
                }
            });

            const { ogImage, ogTitle, ogDescription } = result.result;
            
            // 設定預覽圖片
            if (ogImage) {
                document.getElementById('preview-image').src = ogImage;
            } else {
                document.getElementById('preview-image').style.display = 'none';
            }
            
            // 設定預覽標題
            document.getElementById('preview-title').textContent = ogTitle || title;
            
            // 設定預覽描述
            if (ogDescription) {
                document.getElementById('preview-description').textContent = ogDescription;
            } else {
                document.getElementById('preview-description').style.display = 'none';
            }
        } catch (error) {
            console.error('無法取得預覽資訊:', error);
            // 如果無法取得預覽資訊，隱藏預覽區塊
            document.getElementById('preview').style.display = 'none';
        }
        
        // 設定分享按鈕事件
        const shareToTwitter = () => {
            const content = document.getElementById('share-content').value;
            const twitterShareUrl = 'https://twitter.com/intent/tweet'
                + '?text=' + encodeURIComponent(content);
            
            window.open(twitterShareUrl, '_blank');
        };

        // 設定按鈕點擊事件
        document.getElementById('share-button').addEventListener('click', shareToTwitter);

        // 設定鍵盤快捷鍵
        document.getElementById('share-content').addEventListener('keydown', function(e) {
            // 檢查是否為 Command+Enter (Mac) 或 Ctrl+Enter (Windows/Linux)
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                e.preventDefault(); // 防止換行
                shareToTwitter();
            }
        });
    });
});
