document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category'); // top, bottom, acc

  // 탭 구조 전환
  const categoryTabs = document.querySelectorAll('.category-tab-content');
  categoryTabs.forEach(tab => {
    tab.classList.remove('active');
    if (tab.dataset.category === categoryParam) {
      tab.classList.add('active');
    }
  });

  // 하위 필터 버튼 구성
  const filterBar = document.getElementById('filter-bar');
  const productCards = document.querySelectorAll('.product-card');

  const subcategoryMap = {
    top: ['전체', '긴팔', '반팔', '셔츠'],
    bottom: ['전체', '긴바지', '반바지', '슬랙스'],
    acc: ['전체']
  };

  const korCategoryMap = {
    top: '상의',
    bottom: '하의',
    acc: '악세사리'
  };

  if (categoryParam && subcategoryMap[categoryParam]) {
    const subList = subcategoryMap[categoryParam];
    const categoryKor = korCategoryMap[categoryParam];

    // 필터 버튼 초기화
    filterBar.innerHTML = '';

    subList.forEach((sub, idx) => {
      const btn = document.createElement('button');
      btn.classList.add('filter-btn');
      if (idx === 0) btn.classList.add('active');
      btn.textContent = sub;
      btn.dataset.filter = sub;

      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // 필터링
        productCards.forEach(card => {
          const cat = card.dataset.category;
          const subcat = card.dataset.subcategory;

          const isSameCategory = cat === categoryKor;
          const isMatchSub = sub === '전체' || subcat === sub;

          card.style.display = (isSameCategory && isMatchSub) ? 'block' : 'none';
        });
      });

      filterBar.appendChild(btn);
    });

    // 페이지 로딩 시 전체 보여줌
    productCards.forEach(card => {
      const cat = card.dataset.category;
      card.style.display = (cat === categoryKor) ? 'block' : 'none';
    });
  }
});
