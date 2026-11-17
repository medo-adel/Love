# حكايتنا | Full-Stack Love & Friends Story Maker 💖👊
### نظام متكامل مع قاعدة بيانات SQLite وخادم Python Flask

تطبيق ويب متكامل يتيح لك إنشاء مواقع وحكايات حب وصداقة متعددة، وحفظ كل مشروع وصوره في قاعدة بيانات **SQLite** ومجلدات مستقلة للأبد (`project_1`, `project_2`, ...).

---

## 🛠 التقنيات المستخدمة:
* **Backend**: Python Flask 3.1
* **Database**: SQLite3
* **Production Server**: Gunicorn
* **Frontend**: HTML5, CSS3 (Glassmorphism & 3D Animations), JavaScript (Vanilla ES6), Canvas Particles, Web Audio API

---

## 🚀 طريقة التشغيل المحلي (على جهازك):

1. اضغط مرتين على ملف **`run.bat`**.
2. سيتم تشغيل السيرفر وقاعدة بيانات SQLite فوراً على:
   👉 **`http://localhost:5000`**
3. افتح الرابط في متصفحك، وأنشئ أي مشروع وارفع الصور، وسيتم حفظ كل شيء في الداتابيز ومجلد `uploads/project_X` تلقائياً!

---

## 🌐 طريقة الرفع المجاني على Render.com (خلال دقيقتين):

لكي يعمل الموقع للجميع بروابط أونلاين وداتابيز حقيقية على مدار 24 ساعة:

1. ادخل على موقع **[Render.com](https://render.com)** وسجل دخول بحسابك على **GitHub**.
2. اضغط على زر **New +** ثم اختر **Web Service**.
3. اختر المستودع الخاص بك: **`medo-adel/Love`**.
4. ستجد الإعدادات التالية مجهزة تلقائياً:
   * **Runtime**: `Python`
   * **Build Command**: `pip install -r requirements.txt`
   * **Start Command**: `gunicorn app:app`
5. اضغط على **Deploy Web Service** في أسفل الصفحة.
6. سيعطيك Render رابطاً مباشراً مثل:
   👉 **`https://love-story-xxxx.onrender.com`**

الآن يمكنك أنت أو أي شخص الدخول للرابط، إنشاء أي مشروع وحفظه في الـ SQLite Database والحصول على رابط فوري مثل:
`https://love-story-xxxx.onrender.com/project/project_1`
`https://love-story-xxxx.onrender.com/project/project_2`
وستظهر الصور والكلمات والعداد لجميع الأشخاص في العالم بأعلى جودة! 💖
