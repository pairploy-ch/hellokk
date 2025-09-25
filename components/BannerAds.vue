<template>
  <div class="max-w-7xl mx-auto py-12">
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
    
    <div v-else-if="bannerAd" class="w-full">
      <a v-if="bannerAd.link" :href="bannerAd.link" target="_blank" rel="noopener noreferrer">
        <img
          :src="bannerAd.image"
          :alt="bannerAd.name"
          class="w-full h-full object-cover rounded-lg hover:opacity-90 transition-opacity duration-300"
        >
      </a>
      <img
        v-else
        :src="bannerAd.image"
        :alt="bannerAd.name"
        class="w-full h-full object-cover rounded-lg"
      >
    </div>
    
    <!-- Fallback -->
    <div v-else class="w-full">
      <img
        :src="defaultSlide.image"
        :alt="defaultSlide.name"
        class="w-full h-full object-cover rounded-lg"
      >
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
const { $supabase } = useNuxtApp();

const props = defineProps({
  
  isFirst: { type: Boolean, default: true },
})

const bannerAd = ref(null) // เปลี่ยนจาก bannerAds เป็น bannerAd (singular)
const loading = ref(true)

const fetchBannerAds = async () => {
  try {
    loading.value = true
    const { data, error } = await $supabase
      .from('bannerads')
      .select('*')
      .eq("is_main", false)
      .eq("is_first",  props.isFirst)
      .order('created_at', { ascending: false })
      .limit(1)
     
    if (error) {
      console.error('Error fetching banner ads:', error)
      bannerAd.value = null
    } else {
      bannerAd.value = data?.[0] || null
      console.log('Fetched banner ad:', data?.[0])
    }
  } catch (err) {
    console.error('Unexpected error:', err)
    bannerAd.value = null
  } finally {
    loading.value = false
  }
}

// Default slide data (fallback)
const defaultSlide = {
  id: 'default-1',
  name: 'Welcome',
  image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  link: '/'
}

onMounted(async () => {
  await fetchBannerAds()
})
</script>