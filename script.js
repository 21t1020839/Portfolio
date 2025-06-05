// Sử dụng modern JavaScript with IIFE để tạo scope và tránh biến global
(() => {
  'use strict';

  // Intersection Observer API - hiệu quả hơn so với phương pháp truyền thống
  const setupScrollReveal = () => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const revealCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scrolled');
          // Kích hoạt hiệu ứng thanh kỹ năng nếu phần tử là .skills-container
          if (entry.target.classList.contains('skills-container')) {
            animateSkills();
          }
          // Chỉ hiển thị một lần (không ẩn khi cuộn lên)
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(revealCallback, observerOptions);
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
  };

  // Hiệu ứng cuộn mượt sử dụng CSS native scroll-behavior
  const setupSmoothScroll = () => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Đóng menu mobile nếu đang mở
          document.querySelector('.nav-links')?.classList.remove('active');
          document.querySelector('.mobile-menu-btn')?.classList.remove('active');
          
          targetElement.scrollIntoView();
          
          // Cập nhật URL với hash mà không gây cuộn
          history.pushState(null, null, targetId);
        }
      });
    });
  };

  // Hiệu ứng gõ chữ nâng cao sử dụng CSS animation và hiệu ứng nhấp nháy
  const setupTypewriter = () => {
    const tagline = document.querySelector('.tagline');
    if (!tagline) return;
    
    const text = tagline.textContent;
    tagline.innerHTML = '<span class="typewriter"></span><span class="cursor">|</span>';
    const typewriter = tagline.querySelector('.typewriter');
    
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        typewriter.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        // Thêm hiệu ứng phát sáng khi hoàn thành
        tagline.classList.add('glow');
      }
    }
    
    setTimeout(typeWriter, 1000);
  };

  // Đếm số tự động cho thống kê (cho phần thành tựu)
  const setupCounters = () => {
    const countElements = document.querySelectorAll('.counter');
    
    const countUp = (el) => {
      const target = parseInt(el.getAttribute('data-target'));
      const count = parseInt(el.innerText);
      const increment = Math.ceil(target / 100);
      
      if (count < target) {
        el.innerText = Math.min(count + increment, target);
        setTimeout(() => countUp(el), 20);
      }
    };
    
    // Sử dụng Intersection Observer để bắt đầu đếm khi phần tử xuất hiện
    const observerOptions = {
      threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    countElements.forEach(counter => observer.observe(counter));
  };

  // Hiệu ứng thanh kỹ năng và hoạt họa
  const animateSkills = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((skill, index) => {
      const percentage = skill.dataset.percentage;
      const progressBar = skill.querySelector('.progress');
      
      // Thêm delay để tạo hiệu ứng tuần tự
      setTimeout(() => {
        progressBar.style.width = `${percentage}%`;
      }, 300 * index);
    });
  };

  // Cấu hình darkmode với lưu trạng thái vào localStorage
  const setupDarkMode = () => {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;
    
    // Kiểm tra localStorage khi tải trang
    if (localStorage.getItem('darkMode') === 'enabled') {
      body.classList.add('dark-mode');
      darkModeToggle?.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
    
    darkModeToggle?.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      
      // Lưu trạng thái
      if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
      } else {
        localStorage.setItem('darkMode', null);
        darkModeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
      }
    });
  };

  // Hiệu ứng parallax cho header
  const setupParallax = () => {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      if (hero) {
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      }
    });
  };

  // Cài đặt bộ lọc cho dự án
  const setupProjectFilters = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Loại bỏ active từ tất cả các nút
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.dataset.filter;
        
        projectItems.forEach(item => {
          // Hiển thị tất cả nếu là 'all', nếu không kiểm tra category
          if (filterValue === 'all') {
            item.style.display = 'block';
            setTimeout(() => {
              item.classList.remove('hidden');
            }, 10);
          } else {
            if (item.dataset.category === filterValue) {
              item.style.display = 'block';
              setTimeout(() => {
                item.classList.remove('hidden');
              }, 10);
            } else {
              item.classList.add('hidden');
              setTimeout(() => {
                item.style.display = 'none';
              }, 500);
            }
          }
        });
      });
    });
  };

  // Nút quay lại đầu trang với hiệu ứng mượt
  const setupBackToTop = () => {
    const backToTopButton = document.querySelector('.back-to-top');
    
    const updateBackToTopVisibility = () => {
      if (window.pageYOffset > 300) {
        backToTopButton?.classList.add('show');
      } else {
        backToTopButton?.classList.remove('show');
      }
    };
    
    window.addEventListener('scroll', updateBackToTopVisibility);
    
    backToTopButton?.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };

  // Menu mobile
  const setupMobileMenu = () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn?.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navLinks?.classList.toggle('active');
      
      // Thêm/xóa class no-scroll trên body để vô hiệu hóa cuộn khi menu mở
      document.body.classList.toggle('no-scroll', navLinks?.classList.contains('active'));
    });
    
    // Đóng menu khi click bên ngoài
    document.addEventListener('click', (e) => {
      if (
        navLinks?.classList.contains('active') &&
        !navLinks.contains(e.target) &&
        !mobileMenuBtn?.contains(e.target)
      ) {
        navLinks.classList.remove('active');
        mobileMenuBtn?.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  };

  // Modal dự án cải tiến với animation
  const setupProjectModals = () => {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');
    const closeModal = document.querySelector('.close-modal');
    
    if (!modal || !modalContent || !closeModal) return;
    
    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const title = card.querySelector('h3')?.textContent;
        const description = card.querySelector('p')?.textContent;
        const imageSrc = card.querySelector('img')?.src;
        const category = card.dataset.category || 'Web Development';
        
        modalContent.innerHTML = `
          <h3>${title}</h3>
          <div class="project-category">${category}</div>
          <img src="${imageSrc}" alt="${title}">
          <p>${description}</p>
          <div class="modal-details">
            <p><strong>Công nghệ:</strong> HTML, CSS, JavaScript</p>
            <p><strong>Vai trò:</strong> Front-end Developer</p>
            <div class="modal-actions">
              <a href="#" class="btn btn-primary">Xem Demo</a>
              <a href="#" class="btn btn-secondary">Xem Code</a>
            </div>
          </div>
        `;
        
        modal.classList.add('show');
        document.body.classList.add('no-scroll');
      });
    });
    
    closeModal.addEventListener('click', () => {
      modal.classList.remove('show');
      document.body.classList.remove('no-scroll');
    });
    
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
        document.body.classList.remove('no-scroll');
      }
    });
    
    // Đóng modal khi nhấn ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        modal.classList.remove('show');
        document.body.classList.remove('no-scroll');
      }
    });
  };

  // Hiệu ứng Loading Animation
  const setupLoadingScreen = () => {
    const loader = document.querySelector('.loader-wrapper');
    if (!loader) return;
    
    // Ẩn loader sau khi trang web đã tải xong
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('fade-out');
        document.body.classList.remove('loading');
        
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500);
      }, 1000);
    });
  };

  // Khởi tạo tất cả các tính năng khi DOM đã sẵn sàng
  document.addEventListener('DOMContentLoaded', () => {
    setupSmoothScroll();
    setupTypewriter();
    setupScrollReveal();
    setupBackToTop();
    setupMobileMenu();
    setupProjectModals();
    setupDarkMode();
    setupParallax();
    setupProjectFilters();
    setupCounters();
    setupLoadingScreen();
    
    // Khởi tạo AOS (Animate On Scroll) library nếu được sử dụng
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        once: true
      });
    }
  });
})();