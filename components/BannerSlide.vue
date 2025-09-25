<template>
    <div class="max-w-7xl mx-auto">
 <div class="relative w-full  overflow-hidden">
    <!-- Banner Slide Container -->
    <div 
      class="flex transition-transform duration-500 ease-in-out h-auto"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      @mouseenter="stopAutoPlay"
      @mouseleave="startAutoPlay"
    >
      <!-- Dynamic Slides from Supabase Data -->
      <div 
        v-for="(slide, index) in slides" 
        :key="slide.id || index"
        class="w-full flex-shrink-0 relative"
      >
        <!-- Slide Link -->
        <NuxtLink 
          :to="slide.link || '#'"
          class="block w-full h-full"
          :target="slide.external ? '_blank' : '_self'"
        >
          <!-- Image -->
          <img 
            :src="slide.image"
            :alt="slide.name || 'Banner'"
            class="w-full h-full object-cover"
          />
        </NuxtLink>
      </div>
    </div>

    <!-- Navigation Arrows -->
    <button 
      v-if="slides.length > 1"
      @click="prevSlide"
      class="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all z-30"
    >
      <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>

    <button 
      v-if="slides.length > 1"
      @click="nextSlide"
      class="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all z-30"
    >
      <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>

    <!-- Slide Indicators -->
    <div v-if="slides.length > 1" class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
      <button 
        v-for="(slide, index) in slides" 
        :key="slide.id || index"
        @click="goToSlide(index)"
        class="w-3 h-3 rounded-full transition-all"
        :class="currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50 hover:bg-opacity-80'"
      ></button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-gray-200">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  </div>
    </div>
 
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'

const { $supabase } = useNuxtApp()

// Define props for external slide configuration
const props = defineProps({
  autoPlay: {
    type: Boolean,
    default: true
  },
  autoPlayInterval: {
    type: Number,
    default: 5000
  },
  slidesData: {
    type: Array,
    default: () => []
  }
})

// Reactive data
const bannerAds = ref([])
const loading = ref(true)
const currentSlide = ref(0)
const intervalId = ref(null)

// Fetch banner data from Supabase
const fetchBannerAds = async () => {
  try {
    loading.value = true
    const { data, error } = await $supabase
      .from('bannerads')
      .select('*')
      .eq("is_main", true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching banner ads:', error)
      bannerAds.value = []
    } else {
      bannerAds.value = data || []
      console.log('Fetched banner ads:', data)
    }
  } catch (err) {
    console.error('Unexpected error:', err)
    bannerAds.value = []
  } finally {
    loading.value = false
  }
}

// Default slide data (fallback)
const defaultSlides = [
  {
    id: 'default-1',
    name: 'Welcome',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    link: '/'
  }
]

// Computed slides - priority: props > supabase data > default
const slides = computed(() => {
  if (props.slidesData.length > 0) {
    return props.slidesData
  }
  
  if (bannerAds.value.length > 0) {
    return bannerAds.value
  }
  
  return defaultSlides
})

// Navigation functions
const nextSlide = () => {
  if (slides.value.length > 1) {
    currentSlide.value = (currentSlide.value + 1) % slides.value.length
  }
}

const prevSlide = () => {
  if (slides.value.length > 1) {
    currentSlide.value = currentSlide.value === 0 ? slides.value.length - 1 : currentSlide.value - 1
  }
}

const goToSlide = (index) => {
  if (index >= 0 && index < slides.value.length) {
    currentSlide.value = index
  }
}

// Auto-play functionality
const startAutoPlay = () => {
  if (props.autoPlay && slides.value.length > 1) {
    intervalId.value = setInterval(nextSlide, props.autoPlayInterval)
  }
}

const stopAutoPlay = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
}

// Keyboard navigation
const handleKeydown = (event) => {
  if (slides.value.length > 1) {
    if (event.key === 'ArrowLeft') {
      prevSlide()
    } else if (event.key === 'ArrowRight') {
      nextSlide()
    }
  }
}

// Watch slides change to reset current slide if needed
watch(slides, (newSlides) => {
  if (currentSlide.value >= newSlides.length) {
    currentSlide.value = 0
  }
})

// Lifecycle hooks
onMounted(async () => {
  // Fetch data from Supabase
  await fetchBannerAds()
  
  // Start auto-play after data is loaded
  startAutoPlay()
  
  // Add keyboard listeners
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  stopAutoPlay()
  document.removeEventListener('keydown', handleKeydown)
})

// Watch for prop changes
watch(() => props.slidesData, () => {
  currentSlide.value = 0
  stopAutoPlay()
  startAutoPlay()
})
</script>

<style scoped>
/* Smooth fade transition for background images */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

/* Image styling */
img {
  transition: opacity 0.3s ease;
}

/* Loading placeholder */
.slide-loading {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Loading spinner */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>