<template>
  <div class="bg-white">
    <Header />
    
    <div class="max-w-7xl mx-auto px-6 py-6">
      <!-- Page Header -->
      <div class="page-header">
        <div class="container">
          <h1 class="page-title">เช่า/ซื้อ/ขายอสังหาริมทรัพย์</h1>
          <p class="page-subtitle">ติดตามอสังหาริมทรัพย์ล่าสุดของเรา</p>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="filter-bar">
        <div class="container">
          <div class="filter-controls">
            <div class="filter-group">
              <label class="filter-label">เรียงตาม:</label>
              <select v-model="sortBy" @change="sortProperties" class="filter-select">
                <option value="newest">ใหม่ล่าสุด</option>
                <option value="oldest">เก่าสุด</option>
                <option value="price-high">ราคาสูงสุด</option>
                <option value="price-low">ราคาต่ำสุด</option>
                <option value="name-az">ชื่อ A-Z</option>
                <option value="name-za">ชื่อ Z-A</option>
              </select>
            </div>
            
            <div class="filter-group">
              <label class="filter-label">ประเภท:</label>
              <select v-model="categoryFilter" @change="filterProperties" class="filter-select">
                <option value="">ทั้งหมด</option>
                <option value="FOR RENT">เช่า</option>
                <option value="FOR SELL">ขาย</option>
              </select>
            </div>

            <div class="filter-group">
              <label class="filter-label">ราคา:</label>
              <select v-model="priceRangeFilter" @change="filterProperties" class="filter-select">
                <option value="">ทุกช่วงราคา</option>
                <option value="0-10000">น้อยกว่า 10,000</option>
                <option value="10000-30000">10,000 - 30,000</option>
                <option value="30000-50000">30,000 - 50,000</option>
                <option value="50000-100000">50,000 - 100,000</option>
                <option value="100000-999999999">มากกว่า 100,000</option>
              </select>
            </div>

            <div class="filter-group search-group">
              <input
                v-model="searchQuery"
                @input="searchProperties"
                type="text"
                placeholder="ค้นหาชื่อ, สถานที่..."
                class="search-input"
              />
              <Icon icon="material-symbols:search" class="search-icon" />
            </div>
          </div>
          
          <!-- Results info -->
          <div class="results-info">
            แสดง {{ filteredProperties.length }} จาก {{ allProperties.length }} รายการ
            <span v-if="hasActiveFilters" class="ml-2">
              <button @click="clearAllFilters" class="text-blue-600 hover:text-blue-800 text-sm underline">
                ล้างตัวกรอง
              </button>
            </span>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner">
          <div class="spinner"></div>
          <p>กำลังโหลดข้อมูลอสังหาริมทรัพย์...</p>
        </div>
      </div>

      <!-- No Results -->
      <div v-else-if="filteredProperties.length === 0" class="no-results">
        <div class="no-results-content">
          <Icon icon="material-symbols:search-off" class="no-results-icon" />
          <h3>ไม่พบข้อมูลที่ค้นหา</h3>
          <p>ลองเปลี่ยนเงื่อนไขการค้นหาหรือล้างตัวกรองทั้งหมด</p>
          <button @click="clearAllFilters" class="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-blue-700">
            ล้างตัวกรอง
          </button>
        </div>
      </div>

      <!-- Property Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 mt-8">
        <!-- Dynamic Property Cards -->
        <div 
          v-for="propertyItem in paginatedProperties" 
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

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="pagination">
        <button 
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="pagination-btn"
        >
          <Icon icon="material-symbols:chevron-left" />
          ก่อนหน้า
        </button>
        
        <div class="pagination-numbers">
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            :class="['pagination-number', { active: page === currentPage }]"
          >
            {{ page }}
          </button>
        </div>
        
        <button 
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="pagination-btn"
        >
          ถัดไป
          <Icon icon="material-symbols:chevron-right" />
        </button>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { ref, onMounted, computed, watch } from "vue";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
const { $supabase } = useNuxtApp();
import { useRoute, useRouter } from "vue-router";
const router = useRouter();

// Reactive data
const allProperties = ref([]);
const loading = ref(true);

// Filter states
const searchQuery = ref('');
const sortBy = ref('newest');
const categoryFilter = ref('');
const priceRangeFilter = ref('');

// Pagination
const currentPage = ref(1);
const itemsPerPage = 9;

// Fetch properties
const fetchProperties = async () => {
  try {
    loading.value = true;
    const { data, error } = await $supabase
      .from("property")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching property:", error);
      allProperties.value = [];
    } else {
      allProperties.value = data || [];
      console.log("Fetched property:", data);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    allProperties.value = [];
  } finally {
    loading.value = false;
  }
};

// Computed properties for filtering
const filteredProperties = computed(() => {
  let filtered = [...allProperties.value];

  // Search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    filtered = filtered.filter(item => 
      item.name.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query) ||
      (item.agent && item.agent.toLowerCase().includes(query))
    );
  }

  // Category filter
  if (categoryFilter.value) {
    filtered = filtered.filter(item => item.category === categoryFilter.value);
  }

  // Price range filter
  if (priceRangeFilter.value) {
    const [min, max] = priceRangeFilter.value.split('-').map(Number);
    filtered = filtered.filter(item => {
      const price = Number(item.price);
      if (max === 999999999) return price >= min; // "มากกว่า" case
      return price >= min && price <= max;
    });
  }

  // Sort
  switch (sortBy.value) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      break;
    case 'oldest':
      filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      break;
    case 'price-high':
      filtered.sort((a, b) => Number(b.price) - Number(a.price));
      break;
    case 'price-low':
      filtered.sort((a, b) => Number(a.price) - Number(b.price));
      break;
    case 'name-az':
      filtered.sort((a, b) => a.name.localeCompare(b.name, 'th'));
      break;
    case 'name-za':
      filtered.sort((a, b) => b.name.localeCompare(a.name, 'th'));
      break;
  }

  return filtered;
});

// Pagination computed properties
const totalPages = computed(() => Math.ceil(filteredProperties.value.length / itemsPerPage));

const paginatedProperties = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProperties.value.slice(start, end);
});

const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;
  
  // Show max 5 page numbers
  let start = Math.max(1, current - 2);
  let end = Math.min(total, current + 2);
  
  // Adjust if we're near the beginning or end
  if (end - start < 4) {
    if (start === 1) {
      end = Math.min(total, start + 4);
    } else {
      start = Math.max(1, end - 4);
    }
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  return pages;
});

const hasActiveFilters = computed(() => {
  return searchQuery.value || categoryFilter.value || priceRangeFilter.value || sortBy.value !== 'newest';
});

// Methods
const sortProperties = () => {
  // Sorting is handled in computed property
  currentPage.value = 1; // Reset to first page
};

const filterProperties = () => {
  // Filtering is handled in computed property
  currentPage.value = 1; // Reset to first page
};

const searchProperties = () => {
  // Search is handled in computed property with debouncing
  currentPage.value = 1; // Reset to first page
};

const clearAllFilters = () => {
  searchQuery.value = '';
  sortBy.value = 'newest';
  categoryFilter.value = '';
  priceRangeFilter.value = '';
  currentPage.value = 1;
};

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

const getAgentAvatar = (agentName) => {
  const avatars = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b977?w=40&h=40&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
  ];
  
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

const handlePropertyClick = (propertyItem) => {
  // console.log('Property clicked:', propertyItem);
    router.push(`/property/${propertyItem.id}`);
  // Navigate to property detail
  // Example: navigateTo(`/property/${propertyItem.id}`)
};

// Watch for filter changes to reset pagination
watch([searchQuery, categoryFilter, priceRangeFilter, sortBy], () => {
  currentPage.value = 1;
});

// Lifecycle hooks
onMounted(async () => {
  await fetchProperties();
});
</script>

<style scoped>
/* Custom styles for Thai fonts */
h2, h3 {
  font-family: 'Sarabun', 'Noto Sans Thai', sans-serif;
}

.news-list-page {
  min-height: 100vh;
  background: #f8fafc;
  font-family: "Kanit", "Sarabun", "Noto Sans Thai", sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Page Header */
.page-header {
  color: #000;
  padding: 4rem 2rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
}

.page-subtitle {
  font-size: 1.1rem;
  text-align: center;
  opacity: 0.9;
}

/* Filter Bar */
.filter-bar {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 1.5rem 0;
  position: sticky;
  top: 0px;
  z-index: 40;
}

.filter-controls {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-label {
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
}

.filter-select {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  background: white;
  min-width: 120px;
  cursor: pointer;
}

.filter-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-group {
  position: relative;
  margin-left: auto;
}

.search-input {
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  min-width: 250px;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #9ca3af;
}

.results-info {
  color: #6b7280;
  font-size: 0.875rem;
}

/* Loading */
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.loading-spinner {
  text-align: center;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* No Results */
.no-results {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.no-results-content {
  text-align: center;
  color: #6b7280;
}

.no-results-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 1rem;
  opacity: 0.5;
}

/* Pagination */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 8px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #667eea;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-numbers {
  display: flex;
  gap: 0.25rem;
}

.pagination-number {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 8px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-number:hover {
  background: #f9fafb;
  border-color: #667eea;
}

.pagination-number.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

/* Responsive */
@media (max-width: 768px) {
  .filter-controls {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .search-group {
    margin-left: 0;
  }

  .search-input {
    min-width: auto;
    width: 100%;
  }

  .page-title {
    font-size: 2rem;
  }

  .pagination {
    flex-wrap: wrap;
  }
}
</style>