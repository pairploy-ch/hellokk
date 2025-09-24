<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <div class="bg-white border-b border-gray-300 sticky top-0 z-50">
      <div class="flex items-center justify-between px-6 py-4">
        <div class="flex items-center space-x-4">
          <div class="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">N</span>
          </div>
          <h1 class="text-xl font-bold text-gray-900">News Admin</h1>
        </div>
        
        <div class="flex items-center space-x-4">
          <div class="relative">
            <Icon name="lucide:search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="ค้นหาข่าว..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
          <button class="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Icon name="lucide:bell" class="w-5 h-5" />
            <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          <button class="flex items-center space-x-2 p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Icon name="lucide:user" class="w-5 h-5" />
            <span class="text-sm font-medium">Admin</span>
          </button>
        </div>
      </div>
    </div>

    <div class="flex">
      <!-- Sidebar -->
      <div class="w-64 bg-white min-h-screen border-r border-gray-300">
        <div class="p-6">
          <nav class="space-y-2">
            <div class="bg-gray-900 text-white px-4 py-3 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
                  <span class="text-xs font-bold">📰</span>
                </div>
                <span class="font-medium">รายการข่าว</span>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex-1 p-6">
        <div class="bg-white rounded-xl shadow-lg border border-gray-200">
          <!-- Header Actions -->
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold text-gray-900">รายการข่าว</h2>
              <div class="flex items-center space-x-3">
                <select 
                  v-model="filterStatus"
                  class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
                >
                  <option value="all">ทั้งหมด</option>
                  <option value="published">เผยแพร่แล้ว</option>
                  <option value="draft">แบบร่าง</option>
                  <option value="scheduled">กำหนดการ</option>
                </select>
                <button class="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Icon name="lucide:download" class="w-4 h-4" />
                  <span>Export</span>
                </button>
                <button 
                  @click="showAddModal = true"
                  class="flex items-center space-x-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  <Icon name="lucide:plus" class="w-4 h-4" />
                  <span>เพิ่มข่าวใหม่</span>
                </button>
              </div>
            </div>
          </div>

          <!-- News Table -->
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ข่าว
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    หมวดหมู่
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    สถานะ
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ผู้เขียน
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    วันที่เผยแพร่
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    การดู
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    การจัดการ
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr 
                  v-for="news in filteredNews" 
                  :key="news.id" 
                  class="hover:bg-gray-50 transition-colors"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center space-x-3">
                      <div class="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                        <span class="text-white text-xs font-bold">📰</span>
                      </div>
                      <div>
                        <div class="text-sm font-medium text-gray-900 max-w-xs truncate">
                          {{ news.title }}
                        </div>
                        <div class="text-sm text-gray-500">ID: {{ news.id }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      {{ news.category }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      :class="getStatusColor(news.status)"
                      class="px-3 py-1 text-xs font-medium rounded-full"
                    >
                      {{ news.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {{ news.author }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {{ formatDate(news.publishDate) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {{ news.views.toLocaleString() }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex items-center space-x-2">
                      <button 
                        @click="viewNews(news)"
                        class="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <Icon name="lucide:eye" class="w-4 h-4" />
                      </button>
                      <button 
                        @click="editNews(news)"
                        class="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                      >
                        <Icon name="lucide:edit" class="w-4 h-4" />
                      </button>
                      <button 
                        @click="deleteNews(news.id)"
                        class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Icon name="lucide:trash-2" class="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div class="text-sm text-gray-600">
              แสดง {{ (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(currentPage * itemsPerPage, filteredNews.length) }} 
              จาก {{ filteredNews.length }} รายการ
            </div>
            <div class="flex items-center space-x-2">
              <button 
                @click="previousPage"
                :disabled="currentPage === 1"
                class="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
              >
                ก่อนหน้า
              </button>
              <button 
                v-for="page in totalPages" 
                :key="page"
                @click="currentPage = page"
                :class="[
                  'px-3 py-1 text-sm rounded',
                  currentPage === page 
                    ? 'bg-black text-white' 
                    : 'text-gray-600 border border-gray-300 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
              <button 
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
              >
                ถัดไป
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add News Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-bold mb-4">เพิ่มข่าวใหม่</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">หัวข้อข่าว</label>
            <input 
              v-model="newNews.title"
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">หมวดหมู่</label>
            <select 
              v-model="newNews.category"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
            >
              <option value="">เลือกหมวดหมู่</option>
              <option value="Technology">Technology</option>
              <option value="Economy">Economy</option>
              <option value="Health">Health</option>
              <option value="Environment">Environment</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">ผู้เขียน</label>
            <input 
              v-model="newNews.author"
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
            />
          </div>
        </div>
        <div class="flex justify-end space-x-3 mt-6">
          <button 
            @click="showAddModal = false"
            class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            ยกเลิก
          </button>
          <button 
            @click="addNews"
            class="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            เพิ่มข่าว
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Meta tags
useHead({
  title: 'News Admin Panel'
})

// Reactive data
const searchQuery = ref('')
const filterStatus = ref('all')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const showAddModal = ref(false)

const newNews = ref({
  title: '',
  category: '',
  author: ''
})

// Sample news data
const newsData = ref([
  {
    id: 'n001',
    title: 'เทคโนโลยี AI เปลี่ยนโลกการศึกษา',
    category: 'Technology',
    status: 'Published',
    author: 'John Doe',
    publishDate: '2023-12-15',
    views: 1250
  },
  {
    id: 'n002', 
    title: 'การพัฒนาเศรษฐกิจดิจิทัลในไทย',
    category: 'Economy',
    status: 'Draft',
    author: 'Jane Smith',
    publishDate: '2023-12-14',
    views: 0
  },
  {
    id: 'n003',
    title: 'นวัตกรรมการแพทย์สมัยใหม่',
    category: 'Health',
    status: 'Published',
    author: 'Mike Johnson',
    publishDate: '2023-12-13',
    views: 890
  },
  {
    id: 'n004',
    title: 'ความยั่งยืนสิ่งแวดล้อม',
    category: 'Environment',
    status: 'Scheduled',
    author: 'Sarah Wilson',
    publishDate: '2023-12-20',
    views: 0
  },
  {
    id: 'n005',
    title: 'การเปลี่ยนแปลงสภาพภูมิอากาศ',
    category: 'Environment',
    status: 'Published',
    author: 'David Brown',
    publishDate: '2023-12-12',
    views: 2150
  }
])

// Computed properties
const filteredNews = computed(() => {
  let filtered = newsData.value

  // Filter by status
  if (filterStatus.value !== 'all') {
    filtered = filtered.filter(news => 
      news.status.toLowerCase() === filterStatus.value
    )
  }

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter(news =>
      news.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      news.author.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredNews.value.length / itemsPerPage.value)
})

// Methods
const getStatusColor = (status) => {
  switch (status) {
    case 'Published':
      return 'bg-green-100 text-green-800'
    case 'Draft':
      return 'bg-gray-100 text-gray-800'
    case 'Scheduled':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('th-TH')
}

const viewNews = (news) => {
  console.log('View news:', news)
  // Implement view functionality
}

const editNews = (news) => {
  console.log('Edit news:', news)
  // Implement edit functionality
}

const deleteNews = (newsId) => {
  if (confirm('คุณแน่ใจหรือไม่ที่จะลบข่าวนี้?')) {
    newsData.value = newsData.value.filter(news => news.id !== newsId)
  }
}

const addNews = () => {
  if (newNews.value.title && newNews.value.category && newNews.value.author) {
    const id = 'n' + String(Math.floor(Math.random() * 1000)).padStart(3, '0')
    newsData.value.push({
      id,
      title: newNews.value.title,
      category: newNews.value.category,
      status: 'Draft',
      author: newNews.value.author,
      publishDate: new Date().toISOString().split('T')[0],
      views: 0
    })
    
    // Reset form
    newNews.value = {
      title: '',
      category: '',
      author: ''
    }
    
    showAddModal.value = false
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>

<style scoped>
/* Custom styles if needed */
</style>