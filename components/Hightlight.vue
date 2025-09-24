<template>
  <section class="py-16 max-w-7xl mx-auto">
    <!-- Section Header -->
    <div class="flex items-center gap-3 mb-12">
      <h2 class="text-4xl font-medium text-black" style="font-weight: 600;">What's New</h2>
      <div class="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
    </div>

    <!-- Grid Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Featured Article (Left) -->
      <div class="lg:col-span-2">
        <article class="group cursor-pointer h-full">
          <div class="relative h-[448px] overflow-hidden bg-gray-100">
            <img 
              :src="mainArticle.image" 
              :alt="mainArticle.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            >
            <!-- Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            <!-- Category Badge -->
            <span class="absolute top-6 left-6 bg-blue-500 text-white px-3 py-1.5 text-sm font-medium tracking-wide">
              {{ mainArticle.category }}
            </span>
            
            <!-- Content -->
            <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 class="text-3xl  mb-4 leading-tight font-kanit" style="font-weight: 600;">
                {{ mainArticle.title }}
              </h3>
              <div class="flex items-center gap-6 text-sm opacity-90">
                <span>BY <strong>{{ mainArticle.author }}</strong></span>
                <span>{{ mainArticle.date }}</span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- Sidebar Articles (Right) -->
      <div class="space-y-8">
        <article 
          v-for="article in sidebarArticles" 
          :key="article.id"
          class="group cursor-pointer flex gap-4"
        >
          <!-- Image -->
          <div class="relative w-32 h-32 flex-shrink-0 overflow-hidden bg-gray-100">
            <img 
              :src="article.image" 
              :alt="article.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            >
          </div>
          
          <!-- Content -->
          <div class="flex-1 flex flex-col">
            <!-- Category Badge -->
            <div class="mb-3">
              <span 
                class="px-3 py-1 text-xs font-medium text-white tracking-wide"
                :class="getCategoryColor(article.category)"
              >
                {{ article.category }}
              </span>
            </div>
            
            <!-- Title -->
            <h4 style="font-weight: 600;" class="text-md font-bold text-black mb-4 leading-tight group-hover:text-gray-700 transition-colors flex-1">
              {{ article.title }}
            </h4>
            
            <!-- Meta -->
            <div class="flex items-center gap-4 text-sm text-gray-500 mt-auto">
              <span>BY <strong class="text-black">{{ article.author }}</strong></span>
              <span>{{ article.date }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
// Sample data
const mainArticle = ref({
  id: 1,
  title: 'เจริญก้าวไม่รอแล้วนะ! "ขอนแก่นไม่เดล" ไม่รองบริษุเตรียมสร้างรถไฟฟ้าราง​เบา',
  category: 'NEWS',
  author: 'ADMIN',
  date: 'DECEMBER 9, 2025',
  image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
})

const sidebarArticles = ref([
  {
    id: 2,
    title: 'เจริญก้าวไม่รอแล้วนะ! "ขอนแก่นไม่เดล" ไม่รองบริษุเตรียมสร้างรถไฟฟ้าราง​เบา',
    category: 'NEWS',
    author: 'ADMIN',
    date: 'DECEMBER 9, 2025',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 3,
    title: 'เจริญก้าวไม่รอแล้วนะ! "ขอนแก่นไม่เดล" ไม่รองบริษุเตรียมสร้างรถไฟฟ้าราง​เบา',
    category: 'EVENT',
    author: 'ADMIN',
    date: 'DECEMBER 9, 2025',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 4,
    title: 'เจริญก้าวไม่รอแล้วนะ! "ขอนแก่นไม่เดล" ไม่รองบริษุเตรียมสร้างรถไฟฟ้าราง​เบา',
    category: 'NEWS',
    author: 'ADMIN',
    date: 'DECEMBER 9, 2025',
    image: 'https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  }
])

// Get category badge color
const getCategoryColor = (category) => {
  const colors = {
    'NEWS': 'bg-blue-500',
    'EVENT': 'bg-orange-500',
    'POLITICS': 'bg-red-500',
    'SPORTS': 'bg-green-500'
  }
  return colors[category] || 'bg-gray-500'
}
</script>

<style scoped>
/* Custom styles for smooth animations */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Ensure consistent image aspect ratios */
img {
  object-position: center;
}

/* Typography improvements */
h2, h3, h4 {
  font-weight: 700;
  letter-spacing: -0.025em;
}

/* Hover state improvements */
.group:hover img {
  transform: scale(1.05);
}

.group:hover h4 {
  color: #374151;
}
</style>