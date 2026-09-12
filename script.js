// متغیرهای سراسری
let currentWords = [];
let currentStory = '';

// روش های مختلف برای ساخت داستان
const storyMethods = [
    shuffleWords,
    reverseWords,
    alternateWords,
    groupWords,
    randomInsertPosition,
    mirrorWords,
    spiralWords
];

// دکمه تولید داستان
document.getElementById('generateBtn').addEventListener('click', generateStory);

// دکمه کپی
document.getElementById('copyBtn').addEventListener('click', copyStory);

function generateStory() {
    const input = document.getElementById('wordsInput').value.trim();
    
    if (!input) {
        alert('لطفاً کلمات را وارد کنید!');
        return;
    }

    // تبدیل ورودی به آرایه کلمات
    currentWords = input.split('\n')
        .map(word => word.trim())
        .filter(word => word.length > 0);

    if (currentWords.length === 0) {
        alert('لطفاً کلمات معتبر وارد کنید!');
        return;
    }

    // انتخاب یک روش تصادفی
    const randomMethod = storyMethods[Math.floor(Math.random() * storyMethods.length)];
    const arrangedWords = randomMethod([...currentWords]);

    // ایجاد داستان بدون علامت نگارشی و اینتر
    currentStory = arrangedWords.join(' ');

    // نمایش نتیجه
    document.getElementById('storyOutput').textContent = currentStory;
    document.getElementById('outputSection').style.display = 'block';
    document.getElementById('copyMessage').style.display = 'none';

    // اسکرول به پایین
    document.getElementById('outputSection').scrollIntoView({ behavior: 'smooth' });
}

function copyStory() {
    // کپی داستان
    navigator.clipboard.writeText(currentStory).then(() => {
        // نمایش پیام کپی شدن
        const copyMessage = document.getElementById('copyMessage');
        copyMessage.style.display = 'block';

        // تغییر رنگ دکمه
        const copyBtn = document.getElementById('copyBtn');
        const originalColor = copyBtn.style.background;
        copyBtn.style.background = '#17a2b8';
        copyBtn.textContent = '✓ کپی شد';

        // بازگشت به حالت اول بعد از 2 ثانیه
        setTimeout(() => {
            copyBtn.style.background = '#28a745';
            copyBtn.textContent = 'کپی کردن داستان';
            copyMessage.style.display = 'none';
        }, 2000);
    }).catch(() => {
        alert('خطا در کپی کردن!');
    });
}

// روش 1: شافل کردن کلمات
function shuffleWords(words) {
    const shuffled = [...words];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// روش 2: معکوس کردن کلمات
function reverseWords(words) {
    return [...words].reverse();
}

// روش 3: درهم کردن متناوب
function alternateWords(words) {
    const result = [];
    const firstHalf = words.slice(0, Math.ceil(words.length / 2));
    const secondHalf = words.slice(Math.ceil(words.length / 2));

    for (let i = 0; i < Math.max(firstHalf.length, secondHalf.length); i++) {
        if (i < firstHalf.length) result.push(firstHalf[i]);
        if (i < secondHalf.length) result.push(secondHalf[i]);
    }
    return result;
}

// روش 4: گروه بندی کلمات
function groupWords(words) {
    const grouped = [];
    const groupSize = Math.max(2, Math.floor(words.length / 3));
    
    for (let i = 0; i < words.length; i += groupSize) {
        const group = words.slice(i, i + groupSize);
        grouped.push(...shuffleWords(group));
    }
    return grouped;
}

// روش 5: درج تصادفی در موضع‌های مختلف
function randomInsertPosition(words) {
    const result = [];
    const sorted = [...words].sort();
    
    for (let word of sorted) {
        const position = Math.floor(Math.random() * (result.length + 1));
        result.splice(position, 0, word);
    }
    return result;
}

// روش 6: آینه کردن
function mirrorWords(words) {
    const result = [];
    const half = Math.ceil(words.length / 2);
    
    for (let i = 0; i < half; i++) {
        result.push(words[i]);
        if (words.length - 1 - i !== i) {
            result.push(words[words.length - 1 - i]);
        }
    }
    return result;
}

// روش 7: حرکت مارپیچی
function spiralWords(words) {
    if (words.length === 0) return [];
    
    const result = [];
    let left = 0;
    let right = words.length - 1;
    let fromLeft = true;

    while (left <= right) {
        if (fromLeft) {
            result.push(words[left]);
            left++;
        } else {
            result.push(words[right]);
            right--;
        }
        fromLeft = !fromLeft;
    }
    return result;
}

// اجازه دادن به Enter برای تولید داستان
document.getElementById('wordsInput').addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'Enter') {
        generateStory();
    }
});
