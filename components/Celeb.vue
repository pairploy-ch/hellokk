<template>
  <div class="max-w-7xl mx-auto py-12 bg-white">
    <div class="">
      <!-- Header -->
      <div class="mb-8">
        <h2 class="text-3xl text-black flex items-center gap-2">
          Proud to be Khon Kaen
          <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
        </h2>
      </div>

      <!-- Slider Container -->
      <div class="bg-gray-100 p-6 pt-8 relative overflow-hidden">
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
                  <div class="flex">
                    <div class="w-20 h-20 rounded-full overflow-hidden mb-4">
                      <img
                        :src="profile.image"
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
                      <NuxtLink
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
                      </NuxtLink>
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
// Profile data - you can expand this with more profiles
const allProfiles = ref([
  {
    id: 1,
    name: "ณนตนั กฎีชิจะ",
    category: "ดารา/นักแสดง",
    image:
      "https://pbs.twimg.com/profile_images/1115320085709611009/pZXpW18L_400x400.jpg",
    slug: "nontana-kadeecha",
  },
  {
    id: 2,
    name: "ศุกลวัฒน์ คนบารร",
    category: "ดารา/นักแสดง",
    image:
      "https://pbs.twimg.com/profile_images/1115320085709611009/pZXpW18L_400x400.jpg",
    slug: "sukolwat-kanbara",
  },
  {
    id: 3,
    name: "อฮบrjun hi end",
    category: "Content creator",
    image:
      "https://pbs.twimg.com/profile_images/1115320085709611009/pZXpW18L_400x400.jpg",
    slug: "ahrbjun-hi-end",
  },
  {
    id: 4,
    name: "เชฟไผตาล",
    category: "เชฟ",
    image:
      "https://pbs.twimg.com/profile_images/1115320085709611009/pZXpW18L_400x400.jpg",
    slug: "chef-paitaal",
  },
  {
    id: 5,
    name: "นักร้องคนที่ 1",
    category: "นักร้อง",
    image:
      "https://pbs.twimg.com/profile_images/1115320085709611009/pZXpW18L_400x400.jpg",
    slug: "singer-1",
  },
  {
    id: 6,
    name: "นักกีฬาคนที่ 1",
    category: "นักกีฬา",
    image:
      "https://pbs.twimg.com/profile_images/1115320085709611009/pZXpW18L_400x400.jpg",
    slug: "athlete-1",
  },
  {
    id: 7,
    name: "ศิลปินคนที่ 1",
    category: "ศิลปิน",
    image:
      "https://pbs.twimg.com/profile_images/1115320085709611009/pZXpW18L_400x400.jpg",
    slug: "artist-1",
  },
  {
    id: 8,
    name: "นักธุรกิจคนที่ 1",
    category: "นักธุรกิจ",
    image:
      "https://pbs.twimg.com/profile_images/1115320085709611009/pZXpW18L_400x400.jpg",
    slug: "businessman-1",
  },
]);

// Slider state
const currentSlide = ref(0);
const itemsPerSlide = ref(4);

// Auto-play interval
let autoplayInterval = null;

// Split profiles into slides (4 profiles per slide)
const profileSlides = computed(() => {
  const slides = [];
  for (let i = 0; i < allProfiles.value.length; i += itemsPerSlide.value) {
    slides.push(allProfiles.value.slice(i, i + itemsPerSlide.value));
  }
  return slides;
});

// Slider methods
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % profileSlides.value.length;
};

const prevSlide = () => {
  currentSlide.value =
    currentSlide.value === 0
      ? profileSlides.value.length - 1
      : currentSlide.value - 1;
};

const goToSlide = (index) => {
  currentSlide.value = index;
};

const startAutoplay = () => {
  if (autoplayInterval) clearInterval(autoplayInterval);
  autoplayInterval = setInterval(() => {
    nextSlide();
  }, 4000); // Auto-slide every 4 seconds
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

// Lifecycle hooks
onMounted(() => {
  updateItemsPerSlide();
  startAutoplay();

  // Add resize listener for responsive behavior
  if (typeof window !== "undefined") {
    window.addEventListener("resize", updateItemsPerSlide);
  }
});

onUnmounted(() => {
  stopAutoplay();
  if (typeof window !== "undefined") {
    window.removeEventListener("resize", updateItemsPerSlide);
  }
});

// Pause autoplay on hover
const handleMouseEnter = () => {
  stopAutoplay();
};

const handleMouseLeave = () => {
  startAutoplay();
};

// Add mouse events to the slider container
onMounted(() => {
  const sliderContainer = document.querySelector(".bg-gray-100");
  if (sliderContainer) {
    sliderContainer.addEventListener("mouseenter", handleMouseEnter);
    sliderContainer.addEventListener("mouseleave", handleMouseLeave);
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
</style>
