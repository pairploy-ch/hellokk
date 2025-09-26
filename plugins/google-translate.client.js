export default defineNuxtPlugin(() => {
  if (process.client) {
    const addScript = () => {
      const script = document.createElement('script')
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      document.body.appendChild(script)
    }

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'th', // ภาษาหลักของเว็บ (เปลี่ยนได้ เช่น 'th')
          includedLanguages: 'en,th', // ภาษาที่ให้เลือก
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
        },
        'google_translate_element'
      )
    }

    addScript()
  }
})
