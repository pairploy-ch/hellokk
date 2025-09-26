<template>
  <header class="w-full bg-white border-b border-gray-200">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- <div id="google_translate_element" class="fixed top-4 right-4 z-50"></div> -->
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
          
          <!-- Highlight Dropdown -->
          <div class="relative">
            <button 
              @click="toggleDropdown('highlight')"
              class="flex items-center space-x-1 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
              :class="{ 'font-bold': activeDropdown === 'highlight' || isHighlightActive }"
            >
              <span>HIGHLIGHT</span>
              <svg 
                class="w-4 h-4 transition-transform"
                :class="{ 'rotate-180': activeDropdown === 'highlight' }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <div 
              v-if="activeDropdown === 'highlight'"
              class="absolute left-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50"
            >
              <NuxtLink 
                to="/news"
                @click="closeDropdowns"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                News
              </NuxtLink>
              <NuxtLink 
                to="/events"
                @click="closeDropdowns"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Event
              </NuxtLink>
            </div>
          </div>

          <!-- Lifestyle Dropdown -->
          <div class="relative">
            <button 
              @click="toggleDropdown('lifestyle')"
              class="flex items-center space-x-1 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
              :class="{ 'font-bold': activeDropdown === 'lifestyle' || isLifestyleActive }"
            >
              <span>LIFESTYLE</span>
              <svg 
                class="w-4 h-4 transition-transform"
                :class="{ 'rotate-180': activeDropdown === 'lifestyle' }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <div 
              v-if="activeDropdown === 'lifestyle'"
              class="absolute left-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50"
            >
              <NuxtLink 
                to="/foods"
                @click="closeDropdowns"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Food
              </NuxtLink>
              <NuxtLink 
                to="/travel"
                @click="closeDropdowns"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Tourist
              </NuxtLink>
              <NuxtLink 
                to="/hotel"
                @click="closeDropdowns"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Hotel
              </NuxtLink>
            </div>
          </div>

          <!-- Property Dropdown -->
          <div class="relative">
            <button 
              @click="toggleDropdown('property')"
              class="flex items-center space-x-1 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
              :class="{ 'font-bold': activeDropdown === 'property' || isPropertyActive }"
            >
              <span>PROPERTY</span>
              <svg 
                class="w-4 h-4 transition-transform"
                :class="{ 'rotate-180': activeDropdown === 'property' }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <div 
              v-if="activeDropdown === 'property'"
              class="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50"
            >
              <NuxtLink 
                to="/property"
                @click="closeDropdowns"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Buy/Rent/Sell
              </NuxtLink>
              <NuxtLink 
                to="/#investment"
                @click="closeDropdowns"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Investment
              </NuxtLink>
            </div>
          </div>

       
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
          <!-- <button 
            @click="handleProfileClick"
            class="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </button> -->
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
const route = useRoute()

// Language functionality
const currentLanguage = ref('TH')
const isLanguageDropdownOpen = ref(false)

const languages = [
  { code: 'TH', name: 'ไทย' },
  { code: 'ENG', name: 'English' },
  
  // { code: 'JP', name: '日本語' },
]

// Dropdown functionality
const activeDropdown = ref(null)

const toggleDropdown = (dropdownName) => {
  if (activeDropdown.value === dropdownName) {
    activeDropdown.value = null
  } else {
    activeDropdown.value = dropdownName
  }
}

const closeDropdowns = () => {
  activeDropdown.value = null
}

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

// Check if current route matches dropdown sections
const isHighlightActive = computed(() => {
  return route.path.startsWith('/highlight/')
})

const isLifestyleActive = computed(() => {
  return route.path.startsWith('/lifestyle/')
})

const isPropertyActive = computed(() => {
  return route.path.startsWith('/property/')
})

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    // Close main dropdowns
    if (!e.target.closest('.relative') || e.target.closest('.relative').querySelector('button').textContent.includes('ENG')) {
      activeDropdown.value = null
    }
    
    // Close language dropdown
    if (!e.target.closest('.relative') || !e.target.closest('.relative').querySelector('button').textContent.includes(currentLanguage.value)) {
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