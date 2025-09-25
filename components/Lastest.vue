<template>
  <div class="max-w-7xl mx-auto px-4 py-6">
    <div class="flex gap-6">
      <!-- Left Column: News & Events -->
      <div class="flex-1 flex gap-8">
        <!-- Latest News -->
        <div class="flex-1">
          <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 last:border-0">
            <h2 class="text-2xl text-gray-900">Latest News</h2>
            <NuxtLink to="/news" class="text-blue-500 hover:text-blue-700 flex items-center gap-1">
              View More
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>
          </div>

          <div class="space-y-4">
            <article v-for="article in newsArticles" :key="article.id" class="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
              <div class="w-24 h-20 flex-shrink-0">
                <img :src="article.cover" :alt="article.title" class="w-full h-full object-cover">
              </div>
              <div class="flex-1">
                <div class="text-xs text-gray-500 mb-1 flex items-center gap-2 font-light" >
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                  </svg>
                  {{ formatDate(article.created_at) }}
                </div>
                <h3 class="font-semibold text-gray-900 text-sm leading-tight mb-2">
                  {{ article.title }}
                </h3>
                <div class="text-xs text-gray-600">
                  BY <span class="font-medium">ADMIN</span>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Upcoming Events -->
        <div class="flex-1">
          <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 last:border-0">
            <h2 class="text-2xl text-gray-900">Upcoming Events</h2>
            <NuxtLink to="/events" class="text-blue-500 hover:text-blue-700 flex items-center gap-1">
              View More
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>
          </div>

          <div class="space-y-4">
            <div v-for="event in events" :key="event.id" class="flex gap-4 items-center bg-[#F8F8F8] p-2 border-[#E9E9E9]">
              <div class="text-center flex-shrink-0 w-16">
                <div class="text-3xl font-bold text-blue-500">{{ event.day }}</div>
                <div class="text-xs text-gray-600 font-medium">{{ event.month }}</div>
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900 mb-1">{{ event.title }}</h3>
                <div class="text-sm text-gray-500" style="font-weight: 300;">{{ event.location }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Sidebar: Social Media -->
      <div class="w-64 flex-shrink-0 space-y-3">
        <!-- Header Image -->
        <div class="bg-gradient-to-r from-red-600 to-red-800 rounded-lg p-4 text-white relative overflow-hidden">
          <div class="relative z-10">
            <div class="text-lg font-bold">THE STANDARD</div>
            <div class="text-sm opacity-90">POPULAR DAILY</div>
          </div>
          <div class="absolute top-0 right-0 w-20 h-full bg-black bg-opacity-20 transform skew-x-12"></div>
        </div>
<div class="fb-page" 
data-href="https://www.facebook.com/facebook"
data-width="380" 
data-hide-cover="false"
data-show-facepile="false"></div>
        <!-- Social Media Links -->
        <div class="space-y-2">
          <a href="#" class="flex items-center justify-between bg-blue-600 text-white p-3  hover:bg-blue-700 transition-colors">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
              <span>Facebook</span>
            </div>
            <div class="flex items-center gap-1 text-sm">
              <span>0</span>
              <span>Fans</span>
            </div>
          </a>

          <a href="#" class="flex items-center justify-between bg-sky-400 text-white p-3  hover:bg-sky-500 transition-colors">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              <span>Twitter</span>
            </div>
            <div class="flex items-center gap-1 text-sm">
              <span>0</span>
              <span>Followers</span>
            </div>
          </a>

          <a href="#" class="flex items-center justify-between bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3  hover:from-purple-600 hover:to-pink-600 transition-colors">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.222.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.744-1.378l-.628 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 6.624 0 11.99-5.367 11.99-11.99C24.007 5.367 18.641.001 12.017.001z"/>
              </svg>
              <span>Instagram</span>
            </div>
            <div class="flex items-center gap-1 text-sm">
              <span>0</span>
              <span>Followers</span>
            </div>
          </a>

          <a href="#" class="flex items-center justify-between bg-red-600 text-white p-3  hover:bg-red-700 transition-colors">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>YouTube</span>
            </div>
            <div class="flex items-center gap-1 text-sm">
              <span>0</span>
              <span>Subscribe</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const { $supabase } = useNuxtApp();

// Reactive data
const news = ref([]);
const loading = ref(true);

const fetchnews = async () => {
  try {
    loading.value = true;
    const { data, error } = await $supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching news:", error);
      news.value = [];
    } else {
      news.value = data || [];
      console.log("Fetched news:", data);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    news.value = [];
  } finally {
    loading.value = false;
  }
};


const newsArticles = computed(() => {
 
  const highlightedArticle = news.value;
  return highlightedArticle || null;
});


const events = ref([
  {
    id: 1,
    day: '15',
    month: 'JUL',
    title: 'Sugarex Thailand 2025',
    location: 'Central Khonkaen'
  },
  {
    id: 2,
    day: '16',
    month: 'JUL',
    title: 'Agri Expo Thailand 2025',
    location: 'Central Khonkaen'
  },
  {
    id: 3,
    day: '17',
    month: 'JUL',
    title: 'Beyond Food Expo 2025',
    location: 'Central Khonkaen'
  },
  {
    id: 4,
    day: '18',
    month: 'JUL',
    title: 'The Secret Sauce Business',
    location: 'Central Khonkaen'
  },

])
// Date formatting function
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options).toUpperCase();
};
onMounted(async () => {
  // Fetch data from Supabase
  await fetchnews();
});
</script>

<style scoped>
/* Additional custom styles if needed */
</style>