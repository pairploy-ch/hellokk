<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden" id="investment">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0">
      <img 
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop" 
        alt="Khon Kaen Cityscape"
        class="w-full h-full object-cover"
      >
      <!-- Dark overlay for better text readability -->
      <div class="absolute inset-0 bg-black bg-opacity-40"></div>
      <!-- Additional gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50"></div>
    </div>

    <!-- Content Container -->
    <div class="relative z-10 max-w-4xl mx-auto px-6 text-center">
      
      <!-- Main Heading -->
      <div class="mb-8">
        <h1 class="text-4xl md:text-6xl lg:text-7xl text-white mb-4 leading-tight" style="font-weight: 400;">
          Invest in Khon Kaen
        </h1>
        <h2 class="text-3xl md:text-5xl lg:text-6xl text-white leading-tight" style="font-weight: 500;">
          <span >Growth</span>, 
          <span >Opportunity</span>, 
          <span >Future</span>
        </h2>
      </div>

      <!-- Subtitle -->
      <div class="mb-12">
        <p class="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-kanit" style="font-weight: 400;">
          ลงทุนอสังหาริมทรัพย์ขอนแก่น เมืองมหาวิทยาลัยและศูนย์กลางธุรกิจอีสาน <br>ที่มูลค่าเพิ่มขึ้นตลอด
        </p>
      </div>

      <!-- Email Subscription Form -->
      <div class="max-w-md mx-auto">
        <form @submit.prevent="handleEmailSubmit" class="flex items-center bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 p-2">
          
          <!-- Email Input -->
          <div class="flex-1 relative">
            <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <input 
              v-model="email"
              type="email" 
              placeholder="Enter your email"
              class="w-full pl-12 pr-3 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none text-base"
              required
            >
          </div>

          <!-- Submit Button -->
          <button 
            type="submit"
            class="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            :disabled="loading"
          >
            <div v-if="loading" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
        </form>

        <!-- Success Message -->
        <div v-if="showSuccess" class="mt-4 p-3 bg-green-500/90 text-white rounded-lg backdrop-blur-sm">
          <p class="text-sm">ขอบคุณสำหรับการสมัครสมาชิก!</p>
        </div>

        <!-- Error Message -->
        <div v-if="showError" class="mt-4 p-3 bg-red-500/90 text-white rounded-lg backdrop-blur-sm">
          <p class="text-sm">เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง</p>
        </div>
      </div>

   
    </div>


  </div>
</template>

<script setup>
import { ref } from 'vue'

// Reactive data
const email = ref('')
const loading = ref(false)
const showSuccess = ref(false)
const showError = ref(false)

// Methods
const handleEmailSubmit = async () => {
  if (!email.value || loading.value) return
  
  loading.value = true
  showSuccess.value = false
  showError.value = false
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Here you would make actual API call to subscribe email
    console.log('Email submitted:', email.value)
    
    showSuccess.value = true
    email.value = ''
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      showSuccess.value = false
    }, 3000)
    
  } catch (error) {
    console.error('Subscription error:', error)
    showError.value = true
    
    // Hide error message after 3 seconds
    setTimeout(() => {
      showError.value = false
    }, 3000)
    
  } finally {
    loading.value = false
  }
}

// SEO Meta
useHead({
  title: 'Invest in Khon Kaen - Growth, Opportunity, Future',
  meta: [
    {
      name: 'description',
      content: 'Join thousands of investors who believe in Khon Kaen\'s future. Subscribe to get the latest investment opportunities and market insights.'
    },
    {
      property: 'og:title',
      content: 'Invest in Khon Kaen - Growth, Opportunity, Future'
    },
    {
      property: 'og:description',
      content: 'Join thousands of investors who believe in Khon Kaen\'s future.'
    }
  ]
})
</script>

<style scoped>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

/* Gradient text effect */
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Glass morphism effect for form */
.glass-form {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Custom focus styles */
input:focus {
  outline: none;
}

/* Smooth hover transitions */
button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Typography improvements for Thai text */
p {
  font-family: 'Sarabun', 'Noto Sans Thai', sans-serif;
}

/* Mobile responsiveness improvements */
@media (max-width: 640px) {
  h1 {
    font-size: 2.5rem;
    line-height: 1.1;
  }
  
  h2 {
    font-size: 2rem;
    line-height: 1.2;
  }
  
  .form-container {
    padding: 0 1rem;
  }
}

/* Parallax effect for background */
.parallax-bg {
  transform: translate3d(0, 0, 0);
  will-change: transform;
}
</style>