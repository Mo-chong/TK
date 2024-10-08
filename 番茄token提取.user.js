// ==UserScript==
// @name         番茄token提取脚本
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  提取本地存储中键名为 token 的值并提供按钮以便复制到剪贴板
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function createButton(input, buttonId, buttonText, buttonPosition) {
        if (document.getElementById(buttonId)) return;

        const button = document.createElement('button');
        button.id = buttonId;
        button.textContent = buttonText;
        button.style.position = 'fixed';
        button.style[buttonPosition.vertical] = '10px';
        button.style[buttonPosition.horizontal] = '10px';
        button.style.padding = '10px';
        button.style.backgroundColor = '#007bff';
        button.style.color = '#ffffff';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.zIndex = '10000';

        button.addEventListener('click', function() {
            input.select();
            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    alert('数据已复制到剪贴板');
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

    function extractToken() {
        const token = localStorage.getItem('token');  // 从本地存储中获取 token
        if (token) {
            // 创建一个输入框
            const input = document.createElement('input');
            input.value = token;  // 提取 token 值
            input.style.position = 'fixed';
            input.style.bottom = '10px';  // 调整为离下边距离
            input.style.left = '10px';    // 调整为离左边距离
            input.style.width = '300px';
            input.style.padding = '10px';
            input.style.zIndex = '9999';
            document.body.appendChild(input);

            // 创建并显示复制按钮
            createButton(input, 'token-copy-button', '复制 token', { vertical: 'bottom', horizontal: 'left' });
        } else {
            console.log('在本地存储中未找到 token');
        }
    }

    // 确保文档已完全加载后再执行
    window.onload = function() {
        extractToken();
    };
})();
