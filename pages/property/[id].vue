<!-- เพิ่ม debug และปรับปรุงการแสดงรูปภาพ -->
<template>
  <div class="bg-white">
    <Header />
    <div class="max-w-7xl mx-auto">
      <header class="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div class="max-w-6xl mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <button @click="$router.back()" class="flex items-center text-gray-600 hover:text-black transition-colors">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              ย้อนกลับ
            </button>
          </div>
        </div>
      </header>

      <!-- Loading State -->
      <div v-if="loading" class="max-w-6xl mx-auto px-4 py-8">
        <div class="animate-pulse">
          <div class="h-96 md:h-[500px] bg-gray-200 rounded-lg mb-4"></div>
          <div class="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div class="h-12 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 space-y-4">
              <div class="h-4 bg-gray-200 rounded"></div>
              <div class="h-4 bg-gray-200 rounded"></div>
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div class="space-y-4">
              <div class="h-32 bg-gray-200 rounded"></div>
              <div class="h-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="!property" class="max-w-6xl mx-auto px-4 py-8 text-center">
        <div class="text-red-600 text-lg font-medium mb-4">ไม่พบข้อมูลอสังหาริมทรัพย์</div>
        <button @click="$router.push('/')" class="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
          กลับหน้าหลัก
        </button>
      </div>

      <!-- Main Content -->
      <div v-else class="max-w-6xl mx-auto px-4 py-8">
  

        <!-- Image Gallery -->
        <div class="mb-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-96 md:h-[500px]">
            <!-- Main Image -->
            <div class="relative bg-gray-100 rounded-lg overflow-hidden">
              <!-- Loading State -->
              <div v-if="!mainImageLoaded && !mainImageError" 
                   class="w-full h-full flex flex-col items-center justify-center bg-gray-200">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500 mb-2"></div>
                <div class="text-gray-500 text-sm">กำลังโหลดรูปหลัก...</div>
              </div>
              
              <!-- Error State -->
              <div v-if="mainImageError" 
                   class="w-full h-full flex flex-col items-center justify-center bg-red-50 border-2 border-red-200">
                <div class="text-center text-red-600">
                  <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div class="font-medium">ไม่สามารถโหลดรูปภาพได้</div>
                  <div class="text-xs mt-1 break-all px-2">{{ property.cover }}</div>
                  <button @click="retryMainImage" class="mt-2 px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600">
                    ลองใหม่
                  </button>
                </div>
              </div>
              
              <!-- Actual Image -->
              <img 
                :src="property.cover" 
                :alt="property.name"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                @load="handleMainImageLoad"
                @error="handleMainImageError"
                :style="{ display: mainImageLoaded ? 'block' : 'none' }"
                crossorigin="anonymous"
              >
              
              <!-- Category Badge -->
              <div v-if="mainImageLoaded" class="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium">
                {{ property.category === 'FOR SELL' ? 'ขาย' : 'เช่า' }}
              </div>
            </div>
            
            <!-- Thumbnail Grid -->
            <div class="grid grid-cols-2 gap-4">
              <div 
                v-for="(image, index) in galleryImages" 
                :key="`gallery-${index}-${image}`"
                class="relative bg-gray-100 rounded-lg overflow-hidden cursor-pointer group"
                @click="openImageModal(image)"
              >
                <!-- Loading State -->
                <div v-if="!getImageState(index).loaded && !getImageState(index).error" 
                     class="w-full h-full flex flex-col items-center justify-center bg-gray-200">
                  <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400 mb-1"></div>
                  <div class="text-gray-500 text-xs">{{ index + 2 }}</div>
                </div>
                
                <!-- Error State -->
                <div v-if="getImageState(index).error" 
                     class="w-full h-full flex flex-col items-center justify-center bg-red-50 border border-red-200">
                  <div class="text-red-500 text-center">
                    <svg class="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div class="text-xs">รูปที่ {{ index + 2 }}</div>
                    <div class="text-xs">โหลดไม่ได้</div>
                    <button @click.stop="retryImage(index)" class="mt-1 px-2 py-1 bg-red-400 text-white text-xs rounded">
                      ลองใหม่
                    </button>
                  </div>
                </div>
                
                <!-- Actual Image -->
                <img 
                  :src="image" 
                  :alt="`${property.name} ${index + 2}`"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  @load="() => handleImageLoad(index)"
                  @error="() => handleImageError(index, image)"
                  :style="{ display: getImageState(index).loaded ? 'block' : 'none' }"
                  crossorigin="anonymous"
                >
                

              </div>
              
              <!-- Empty slots if less than 4 images -->
              <div v-for="n in Math.max(0, 4 - galleryImages.length)" 
                   :key="`empty-${n}`"
                   class="bg-gray-100 rounded-lg flex items-center justify-center">
                <div class="text-gray-400 text-sm">ไม่มีรูป</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Property Details -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Basic Info -->
            <div>
              <h1 class="text-3xl font-bold text-black mb-2">{{ property.name }}</h1>
              <p class="text-gray-600 mb-4 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ property.location }}
              </p>
              <div class="text-3xl font-bold text-black mb-6">
                ฿{{ formatPrice(property.price) }}
              </div>

              <!-- Features -->
              <div class="flex flex-wrap gap-6 mb-8">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7z" />
                  </svg>
                  <span class="text-gray-800 font-medium">{{ property.beds }} ห้องนอน</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3a2 2 0 002 2h4a2 2 0 002-2v-3" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6l2 5H7l2-5z" />
                  </svg>
                  <span class="text-gray-800 font-medium">{{ property.bath }} ห้องน้ำ</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span class="text-gray-800 font-medium">{{ property.space }}</span>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="border-t border-gray-200 pt-8">
              <h2 class="text-xl font-bold text-black mb-4">รายละเอียด</h2>
              <p class="text-gray-700 leading-relaxed mb-6">
                {{ property.detail }}
              </p>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <div class="sticky top-24 space-y-6">
              <!-- Contact Card -->
              <div class="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <div class="flex items-center mb-4">
                  <div class="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {{ property.agent.charAt(0) }}
                  </div>
                  <div class="ml-3">
                    <h3 class="font-bold text-black">{{ property.agent }}</h3>
                    <p class="text-sm text-gray-600">ตัวแทนขาย</p>
                    <p class="text-sm text-gray-600" v-if="property.agent_contact">{{ property.agent_contact }}</p>
                  </div>
                </div>
                
                <div class="space-y-3">
                  <a 
                    v-if="property.agent_contact"
                    :href="`tel:${property.agent_contact}`"
                    class="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium text-center block"
                  >
                    ติดต่อเจ้าหน้าที่
                  </a>
                  <button 
                    v-else
                    class="w-full bg-gray-400 text-white py-3 px-4 rounded-lg font-medium cursor-not-allowed"
                    disabled
                  >
                    ติดต่อเจ้าหน้าที่
                  </button>
                </div>
              </div>

              <!-- Price Summary -->
              <div class="border border-gray-200 rounded-lg p-6">
                <h3 class="font-bold text-black mb-4">สรุปราคา</h3>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="text-gray-600">{{ property.category === 'FOR SELL' ? 'ราคาขาย' : 'ราคาเช่า' }}</span>
                    <span class="font-medium">฿{{ formatPrice(property.price) }}</span>
                  </div>
                  <div class="flex justify-between text-sm text-gray-500" v-if="pricePerSqm">
                    <span>ราคาต่อตารางเมตร</span>
                    <span>฿{{ formatPrice(pricePerSqm) }}/ตรม.</span>
                  </div>
                </div>
              </div>

              <!-- Share -->
              <div class="border border-gray-200 rounded-lg p-6">
                <h3 class="font-bold text-black mb-4">แชร์ประกาศนี้</h3>
                <div class="flex space-x-3">
                  <button 
                    @click="shareToFacebook"
                    class="flex-1 border border-gray-300 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-center text-sm"
                  >
                    Facebook
                  </button>
                  <button 
                    @click="shareToLine"
                    class="flex-1 border border-gray-300 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-center text-sm"
                  >
                    Line
                  </button>
                  <button 
                    @click="copyToClipboard"
                    class="flex-1 border border-gray-300 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-center text-sm"
                  >
                    คัดลอก
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />

    <!-- Image Modal -->
    <div 
      v-if="showAllImages || selectedImage"
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      @click="closeImageModal"
    >
      <div class="max-w-4xl max-h-full p-4">
        <img 
          :src="getValidImageUrl(selectedImage || property.cover)" 
          :alt="property.name"
          class="max-w-full max-h-full object-contain"
          @click.stop
          crossorigin="anonymous"
        >
        <button 
          @click="closeImageModal"
          class="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";

const { $supabase } = useNuxtApp();
const route = useRoute();

// Reactive data
const property = ref(null);
const loading = ref(true);
const selectedImage = ref(null);
const showAllImages = ref(false);
const showDebug = ref(true); // เปิดเป็น true เพื่อดู debug info
const mainImageLoaded = ref(false);
const mainImageError = ref(false);
const imageLoadStates = reactive({});

// Get property ID from route
const propertyId = route.params.id;

// Fetch property data
const fetchProperty = async () => {
  try {
    loading.value = true;
    const { data, error } = await $supabase
      .from("property")
      .select("*")
      .eq("id", propertyId)
      .single();

    if (error) {
      console.error("Error fetching property:", error);
      property.value = null;
    } else {
      property.value = data;
      console.log("Fetched property:", data);
      
      // Debug: แสดงข้อมูลรูปภาพ
      console.log("📊 Property data:", data);
      console.log("🖼️ Cover image:", data.cover);
      console.log("📸 Album:", data.album);
      console.log("🔗 Album type:", typeof data.album);
      console.log("📏 Album length:", Array.isArray(data.album) ? data.album.length : 'Not array');
      
      // Test image accessibility
      if (data.cover) {
        testImageLoad(data.cover, 'cover');
      }
      if (Array.isArray(data.album)) {
        data.album.forEach((url, index) => {
          testImageLoad(url, `album-${index}`);
        });
      }
      
      // Reset image states
      mainImageLoaded.value = false;
      mainImageError.value = false;
      Object.keys(imageLoadStates).forEach(key => delete imageLoadStates[key]);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    property.value = null;
  } finally {
    loading.value = false;
  }
};

// Helper function to validate and fix image URLs
const getValidImageUrl = (url) => {
  if (!url) return 'https://via.placeholder.com/400x300?text=No+Image';
  
  // ถ้าเป็น URL แล้วให้ return ตรงๆ
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // ถ้าเป็น path ให้เติม base URL (ปรับตาม storage ที่ใช้)
  // ตัวอย่าง: ถ้าใช้ Supabase storage
  // return `${$supabase.storage.from('property-images').getPublicUrl(url).data.publicUrl}`;
  
  return url;
};

// Computed properties
const galleryImages = computed(() => {
  if (!property.value?.album || !Array.isArray(property.value.album)) {
    console.log("No valid album array found");
    return [];
  }
  console.log("Gallery images:", property.value.album.slice(1));
  return property.value.album.slice(1);
});

const totalImages = computed(() => {
  if (!property.value?.album || !Array.isArray(property.value.album)) return 1;
  return property.value.album.length;
});

const pricePerSqm = computed(() => {
  if (!property.value?.price || !property.value?.space) return null;
  const spaceNumber = parseInt(property.value.space);
  if (isNaN(spaceNumber)) return null;
  return Math.round(property.value.price / spaceNumber);
});

const lineMessage = computed(() => {
  if (!property.value) return '#';
  const message = `สนใจ ${property.value.name} ราคา ฿${formatPrice(property.value.price)}`;
  return `https://line.me/R/msg/text/?${encodeURIComponent(message)}`;
});

// Image loading handlers
const handleMainImageLoad = () => {
  console.log("✅ Main image loaded successfully:", property.value?.cover);
  mainImageLoaded.value = true;
  mainImageError.value = false;
};

const handleMainImageError = (event) => {
  console.error("❌ Main image failed to load:", property.value?.cover);
  console.error("Error event:", event);
  mainImageError.value = true;
  mainImageLoaded.value = false;
};

const handleImageLoad = (index) => {
  console.log(`✅ Gallery image ${index} loaded:`, galleryImages.value[index]);
  if (!imageLoadStates[index]) {
    imageLoadStates[index] = {};
  }
  imageLoadStates[index].loaded = true;
  imageLoadStates[index].error = false;
};

const handleImageError = (index, imageUrl) => {
  console.error(`❌ Gallery image ${index} failed to load:`, imageUrl);
  if (!imageLoadStates[index]) {
    imageLoadStates[index] = {};
  }
  imageLoadStates[index].loaded = false;
  imageLoadStates[index].error = true;
};

const getImageState = (index) => {
  return imageLoadStates[index] || { loaded: false, error: false };
};

const retryMainImage = () => {
  console.log("🔄 Retrying main image...");
  mainImageLoaded.value = false;
  mainImageError.value = false;
  
  // Force reload by creating new image element
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    handleMainImageLoad();
  };
  img.onerror = (e) => {
    handleMainImageError(e);
  };
  img.src = property.value.cover + '?t=' + Date.now(); // Add timestamp to bypass cache
};

const retryImage = (index) => {
  console.log(`🔄 Retrying gallery image ${index}...`);
  if (!imageLoadStates[index]) {
    imageLoadStates[index] = {};
  }
  imageLoadStates[index].loaded = false;
  imageLoadStates[index].error = false;
  
  // Force reload
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    handleImageLoad(index);
  };
  img.onerror = () => {
    handleImageError(index, galleryImages.value[index]);
  };
  img.src = galleryImages.value[index] + '?t=' + Date.now();
};

// Test function to check image accessibility
const testImageLoad = (url, label) => {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    console.log(`✅ ${label} is accessible:`, url);
  };
  img.onerror = (e) => {
    console.error(`❌ ${label} is NOT accessible:`, url);
    console.error(`Error details:`, e);
  };
  img.src = url;
};

// Methods
const formatPrice = (price) => {
  if (!price) return '0';
  return price.toLocaleString('th-TH');
};

const openImageModal = (imageUrl) => {
  selectedImage.value = imageUrl;
};

const closeImageModal = () => {
  selectedImage.value = null;
  showAllImages.value = false;
};

const shareToFacebook = () => {
  if (!property.value) return;
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`${property.value.name} - ฿${formatPrice(property.value.price)}`);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
};

const shareToLine = () => {
  if (!property.value) return;
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`${property.value.name} - ฿${formatPrice(property.value.price)} ${window.location.href}`);
  window.open(`https://social-plugins.line.me/lineit/share?url=${url}&text=${text}`, '_blank');
};

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    alert('คัดลอกลิงค์แล้ว!');
  } catch (err) {
    console.error('Failed to copy: ', err);
    const textArea = document.createElement("textarea");
    textArea.value = window.location.href;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      alert('คัดลอกลิงค์แล้ว!');
    } catch (err) {
      alert('ไม่สามารถคัดลอกได้');
    }
    document.body.removeChild(textArea);
  }
};

// Lifecycle
onMounted(() => {
  fetchProperty();
});

// Watch for route changes
watch(() => route.params.id, (newId) => {
  if (newId) {
    propertyId = newId;
    fetchProperty();
  }
});

// Meta tags for SEO
watchEffect(() => {
  if (property.value) {
    useSeoMeta({
      title: property.value.name,
      ogTitle: property.value.name,
      description: `${property.value.name} - ราคา ฿${formatPrice(property.value.price)} | ${property.value.beds} ห้องนอน ${property.value.bath} ห้องน้ำ ${property.value.space}`,
      ogDescription: `${property.value.name} - ราคา ฿${formatPrice(property.value.price)} | ${property.value.beds} ห้องนอน ${property.value.bath} ห้องน้ำ ${property.value.space}`,
      ogImage: getValidImageUrl(property.value.cover),
    });
  }
});
</script>

<style scoped>
/* Custom styles if needed */
</style>