<template>
  <div class="bg-white py-8">
    <div class="max-w-7xl mx-auto px-6">
  <!-- Top Border Line -->
      <div class="border-t-4 border-black mb-8"></div>
      
      <!-- Section Title -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-3xl text-gray-900 font-kanit">เช่า/ซื้อ/ขาย Property</h2>
      </div>

      <!-- Property Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        
        <!-- Dynamic Property Cards -->
        <div 
          v-for="property in properties" 
          :key="property.id"
          class="bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300 cursor-pointer"
          @click="handlePropertyClick(property)"
        >
          <div class="relative">
            <img 
              :src="property.image" 
              :alt="property.title"
              class="w-full h-48 object-cover"
            >
            <!-- Status badges -->
            <div class="absolute top-3 left-3 flex gap-2">
              <span 
                v-for="badge in property.badges" 
                :key="badge"
                class="px-3 py-1 text-xs font-medium"
                :class="badge === 'BEST SELLER' ? 'bg-gray-800 text-white' : 'bg-black text-white'"
              >
                {{ badge }}
              </span>
            </div>
            <!-- Price tag -->
            <div class="absolute bottom-3 left-3 bg-white border border-gray-200 px-3 py-1">
              <span class="font-bold text-gray-900">฿{{ property.price.toLocaleString() }}</span>
              <span class="text-gray-600 text-sm">{{ property.priceUnit }}</span>
            </div>
          </div>
          
          <div class="p-4 border-t border-gray-200">
            <h3 class="text-gray-900 mb-3 text-lg font-kanit">{{ property.title }}</h3>
            <div class="flex items-center text-gray-600 text-sm mb-3">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
              </svg>
              {{ property.location }}
            </div>
            <div class="flex items-center text-gray-600 text-sm mb-4">
              <div class="flex">
                <span>  <Icon icon="material-symbols:bed-outline-sharp" width="20" height="20" /></span>
                <span class="mr-6 ml-2"> {{ property.bedrooms }}</span>
              </div>
                <div class="flex">
                <span>  <Icon icon="material-symbols:bathtub-outline" width="20" height="20" /></span>
                 <span class="mr-6 ml-2"> {{ property.bathrooms }}</span>
              </div>
              <div class="flex">
                <span>  <Icon icon="material-symbols:zoom-out-map" width="20" height="20" /></span>
                 <span class="mr-6 ml-2"> {{ property.area.toLocaleString() }} sq.ft</span>
              </div>
              <!-- <span class="mr-6">🏠 {{ property.floors }}</span> -->
             
            </div>
            <div class="border-t border-gray-200 pt-3">
              <span class="bg-gray-100 text-gray-800 px-3 py-1 text-xs font-medium">{{ property.type }}</span>
            </div>
          </div>
          
          <!-- Agent info -->
          <div class="px-4 pb-4 flex items-center justify-between border-t border-gray-100 pt-3">
            <div class="flex items-center">
              <img 
                :src="property.agent.avatar" 
                :alt="property.agent.name"
                class="w-8 h-8 mr-3 rounded-full"
              >
              <span class="text-sm text-gray-700 font-medium">{{ property.agent.name }}</span>
            </div>
            <span class="text-xs text-gray-500">{{ property.agent.postedTime }}</span>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
// Property data structure
const properties = ref([
  {
    id: 1,
    title: 'คอนโดริเวอร์ ไก่ดีน อพาร์ทเม้นต์',
    price: 4500,
    priceUnit: '/เดือน',
    location: '113 sq.ft. • 6 minutes drive from ห้างโรบินสัน',
    bedrooms: 1,
    bathrooms: 1,
    floors: 1,
    area: 800,
    type: 'APARTMENT',
    status: 'FOR SALE',
    badges: ['FOR SALE'],
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop',
    agent: {
      name: 'Agent',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      postedTime: '6 hours ago'
    }
  },
  {
    id: 2,
    title: 'คอนโดริเวอร์ ไก่ดีน อพาร์ทเม้นต์',
    price: 4500,
    priceUnit: '/เดือน',
    location: '113 sq.ft. • 6 minutes drive from ห้างโรบินสัน',
    bedrooms: 1,
    bathrooms: 1,
    floors: 1,
    area: 600,
    type: 'APARTMENT',
    status: 'FOR SALE',
    badges: ['FOR SALE', 'BEST SELLER'],
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=250&fit=crop',
    agent: {
      name: 'Agent',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      postedTime: '5 years ago'
    }
  },
  {
    id: 3,
    title: 'คอนโดริเวอร์ ไก่ดีน อพาร์ทเม้นต์',
    price: 4500,
    priceUnit: '/เดือน',
    location: '113 sq.ft. • 6 minutes drive from ห้างโรบินสัน',
    bedrooms: 1,
    bathrooms: 1,
    floors: 1,
    area: 1800,
    type: 'APARTMENT',
    status: 'FOR SALE',
    badges: ['FOR SALE'],
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=250&fit=crop',
    agent: {
      name: 'Agent',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b977?w=40&h=40&fit=crop&crop=face',
      postedTime: '5 years ago'
    }
  },
  {
    id: 4,
    title: 'คอนโดริเวอร์ ไก่ดีน อพาร์ทเม้นต์',
    price: 4500,
    priceUnit: '/เดือน',
    location: '113 sq.ft. • 6 minutes drive from ห้างโรบินสัน',
    bedrooms: 3,
    bathrooms: 1,
    floors: 2,
    area: 2500,
    type: 'APARTMENT',
    status: 'FOR SALE',
    badges: ['FOR SALE'],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=250&fit=crop',
    agent: {
      name: 'Agent',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      postedTime: '2 weeks ago'
    }
  },
  {
    id: 5,
    title: 'คอนโดริเวอร์ ไก่ดีน อพาร์ทเม้นต์',
    price: 4500,
    priceUnit: '/เดือน',
    location: '113 sq.ft. • 6 minutes drive from ห้างโรบินสัน',
    bedrooms: 2,
    bathrooms: 1,
    floors: 2,
    area: 1200,
    type: 'APARTMENT',
    status: 'FOR SALE',
    badges: ['FOR SALE'],
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=250&fit=crop',
    agent: {
      name: 'Agent',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      postedTime: '4 months ago'
    }
  },
  {
    id: 6,
    title: 'คอนโดริเวอร์ ไก่ดีน อพาร์ทเม้นต์',
    price: 4500,
    priceUnit: '/เดือน',
    location: '113 sq.ft. • 6 minutes drive from ห้างโรบินสัน',
    bedrooms: 1,
    bathrooms: 1,
    floors: 1,
    area: 850,
    type: 'APARTMENT',
    status: 'FOR SALE',
    badges: ['FOR SALE', 'BEST SELLER'],
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=250&fit=crop',
    agent: {
      name: 'Agent',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b977?w=40&h=40&fit=crop&crop=face',
      postedTime: '3 days ago'
    }
  }
])

// Methods
const handlePropertyClick = (property) => {
  console.log('Property clicked:', property)
  // Navigate to property detail
}

const handleNextPage = () => {
  console.log('Next page clicked')
  // Pagination logic
}
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
</style>