const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.header-list a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 2) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (current && link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

const scrollBtn = document.querySelector(".scroll-btn");
if (scrollBtn) {
  scrollBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollBy({
      top: window.innerHeight,
      left: 0,
      behavior: "smooth"
    });
  });
}

const internalLinks = document.querySelectorAll('a[href^="#"]');
internalLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") {
      return;
    }

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent."); 
    contactForm.reset();
  });
}

const socialIcons = document.querySelectorAll(".social-links-contact a");
socialIcons.forEach(icon => {
  icon.addEventListener("mouseover", () => {
    icon.style.transform = "translateY(-5px) scale(1.2)";
  });
  icon.addEventListener("mouseout", () => {
    icon.style.transform = "translateY(0) scale(1)";
  });
});

// cover letter link interceptor removed to allow direct file access


document.addEventListener("DOMContentLoaded", () => {

    const fadeElements = document.querySelectorAll(".fade-in-element");
    fadeElements.forEach((el, i) => {
        setTimeout(() => {
            el.classList.add("visible");
        }, i * 150); 
    });
});


const menuToggle = document.getElementById('menu-toggle');
const slideMenu = document.getElementById('slide-menu');

if (menuToggle && slideMenu) {
  menuToggle.addEventListener('click', () => {
    slideMenu.classList.toggle('active');
  });

  slideMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      slideMenu.classList.remove("active");
    });
  });
}
 function typeWriter(element, text, speed, callback) {
    let i = 0;
    function typing() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      } else if (callback) {
        callback();
      }
    }
    typing();
  }

  function typeWriterLoop(el, text, speed, pause, callback) {
    let i = 0;
    el.innerHTML = "";

    function type() {
      if (i < text.length) {
        el.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        setTimeout(callback, pause);
      }
    }
    type();
  }

  function startTyping() {
    const hello = document.getElementById("type-hello");
    const role = document.getElementById("type-role");

    if (!hello || !role) {
      return;
    }

    typeWriterLoop(hello, "Hello I'm Piyush ", 80, 1000, () => {
      typeWriterLoop(role, "Software | Data | AI Automation", 70, 1800, () => {
        // clear text and restart loop
        hello.innerHTML = "";
        role.innerHTML = "";
        startTyping();
      });
    });
  }

  startTyping();

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach(card => {
      const categories = (card.dataset.category || "").split(" ");
      const isVisible = filter === "all" || categories.includes(filter);
      card.style.display = isVisible ? "" : "none";
    });
  });
});

const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalProblem = document.getElementById("modal-problem");
const modalTools = document.getElementById("modal-tools");
const modalApproach = document.getElementById("modal-approach");
const modalResult = document.getElementById("modal-result");
const modalLinks = document.getElementById("modal-links");
const modalClose = document.querySelector(".modal-close");

function openProjectModal(card) {
  if (!modal) return;

  modalTitle.textContent = card.dataset.title || "Project Details";
  modalProblem.textContent = card.dataset.problem || "Project problem details are being updated.";
  modalTools.textContent = card.dataset.tools || "Tools will be added soon.";
  modalApproach.textContent = card.dataset.approach || "Approach details will be added soon.";
  modalResult.textContent = card.dataset.result || "Result details will be added soon.";
  modalLinks.innerHTML = "";

  if (card.dataset.live) {
    const liveLink = document.createElement("a");
    liveLink.href = card.dataset.live;
    liveLink.textContent = "Live Demo";
    liveLink.target = "_blank";
    modalLinks.appendChild(liveLink);
  }

  if (card.dataset.github) {
    const gitLink = document.createElement("a");
    gitLink.href = card.dataset.github;
    gitLink.textContent = "GitHub";
    gitLink.target = "_blank";
    modalLinks.appendChild(gitLink);
  }

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
}

function closeProjectModal() {
  if (!modal) return;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
}

document.querySelectorAll(".project-detail-btn").forEach(button => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    openProjectModal(button.closest(".project-card"));
  });
});

projectCards.forEach(card => {
  card.addEventListener("click", (event) => {
    if (event.target.closest("a") || event.target.closest("button")) return;
    openProjectModal(card);
  });
});

if (modalClose) {
  modalClose.addEventListener("click", closeProjectModal);
}

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeProjectModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProjectModal();
  }
});

const statNumbers = document.querySelectorAll(".stat-card strong[data-count]");
let statsStarted = false;

function animateStats() {
  if (statsStarted || !statNumbers.length) return;
  statsStarted = true;

  statNumbers.forEach(stat => {
    const target = Number(stat.dataset.count);
    const isDecimal = stat.dataset.count.includes(".");
    let frame = 0;
    const totalFrames = 40;
    const timer = setInterval(() => {
      frame++;
      const value = target * (frame / totalFrames);
      stat.textContent = isDecimal ? value.toFixed(2) : Math.round(value);

      if (frame >= totalFrames) {
        stat.textContent = isDecimal ? target.toFixed(2) : `${target}+`;
        clearInterval(timer);
      }
    }, 25);
  });
}

if ("IntersectionObserver" in window && statNumbers.length) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries.some(entry => entry.isIntersecting)) {
      animateStats();
      statsObserver.disconnect();
    }
  }, { threshold: 0.3 });

  const statsGrid = document.querySelector(".stats-grid");
  if (statsGrid) statsObserver.observe(statsGrid);
} else {
  animateStats();
}

const assistantAnswers = {
  projects: "Piyush's strongest projects are Career Radar, Fitness Diet Recommendation System, AI-Powered Trend Analysis Dashboard, Automated Data Reporting System, and Spotify Data Analysis EDA.",
  skills: "His technical skills include C, C++, Python, Java, SQL, Data Structures, Django, Flask, TensorFlow, PyTorch, Docker, Kubernetes, AI, ML, deep learning, networks, REST APIs, microservices, and troubleshooting.",
  ml: "His strongest AI/ML work includes Career Radar for AI job intelligence and the Personalized Fitness Diet Recommendation System using Gradient Boosting Regressor and Random Forest Classifier.",
  hire: "He brings a hybrid profile: MCA foundation, software development, AI/data projects, full-stack Career Radar experience, automation systems, hardware/software experience, and a strong 9.03 CGPA in BSc.",
  resume: "Piyush Kumar is an MCA candidate in Bangalore with experience at LYD Technologies and projects in Career Radar, Spotify EDA, ML fitness recommendations, trend dashboards, and automated reporting.",
  about: "I'm Piyush Kumar, an MCA candidate focused on software, data, and AI automation. I love building practical software, analytics dashboards, and ML systems that solve real-world problems. Feel free to ask about my skills or projects!",
  extracurricular: "Outside of coding, I actively participate in hackathons, lead tech clubs to mentor peers, and deliver talks on tech topics like data pipelines.",
  contact: "You can reach out to me via email at Piyushkr03082003@gmail.com, call me at +91 9939509793, or connect on LinkedIn. My contact section has all the details!",
  default: "I'm not exactly sure about that, but you can ask me about Piyush's projects, technical skills, resume, ML experience, or why you should hire him. How can I help you discover his profile?"
};

const assistantChat = document.getElementById("assistant-chat");
const assistantForm = document.getElementById("assistant-form");
const assistantInput = document.getElementById("assistant-input");

function addAssistantMessage(text, type) {
  if (!assistantChat) return;
  const message = document.createElement("div");
  message.className = `assistant-message ${type}`;
  message.textContent = text;
  assistantChat.appendChild(message);
  assistantChat.scrollTop = assistantChat.scrollHeight;
}

function getAssistantAnswer(question) {
  const normalized = question.toLowerCase();

  if (normalized.includes("project") || normalized.includes("best") || normalized.includes("portfolio")) return assistantAnswers.projects;
  if (normalized.includes("python") || normalized.includes("skill") || normalized.includes("tech") || normalized.includes("stack")) return assistantAnswers.skills;
  if (normalized.includes("ml") || normalized.includes("machine") || normalized.includes("fitness") || normalized.includes("ai")) return assistantAnswers.ml;
  if (normalized.includes("hire") || normalized.includes("why") || normalized.includes("strength")) return assistantAnswers.hire;
  if (normalized.includes("resume") || normalized.includes("summary") || normalized.includes("cv")) return assistantAnswers.resume;
  if (normalized.includes("about") || normalized.includes("who") || normalized.includes("yourself") || normalized.includes("me")) return assistantAnswers.about;
  if (normalized.includes("extra") || normalized.includes("achieve") || normalized.includes("hackathon")) return assistantAnswers.extracurricular;
  if (normalized.includes("contact") || normalized.includes("email") || normalized.includes("phone") || normalized.includes("reach")) return assistantAnswers.contact;

  if (normalized.includes("certification") || normalized.includes("certificate") || normalized.includes("learn")) {
    return "His certifications include Java Programming from Great Learning, Python Programming from NPTEL, OCI AI Foundations, and Cloud Computing from IBM.";
  }

  if (normalized.includes("career") || normalized.includes("radar") || normalized.includes("job")) {
    return "Career Radar is a full-stack AI-powered job intelligence platform with job matching, resume analysis, tech news, analytics charts, Kanban application tracking, alerts, and skill progress tracking.";
  }

  return assistantAnswers.default;
}

document.querySelectorAll(".assistant-actions button").forEach(button => {
  button.addEventListener("click", () => {
    const key = button.dataset.question;
    addAssistantMessage(button.textContent, "user");
    addAssistantMessage(assistantAnswers[key], "bot");
  });
});

if (assistantForm && assistantInput) {
  assistantForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = assistantInput.value.trim();
    if (!question) return;

    addAssistantMessage(question, "user");
    addAssistantMessage(getAssistantAnswer(question), "bot");
    assistantInput.value = "";
  });
}



