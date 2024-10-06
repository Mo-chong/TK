// ==UserScript==
// @name         提取 authToken
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  从本地存储中提取 authToken 并提供按钮以便复制到剪贴板
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 创建复制按钮
    function createCopyButton(input) {
        if (document.getElementById('authToken-copy-button')) return;

        const button = document.createElement('button');
        button.id = 'authToken-copy-button';
        button.textContent = '复制 authToken';
        button.style.position = 'fixed';
        button.style.bottom = '10px';
        button.style.right = '10px'; // 调整到右下角
        button.style.padding = '10px';
        button.style.backgroundColor = '#007bff';
        button.style.color = '#ffffff';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.zIndex = '9999';

        button.addEventListener('click', function() {
            input.select();
            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    alert('authToken 已复制到剪贴板');
                } else {
                    alert('复制失败');
                }
            } catch (err) {
                console.error('复制到剪贴板失败:', err);
                alert('复制到剪贴板失败: ' + err.message);
            }
        });

        document.body.appendChild(button);
    }

    function extractAuthToken() {
        // 从本地存储中获取 authToken
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            // 创建一个输入框
            const input = document.createElement('input');
            input.value = authToken;
            input.style.position = 'fixed';
            input.style.bottom = '50px'; // 调整为离下边距离
            input.style.left = '10px';   // 保持在左边
            input.style.width = '300px';
            input.style.padding = '10px';
            input.style.zIndex = '10000';
            document.body.appendChild(input);

            // 创建并显示复制按钮
            createCopyButton(input);
        } else {
            console.log('在本地存储中未找到 authToken');
        }
    }

    // 初始化提取 authToken
    extractAuthToken();
})();
