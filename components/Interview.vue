<template>
  <div class="bg-white py-12">
    <!-- Header -->
    <div class="max-w-7xl mx-auto px-6">
      <!-- Top Border Line -->
      <div class="border-t-4 border-black mb-8"></div>
      
      <!-- Section Title -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-3xl text-gray-900 font-kanit">สัมภาษณ์จากคนรักขอนแก่น</h2>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>

      <!-- Content -->
      <div v-else>
        <!-- Main Grid - Featured Interviews -->
        <div v-if="featuredInterviews.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div 
            v-for="interviewItem in featuredInterviews" 
            :key="interviewItem.id"
            class="group cursor-pointer"
            @click="handleInterviewClick(interviewItem)"
          >
            <div class="relative overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <video 
                :src="interviewItem.image" 
                :alt="interviewItem.name"
                class="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                controls
                muted 
                loop
                playsinline
              ></video>
            </div>
            <div class="mt-4">
              <p class="text-sm text-gray-500 mb-2">{{ interviewItem.category }}</p>
              <h3 class="text-xl font-bold text-gray-900 font-kanit" style="font-weight: 600;">{{ interviewItem.name }}</h3>
              <p v-if="interviewItem.content" class="text-sm text-gray-600 mt-2 line-clamp-3">{{ interviewItem.content }}</p>
            </div>
          </div>
        </div>

        <!-- Bottom Grid - Regular Interview Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="interviewItem in regularInterviews" 
            :key="interviewItem.id"
            class="group cursor-pointer"
            @click="handleInterviewClick(interviewItem)"
          >
            <div class="relative overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <video 
                :src="interviewItem.image" 
                :alt="interviewItem.name"
                class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                controls
                muted 
                loop
                playsinline
              ></video>
              <!-- Badge for special interviews -->
              <div v-if="interviewItem.badge" class="absolute bottom-3 left-3">
                <div class="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                  {{ interviewItem.badge }}
                </div>
              </div>
            </div>
            <div class="mt-3">
              <p class="text-xs text-gray-500 mb-1">{{ interviewItem.category }}</p>
              <h3 class="text-sm font-bold text-gray-900 leading-tight font-kanit" style="font-weight: 600;">
                {{ interviewItem.name }}
              </h3>
              <p v-if="interviewItem.content" class="text-xs text-gray-600 mt-1 line-clamp-2">{{ interviewItem.content }}</p>
            </div>
          </div>
        </div>

        <!-- No Data State -->
        <div v-if="interview.length === 0" class="text-center py-12">
          <p class="text-gray-500">ยังไม่มีข้อมูลการสัมภาษณ์</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
const { $supabase } = useNuxtApp();

const interview = ref([]);
const loading = ref(true);

const fetchinterview = async () => {
  try {
    loading.value = true;
    const { data, error } = await $supabase
      .from("interview")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching interview:", error);
      interview.value = [];
    } else {
      interview.value = data || [];
      console.log("Fetched interview:", data);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    interview.value = [];
  } finally {
    loading.value = false;
  }
};

// Computed properties to filter interviews from database
const featuredInterviews = computed(() => {
  // แสดงการสัมภาษณ์ 2 อันแรกเป็น featured (หรือใช้เงื่อนไขอื่น เช่น is_featured field)
  return interview.value.slice(0, 2);
});

const regularInterviews = computed(() => {
  // แสดงการสัมภาษณ์ที่เหลือเป็น regular cards
  return interview.value.slice(2);
});

// Methods for handling clicks
const handleInterviewClick = (interviewItem) => {
  console.log('Interview clicked:', interviewItem);
  // Add navigation logic here
  // เช่น navigateTo(`/interview/${interviewItem.id}`)
};

onMounted(async () => {
  await fetchinterview();
});
</script>

<style scoped>
/* Additional custom styles if needed */
.restaurant-card {
  transition: all 0.3s ease;
}

.restaurant-card:hover {
  transform: translateY(-4px);
}

/* Thai font optimization */
h2, h3 {
  font-family: 'Sarabun', 'Noto Sans Thai', sans-serif;
}

/* Line clamp utility for content truncation */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>