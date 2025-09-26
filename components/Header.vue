<template>
  <header class="w-full bg-white border-b border-gray-200">
    <nav class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <!-- <div id="google_translate_element" class="fixed top-4 right-4 z-50"></div> -->
      <div class="flex justify-between items-center h-14 sm:h-16">
        <!-- Mobile Menu Button (visible on mobile only) -->
        <button 
          @click="toggleMobileMenu"
          class="md:hidden p-2 rounded-md text-gray-900 hover:bg-gray-100 focus:outline-none"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- Left Navigation (hidden on mobile, visible on desktop) -->
        <div class="hidden md:flex items-center space-x-8">
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
        <div class="flex items-center space-x-2 sm:space-x-4">
          <!-- Language Dropdown -->
          <div class="relative">
            <button 
              @click="toggleLanguageDropdown"
              class="flex items-center space-x-1 bg-black text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              <span>{{ currentLanguage }}</span>
              <svg 
                class="w-3 sm:w-4 h-3 sm:h-4 transition-transform"
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
              class="absolute right-0 mt-2 w-16 sm:w-20 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50"
            >
              <button 
                v-for="lang in languages" 
                :key="lang.code"
                @click="selectLanguage(lang)"
                class="block w-full text-left px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                :class="{ 'bg-gray-100 font-medium': currentLanguage === lang.code }"
              >
                {{ lang.code }}
              </button>
            </div>
          </div>

          <!-- User/Profile Button -->
          <!-- <button 
            @click="handleProfileClick"
            class="w-7 sm:w-8 h-7 sm:h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <svg class="w-3 sm:w-4 h-3 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </button> -->
        </div>
      </div>

      <!-- Mobile Navigation Menu (visible only on mobile when opened) -->
      <div 
        v-if="isMobileMenuOpen"
        class="md:hidden border-t border-gray-200 bg-white"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink 
            to="/" 
            @click="closeMobileMenu"
            class="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            :class="{ 'font-bold bg-gray-50': $route.path === '/' }"
          >
            HOME
          </NuxtLink>
          
          <!-- Mobile Highlight Section -->
          <div>
            <button 
              @click="toggleMobileSection('highlight')"
              class="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              :class="{ 'font-bold bg-gray-50': activeMobileSection === 'highlight' || isHighlightActive }"
            >
              <span>HIGHLIGHT</span>
              <svg 
                class="w-4 h-4 transition-transform"
                :class="{ 'rotate-180': activeMobileSection === 'highlight' }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <div 
              v-if="activeMobileSection === 'highlight'"
              class="pl-4 space-y-1"
            >
              <NuxtLink 
                to="/news"
                @click="closeMobileMenu"
                class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                News
              </NuxtLink>
              <NuxtLink 
                to="/events"
                @click="closeMobileMenu"
                class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                Event
              </NuxtLink>
            </div>
          </div>

          <!-- Mobile Lifestyle Section -->
          <div>
            <button 
              @click="toggleMobileSection('lifestyle')"
              class="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              :class="{ 'font-bold bg-gray-50': activeMobileSection === 'lifestyle' || isLifestyleActive }"
            >
              <span>LIFESTYLE</span>
              <svg 
                class="w-4 h-4 transition-transform"
                :class="{ 'rotate-180': activeMobileSection === 'lifestyle' }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <div 
              v-if="activeMobileSection === 'lifestyle'"
              class="pl-4 space-y-1"
            >
              <NuxtLink 
                to="/foods"
                @click="closeMobileMenu"
                class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                Food
              </NuxtLink>
              <NuxtLink 
                to="/travel"
                @click="closeMobileMenu"
                class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                Tourist
              </NuxtLink>
              <NuxtLink 
                to="/hotel"
                @click="closeMobileMenu"
                class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                Hotel
              </NuxtLink>
            </div>
          </div>

          <!-- Mobile Property Section -->
          <div>
            <button 
              @click="toggleMobileSection('property')"
              class="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              :class="{ 'font-bold bg-gray-50': activeMobileSection === 'property' || isPropertyActive }"
            >
              <span>PROPERTY</span>
              <svg 
                class="w-4 h-4 transition-transform"
                :class="{ 'rotate-180': activeMobileSection === 'property' }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <div 
              v-if="activeMobileSection === 'property'"
              class="pl-4 space-y-1"
            >
              <NuxtLink 
                to="/property"
                @click="closeMobileMenu"
                class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                Buy/Rent/Sell
              </NuxtLink>
              <NuxtLink 
                to="/#investment"
                @click="closeMobileMenu"
                class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                Investment
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
const route = useRoute()

// Mobile menu functionality
const isMobileMenuOpen = ref(false)
const activeMobileSection = ref(null)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (!isMobileMenuOpen.value) {
    activeMobileSection.value = null
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  activeMobileSection.value = null
}

const toggleMobileSection = (section) => {
  if (activeMobileSection.value === section) {
    activeMobileSection.value = null
  } else {
    activeMobileSection.value = section
  }
}

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

    // Close mobile menu when clicking outside
    if (!e.target.closest('nav') && isMobileMenuOpen.value) {
      closeMobileMenu()
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