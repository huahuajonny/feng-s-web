document.addEventListener('DOMContentLoaded', function() {
    const fileItems = document.querySelectorAll('.file-item');
    const contentSections = document.querySelectorAll('.content-section');
    const commandInput = document.querySelector('.command-input');

    // 文件点击事件
    fileItems.forEach(item => {
        item.addEventListener('click', function() {
            const target = this.getAttribute('data-target');

            // 隐藏所有内容区域
            contentSections.forEach(section => {
                section.style.display = 'none';
            });

            // 显示对应内容
            const targetSection = document.getElementById(target + '-content');
            if (targetSection) {
                targetSection.style.display = 'block';
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 命令行功能
    if (commandInput) {
        commandInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const command = this.value.trim();
                this.value = '';

                if (command) {
                    executeCommand(command);
                }
            }
        });
    }

    function executeCommand(command) {
        const output = document.querySelector('.output');
        if (!output) return;

        const newLine = document.createElement('p');
        newLine.innerHTML = `<span class="prompt">visitor@system:~$ </span>${command}`;
        output.appendChild(newLine);

        // 命令处理
        switch(command.toLowerCase()) {
            case 'help':
                addCommandFeedback('可用命令: help, clear, about, photos, contact');
                break;
            case 'clear':
                output.innerHTML = '';
                break;
            case 'about':
                showSection('about');
                break;
            case 'photos':
                showSection('photos');
                break;
            case 'contact':
                showSection('contact');
                break;
            default:
                addCommandFeedback(`命令未找到: ${command}. 输入 help 查看可用命令`);
        }
    }

    function showSection(section) {
        contentSections.forEach(sec => sec.style.display = 'none');
        const targetSection = document.getElementById(section + '-content');
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function addCommandFeedback(message) {
        const output = document.querySelector('.output');
        const feedbackLine = document.createElement('p');
        feedbackLine.textContent = message;
        output.appendChild(feedbackLine);
    }
});