<template>
  <div class="max-w-7xl mx-auto py-12 bg-white px-6">
    <div class="">
      <!-- Header -->
      <div class="mb-8">
        <h2 class="text-3xl text-black flex items-center gap-2">
          Proud to be Khon Kaen
          <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
        </h2>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="bg-gray-100 p-6 pt-8 relative overflow-hidden">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="i in 4" :key="i" class="flex flex-col items-start animate-pulse">
            <div class="flex">
              <div class="w-20 h-20 bg-gray-300 rounded-full mb-4"></div>
              <div class="ml-3">
                <div class="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                <div class="w-32 h-5 bg-gray-300 rounded mb-3"></div>
                <div class="w-16 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Slider Container -->
      <div v-else class="bg-gray-100 p-6 pt-8 relative overflow-hidden">
        <div class="relative">
          <!-- Slides -->
          <div
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div
              v-for="(slideProfiles, slideIndex) in profileSlides"
              :key="slideIndex"
              class="w-full flex-shrink-0"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div
                  v-for="profile in slideProfiles"
                  :key="profile.id"
                  class="flex flex-col items-start"
                >
                  <div class="flex items-center">
                    <div class="w-20 h-20 rounded-full overflow-hidden mb-4">
                      <img
                        :src="profile.profile"
                        :alt="profile.name"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <div class="ml-3">
                      <div
                        class="text-sm text-gray-500 mb-1"
                        style="font-weight: 400"
                      >
                        {{ profile.category }}
                      </div>
                      <h3
                        class="text-md text-black mb-3"
                        style="font-weight: 500"
                      >
                        {{ profile.name }}
                      </h3>
                      <!-- <NuxtLink
                        :to="`/profile/${profile.slug}`"
                        class="text-blue-500 hover:text-blue-700 flex items-center gap-1 text-sm"
                        style="font-weight: 300"
                      >
                        More
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5l7 7-7 7"
                          ></path>
                        </svg>
                      </NuxtLink> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <!-- <button 
            @click="prevSlide"
            class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-2 shadow-lg transition-all duration-200 z-10"
          >
            <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <button 
            @click="nextSlide"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-2 shadow-lg transition-all duration-200 z-10"
          >
            <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button> -->
        </div>

        <!-- Dots Indicator -->
        <!-- <div class="flex justify-center mt-6 space-x-2">
          <button
            v-for="(slide, index) in profileSlides"
            :key="index"
            @click="goToSlide(index)"
            :class="[
              'w-2 h-2 rounded-full transition-all duration-200',
              currentSlide === index ? 'bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'
            ]"
          ></button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";

const { $supabase } = useNuxtApp();

// Reactive data
const celeb = ref([]);
const loading = ref(true);

const fetchCeleb = async () => {
  try {
    loading.value = true;
    const { data, error } = await $supabase
      .from("celeb")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching celeb:", error);
      celeb.value = [];
    } else {
      celeb.value = data || [];
      console.log("Fetched celeb:", data);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    celeb.value = [];
  } finally {
    loading.value = false;
  }
};

// Slider state
const currentSlide = ref(0);
const itemsPerSlide = ref(4);

// Auto-play interval
let autoplayInterval = null;

// Split profiles into slides (4 profiles per slide) - now using celeb data
const profileSlides = computed(() => {
  const slides = [];
  for (let i = 0; i < celeb.value.length; i += itemsPerSlide.value) {
    slides.push(celeb.value.slice(i, i + itemsPerSlide.value));
  }
  return slides;
});

// Slider methods
const nextSlide = () => {
  if (profileSlides.value.length > 0) {
    currentSlide.value = (currentSlide.value + 1) % profileSlides.value.length;
  }
};

const prevSlide = () => {
  if (profileSlides.value.length > 0) {
    currentSlide.value =
      currentSlide.value === 0
        ? profileSlides.value.length - 1
        : currentSlide.value - 1;
  }
};

const goToSlide = (index) => {
  currentSlide.value = index;
};

const startAutoplay = () => {
  if (autoplayInterval) clearInterval(autoplayInterval);
  if (profileSlides.value.length > 1) {
    autoplayInterval = setInterval(() => {
      nextSlide();
    }, 4000); // Auto-slide every 4 seconds
  }
};

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
};

// Responsive items per slide
const updateItemsPerSlide = () => {
  if (typeof window !== "undefined") {
    if (window.innerWidth < 768) {
      itemsPerSlide.value = 1;
    } else if (window.innerWidth < 1024) {
      itemsPerSlide.value = 2;
    } else {
      itemsPerSlide.value = 4;
    }
  }
};

// Pause autoplay on hover
const handleMouseEnter = () => {
  stopAutoplay();
};

const handleMouseLeave = () => {
  startAutoplay();
};

// Lifecycle hooks
onMounted(async () => {
  // Fetch celebrity data first
  await fetchCeleb();
  
  updateItemsPerSlide();
  startAutoplay();

  // Add resize listener for responsive behavior
  if (typeof window !== "undefined") {
    window.addEventListener("resize", updateItemsPerSlide);
  }

  // Add mouse events to the slider container
  const sliderContainer = document.querySelector(".bg-gray-100");
  if (sliderContainer) {
    sliderContainer.addEventListener("mouseenter", handleMouseEnter);
    sliderContainer.addEventListener("mouseleave", handleMouseLeave);
  }
});

onUnmounted(() => {
  stopAutoplay();
  if (typeof window !== "undefined") {
    window.removeEventListener("resize", updateItemsPerSlide);
  }
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}

/* Smooth transitions */
.transition-transform {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hide scrollbar if needed */
.overflow-hidden {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.overflow-hidden::-webkit-scrollbar {
  display: none;
}

/* Loading animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>