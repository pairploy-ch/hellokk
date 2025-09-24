<template>
  <header class="w-full bg-white border-b border-gray-200">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Left Navigation -->
        <div class="flex items-center space-x-8">
          <NuxtLink 
            to="/" 
            class="text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
            :class="{ 'font-bold': $route.path === '/' }"
          >
            HOME
          </NuxtLink>
          <NuxtLink 
            to="/collection" 
            class="text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
            :class="{ 'font-bold': $route.path === '/collection' }"
          >
            COLLECTION
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
            :class="{ 'font-bold': $route.path === '/about' }"
          >
            ABOUT
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            class="text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
            :class="{ 'font-bold': $route.path === '/contact' }"
          >
            CONTACT
          </NuxtLink>
        </div>

        <!-- Right Section -->
        <div class="flex items-center space-x-4">
          <!-- Language Dropdown -->
          <div class="relative">
            <button 
              @click="toggleLanguageDropdown"
              class="flex items-center space-x-1 bg-black text-white px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              <span>{{ currentLanguage }}</span>
              <svg 
                class="w-4 h-4 transition-transform"
                :class="{ 'rotate-180': isLanguageDropdownOpen }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <!-- Language Dropdown Menu -->
            <div 
              v-if="isLanguageDropdownOpen"
              class="absolute right-0 mt-2 w-20 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50"
            >
              <button 
                v-for="lang in languages" 
                :key="lang.code"
                @click="selectLanguage(lang)"
                class="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                :class="{ 'bg-gray-100 font-medium': currentLanguage === lang.code }"
              >
                {{ lang.code }}
              </button>
            </div>
          </div>

          <!-- User/Profile Button -->
          <button 
            @click="handleProfileClick"
            class="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
const route = useRoute()

// Language functionality
const currentLanguage = ref('ENG')
const isLanguageDropdownOpen = ref(false)

const languages = [
  { code: 'ENG', name: 'English' },
  { code: 'TH', name: 'ไทย' },
  { code: 'JP', name: '日本語' },
]

const toggleLanguageDropdown = () => {
  isLanguageDropdownOpen.value = !isLanguageDropdownOpen.value
}

const selectLanguage = (lang) => {
  currentLanguage.value = lang.code
  isLanguageDropdownOpen.value = false
  // Add your language change logic here
  console.log(`Language changed to: ${lang.code}`)
}

const handleProfileClick = () => {
  // Add your profile/user logic here
  console.log('Profile clicked')
}

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      isLanguageDropdownOpen.value = false
    }
  })
})
</script>

<style scoped>
/* Additional styles if needed */
.router-link-active {
  @apply font-bold;
}
</style>