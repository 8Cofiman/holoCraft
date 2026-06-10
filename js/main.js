document.addEventListener('DOMContentLoaded', () => {

  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu');

  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');

    burger.innerHTML = mobileMenu.classList.contains('active')
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      burger.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  const catalogData = [
    {
      id: 1,
      title: "Голографическая сцена для концерта",
      category: "project",
      categoryName: "Проект",
      img: "../images/1.jpg",
      desc: "Масштабная голографическая инсталляция для живого выступления.",
      price: "от 2 800 000 ₽",
      fullDesc: "Полноценная голографическая сцена 8×5 метров с интерактивным управлением и синхронизацией со световым шоу."
    },
    {
      id: 2,
      title: "AR-гид по музею",
      category: "service",
      categoryName: "Услуга",
      img: "../images/2.jpg",
      desc: "Приложение дополненной реальности с голографическими экскурсоводами.",
      price: "от 450 000 ₽",
      fullDesc: "Мобильное приложение, которое превращает экспонаты в живые голограммы."
    },
    {
      id: 3,
      title: "Голографический проектор HoloBeam Pro",
      category: "equipment",
      categoryName: "Оборудование",
      img: "../images/3.jpg",
      desc: "Профессиональный голографический проектор 4K.",
      price: "1 250 000 ₽",
      fullDesc: "Модель с углом обзора 180° и поддержкой реального времени."
    },
    {
      id: 4,
      title: "Инсталляция «Космический портал»",
      category: "project",
      categoryName: "Проект",
      img: "../images/4.jpg",
      desc: "Интерактивная голографическая арка в ТЦ.",
      price: "от 1 950 000 ₽",
      fullDesc: "Посетители взаимодействуют с космическими объектами через жесты."
    },
    {
      id: 5,
      title: "Создание 3D-голограммы продукта",
      category: "service",
      categoryName: "Услуга",
      img: "../images/5.jpg",
      desc: "Голографическая визуализация товаров.",
      price: "от 120 000 ₽",
      fullDesc: "Полный цикл создания высококачественной голограммы продукта."
    },
    {
      id: 6,
      title: "Набор мини-проекторов HoloMini",
      category: "equipment",
      categoryName: "Оборудование",
      img: "../images/6.jpg",
      desc: "Компактные проекторы для дома и офиса.",
      price: "от 89 000 ₽",
      fullDesc: "Серия из 4 мини-проекторов с синхронизацией."
    }
  ];

  const cardsGrid = document.getElementById('cards-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modal-close');

  function renderCards(data) {
    cardsGrid.innerHTML = data.map(item => `
            <div class="card" data-id="${item.id}">
                <img src="${item.img}" alt="${item.title}">
                <div class="card-body">
                    <span class="card-category" style="background: ${item.category === 'project' ? '#a064ff33' : item.category === 'service' ? '#64ff9a33' : '#64c8ff33'}; color: ${item.category === 'project' ? '#c080ff' : item.category === 'service' ? '#64ff9a' : '#64c8ff'}">
                        ${item.categoryName}
                    </span>
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                    <div class="card-footer">
                        <span style="font-weight: 600; color: #64c8ff;">${item.price}</span>
                        <small style="opacity: 0.6;">Подробнее →</small>
                    </div>
                </div>
            </div>
        `).join('');

    cardsGrid.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
        const project = catalogData.find(p => p.id === +card.dataset.id);
        if (project) showModal(project);
      });
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;
      const filtered = category === 'all' ? catalogData : catalogData.filter(item => item.category === category);
      renderCards(filtered);
    });
  });

  function showModal(project) {
    document.getElementById('modal-image').style.backgroundImage = `url(${project.img})`;
    document.getElementById('modal-category').textContent = project.categoryName;
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-desc').textContent = project.fullDesc;
    document.getElementById('modal-price').innerHTML = `<strong>${project.price}</strong>`;

    modal.style.display = 'flex';
  }

  modalClose.addEventListener('click', () => modal.style.display = 'none');
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });

  if (cardsGrid) renderCards(catalogData);
});