<template>
  <div class="bg-white py-8">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Top Border Line -->
      <div class="border-t-4 border-black mb-8"></div>
      
      <!-- Section Title -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-3xl text-gray-900 font-kanit">เช่า/ซื้อ/ขาย Property</h2>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <div v-for="i in 6" :key="i" class="bg-white border border-gray-200 animate-pulse">
          <div class="w-full h-48 bg-gray-300"></div>
          <div class="p-4">
            <div class="w-3/4 h-6 bg-gray-300 rounded mb-3"></div>
            <div class="w-1/2 h-4 bg-gray-300 rounded mb-3"></div>
            <div class="flex gap-4 mb-4">
              <div class="w-16 h-4 bg-gray-300 rounded"></div>
              <div class="w-16 h-4 bg-gray-300 rounded"></div>
              <div class="w-20 h-4 bg-gray-300 rounded"></div>
            </div>
            <div class="w-24 h-6 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      <!-- Property Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        
        <!-- Dynamic Property Cards -->
        <div 
          v-for="propertyItem in property" 
          :key="propertyItem.id"
          class="bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300 cursor-pointer"
          @click="handlePropertyClick(propertyItem)"
        >
          <div class="relative">
            <img 
              :src="propertyItem.cover" 
              :alt="propertyItem.name"
              class="w-full h-48 object-cover"
            >
            <!-- Status badges -->
            <div class="absolute top-3 left-3 flex gap-2">
              <span 
                class="px-3 py-1 text-xs font-medium bg-black text-white"
              >
                {{ propertyItem.category }}
              </span>
            </div>
            <!-- Price tag -->
            <div class="absolute bottom-3 left-3 bg-white border border-gray-200 px-3 py-1">
              <span class="font-bold text-gray-900">฿{{ formatPrice(propertyItem.price) }}</span>
              <span class="text-gray-600 text-sm">{{ getPriceUnit(propertyItem.category) }}</span>
            </div>
          </div>
          
          <div class="p-4 border-t border-gray-200">
            <h3 class="text-gray-900 mb-3 text-lg font-kanit">{{ propertyItem.name }}</h3>
            <div class="flex items-center text-gray-600 text-sm mb-3">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
              </svg>
              {{ propertyItem.location }}
            </div>
            <div class="flex items-center text-gray-600 text-sm mb-4">
              <div class="flex">
                <span><Icon icon="material-symbols:bed-outline-sharp" width="20" height="20" /></span>
                <span class="mr-6 ml-2">{{ propertyItem.beds }}</span>
              </div>
              <div class="flex">
                <span><Icon icon="material-symbols:bathtub-outline" width="20" height="20" /></span>
                <span class="mr-6 ml-2">{{ propertyItem.bath }}</span>
              </div>
              <div class="flex">
                <span><Icon icon="material-symbols:zoom-out-map" width="20" height="20" /></span>
                <span class="mr-6 ml-2">{{ propertyItem.space }}</span>
              </div>
            </div>
            <!-- <div class="border-t border-gray-200 pt-3">
              <span class="bg-gray-100 text-gray-800 px-3 py-1 text-xs font-medium">{{ getPropertyType(propertyItem.category) }}</span>
            </div> -->
          </div>
          
          <!-- Agent info -->
          <div class="px-4 pb-4 flex items-center justify-between border-t border-gray-100 pt-3">
            <div class="flex items-center">
              <img 
                :src="getAgentAvatar(propertyItem.agent)" 
                :alt="propertyItem.agent"
                class="w-8 h-8 mr-3 rounded-full"
              >
              <span class="text-sm text-gray-700 font-medium">{{ propertyItem.agent }}</span>
            </div>
            <span class="text-xs text-gray-500">{{ formatTimeAgo(propertyItem.created_at) }}</span>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { ref, onMounted, computed } from "vue";

const { $supabase } = useNuxtApp();

// Reactive data
const property = ref([]);
const loading = ref(true);

const fetchproperty = async () => {
  try {
    loading.value = true;
    const { data, error } = await $supabase
      .from("property")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching property:", error);
      property.value = [];
    } else {
      property.value = data || [];
      console.log("Fetched property:", data);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    property.value = [];
  } finally {
    loading.value = false;
  }
};

// Helper functions
const formatPrice = (price) => {
  return new Intl.NumberFormat('th-TH').format(price);
};

const getPriceUnit = (category) => {
  switch (category) {
    case 'FOR RENT':
      return '/เดือน';
    case 'FOR SELL':
      return '';
    default:
      return '';
  }
};

const getPropertyType = (category) => {
  switch (category) {
    case 'FOR RENT':
      return 'FOR RENT';
    case 'FOR SELL':
      return 'FOR SALE';
    default:
      return category;
  }
};

const getAgentAvatar = (agentName) => {
  // Generate a consistent avatar for each agent
  const avatars = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b977?w=40&h=40&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
  ];
  
  // Use agent name to consistently select an avatar
  const index = agentName.length % avatars.length;
  return avatars[index];
};

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds} วินาทีที่แล้ว`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} นาทีที่แล้ว`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ชั่วโมงที่แล้ว`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} วันที่แล้ว`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} เดือนที่แล้ว`;
  
  return `${Math.floor(diffInSeconds / 31536000)} ปีที่แล้ว`;
};

// Methods
const handlePropertyClick = (propertyItem) => {
  console.log('Property clicked:', propertyItem);
  // Navigate to property detail - you can add router navigation here
  // Example: navigateTo(`/property/${propertyItem.id}`)
};

// Lifecycle hooks
onMounted(async () => {
  await fetchproperty();
});
</script>

<style scoped>
/* Custom styles for Thai fonts */
h2, h3 {
  font-family: 'Sarabun', 'Noto Sans Thai', sans-serif;
}

/* Clean hover effects */
.property-card {
  transition: border-color 0.2s ease-in-out;
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