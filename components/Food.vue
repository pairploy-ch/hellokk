<template>
  <div class="bg-white py-12">
    <!-- Header -->
    <div class="max-w-7xl mx-auto px-6">
      <!-- Top Border Line -->
      <div class="border-t-4 border-black mb-8"></div>
      
      <!-- Section Title -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-3xl text-gray-900 font-kanit">ร้านอาหารอร่อย</h2>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>

      <!-- Content -->
      <div v-else>
        <!-- Main Grid - Featured Restaurants -->
        <div v-if="featuredRestaurants.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div 
            v-for="restaurant in featuredRestaurants" 
            :key="restaurant.id"
            class="group cursor-pointer"
            @click="handleRestaurantClick(restaurant)"
          >
            <div class="relative overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img 
                :src="restaurant.image" 
                :alt="restaurant.name"
                class="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              >
            </div>
            <div class="mt-4">
              <p class="text-sm text-gray-500 mb-2">{{ restaurant.category }}</p>
              <h3 class="text-xl font-bold text-gray-900 font-kanit" style="font-weight: 600;">{{ restaurant.name }}</h3>
              <p v-if="restaurant.content" class="text-sm text-gray-600 mt-2 line-clamp-3">{{ restaurant.content }}</p>
            </div>
          </div>
        </div>

        <!-- Bottom Grid - Regular Restaurant Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="restaurant in regularRestaurants" 
            :key="restaurant.id"
            class="group cursor-pointer"
            @click="handleRestaurantClick(restaurant)"
          >
            <div class="relative overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img 
                :src="restaurant.image" 
                :alt="restaurant.name"
                class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              >
              <!-- Badge for special restaurants -->
              <div v-if="restaurant.badge" class="absolute bottom-3 left-3">
                <div class="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                  {{ restaurant.badge }}
                </div>
              </div>
            </div>
            <div class="mt-3">
              <p class="text-xs text-gray-500 mb-1">{{ restaurant.category }}</p>
              <h3 class="text-sm font-bold text-gray-900 leading-tight font-kanit" style="font-weight: 600;">
                {{ restaurant.name }}
              </h3>
              <p v-if="restaurant.content" class="text-xs text-gray-600 mt-1 line-clamp-2">{{ restaurant.content }}</p>
            </div>
          </div>
        </div>

        <!-- No Data State -->
        <div v-if="foods.length === 0" class="text-center py-12">
          <p class="text-gray-500">ยังไม่มีข้อมูลร้านอาหาร</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
const { $supabase } = useNuxtApp();

// Reactive data
const foods = ref([]);
const loading = ref(true);

const fetchfoods = async () => {
  try {
    loading.value = true;
    const { data, error } = await $supabase
      .from("foods")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching foods:", error);
      foods.value = [];
    } else {
      foods.value = data || [];
      console.log("Fetched foods:", data);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    foods.value = [];
  } finally {
    loading.value = false;
  }
};

// Computed properties to filter restaurants from database
const featuredRestaurants = computed(() => {
  // แสดงร้านแรก 2 ร้านเป็น featured (หรือใช้เงื่อนไขอื่น เช่น is_featured field)
  return foods.value.slice(0, 2);
});

const regularRestaurants = computed(() => {
  // แสดงร้านที่เหลือเป็น regular cards
  return foods.value.slice(2);
});

// Methods for handling clicks
const handleRestaurantClick = (restaurant) => {
  console.log('Restaurant clicked:', restaurant);
  // Add navigation logic here
  // เช่น navigateTo(`/restaurant/${restaurant.id}`)
};

onMounted(async () => {
  await fetchfoods();
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