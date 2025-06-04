document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);

  // ------------------- 커뮤니티 탭 -------------------
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  const selectedTab = urlParams.get('tab');

  if (selectedTab) {
    tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === selectedTab);
    });

    tabContents.forEach(content => {
      content.classList.toggle('active', content.classList.contains(selectedTab));
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabContents.forEach(content => {
        content.classList.toggle('active', content.classList.contains(targetTab));
      });
    });
  });

  // ------------------- 카테고리 필터링 -------------------
  const selectedCategoryParam = urlParams.get('category'); // top, bottom, acc

  // 카테고리명 맵핑
  const selectedCategory = selectedCategoryParam === 'top' ? '상의'
                        : selectedCategoryParam === 'bottom' ? '하의'
                        : selectedCategoryParam === 'acc' ? '악세사리'
                        : null;

  const subcategoryMap = {
    '상의': ['긴팔', '반팔', '셔츠'],
    '하의': ['긴바지', '반바지', '슬랙스']
  };

  const filterBar = document.getElementById('filter-bar');
  const productCards = document.querySelectorAll('.product-card');

  // 카테고리 선택된 경우
  if (selectedCategory && subcategoryMap[selectedCategory]) {
    // 기존 버튼 제거
    while (filterBar.firstChild) {
      filterBar.removeChild(filterBar.firstChild);
    }

    // ✅ "전체" 버튼 먼저 추가
    const allBtn = document.createElement('button');
    allBtn.classList.add('filter-btn', 'active');
    allBtn.textContent = '전체';
    allBtn.dataset.filter = '전체';
    allBtn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      allBtn.classList.add('active');
      showProductsByCategory(selectedCategory); // 전체 보여주기
    });
    filterBar.appendChild(allBtn);

    // ✅ 하위 필터 버튼 추가
    subcategoryMap[selectedCategory].forEach(sub => {
      const btn = document.createElement('button');
      btn.classList.add('filter-btn');
      btn.textContent = sub;
      btn.dataset.filter = sub;

      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterProducts(selectedCategory, sub);
      });

      filterBar.appendChild(btn);
    });

    // 최초 전체 보여주기
    showProductsByCategory(selectedCategory);
  }

  function filterProducts(category, subcategory) {
    productCards.forEach(card => {
      const cat = card.dataset.category;
      const sub = card.dataset.subcategory;
      card.style.display = (cat === category && sub === subcategory) ? 'block' : 'none';
    });
  }

  function showProductsByCategory(category) {
    productCards.forEach(card => {
      const cat = card.dataset.category;
      card.style.display = (cat === category) ? 'block' : 'none';
    });
  }
});
