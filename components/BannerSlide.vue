<template>
    <div class="max-w-7xl mx-auto">
 <div class="relative w-full h-96 md:h-[500px] overflow-hidden">
    <!-- Banner Slide Container -->
    <div 
      class="flex transition-transform duration-500 ease-in-out h-full"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      @mouseenter="stopAutoPlay"
      @mouseleave="startAutoPlay"
    >
      <!-- Dynamic Slides from Images -->
      <div 
        v-for="(slide, index) in slides" 
        :key="index"
        class="w-full flex-shrink-0 relative"
      >
        <!-- Slide Link -->
        <NuxtLink 
          :to="slide.link || '#'"
          class="block w-full h-full"
          :target="slide.external ? '_blank' : '_self'"
        >
          <!-- Background Image -->
          <div 
            class="w-full h-full bg-cover bg-center bg-no-repeat"
            :style="{ backgroundImage: `url(${slide.image})` }"
          >
            <!-- Overlay for better text readability (optional) -->
            <div 
              v-if="slide.overlay"
              class="absolute inset-0 bg-black bg-opacity-30"
            ></div>
            
            <!-- Optional content overlay -->
            <div 
              v-if="slide.title || slide.description"
              class="absolute inset-0 flex items-center justify-center"
            >
              <div class="text-center text-white z-10">
                <h2 
                  v-if="slide.title"
                  class="text-4xl font-bold mb-4 drop-shadow-lg"
                >
                  {{ slide.title }}
                </h2>
                <p 
                  v-if="slide.description"
                  class="text-lg drop-shadow-lg"
                >
                  {{ slide.description }}
                </p>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Navigation Arrows -->
    <button 
      @click="prevSlide"
      class="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all z-30"
    >
      <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>

    <button 
      @click="nextSlide"
      class="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all z-30"
    >
      <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>

    <!-- Slide Indicators -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
      <button 
        v-for="(slide, index) in slides" 
        :key="index"
        @click="goToSlide(index)"
        class="w-3 h-3 rounded-full transition-all"
        :class="currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50 hover:bg-opacity-80'"
      ></button>
    </div>
  </div>
    </div>
 
</template>

<script setup>
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

// Default slide data (can be overridden by props)
const defaultSlides = [
  {
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',

    link: '/event/sugarex-2025',
    overlay: true
  },
  {
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',

    link: '/event/innovation-conference',
    overlay: true
  },
]

// Use provided slides or default slides
const slides = computed(() => props.slidesData.length > 0 ? props.slidesData : defaultSlides)

const currentSlide = ref(0)
const intervalId = ref(null)

// Navigation functions
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? slides.value.length - 1 : currentSlide.value - 1
}

const goToSlide = (index) => {
  currentSlide.value = index
}

// Auto-play functionality
const startAutoPlay = () => {
  if (props.autoPlay) {
    intervalId.value = setInterval(nextSlide, props.autoPlayInterval)
  }
}

const stopAutoPlay = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
}

// Lifecycle
onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})

// Keyboard navigation
const handleKeydown = (event) => {
  if (event.key === 'ArrowLeft') {
    prevSlide()
  } else if (event.key === 'ArrowRight') {
    nextSlide()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
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

/* Ensure images cover the full area */
.bg-cover {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
</style>