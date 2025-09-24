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

      <!-- Main Grid - Featured Restaurants -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        
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
          <div class="relative overflow-hidden  shadow-md hover:shadow-lg transition-shadow duration-300">
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
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
// Restaurant data structure
const restaurants = ref([
  {
    id: 1,
    category: 'อาหารไทย',
    name: 'ร้านอาหาร ขอบแก้น มีเมลน ไก่ดี',
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&h=500&fit=crop',
    featured: true
  },
  {
    id: 2,
    category: 'อาหารไทย', 
    name: 'ร้านอาหาร ขอบแก้น มีเมลน ไก่ดี',
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&h=500&fit=crop',
    featured: true
  },
  {
    id: 3,
    category: 'อาหารไทย',
    name: 'เจริญก่อนไปร่องแล้วปะ! "ขอบแก้น ไก่เดส" ไปร่องบริงเดรียมสร้างรถ ใฝ่ฝ่าราชนา',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    category: 'อาหารไทย',
    name: 'เจริญก่อนไปร่องแล้วปะ! "ขอบแก้น ไก่เดส" ไปร่องบริงเดรียมสร้างรถ ใฝ่ฝ่าราชนา',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
    badge: 'Gourmet'
  },
  {
    id: 5,
    category: 'อาหารไทย',
    name: 'เจริญก่อนไปร่องแล้วปะ! "ขอบแก้น ไก่เดส" ไปร่องบริงเดรียมสร้างรถ ใฝ่ฝ่าราชนา',
    image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    category: 'อาหารไทย',
    name: 'เจริญก่อนไปร่องแล้วปะ! "ขอบแก้น ไก่เดส" ไปร่องบริงเดรียมสร้างรถ ใฝ่ฝ่าราชนา',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop'
  }
])

// Computed properties to filter restaurants
const featuredRestaurants = computed(() => {
  return restaurants.value.filter(restaurant => restaurant.featured)
})

const regularRestaurants = computed(() => {
  return restaurants.value.filter(restaurant => !restaurant.featured)
})

// Methods for handling clicks
const handleRestaurantClick = (restaurant) => {
  console.log('Restaurant clicked:', restaurant)
  // Add navigation logic here
}
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
</style>