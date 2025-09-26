<template>
   <div class="min-h-screen relative overflow-hidden">
    <div class="absolute inset-0">
      <img 
        src="/bg-event2.jpg" 
        alt="Background"
        class="w-full h-full object-cover"
      >
    </div>
    
    <!-- Background Overlay -->
    <div class="absolute inset-0 bg-black/40">
      <div class="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-gray-800/20 to-gray-900/50"></div>
      <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent"></div>
    </div>

    <!-- Header -->
    <div class="relative text-center py-16 z-10">
      <h1 class="text-white text-xl font-light mb-2">Event</h1>
      <h2 class="text-white text-5xl md:text-6xl" style="font-weight: 500;">กิจกรรมที่น่าสนใจ</h2>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="relative text-center py-16 z-10">
      <div class="flex justify-center items-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div v-else class="relative max-w-7xl mx-auto px-6 pb-20 z-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 h-[500px]">
        
        <!-- Main Large Card - Left (Featured Attraction) -->
        <div 
          v-if="featuredAttraction"
          class="md:col-span-1 bg-white rounded-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
        >
          <div class="relative h-[20rem]">
            <img 
              :src="featuredAttraction.cover" 
              :alt="featuredAttraction.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            >
            <div class="absolute top-4 right-4">
              <button 
                @click="handleShareClick(featuredAttraction)"
                class="bg-white/20 backdrop-blur-sm p-2 rounded-md text-white hover:bg-white/30 transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="p-5">
            <p class="text-gray-500 text-sm mb-2" style="font-weight: 400;">{{ featuredAttraction.category }}</p>
            <h3 class="text-base font-bold text-gray-800 mb-4 leading-tight" style="font-weight: 600;">
              {{ featuredAttraction.name }}
            </h3>
            <p v-if="featuredAttraction.content" class="text-sm text-gray-600 mb-4 line-clamp-2">
              {{ featuredAttraction.content }}
            </p>
            <button 
              @click="handleMoreClick(featuredAttraction)"
              class="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
              style="font-weight: 400;"
            >
              More
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Right Column - 2x2 Grid (Other Attractions) -->
        <div class="md:col-span-2 grid grid-cols-2 gap-4">
          
          <div 
            v-for="attraction in regularAttractions" 
            :key="attraction.id"
            class="bg-white rounded-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
          >
            <div class="relative h-[10rem]">
              <img 
                :src="attraction.image" 
                :alt="attraction.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              >
              <!-- Conditional rendering for watermark or share button -->
              <div v-if="attraction.hasWatermark" class="absolute bottom-2 right-2">
                <div class="bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md">
                  <span class="text-white text-xs font-medium">teeID event</span>
                </div>
              </div>
              <div v-else class="absolute top-2 right-2">
                <button 
                  @click="handleShareClick(attraction)"
                  class="bg-white/20 backdrop-blur-sm p-1.5 rounded-md text-white hover:bg-white/30 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="p-3">
              <p class="text-gray-500 text-xs mb-1" style="font-weight: 400;">{{ attraction.category }}</p>
              <h3 class="text-sm font-bold text-gray-800 mb-2 leading-tight" style="font-weight: 600;">
                {{ attraction.name }}
              </h3>
              <!-- <p v-if="attraction.content" class="text-xs text-gray-600 mb-2 line-clamp-2">
                {{ attraction.content }}
              </p> -->
              <button 
                @click="handleMoreClick(attraction)"
                class="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                style="font-weight: 400;"
              >
                More
                <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- No Data State -->
      <div v-if="event.length === 0 && !loading" class="text-center text-white py-16">
        <p>ยังไม่มีข้อมูลสถานที่ท่องเที่ยว</p>
      </div>
    </div>

    <!-- Explore More Button -->
    <div class="relative text-center pb-16 z-10">
        <NuxtLink
        to="/events"
        class="border-2 border-white text-white hover:bg-white hover:text-gray-800 px-12 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm"
      >
        Explore More
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
const { $supabase } = useNuxtApp();
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
// Reactive data
const event = ref([]);
const loading = ref(true);

const fetchevent = async () => {
  try {
    loading.value = true;
    const { data, error } = await $supabase
      .from("event")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching event:", error);
      event.value = [];
    } else {
      event.value = data || [];
      console.log("Fetched event:", data);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    event.value = [];
  } finally {
    loading.value = false;
  }
};

// Computed properties to separate featured and regular attractions from database
const featuredAttraction = computed(() => {
  // เอาสถานที่แรกเป็น featured (หรือใช้เงื่อนไขอื่น เช่น is_featured field)
  return event.value[0] || null;
});

const regularAttractions = computed(() => {
  // เอาสถานที่ที่เหลือเป็น regular cards (สูงสุด 4 แห่ง)
  return event.value.slice(1, 5);
});

// Methods
const handleMoreClick = (attraction) => {
  router.push(`/events/${attraction.id}`);
  // console.log('More clicked for:', attraction.name);
  // Add navigation logic here
  // For example: navigateTo(`/event/${attraction.id}`)
};

const handleShareClick = (attraction) => {
  console.log('Share clicked for:', attraction.name);
  // Add share logic here
  // For example: share attraction URL or open share modal
};

onMounted(async () => {
  await fetchevent();
});
</script>

<style scoped>
/* Water ripple effect (optional enhancement) */
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

.water-ripple::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: ripple 3s infinite;
}

/* Custom hover effects */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

/* Glassmorphism effect for buttons */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Line clamp utility for content truncation */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>