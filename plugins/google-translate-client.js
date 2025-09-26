export default defineNuxtPlugin(() => {
  // ตรวจสอบว่าโค้ดทำงานเฉพาะบนเบราว์เซอร์
  if (process.client) {
    
    // ฟังก์ชันสำหรับโหลดสคริปต์ Google
    const addScript = () => {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    };

    // Global callback function ที่ Google Script จะเรียกใช้เมื่อโหลดเสร็จ
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'th',
          includedLanguages: 'en,th', // ภาษาที่ให้เลือก (รหัสที่ Google Translate ใช้)
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
        },
        'google_translate_element' // ID ของ div ที่ซ่อนอยู่ใน Header Component
      );
    };

    addScript();
  }
});