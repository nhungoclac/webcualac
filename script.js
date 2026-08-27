/* =========================================================
   SCRIPT.JS - Interactive Core Logic for Portfolio Lạc Ngọc Như
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------------------------------------------------------
     1. Dark / Light Theme Toggle (Persisted in localStorage)
     --------------------------------------------------------- */
  const themeToggleBtn = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const body = document.body;

  const currentTheme = localStorage.getItem("theme") || "light";
  if (currentTheme === "dark") {
    body.classList.add("dark");
    if (themeIcon) themeIcon.className = "fas fa-sun";
  } else {
    body.classList.remove("dark");
    if (themeIcon) themeIcon.className = "fas fa-moon";
  }

  themeToggleBtn?.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    if (themeIcon) {
      themeIcon.className = isDark ? "fas fa-sun" : "fas fa-moon";
    }
  });

  /* ---------------------------------------------------------
     Mobile Hamburger Menu Toggle (3 gạch)
     --------------------------------------------------------- */
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenuIcon = document.getElementById("mobileMenuIcon");
  const mainNav = document.getElementById("mainNav");

  mobileMenuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    mainNav?.classList.toggle("mobile-active");
    const isActive = mainNav?.classList.contains("mobile-active");
    if (mobileMenuIcon) {
      mobileMenuIcon.className = isActive ? "fas fa-times" : "fas fa-bars";
    }
  });

  document.addEventListener("click", (e) => {
    if (
      mainNav?.classList.contains("mobile-active") &&
      !mainNav.contains(e.target) &&
      !mobileMenuBtn?.contains(e.target)
    ) {
      mainNav.classList.remove("mobile-active");
      if (mobileMenuIcon) mobileMenuIcon.className = "fas fa-bars";
    }
  });

  /* ---------------------------------------------------------
     2. IT x Marketing Focus Mode Switcher
     --------------------------------------------------------- */
  const focusModeToggle = document.getElementById("focusModeToggle");
  const focusIcon = document.getElementById("focusIcon");
  const focusText = document.getElementById("focusText");
  const focusBadge = document.getElementById("focusBadge");
  const heroBioText = document.getElementById("heroBioText");
  const skillSectionTitle = document.getElementById("skillSectionTitle");

  let currentMode = localStorage.getItem("focusMode") || "tech";

  function applyFocusMode(mode) {
    if (mode === "mkt") {
      if (focusIcon) focusIcon.className = "fas fa-bullhorn";
      if (focusText) focusText.innerText = "Góc Marketing";
      if (focusBadge) {
        focusBadge.innerText = "MarTech";
        focusBadge.style.background =
          "linear-gradient(135deg, #2563EB 0%, #8B5CF6 100%)";
      }
      if (heroBioText) {
        heroBioText.innerText =
          "Mình là Lạc. Yêu truyền thông, thích công nghệ. Website này được tạo nên bởi vibe-coding, lưu giữ những điều hay ho trong quá trình trưởng thành của mình. Hy vọng trong 10 năm tới, mình sẽ là một cái tên có chỗ đứng vững chắc trong ngành nghề mà mình đã theo đuổi!";
      }
      if (skillSectionTitle) skillSectionTitle.innerText = "Mình Có Gì";
    } else {
      if (focusIcon) focusIcon.className = "fas fa-laptop-code";
      if (focusText) focusText.innerText = "Góc IT";
      if (focusBadge) {
        focusBadge.innerText = "Tech";
        focusBadge.style.background = "var(--accent-gradient)";
      }
      if (heroBioText) {
        heroBioText.innerText =
          "Mình là Lạc. Yêu truyền thông, thích công nghệ. Website này được tạo nên bởi vibe-coding, lưu giữ những điều hay ho trong quá trình trưởng thành của mình. Hy vọng trong 10 năm tới, mình sẽ là một cái tên có chỗ đứng vững chắc trong ngành nghề mà mình đã theo đuổi!";
      }
      if (skillSectionTitle) skillSectionTitle.innerText = "Mình Có Gì";
    }
    localStorage.setItem("focusMode", mode);
  }

  applyFocusMode(currentMode);

  focusModeToggle?.addEventListener("click", () => {
    currentMode = currentMode === "tech" ? "mkt" : "tech";
    applyFocusMode(currentMode);
  });

  /* ---------------------------------------------------------
     3. Typewriter Effect (Hero Section)
     --------------------------------------------------------- */
  const typewriterElement = document.getElementById("typewriter");
  if (typewriterElement) {
    const phrases = ["Ecommerce", "Branding", "MarTech"];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function typeLoop() {
      const currentPhrase = phrases[phraseIdx];

      if (isDeleting) {
        typewriterElement.innerText = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
      } else {
        typewriterElement.innerText = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
      }

      let typeSpeed = isDeleting ? 40 : 80;

      if (!isDeleting && charIdx === currentPhrase.length) {
        typeSpeed = 1800; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typeSpeed = 400;
      }

      setTimeout(typeLoop, typeSpeed);
    }
    typeLoop();
  }

  /* ---------------------------------------------------------
     4. Live Clock (Giờ VN)
     --------------------------------------------------------- */
  const liveClockElement = document.getElementById("liveClock");
  function updateClock() {
    if (liveClockElement) {
      const now = new Date();
      liveClockElement.innerText = now.toLocaleTimeString("vi-VN");
    }
  }
  setInterval(updateClock, 1000);
  updateClock();

  /* ---------------------------------------------------------
     5. Like Counter (Persisted in localStorage)
     --------------------------------------------------------- */
  const likeCountElement = document.getElementById("likeCount");
  const likeBtn = document.getElementById("likeBtn");
  let likes = parseInt(localStorage.getItem("page_likes") || "12");

  if (likeCountElement) likeCountElement.innerText = likes;

  likeBtn?.addEventListener("click", () => {
    likes++;
    localStorage.setItem("page_likes", likes.toString());
    if (likeCountElement) {
      likeCountElement.innerText = likes;
      likeCountElement.style.transform = "scale(1.3)";
      setTimeout(() => {
        likeCountElement.style.transform = "scale(1)";
      }, 200);
    }
  });

  /* ---------------------------------------------------------
     6. Random Facts / Inspirational Quotes
     --------------------------------------------------------- */
  const factText = document.getElementById("factText");
  const factBtn = document.getElementById("factBtn");
  const factCount = document.getElementById("factCount");

  const facts = [
    '"Sự kết hợp giữa công nghệ và marketing tạo nên sức mạnh truyền thông hiện đại."',
    '"Code là công cụ, tư duy Marketing là chìa khóa tạo nên sản phẩm đột phá."',
    '"Chi tiết nhỏ tạo nên sự tinh tế, giao diện tối giản mang lại trải nghiệm đỉnh cao."',
    '"Học hỏi mỗi ngày - Mỗi dòng code đều đóng góp vào sự phát triển bản thân."',
    '"MarTech giúp biến những dữ liệu khô khan thành chiến dịch tiếp thị chạm đến trái tim người dùng."',
  ];
  let factIdx = 0;

  factBtn?.addEventListener("click", () => {
    factIdx = (factIdx + 1) % facts.length;
    if (factText) factText.innerText = facts[factIdx];
    if (factCount) factCount.innerText = `#${factIdx + 1}`;
  });

  /* ---------------------------------------------------------
     7. Music Player Widget
     --------------------------------------------------------- */
  const audioPlayer = document.getElementById("audioPlayer");
  const songSelect = document.getElementById("songSelect");
  const playSongBtn = document.getElementById("playSongBtn");
  const stopSongBtn = document.getElementById("stopSongBtn");
  const songNameDisplay = document.getElementById("songNameDisplay");

  songSelect?.addEventListener("change", function () {
    if (this.value) {
      audioPlayer.src = this.value;
      if (songNameDisplay) {
        songNameDisplay.innerText = this.options[this.selectedIndex].text;
      }
    }
  });

  playSongBtn?.addEventListener("click", () => {
    if (audioPlayer && audioPlayer.src) {
      audioPlayer.play();
      if (playSongBtn) playSongBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      alert("Vui lòng chọn bài hát trong danh sách trước!");
    }
  });

  stopSongBtn?.addEventListener("click", () => {
    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      if (playSongBtn) playSongBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  });

  /* ---------------------------------------------------------
     8. Album & Lightbox Modal (album.html)
     --------------------------------------------------------- */
  const albumImages = [
    {
      url: "photo/qs1.jpg",
      caption: "Kỳ học Quân Sự 2022 🎖️",
      category: "kyniem",
      date: "2022",
    },
    {
      url: "photo/qs2.jpg",
      caption: "Kỷ niệm khu quân sự 2022 📸",
      category: "kyniem",
      date: "2022",
    },
    {
      url: "photo/ctxh2.jpg",
      caption: "Trại giữ lửa Vũng Tàu 2023 ✨",
      category: "hoatdong",
      date: "2023",
    },
    {
      url: "photo/ctxh1.jpg",
      caption: "MĐYT Dak Nong 2023 💚",
      category: "hoatdong",
      date: "2023",
    },
    {
      url: "photo/vt2023.jpg",
      caption: "Kỷ niệm Vũng Tàu 2024 🏖️",
      category: "dulich",
      date: "2024",
    },
    {
      url: "photo/VT2025.jpg",
      caption: "Biển Vũng Tàu 2025 🌊",
      category: "dulich",
      date: "2025",
    },
    {
      url: "photo/nct2025.jpg",
      caption: "Nam Cát Tiên 2025 🌿",
      category: "dulich",
      date: "2025",
    },
    {
      url: "photo/hue2025.jpg",
      caption: "Huế 2025 🏯",
      category: "dulich",
      date: "2025",
    },
    {
      url: "photo/qb2025.jpg",
      caption: "Quảng Bình 2025 🏞️",
      category: "dulich",
      date: "2025",
    },
  ];

  const albumGrid = document.getElementById("albumGrid");
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const modalCaption = document.getElementById("modalCaption");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalPrevBtn = document.getElementById("modalPrevBtn");
  const modalNextBtn = document.getElementById("modalNextBtn");

  let currentModalIndex = 0;
  let filteredImages = [...albumImages];

  function renderAlbumGrid(items) {
    if (!albumGrid) return;
    albumGrid.innerHTML = items
      .map(
        (img, idx) => `
      <div class="album-card" data-index="${idx}">
        <img src="${img.url}" alt="${img.caption}" loading="lazy" />
        <div class="album-overlay">
          <div class="album-tag">${img.date} • ${img.category.toUpperCase()}</div>
          <div class="album-title">${img.caption}</div>
        </div>
      </div>
    `,
      )
      .join("");

    document.querySelectorAll(".album-card").forEach((card) => {
      card.addEventListener("click", () => {
        const index = parseInt(card.dataset.index);
        openModal(index);
      });
    });
  }

  if (albumGrid) {
    renderAlbumGrid(filteredImages);

    // Filter Buttons
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".filter-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;
        if (filter === "all") {
          filteredImages = [...albumImages];
        } else {
          filteredImages = albumImages.filter((img) => img.category === filter);
        }
        renderAlbumGrid(filteredImages);
      });
    });
  }

  function openModal(index) {
    if (!modal || filteredImages.length === 0) return;
    currentModalIndex = index;
    const item = filteredImages[currentModalIndex];
    modalImg.src = item.url;
    modalCaption.innerText = `${item.caption} (${currentModalIndex + 1}/${filteredImages.length})`;
    modal.style.display = "flex";
  }

  function closeModal() {
    if (modal) modal.style.display = "none";
  }

  modalCloseBtn?.addEventListener("click", closeModal);

  modalPrevBtn?.addEventListener("click", () => {
    currentModalIndex =
      (currentModalIndex - 1 + filteredImages.length) % filteredImages.length;
    openModal(currentModalIndex);
  });

  modalNextBtn?.addEventListener("click", () => {
    currentModalIndex = (currentModalIndex + 1) % filteredImages.length;
    openModal(currentModalIndex);
  });

  window.addEventListener("keydown", (e) => {
    if (modal && modal.style.display === "flex") {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") modalPrevBtn?.click();
      if (e.key === "ArrowRight") modalNextBtn?.click();
    }
  });

  /* ---------------------------------------------------------
     9. Formspree & Global Cloud Sync Guestbook
     --------------------------------------------------------- */
  const anonymousForm = document.getElementById("anonymousForm");
  const formStatus = document.getElementById("formStatus");
  const guestbookList = document.getElementById("guestbookList");

  const CLOUD_OBJECT_URL =
    "https://api.restful-api.dev/objects/ff8081819ff5b11001a042769ffc3290";

  // Khởi tạo 100% sạch (Không sử dụng tin nhắn mẫu ảo)
  const initialGuestbookMessages = [];

  let rawGuestbookData = localStorage.getItem("lac_guestbook_msgs");
  let guestMessages = [];

  try {
    guestMessages = rawGuestbookData
      ? JSON.parse(rawGuestbookData)
      : initialGuestbookMessages;
    if (!Array.isArray(guestMessages)) {
      guestMessages = [];
    }
  } catch (e) {
    guestMessages = [];
  }

  let isGuestbookExpanded = false;

  function saveGuestbookLocal() {
    localStorage.setItem("lac_guestbook_msgs", JSON.stringify(guestMessages));
  }

  function escapeHtml(str) {
    return str.replace(
      /[&<>'"]/g,
      (tag) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        })[tag] || tag,
    );
  }

  function renderGuestbook() {
    if (!guestbookList) return;

    let loadMoreBtn = document.getElementById("loadMoreGuestbookBtn");

    if (!guestMessages || guestMessages.length === 0) {
      guestbookList.style.maxHeight = "none";
      guestbookList.innerHTML = `
        <div class="guestbook-item" style="text-align:center; color:var(--text-sub); padding: 18px;">
          <i class="fas fa-inbox"></i> Chưa có lời nhắn nào. Hãy là người đầu tiên để lại tin nhắn nhé!
        </div>
      `;
      if (loadMoreBtn) loadMoreBtn.style.display = "none";
      return;
    }

    // Đảm bảo cố định max-height để khung KHÔNG BAO GIỜ bị kéo dài ra ngoài
    guestbookList.style.maxHeight = "280px";
    guestbookList.style.overflowY = "auto";

    const visibleCount = isGuestbookExpanded ? guestMessages.length : 3;
    const displayedMsgs = guestMessages.slice(0, visibleCount);

    guestbookList.innerHTML = displayedMsgs
      .map(
        (msg) => `
      <div class="guestbook-item">
        <div class="guestbook-author">
          <span><i class="fas fa-user-circle"></i> ${escapeHtml(msg.name)}</span>
          <span class="guestbook-time">${new Date(msg.timestamp).toLocaleString("vi-VN")}</span>
        </div>
        <div class="guestbook-text">${escapeHtml(msg.message)}</div>
      </div>
    `,
      )
      .join("");

    // Xử lý nút Xem thêm / Thu gọn
    if (guestMessages.length > 3) {
      if (!loadMoreBtn) {
        loadMoreBtn = document.createElement("button");
        loadMoreBtn.id = "loadMoreGuestbookBtn";
        loadMoreBtn.className = "btn-secondary";
        loadMoreBtn.style.cssText =
          "width: 100%; margin-top: 10px; padding: 8px; font-size: 0.8rem; font-weight: 600; cursor: pointer; text-align: center; border-radius: var(--radius-sm); border: 1px solid var(--border-color); background: var(--bg-card-subtle); color: var(--accent-blue);";
        guestbookList.parentNode.appendChild(loadMoreBtn);
      }

      loadMoreBtn.style.display = "block";

      if (!isGuestbookExpanded) {
        const remaining = guestMessages.length - 3;
        loadMoreBtn.innerHTML = `<i class="fas fa-chevron-down"></i> Xem thêm (${remaining} lời nhắn)`;
        loadMoreBtn.onclick = () => {
          isGuestbookExpanded = true;
          renderGuestbook();
        };
      } else {
        loadMoreBtn.innerHTML = `<i class="fas fa-chevron-up"></i> Thu gọn lời nhắn`;
        loadMoreBtn.onclick = () => {
          isGuestbookExpanded = false;
          renderGuestbook();
        };
      }
    } else if (loadMoreBtn) {
      loadMoreBtn.style.display = "none";
    }
  }

  // Tải toàn bộ lời nhắn toàn cầu từ Cloud Server
  async function syncGuestbookFromCloud() {
    try {
      const response = await fetch(CLOUD_OBJECT_URL);
      if (response.ok) {
        const json = await response.json();
        if (json && json.data && Array.isArray(json.data.messages)) {
          guestMessages = json.data.messages;
          saveGuestbookLocal();
          renderGuestbook();
        }
      }
    } catch (err) {
      console.warn("Cloud sync warning:", err);
    }
  }

  // Đẩy lời nhắn mới lên Cloud Server để tất cả mọi máy trên thế giới cùng thấy
  async function pushGuestbookToCloud(newMsgs) {
    try {
      await fetch(CLOUD_OBJECT_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "lacngocnhu_guestbook",
          data: { messages: newMsgs },
        }),
      });
    } catch (err) {
      console.warn("Cloud push warning:", err);
    }
  }

  function addGuestMessage(name, message) {
    if (!message.trim()) return;
    guestMessages.unshift({
      name: name.trim() || "Người bí ẩn Ẩn Danh",
      message: message.trim(),
      timestamp: Date.now(),
    });

    if (guestMessages.length > 100) {
      guestMessages = guestMessages.slice(0, 100);
    }

    saveGuestbookLocal();
    renderGuestbook();
    pushGuestbookToCloud(guestMessages);
  }

  // Khởi chạy đồng bộ Cloud và làm mới tự động mỗi 15 giây
  renderGuestbook();
  syncGuestbookFromCloud();
  setInterval(syncGuestbookFromCloud, 15000);

  // Đồng bộ tức thì nếu đang mở nhiều tab trên cùng máy
  window.addEventListener("storage", (e) => {
    if (e.key === "lac_guestbook_msgs" && e.newValue) {
      try {
        guestMessages = JSON.parse(e.newValue);
        renderGuestbook();
      } catch (err) {}
    }
  });

  anonymousForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (formStatus)
      formStatus.innerHTML =
        '<span style="color:var(--accent-blue);"><i class="fas fa-spinner fa-spin"></i> Đang gửi lời nhắn...</span>';

    const formData = new FormData(anonymousForm);
    const nameVal = document.getElementById("anonName")?.value || "Người bí ẩn";
    const msgVal =
      anonymousForm.querySelector('textarea[name="message"]')?.value || "";

    try {
      const response = await fetch(anonymousForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        if (formStatus)
          formStatus.innerHTML =
            '<span style="color:#16A34A;"><i class="fas fa-check-circle"></i> Đã gửi thành công! Cảm ơn bạn.</span>';
        addGuestMessage(nameVal, msgVal);
        anonymousForm.reset();
      } else {
        // Vẫn lưu vào sổ công khai nếu Formspree báo lỗi
        addGuestMessage(nameVal, msgVal);
        if (formStatus)
          formStatus.innerHTML =
            '<span style="color:#16A34A;"><i class="fas fa-check-circle"></i> Lời nhắn đã lưu vào Sổ lưu niệm!</span>';
        anonymousForm.reset();
      }
    } catch (err) {
      addGuestMessage(nameVal, msgVal);
      if (formStatus)
        formStatus.innerHTML =
          '<span style="color:#DC2626;"><i class="fas fa-wifi"></i> Lỗi kết nối mạng! Lời nhắn đã lưu vào sổ tạm thời.</span>';
      addGuestMessage(nameVal, msgVal);
      anonymousForm.reset();
    }
  });

  clearGuestbookBtn?.addEventListener("click", () => {
    if (confirm("Bạn có chắc muốn xóa lịch sử sổ lưu niệm trên máy này?")) {
      guestMessages = [];
      saveGuestbook();
      renderGuestbook();
    }
  });

  renderGuestbook();

  /* ---------------------------------------------------------
     10. Interactive AI Chatbot Widget (Floating)
     --------------------------------------------------------- */
  const chatbotTrigger = document.getElementById("chatbotTrigger");
  const chatbotBox = document.getElementById("chatbotBox");
  const chatbotClose = document.getElementById("chatbotClose");
  const chatMessages = document.getElementById("chatMessages");
  const chatInput = document.getElementById("chatInput");

  chatbotTrigger?.addEventListener("click", () => {
    chatbotBox?.classList.toggle("active");
  });

  chatbotClose?.addEventListener("click", () => {
    chatbotBox?.classList.remove("active");
  });

  window.sendQuickChat = function (text) {
    if (chatInput) chatInput.value = text;
    sendMessage();
  };

  window.handleChatEnter = function (e) {
    if (e.key === "Enter") sendMessage();
  };

  window.sendMessage = function () {
    if (!chatInput) return;
    const query = chatInput.value.trim();
    if (!query) return;

    // Append User Message
    appendMessage(query, "user");
    chatInput.value = "";

    // Generate AI Bot Response
    setTimeout(() => {
      const response = generateBotAnswer(query);
      appendMessage(response, "bot");
    }, 600);
  };

  function appendMessage(text, sender) {
    if (!chatMessages) return;
    const msgDiv = document.createElement("div");
    msgDiv.className = `chat-msg ${sender}`;
    msgDiv.innerText = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function generateBotAnswer(q) {
    const lower = q.toLowerCase();

    if (
      lower.includes("trường") ||
      lower.includes("học") ||
      lower.includes("đại học")
    ) {
      return "Lạc Ngọc Như học chuyên ngành kết hợp Công nghệ thông tin & Digital Marketing tại Đại học!";
    }
    if (
      lower.includes("kỹ năng") ||
      lower.includes("skill") ||
      lower.includes("lập trình")
    ) {
      return "Kỹ năng nổi bật: Lập trình Web Frontend (HTML/CSS/JS), MarTech Automations, SEO Content Strategy, UI/UX Design & Brand Analytics.";
    }
    if (
      lower.includes("email") ||
      lower.includes("gmail") ||
      lower.includes("liên hệ")
    ) {
      return "Bạn có thể gửi email trực tiếp qua nhulacngoc@gmail.com hoặc gửi form ẩn danh ở trang Liên hệ nhé!";
    }
    if (lower.includes("formspree") || lower.includes("tin nhắn")) {
      return "Form cho phép bạn gửi tin nhắn trực tiếp đến email của Ngọc Như mà không cần đăng nhập!";
    }
    if (
      lower.includes("tuổi") ||
      lower.includes("sinh") ||
      lower.includes("cung")
    ) {
      return "Lạc Ngọc Như sinh năm 2004, thuộc cung Cự Giải (Cancer) ♋✨!";
    }
    if (
      lower.includes("ảnh") ||
      lower.includes("album") ||
      lower.includes("huế") ||
      lower.includes("quảng bình")
    ) {
      return "Bạn có thể xem các bức ảnh kỷ niệm du lịch Huế, Quảng Bình, Nam Cát Tiên và các kỳ hoạt động ở trang Album ảnh!";
    }
    return "Cảm ơn câu hỏi của bạn! Ngọc Như là sự pha trộn độc đáo giữa góc nhìn Kỹ thuật IT và Chiến lược Marketing. Bạn có thể để lại lời nhắn ở trang Liên hệ nhé!";
  }
});
