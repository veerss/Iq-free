
// تخزين بيانات المستخدمين
let users = JSON.parse(localStorage.getItem("users")) || {};
let currentUser = null;
let balance = 0;
let adsRemaining = 10;

// عناصر واجهة المستخدم
const loginContainer = document.getElementById("login-container");
const registerContainer = document.getElementById("register-container");
const dashboard = document.getElementById("dashboard");
const balanceSpan = document.getElementById("balance");
const adsCountSpan = document.getElementById("ads-count");
const adsContainer = document.getElementById("ads-container");
const withdrawContainer = document.getElementById("withdraw-container");

// روابط الإعلانات
const adLinks = [
    "https://www.profitablecpmrate.com/h3vb5u94f?key=e29ab2fdbc9eb29cb8876a772497e03c",
    "https://www.profitablecpmrate.com/qf8gg07r?key=fdc62d696cf14e5067986e6f4c4c4ea7",
    "https://www.profitablecpmrate.com/mbc7aysu6?key=e7217763e10809465222de997f196198",
    "https://www.profitablecpmrate.com/dizj8atnc?key=a6f31b222284db2ba5abb2849fbe40de",
    "https://www.profitablecpmrate.com/x1y7shnugt?key=589e8009c4ca5573c6013e4705377863",
    "https://www.profitablecpmrate.com/ntp86aus?key=1ed5d036ad7d59165bd56c4fbd03cb80",
    "https://www.profitablecpmrate.com/ytv67jktn6?key=d7dfa5da12564bb698e4ffdc9b2efc48",
    "https://www.profitablecpmrate.com/ukg372f4ki?key=2ebb9eab2265dfa33cc255ccbf778b11",
    "https://www.profitablecpmrate.com/dkq0knze?key=4480f0df0fa02e2f60b8e68d4e8e8c51",
    "https://www.profitablecpmrate.com/nb6vjbcpw?key=a52d872787e1c4ae681ed22efaf544a7"
];

// التبديل بين تسجيل الدخول وإنشاء حساب
document.getElementById("show-register").onclick = () => {
    loginContainer.classList.add("hidden");
    registerContainer.classList.remove("hidden");
};

document.getElementById("show-login").onclick = () => {
    registerContainer.classList.add("hidden");
    loginContainer.classList.remove("hidden");
};

// تسجيل الدخول
document.getElementById("login-btn").onclick = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (users[email] && users[email].password === password) {
        currentUser = email;
        balance = users[email].balance || 0;
        adsRemaining = users[email].adsRemaining || 10;
        updateDashboard();
    } else {
        alert("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
    }
};

// إنشاء حساب
document.getElementById("register-btn").onclick = () => {
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;

    if (!email || !password) {
        alert("يرجى ملء جميع الحقول.");
        return;
    }

    if (users[email]) {
        alert("البريد الإلكتروني مسجل بالفعل.");
        return;
    }

    users[email] = { password, balance: 0, adsRemaining: 10 };
    localStorage.setItem("users", JSON.stringify(users));
    alert("تم إنشاء الحساب بنجاح.");
    document.getElementById("show-login").click();
};

// تحديث لوحة التحكم
function updateDashboard() {
    loginContainer.classList.add("hidden");
    registerContainer.classList.add("hidden");
    dashboard.classList.remove("hidden");
    balanceSpan.textContent = balance;
    adsCountSpan.textContent = adsRemaining;
    renderAds();
}

// إنشاء خانات الإعلانات
function renderAds() {
    adsContainer.innerHTML = "";
    for (let i = 0; i < 10; i++) {
        const ad = document.createElement("div");
        ad.classList.add("ad");
        ad.textContent = `إعلان ${i + 1}`;
        ad.onclick = () => watchAd(ad, adLinks[i]);
        if (adsRemaining <= 0 || ad.classList.contains("disabled")) {
            ad.classList.add("disabled");
        }
        adsContainer.appendChild(ad);
    }
}

// مشاهدة الإعلان
function watchAd(adElement, adLink) {
    if (adElement.classList.contains("disabled") || adsRemaining <= 0) {
        alert("لا يمكنك مشاهدة المزيد من الإعلانات.");
        return;
    }

    adElement.classList.add("disabled");
    adsRemaining--;
    adsCountSpan.textContent = adsRemaining;

    const win = window.open(adLink, "_blank");

    setTimeout(() => {
        if (win) win.close();
        balance += 15;
        balanceSpan.textContent = balance;
        users[currentUser].balance = balance;
        users[currentUser].adsRemaining = adsRemaining;
        localStorage.setItem("users", JSON.stringify(users));
        alert("تمت إضافة 15 دينار إلى رصيدك.");
    }, 30000);
}

// السحب
document.getElementById("withdraw-btn").onclick = () => {
    withdrawContainer.classList.toggle("hidden");
};

document.getElementById("confirm-withdraw-btn").onclick = () => {
    const info = document.getElementById("withdraw-info").value;

    if (!info) {
        alert("يرجى إدخال معلومات الوسيلة.");
        return;
    }

    if (balance >= 25000) {
        alert(`تم إرسال ${balance} دينار عبر ${info}.`);
        balance = 0;
        users[currentUser].balance = balance;
        localStorage.setItem("users", JSON.stringify(users));
        updateDashboard();
    } else {
        alert("الرصيد غير كافٍ للسحب.");
    }
};
