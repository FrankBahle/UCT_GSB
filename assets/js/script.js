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
        programme: 'UCT GSB Executive AI Programme',
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
    link.download = 'uct-gsb-programme-progress.json';
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
}

function downloadCertificate() {
    showSuccessModal(
        'Certificate information',
        'Certificate requirements and download functionality will be added after the programme completion criteria are approved.'
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
            <div class="chatbot-header">
                <strong id="chatbotTitle">
                    <i class="bi bi-chat-dots-fill me-2"></i>UCT GSB Programme Assistant
                </strong>
                <button type="button" class="btn btn-sm btn-light" id="chatbotClose" aria-label="Close programme assistant">×</button>
            </div>

            <div class="chatbot-messages" id="chatbotMessages" aria-live="polite"></div>

            <div class="chatbot-input">
                <form id="chatbotForm">
                    <label class="visually-hidden" for="chatbotInput">Ask a programme question</label>
                    <input
                        id="chatbotInput"
                        type="text"
                        maxlength="2000"
                        placeholder="Ask about the programme, slides or simulation..."
                        autocomplete="off"
                    >
                    <button type="submit" aria-label="Send question">
                        <i class="bi bi-send" aria-hidden="true"></i>
                    </button>
                </form>
            </div>
        </div>

        <button class="chatbot-toggle" id="chatbotToggle" type="button" aria-label="Open programme assistant" aria-expanded="false">
            <i class="bi bi-chat-dots" aria-hidden="true"></i>
        </button>
    `;

    document.body.appendChild(widget);

    const panel = widget.querySelector('#chatbotPanel');
    const toggle = widget.querySelector('#chatbotToggle');
    const closeButton = widget.querySelector('#chatbotClose');
    const form = widget.querySelector('#chatbotForm');
    const input = widget.querySelector('#chatbotInput');
    const submitButton = form.querySelector('button[type="submit"]');
    const messages = widget.querySelector('#chatbotMessages');
    const conversationHistory = [];

    addChatbotMessage(
        messages,
        'bot',
        'Welcome. I am connected to the programme knowledge assistant and can help with the provisional UCT GSB executive AI programme, including the three-day journey, delegates, slides, assessments and simulation.'
    );

    const openChatbot = () => {
        panel.classList.add('open');
        panel.setAttribute('aria-hidden', 'false');
        toggle.setAttribute('aria-expanded', 'true');
        input.focus();
    };

    const closeChatbot = () => {
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
    };

    const setChatbotBusy = (isBusy) => {
        input.disabled = isBusy;
        submitButton.disabled = isBusy;
        form.setAttribute('aria-busy', isBusy ? 'true' : 'false');
    };

    toggle.addEventListener('click', () => {
        panel.classList.contains('open') ? closeChatbot() : openChatbot();
    });

    closeButton.addEventListener('click', closeChatbot);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && panel.classList.contains('open')) {
            closeChatbot();
        }
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const userMessage = input.value.trim();

        if (!userMessage || input.disabled) {
            return;
        }

        addChatbotMessage(messages, 'user', userMessage);
        conversationHistory.push({ role: 'user', content: userMessage });
        trimChatbotHistory(conversationHistory);

        input.value = '';
        setChatbotBusy(true);

        const typingMessage = addChatbotMessage(messages, 'bot', 'Thinking…', 'chatbot-typing');

        try {
            const reply = await requestDeepSeekChatbotResponse(conversationHistory);
            typingMessage.remove();
            addChatbotMessage(messages, 'bot', reply);
            conversationHistory.push({ role: 'assistant', content: reply });
            trimChatbotHistory(conversationHistory);
        } catch (error) {
            console.error('Programme assistant request failed:', error);
            typingMessage.remove();

            const fallbackReply = getFallbackChatbotResponse(userMessage);
            addChatbotMessage(
                messages,
                'bot',
                `${fallbackReply} The live AI service is temporarily unavailable, so this response is from the website's built-in programme guidance.`
            );
        } finally {
            setChatbotBusy(false);
            input.focus();
        }
    });
}

function addChatbotMessage(container, sender, text, extraClass = '') {
    const message = document.createElement('div');
    message.className = `chatbot-message ${sender}${extraClass ? ` ${extraClass}` : ''}`;

    const bubble = document.createElement('span');
    bubble.textContent = text;

    message.appendChild(bubble);
    container.appendChild(message);
    container.scrollTop = container.scrollHeight;

    return message;
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

    if (matchesAny(text, ['hello', 'hi', 'hey', 'help'])) {
        return 'Hello. Ask me about the programme overview, Day 1, Day 2, Day 3, delegates, slides, assessments, the welcome avatar, the simulation or programme support.';
    }

    if (matchesAny(text, ['provisional', 'placeholder', 'final content', 'approved'])) {
        return 'Some programme wording, schedules, forms and resources are authentic working placeholders and will be replaced when approved UCT GSB programme material is supplied.';
    }

    if (matchesAny(text, ['day 1', 'first day', 'readiness', 'alignment'])) {
        return 'Day 1 provisionally focuses on strategic alignment and AI readiness, including orientation, applied demonstrations, readiness discussion and priority challenge mapping.';
    }

    if (matchesAny(text, ['day 2', 'second day', 'prototype', 'co-creation', 'pitch'])) {
        return 'Day 2 provisionally focuses on problem framing, collaborative solution design, rapid prototyping, value and risk testing, and executive pitching.';
    }

    if (matchesAny(text, ['day 3', 'third day', 'responsible ai', 'governance', 'implementation'])) {
        return 'Day 3 provisionally focuses on responsible AI, governance, executive decision-making, pilot planning, implementation roadmaps and action priorities.';
    }

    if (matchesAny(text, ['slide', 'pdf', 'download', 'material', 'resource'])) {
        return 'The Slides page contains honest placeholders until approved UCT GSB programme PDFs are supplied. Outdated SARS files should not be presented as current material.';
    }

    if (matchesAny(text, ['assessment', 'feedback', 'form', 'qr code'])) {
        return 'The Assessments page is waiting for the approved diagnostic, reflection and evaluation links and QR codes.';
    }

    if (matchesAny(text, ['simulation', 'scenario', 'exercise'])) {
        return 'The Simulation page is intended for a scenario-based executive decision exercise. Its final scenario and scoring rules are still awaiting approval.';
    }

    if (matchesAny(text, ['delegate', 'participant'])) {
        return 'The Delegates page contains 16 supplied participant profiles, with names, roles and organisations marked for verification before publication.';
    }

    if (matchesAny(text, ['contact', 'support', 'venue', 'location', 'email'])) {
        return 'Official programme contact, venue and support details are still pending approval and should not be invented.';
    }

    return 'I can help with the provisional UCT GSB executive AI programme and its website pages.';
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
    '%cUCT GSB Executive AI Programme',
    'color: #00aeef; background: #124f7c; padding: 8px 12px; font-size: 16px; font-weight: 700;'
);
console.log(
    'Programme content marked as provisional should be replaced only with approved material.'
);
