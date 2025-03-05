    // 轮播图逻辑
    const slides = document.querySelectorAll('.carousel img');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    document.getElementById('nextBtn').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    });

    // 自动播放（可选）
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }, 3000);
	
	// 获取横向滚动面板
	const horizontalScrollPanel = document.querySelector('.horizontal-scroll-panel');
	
	// 拖动状态标志
	let isDragging = false;
	let startX = 0;
	let scrollStart = 0;
	
	// 禁用选择函数
	function disableSelection() {
	    horizontalScrollPanel.style.userSelect = 'none';
	    horizontalScrollPanel.style.webkitUserSelect = 'none';
	}
	
	// 恢复选择函数
	function restoreSelection() {
	    horizontalScrollPanel.style.userSelect = '';
	    horizontalScrollPanel.style.webkitUserSelect = '';
	}
	
	// 鼠标按下事件
	horizontalScrollPanel.addEventListener('mousedown', (e) => {
	    // 如果点击的是图片或链接，阻止默认行为
	    if (e.target.tagName === 'A' || e.target.tagName === 'IMG') {
	        e.preventDefault();
	    }
	
	    isDragging = true;
	    startX = e.pageX - horizontalScrollPanel.offsetLeft;
	    scrollStart = horizontalScrollPanel.scrollLeft;
	
	    // 禁用选择
	    disableSelection();
	
	    horizontalScrollPanel.style.cursor = 'grabbing'; // 修改鼠标样式
	});
	
	// 鼠标移动事件
	horizontalScrollPanel.addEventListener('mousemove', (e) => {
	    if (!isDragging) return;
	    e.preventDefault(); // 防止默认行为
	
	    // 计算滚动距离
	    const x = e.pageX - horizontalScrollPanel.offsetLeft;
	    const walk = (x - startX) * 2; // 放大拖动效果
	    horizontalScrollPanel.scrollLeft = scrollStart - walk;
	
	    // 同步页面滚动
	    document.documentElement.scrollLeft = horizontalScrollPanel.scrollLeft;
	});
	
	// 鼠标抬起事件
	horizontalScrollPanel.addEventListener('mouseup', () => {
	    isDragging = false;
	
	    // 恢复选择
	    restoreSelection();
	
	    horizontalScrollPanel.style.cursor = 'grab'; // 恢复鼠标样式
	});
	
	// 鼠标离开事件
	horizontalScrollPanel.addEventListener('mouseleave', () => {
	    isDragging = false;
	
	    // 恢复选择
	    restoreSelection();
	
	    horizontalScrollPanel.style.cursor = 'grab'; // 恢复鼠标样式
	});
	
	// 点击事件处理
	horizontalScrollPanel.addEventListener('click', (e) => {
	    // 如果正在拖动，则阻止点击行为
	    if (isDragging) {
	        e.preventDefault();
	        return;
	    }
	});