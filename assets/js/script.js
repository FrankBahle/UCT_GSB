const UCT_GSB_STORAGE_PREFIX = 'uct_gsb_programme';

document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeAnimations();
    initializeQuizzes();
    initializeAssessments();
    initializeTooltips();
    initializeAccordions();
    initializeProgress();
    initializeChatbot();
});

function initializeNavigation() {
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .dropdown-menu .dropdown-item');

    navLinks.forEach((link) => {
        const href = normalizePageName(link.getAttribute('href'));

        if (href === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');

            const dropdown = link.closest('.dropdown');
            const dropdownToggle = dropdown?.querySelector('.dropdown-toggle');

            if (dropdownToggle) {
                dropdownToggle.classList.add('active');
            }
        } else if (!link.classList.contains('dropdown-toggle')) {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });

    const navbarCollapse = document.getElementById('navbarNav');

    if (navbarCollapse) {
        navbarCollapse.querySelectorAll('a.nav-link:not(.dropdown-toggle), a.dropdown-item').forEach((link) => {
            link.addEventListener('click', () => {
                if (
                    window.innerWidth < 992 &&
                    navbarCollapse.classList.contains('show') &&
                    window.bootstrap?.Collapse
                ) {
                    bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
                }
            });
        });
    }
}

function getCurrentPage() {
    const page = window.location.pathname.split('/').pop();
    return normalizePageName(page || 'index.html');
}

function normalizePageName(value) {
    if (!value || value === '#') {
        return '';
    }

    return value.split('#')[0].split('?')[0].split('/').pop() || 'index.html';
}

function initializeAnimations() {
    const elements = document.querySelectorAll(
        '.card, .timeline-item, .fact-card, .programme-card, .hub-card, .outcome-card, .delegate-card, .resource-card, .slide-card'
    );

    if (!elements.length) {
        return;
    }

    if (!('IntersectionObserver' in window)) {
        elements.forEach((element) => element.classList.add('fade-in'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    currentObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.08,
            rootMargin: '0px 0px -60px 0px'
        }
    );

    elements.forEach((element) => observer.observe(element));
}

function initializeQuizzes() {
    document.querySelectorAll('.quiz-question').forEach((question, questionIndex) => {
        const options = question.querySelectorAll('.quiz-option');

        options.forEach((option, optionIndex) => {
            option.setAttribute('role', 'button');
            option.setAttribute('tabindex', '0');
            option.setAttribute('aria-pressed', option.classList.contains('selected') ? 'true' : 'false');
            option.dataset.optionIndex = String(optionIndex);

            const selectOption = () => {
                options.forEach((item) => {
                    item.classList.remove('selected', 'correct', 'incorrect');
                    item.setAttribute('aria-pressed', 'false');
                });

                option.classList.add('selected');
                option.setAttribute('aria-pressed', 'true');

                const isCorrect = option.hasAttribute('data-correct');

                option.classList.add(isCorrect ? 'correct' : 'incorrect');
                showQuizFeedback(question, isCorrect);

                const quiz = option.closest('[id^="quiz"]');
                const quizId = quiz?.id || 'quiz';
                localStorage.setItem(
                    `${UCT_GSB_STORAGE_PREFIX}_${quizId}_question_${questionIndex}`,
                    String(optionIndex)
                );
            };

            option.addEventListener('click', selectOption);
            option.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    selectOption();
                }
            });
        });
    });
}

function showQuizFeedback(questionElement, isCorrect) {
    questionElement.querySelector('.quiz-feedback')?.remove();

    const feedback = document.createElement('div');
    feedback.className = `alert ${isCorrect ? 'alert-success' : 'alert-danger'} quiz-feedback mt-3`;
    feedback.setAttribute('role', 'status');

    const icon = document.createElement('i');
    icon.className = `bi ${isCorrect ? 'bi-check-circle-fill' : 'bi-x-circle-fill'} me-2`;

    const text = document.createTextNode(
        isCorrect
            ? 'Correct. Well done.'
            : 'Not quite. Review the available learning material and try again.'
    );

    feedback.append(icon, text);
    questionElement.appendChild(feedback);
}

function calculateScore(quizId) {
    const quiz = document.getElementById(quizId);

    if (!quiz) {
        return;
    }

    const questions = [...quiz.querySelectorAll('.quiz-question')];
    const answeredQuestions = questions.filter((question) =>
        question.querySelector('.quiz-option.selected')
    );
    const correctAnswers = questions.filter((question) =>
        question.querySelector('.quiz-option.selected[data-correct]')
    ).length;

    const resultElement =
        document.getElementById(`${quizId}-result`) ||
        document.getElementById(`${quizId}Result`);

    if (!resultElement) {
        return;
    }

    if (answeredQuestions.length < questions.length) {
        resultElement.innerHTML = `
            <div class="alert alert-warning" role="alert">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>
                Please answer all ${questions.length} questions before checking your result.
            </div>
        `;
        resultElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
    }

    const percentage = questions.length
        ? Math.round((correctAnswers / questions.length) * 100)
        : 0;

    let resultClass = 'alert-danger';
    let resultMessage = 'Review the programme material and try again.';

    if (percentage >= 80) {
        resultClass = 'alert-success';
        resultMessage = 'Excellent work. You have demonstrated a strong understanding of this topic.';
    } else if (percentage >= 60) {
        resultClass = 'alert-info';
        resultMessage = 'Good progress. Review the remaining topics to strengthen your understanding.';
    }

    resultElement.innerHTML = `
        <div class="alert ${resultClass}" role="status">
            <h5 class="alert-heading">Your result: ${correctAnswers}/${questions.length} (${percentage}%)</h5>
            <p class="mb-0">${resultMessage}</p>
        </div>
    `;

    localStorage.setItem(
        `${UCT_GSB_STORAGE_PREFIX}_${quizId}_result`,
        JSON.stringify({
            correctAnswers,
            totalQuestions: questions.length,
            percentage,
            completedAt: new Date().toISOString()
        })
    );

    resultElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function initializeAssessments() {
    document.querySelectorAll('.rating-option').forEach((option) => {
        option.setAttribute('role', 'button');
        option.setAttribute('tabindex', '0');

        const selectRating = () => {
            const group = option.closest('.rating-group');

            if (!group) {
                return;
            }

            const value = Number(option.dataset.value || 0);
            const input = group.querySelector('input[type="hidden"]');

            if (input) {
                input.value = String(value);
            }

            group.querySelectorAll('.rating-option').forEach((item) => {
                const itemValue = Number(item.dataset.value || 0);
                const isWithinRating = itemValue <= value;

                item.classList.toggle('selected', item === option);
                item.setAttribute('aria-pressed', item === option ? 'true' : 'false');
                item.style.background = isWithinRating ? 'var(--gsb-navy)' : 'var(--gsb-white)';
                item.style.color = isWithinRating ? 'var(--gsb-white)' : 'var(--gsb-text)';
                item.style.borderColor = isWithinRating ? 'var(--gsb-navy)' : 'var(--gsb-border)';
            });
        };

        option.addEventListener('click', selectRating);
        option.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                selectRating();
            }
        });
    });

    document.querySelectorAll('.assessment-form').forEach((form) => {
        form.addEventListener('submit', handleAssessmentSubmit);
    });
}

function handleAssessmentSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    localStorage.setItem(
        `${UCT_GSB_STORAGE_PREFIX}_assessment`,
        JSON.stringify({
            ...data,
            savedAt: new Date().toISOString()
        })
    );

    showSuccessModal(
        'Assessment saved',
        'Your responses have been saved in this browser. They have not been submitted to an external system.'
    );
}

function showSuccessModal(title, message) {
    if (!window.bootstrap?.Modal) {
        window.alert(`${title}\n\n${message}`);
        return;
    }

    const modalElement = document.createElement('div');
    modalElement.className = 'modal fade';
    modalElement.tabIndex = -1;
    modalElement.setAttribute('aria-hidden', 'true');

    modalElement.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="bi bi-check-circle me-2"></i>${escapeHtml(title)}
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="mb-0">${escapeHtml(message)}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-gsb-primary" data-bs-dismiss="modal">OK</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modalElement);

    const modal = new bootstrap.Modal(modalElement);
    modal.show();

    modalElement.addEventListener(
        'hidden.bs.modal',
        () => {
            modal.dispose();
            modalElement.remove();
        },
        { once: true }
    );
}

function initializeTooltips() {
    if (!window.bootstrap?.Tooltip) {
        return;
    }

    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((element) => {
        bootstrap.Tooltip.getOrCreateInstance(element);
    });
}

function initializeAccordions() {
    document.querySelectorAll('.accordion-button').forEach((button) => {
        button.addEventListener('click', () => {
            const targetSelector = button.getAttribute('data-bs-target');
            const target = targetSelector ? document.querySelector(targetSelector) : null;

            if (target) {
                target.style.transition = 'height 0.3s ease';
            }
        });
    });
}

function initializeProgress() {
    updateProgressBar();
}

function updateProgress(day, session) {
    const dayNumber = Number(day);
    const sessionNumber = Number(session);

    if (!Number.isInteger(dayNumber) || !Number.isInteger(sessionNumber)) {
        return;
    }

    localStorage.setItem(
        `${UCT_GSB_STORAGE_PREFIX}_progress_day${dayNumber}_session${sessionNumber}`,
        'completed'
    );

    updateProgressBar();
}

function updateProgressBar() {
    const progressBar = document.getElementById('courseProgress');

    if (!progressBar) {
        return;
    }

    const configuredTotal = Number(progressBar.dataset.totalSessions);
    const totalSessions =
        Number.isFinite(configuredTotal) && configuredTotal > 0
            ? configuredTotal
            : 18;

    const completedSessions = countCompletedSessions();
    const percentage = Math.min(
        100,
        Math.round((completedSessions / totalSessions) * 100)
    );

    progressBar.style.width = `${percentage}%`;
    progressBar.setAttribute('aria-valuemin', '0');
    progressBar.setAttribute('aria-valuemax', '100');
    progressBar.setAttribute('aria-valuenow', String(percentage));
    progressBar.textContent = `${percentage}% complete`;
}

function countCompletedSessions() {
    let completedSessions = 0;

    for (let index = 0; index < localStorage.length; index += 1) {
        const key = localStorage.key(index);

        if (
            key?.startsWith(`${UCT_GSB_STORAGE_PREFIX}_progress_`) &&
            localStorage.getItem(key) === 'completed'
        ) {
            completedSessions += 1;
        }
    }

    return completedSessions;
}

function resetProgress() {
    const confirmed = window.confirm(
        'Reset all programme progress stored in this browser?'
    );

    if (!confirmed) {
        return;
    }

    const keysToRemove = [];

    for (let index = 0; index < localStorage.length; index += 1) {
        const key = localStorage.key(index);

        if (key?.startsWith(`${UCT_GSB_STORAGE_PREFIX}_progress_`)) {
            keysToRemove.push(key);
        }
    }

    keysToRemove.forEach((key) => localStorage.removeItem(key));
    updateProgressBar();

    showSuccessModal('Progress reset', 'Your locally stored programme progress has been cleared.');
}

function printPage() {
    window.print();
}

function bookmarkPage() {
    const storageKey = `${UCT_GSB_STORAGE_PREFIX}_bookmarks`;
    const bookmarks = getStoredJson(storageKey, []);
    const currentUrl = window.location.href;
    const existingBookmark = bookmarks.find((bookmark) => bookmark.url === currentUrl);

    if (existingBookmark) {
        showSuccessModal('Already bookmarked', 'This page is already in your saved programme bookmarks.');
        return;
    }

    bookmarks.push({
        url: currentUrl,
        title: document.title,
        savedAt: new Date().toISOString()
    });

    localStorage.setItem(storageKey, JSON.stringify(bookmarks));
    showSuccessModal('Bookmark added', 'This page has been saved in your browser.');
}

function searchCourse(query) {
    const normalizedQuery = String(query || '').trim().toLowerCase();

    if (!normalizedQuery) {
        return [];
    }

    return [...document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li')]
        .filter((element) => element.textContent.toLowerCase().includes(normalizedQuery))
        .map((element) => ({
            text: element.textContent.trim(),
            element
        }));
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);

    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

async function copyCode(button) {
    const codeBlock = button?.previousElementSibling;

    if (!codeBlock) {
        return;
    }

    try {
        await navigator.clipboard.writeText(codeBlock.textContent || '');

        const originalText = button.textContent;
        button.textContent = 'Copied';
        button.classList.add('btn-gsb-primary');

        window.setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('btn-gsb-primary');
        }, 1800);
    } catch (error) {
        console.error('Unable to copy content:', error);
    }
}

function exportProgress() {
    const progressData = {
        programme: 'AI Leadership in Action — TNM Executive Programme',
        completedSessions: {},
        assessment: getStoredJson(`${UCT_GSB_STORAGE_PREFIX}_assessment`, null),
        bookmarks: getStoredJson(`${UCT_GSB_STORAGE_PREFIX}_bookmarks`, []),
        quizResults: {},
        exportedAt: new Date().toISOString()
    };

    for (let index = 0; index < localStorage.length; index += 1) {
        const key = localStorage.key(index);

        if (!key?.startsWith(UCT_GSB_STORAGE_PREFIX)) {
            continue;
        }

        if (key.includes('_progress_')) {
            progressData.completedSessions[key] = localStorage.getItem(key);
        }

        if (key.endsWith('_result')) {
            progressData.quizResults[key] = getStoredJson(key, null);
        }
    }

    const blob = new Blob([JSON.stringify(progressData, null, 2)], {
        type: 'application/json'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'ai-leadership-in-action-tnm-progress.json';
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
}

function downloadCertificate() {
    showSuccessModal(
        'Certificate information',
        "The supplied executive learning guide does not specify certificate requirements. Please follow the facilitator\'s programme guidance."
    );
}

function initializeChatbot() {
    if (document.querySelector('.chatbot-widget')) {
        return;
    }

    const widget = document.createElement('div');
    widget.className = 'chatbot-widget';

    widget.innerHTML = `
        <div
            class="chatbot-panel"
            id="chatbotPanel"
            role="dialog"
            aria-modal="false"
            aria-labelledby="chatbotTitle"
            aria-hidden="true"
        >
            <div class="chatbot-sidebar-overlay" id="chatbotSidebarOverlay"></div>

            <aside class="chatbot-sidebar" id="chatbotSidebar" aria-label="Assistant shortcuts">
                <div class="chatbot-brand">
                    <span class="chatbot-eyebrow">UCT GSB Executive Education · TNM</span>
                    <h3>AI Leadership<br>in Action</h3>
                    <p>Building an Intelligent, Trusted and Future-Ready TNM</p>
                </div>

                <div class="chatbot-stats" aria-label="Programme summary">
                    <div><strong>3</strong><span>Programme days</span></div>
                    <div><strong>16</strong><span>Delegates</span></div>
                    <div><strong>4</strong><span>Challenge groups</span></div>
                    <div><strong>20</strong><span>TNM priorities</span></div>
                </div>

                <div class="chatbot-quick-section">
                    <h4>Ask a quick question</h4>
                    <button type="button" class="chatbot-quick" data-chatbot-question="What is the AI Leadership in Action programme about?">Programme overview</button>
                    <button type="button" class="chatbot-quick" data-chatbot-question="Show me the full Day 1 timetable.">Day 1 timetable</button>
                    <button type="button" class="chatbot-quick" data-chatbot-question="List all four delegate challenge groups and their members.">Challenge groups</button>
                    <button type="button" class="chatbot-quick" data-chatbot-question="What are the five most urgent TNM strategic priorities?">TNM priority areas</button>
                    <button type="button" class="chatbot-quick" data-chatbot-question="What should delegates bring and complete before the programme?">Preparation checklist</button>
                    <button type="button" class="chatbot-quick" data-chatbot-question="Explain the synthetic TNM customer analytics training case.">Practical dataset case</button>
                </div>

                <div class="chatbot-service-note">
                    <i class="bi bi-shield-check" aria-hidden="true"></i>
                    <div>
                        <strong>Secure AI assistant</strong>
                        <span>Questions are sent through the protected DeepSeek server function. Do not share confidential TNM information.</span>
                    </div>
                </div>
            </aside>

            <section class="chatbot-main">
                <header class="chatbot-topbar">
                    <div class="chatbot-title-wrap">
                        <button type="button" class="chatbot-menu-button" id="chatbotMenuButton" aria-label="Open assistant shortcuts">
                            <i class="bi bi-list" aria-hidden="true"></i>
                        </button>
                        <span class="chatbot-botmark" aria-hidden="true"><i class="bi bi-stars"></i></span>
                        <div>
                            <h2 id="chatbotTitle">TNM Workshop Assistant</h2>
                            <p>AI Leadership in Action · 15–17 July 2026</p>
                        </div>
                    </div>

                    <div class="chatbot-actions">
                        <span class="chatbot-status" id="chatbotStatus">
                            <span class="chatbot-status-dot"></span>
                            <span id="chatbotStatusText">AI ready</span>
                        </span>
                        <button type="button" class="chatbot-action-button" id="chatbotDownload" title="Download chat transcript" aria-label="Download chat transcript">
                            <i class="bi bi-download" aria-hidden="true"></i>
                            <span>Download</span>
                        </button>
                        <button type="button" class="chatbot-action-button" id="chatbotClear" title="Clear conversation" aria-label="Clear conversation">
                            <i class="bi bi-arrow-counterclockwise" aria-hidden="true"></i>
                            <span>Clear</span>
                        </button>
                        <button type="button" class="chatbot-close-button" id="chatbotClose" aria-label="Close workshop assistant" title="Close assistant">
                            <i class="bi bi-x-lg" aria-hidden="true"></i>
                        </button>
                    </div>
                </header>

                <div class="chatbot-messages" id="chatbotMessages" aria-live="polite"></div>

                <div class="chatbot-input">
                    <form id="chatbotForm">
                        <label class="visually-hidden" for="chatbotInput">Ask a workshop question</label>
                        <textarea
                            id="chatbotInput"
                            rows="1"
                            maxlength="2000"
                            placeholder="Ask about schedules, delegates, TNM priorities, Mpamba, governance or the practical case..."
                            autocomplete="off"
                        ></textarea>
                        <button type="submit" class="chatbot-send-button" aria-label="Send question">
                            <i class="bi bi-send-fill" aria-hidden="true"></i>
                        </button>
                    </form>
                    <p>Press Enter to send · Shift+Enter for a new line · Answers use the approved programme materials</p>
                </div>
            </section>
        </div>

        <button class="chatbot-toggle" id="chatbotToggle" type="button" aria-label="Open TNM workshop assistant" aria-expanded="false">
            <span class="chatbot-toggle-icon"><i class="bi bi-chat-dots-fill" aria-hidden="true"></i></span>
            <span class="chatbot-toggle-label" id="chatbotToggleLabel">Ask TNM AI</span>
        </button>
    `;

    document.body.appendChild(widget);

    const panel = widget.querySelector('#chatbotPanel');
    const sidebar = widget.querySelector('#chatbotSidebar');
    const sidebarOverlay = widget.querySelector('#chatbotSidebarOverlay');
    const menuButton = widget.querySelector('#chatbotMenuButton');
    const toggle = widget.querySelector('#chatbotToggle');
    const toggleLabel = widget.querySelector('#chatbotToggleLabel');
    const closeButton = widget.querySelector('#chatbotClose');
    const clearButton = widget.querySelector('#chatbotClear');
    const downloadButton = widget.querySelector('#chatbotDownload');
    const form = widget.querySelector('#chatbotForm');
    const input = widget.querySelector('#chatbotInput');
    const submitButton = form.querySelector('button[type="submit"]');
    const messages = widget.querySelector('#chatbotMessages');
    const status = widget.querySelector('#chatbotStatus');
    const statusText = widget.querySelector('#chatbotStatusText');
    const conversationHistory = [];

    const renderWelcome = () => {
        addChatbotMessage(
            messages,
            'bot',
            'Takulandirani — welcome. I am the TNM Workshop Assistant for AI Leadership in Action. Ask me about the three-day programme, delegates, challenge groups, TNM priority areas, practical canvases, responsible AI, implementation planning or the training dataset case.'
        );
    };

    renderWelcome();

    const openSidebar = () => {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('show');
        menuButton.setAttribute('aria-expanded', 'true');
    };

    const closeSidebar = () => {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('show');
        menuButton.setAttribute('aria-expanded', 'false');
    };

    const openChatbot = () => {
        panel.classList.add('open');
        panel.setAttribute('aria-hidden', 'false');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Close TNM workshop assistant');
        toggleLabel.textContent = 'Close Assistant';
        input.focus();
    };

    const closeChatbot = () => {
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open TNM workshop assistant');
        toggleLabel.textContent = 'Ask TNM AI';
        closeSidebar();
        toggle.focus();
    };

    const setChatbotStatus = (mode, text) => {
        status.dataset.status = mode;
        statusText.textContent = text;
    };

    const setChatbotBusy = (isBusy) => {
        input.disabled = isBusy;
        submitButton.disabled = isBusy;
        form.setAttribute('aria-busy', isBusy ? 'true' : 'false');
        setChatbotStatus(isBusy ? 'connecting' : 'ready', isBusy ? 'Connecting…' : 'AI ready');
    };

    const askQuestion = async (question) => {
        const userMessage = String(question || '').trim();

        if (!userMessage || input.disabled) {
            return;
        }

        addChatbotMessage(messages, 'user', userMessage);
        conversationHistory.push({ role: 'user', content: userMessage });
        trimChatbotHistory(conversationHistory);

        input.value = '';
        input.style.height = 'auto';
        setChatbotBusy(true);
        closeSidebar();

        const typingMessage = addChatbotTypingMessage(messages);

        try {
            const reply = await requestDeepSeekChatbotResponse(conversationHistory);
            typingMessage.remove();
            addChatbotMessage(messages, 'bot', reply);
            conversationHistory.push({ role: 'assistant', content: reply });
            trimChatbotHistory(conversationHistory);
            setChatbotStatus('connected', 'AI connected');
        } catch (error) {
            console.error('Programme assistant request failed:', error);
            typingMessage.remove();

            const fallbackReply = getFallbackChatbotResponse(userMessage);
            addChatbotMessage(
                messages,
                'bot',
                `${fallbackReply}\n\nThe live AI service is temporarily unavailable, so this response comes from the website's built-in programme guidance.`
            );
            setChatbotStatus('fallback', 'Fallback mode');
        } finally {
            input.disabled = false;
            submitButton.disabled = false;
            form.setAttribute('aria-busy', 'false');
            input.focus();
        }
    };

    toggle.addEventListener('click', () => {
        panel.classList.contains('open') ? closeChatbot() : openChatbot();
    });

    closeButton.addEventListener('click', closeChatbot);
    menuButton.addEventListener('click', () => {
        sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });
    sidebarOverlay.addEventListener('click', closeSidebar);

    widget.querySelectorAll('[data-chatbot-question]').forEach((button) => {
        button.addEventListener('click', () => askQuestion(button.dataset.chatbotQuestion));
    });

    clearButton.addEventListener('click', () => {
        conversationHistory.splice(0, conversationHistory.length);
        messages.innerHTML = '';
        renderWelcome();
        setChatbotStatus('ready', 'AI ready');
        input.focus();
    });

    downloadButton.addEventListener('click', () => {
        downloadChatbotTranscript(conversationHistory);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && panel.classList.contains('open')) {
            if (sidebar.classList.contains('open')) {
                closeSidebar();
            } else {
                closeChatbot();
            }
        }
    });

    input.addEventListener('input', () => {
        input.style.height = 'auto';
        input.style.height = `${Math.min(input.scrollHeight, 120)}px`;
    });

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            form.requestSubmit();
        }
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        await askQuestion(input.value);
    });
}

function addChatbotMessage(container, sender, text) {
    const message = document.createElement('div');
    message.className = `chatbot-message ${sender}`;

    const avatar = document.createElement('span');
    avatar.className = 'chatbot-message-avatar';
    avatar.setAttribute('aria-hidden', 'true');
    avatar.innerHTML = sender === 'user'
        ? '<i class="bi bi-person-fill"></i>'
        : '<i class="bi bi-stars"></i>';

    const bubble = document.createElement('div');
    bubble.className = 'chatbot-message-bubble';
    bubble.textContent = text;

    message.append(avatar, bubble);
    container.appendChild(message);
    container.scrollTop = container.scrollHeight;

    return message;
}

function addChatbotTypingMessage(container) {
    const message = document.createElement('div');
    message.className = 'chatbot-message bot chatbot-typing-message';
    message.innerHTML = `
        <span class="chatbot-message-avatar" aria-hidden="true"><i class="bi bi-stars"></i></span>
        <div class="chatbot-message-bubble">
            <span class="chatbot-typing" aria-label="Assistant is thinking">
                <span></span><span></span><span></span>
            </span>
        </div>
    `;

    container.appendChild(message);
    container.scrollTop = container.scrollHeight;
    return message;
}

function downloadChatbotTranscript(conversationHistory) {
    const lines = [
        'AI Leadership in Action — TNM Workshop Assistant',
        `Downloaded: ${new Date().toLocaleString()}`,
        '',
        ...conversationHistory.map((message) => {
            const speaker = message.role === 'assistant' ? 'Assistant' : 'Delegate';
            return `${speaker}: ${message.content}`;
        })
    ];

    const blob = new Blob([lines.join('\n\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'tnm-workshop-assistant-chat.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

async function requestDeepSeekChatbotResponse(conversationHistory) {
    const response = await fetch('/.netlify/functions/deepseek-chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            messages: conversationHistory,
            page: {
                title: document.title,
                path: window.location.pathname
            }
        })
    });

    let data = null;

    try {
        data = await response.json();
    } catch (error) {
        throw new Error('The programme assistant returned an unreadable response.');
    }

    if (!response.ok) {
        throw new Error(data?.error || 'The programme assistant could not answer right now.');
    }

    const reply = String(data?.reply || '').trim();

    if (!reply) {
        throw new Error('The programme assistant returned an empty response.');
    }

    return reply;
}

function trimChatbotHistory(history) {
    const maximumMessages = 12;

    if (history.length > maximumMessages) {
        history.splice(0, history.length - maximumMessages);
    }
}

function getFallbackChatbotResponse(message) {
    const text = String(message || '').toLowerCase();

    if (matchesAny(text, ['hello', 'hi', 'hey', 'help'])) return 'Welcome to AI Leadership in Action. Ask me about the TNM programme purpose, dates, venue, facilitator, Day 1, Day 2, Day 3, delegates, challenge groups, canvases or implementation planning.';
    if (matchesAny(text, ['date', 'when'])) return 'AI Leadership in Action takes place from 15–17 July 2026.';
    if (matchesAny(text, ['venue', 'where', 'location'])) return 'The venue is the UCT Graduate School of Business in Cape Town.';
    if (matchesAny(text, ['facilitator', 'professor', 'abejide'])) return 'The facilitator is Professor Abejide Ade-Ibijola, Professor of Artificial Intelligence and Founder and Chairman of GRIT Lab Africa.';
    if (matchesAny(text, ['purpose', 'overview', 'philosophy'])) return 'AI Leadership in Action is an applied, design-led executive intervention tailored to TNM. It positions participants as executive co-designers who diagnose organisational realities, co-create AI solutions and develop pilot-ready pathways suited to Malawi.';
    if (matchesAny(text, ['day 1', 'first day'])) return 'Day 1 is Introductions, Shared Understanding and Pain-Point Diagnosis. It covers executive introductions, programme orientation, AI foundations, demonstrations, the TNM and Malawi reality check, pain-point diagnosis, prioritisation and team formation from 08:30 to 16:00.';
    if (matchesAny(text, ['day 2', 'second day'])) return 'Day 2 is Co-Creation, Practical AI and Rapid Prototyping. It covers use-case matching, practical AI, solution architecture, prototyping, peer critique and Day 3 handover from 08:30 to 16:00.';
    if (matchesAny(text, ['day 3', 'third day'])) return 'Day 3 is Strategy, Responsible AI and Future Readiness. It covers competitive positioning, human-centred AI, governance, risk, data, cybersecurity, IP, future telecom scenarios, pilot selection and 90-day action planning from 08:30 to 15:00.';
    if (matchesAny(text, ['network', 'infrastructure'])) return 'The Intelligent Network and Digital Infrastructure group asks how TNM can use AI to improve network reliability, infrastructure investment, service quality and operational efficiency.';
    if (matchesAny(text, ['customer', 'churn', 'commercial'])) return 'The Customer Growth, Commercial Intelligence and Market Leadership group asks how TNM can use AI to grow customers, reduce churn, personalise services and strengthen its competitive position.';
    if (matchesAny(text, ['mpamba', 'financial inclusion', 'fraud'])) return 'The Mpamba, Financial Inclusion and Digital Ecosystems group explores how AI can expand inclusion, improve agent performance, reduce fraud and create new digital services.';
    if (matchesAny(text, ['governance', 'responsible ai', 'trust'])) return 'The Responsible AI, Governance and Institutional Trust group focuses on protecting customers, employees, data, intellectual property and institutional reputation.';
    if (matchesAny(text, ['prepare', 'bring', 'before the programme', 'checklist'])) return 'Bring a laptop or computer, charger, notebook and approved role-relevant material. Complete the baseline assessment before the programme and use only approved, anonymised or synthetic information in public AI tools.';
    if (matchesAny(text, ['priority', 'pain point', 'urgent'])) return 'Five urgent TNM strategic priorities are forex and technology costs; network reliability and customer experience; Mpamba fraud and revenue leakage; affordability, churn and digital adoption; and fragmented data with slow decision-making.';
    if (matchesAny(text, ['dataset', 'case study', 'mxit', 'customer analytics'])) return 'The practical training case uses a synthetic TNM customer analytics dataset with 1,000 customer-month records, 311 anonymised customers, six months of data and 45 variables. It contains no real customer information.';
    if (matchesAny(text, ['canvas', 'template', 'action plan'])) return 'The learning guide includes an AI Opportunity Canvas, AI Governance Canvas and 90-Day Executive Action Plan. Open the Programme Canvases or Implementation Guide pages.';
    if (matchesAny(text, ['slide', 'pdf', 'guide', 'download'])) return 'The Slides page provides the complete AI Leadership in Action Executive Learning Guide and direct links to the Day 1, Day 2 and Day 3 schedules.';
    if (matchesAny(text, ['outcome', 'deliverable'])) return 'Programme deliverables include a TNM AI Strategic Vision, AI Maturity Snapshot, Opportunity Portfolio, Responsible AI Concepts, Governance Canvas, Pilot Roadmap and Executive Commitments.';
    return 'I can help with AI Leadership in Action for TNM, including the programme purpose, dates, venue, facilitator, daily schedules, challenge groups, learning outcomes, priority areas, practical case, canvases and 90-day follow-through.';
}

function matchesAny(text, phrases) {
    return phrases.some((phrase) => text.includes(phrase));
}

function getStoredJson(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : JSON.parse(value);
    } catch (error) {
        console.warn(`Unable to read stored value for ${key}:`, error);
        return fallback;
    }
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

console.log(
    '%cAI Leadership in Action — TNM Executive Programme',
    'color: #00aeef; background: #124f7c; padding: 8px 12px; font-size: 16px; font-weight: 700;'
);
console.log(
    'Programme content is aligned with the supplied AI Leadership in Action Executive Learning Guide.'
);
