<template>
  <footer class="bg-white border-t border-gray-200 py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <div class="flex items-center mb-4">
          <div class="flex justify-center">
            <img src="/logo-mockup.png" alt="Site Logo" class="w-48 h-auto" />
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Logo and Description Column -->
        <div class="md:col-span-1">
          <p
            class="text-gray-600 text-sm mb-6 leading-relaxed"
            style="font-weight: 400"
          >
            Discover the best nightlife, lifestyle tips, and property insights.
            Your gateway to exceptional living experiences.
          </p>
          <div class="mb-4">
            <p
              class="text-black font-medium mb-1 flex"
              style="font-weight: 400; align-content: center"
            >
              <span
                ><Icon
                  icon="material-symbols:bed-outline-sharp"
                  width="20"
                  height="20"
              /></span>
              <span class="ml-2">hellokk@hellokk.com</span>
            </p>
            <p
              class="text-black font-medium mb-1 flex"
              style="font-weight: 400; align-content: center"
            >
              <span
                ><Icon
                  icon="material-symbols:phone-enabled"
                  width="20"
                  height="20"
              /></span>
              <span class="ml-2">(202) 288 8936</span>
            </p>
          </div>
        </div>

        <!-- Highlight Column -->
        <div class="md:col-span-1 ml-3">
          <h4 class="text-black font-semibold mb-4">Highlight</h4>
          <ul class="space-y-3">
            <li>
              <a
                href="#"
                class="text-gray-600 hover:text-black transition-colors"
                style="font-weight: 400"
                >News</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-600 hover:text-black transition-colors"
                style="font-weight: 400"
                >Event</a
              >
            </li>
          </ul>
        </div>

        <!-- Lifestyle Column -->
        <div class="md:col-span-1">
          <h4 class="text-black font-semibold mb-4">Lifestyle</h4>
          <ul class="space-y-3">
            <li>
              <a
                href="#"
                class="text-gray-600 hover:text-black transition-colors"
                style="font-weight: 400"
                >Food</a
              >
            </li>
   <li>
              <a
                href="#"
                class="text-gray-600 hover:text-black transition-colors"
                style="font-weight: 400"
                >Tourist</a
              >
            </li>
             <li>
              <a
                href="#"
                class="text-gray-600 hover:text-black transition-colors"
                style="font-weight: 400"
                >Hotel</a
              >
            </li>
          </ul>
        </div>

        <!-- Property Column -->
        <div class="md:col-span-1">
          <h4 class="text-black font-semibold mb-4">Property</h4>
          <ul class="space-y-3">
           <li>
              <a
                href="#"
                class="text-gray-600 hover:text-black transition-colors"
                style="font-weight: 400"
                >Buy/Rent/Sell</a
              >
            </li>
             <li>
              <a
                href="#"
                class="text-gray-600 hover:text-black transition-colors"
                style="font-weight: 400"
                >Investment</a
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- Contact Section -->
      <div class="mt-12 pt-8 border-t border-gray-200">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <h4 class="text-black font-semibold mb-2">Contact</h4>
            <p class="text-gray-600 text-sm" style="font-weight: 400">
              Get in touch with us for any inquiries or support.
            </p>
          </div>
          <NuxtLink
            to="/contact"
            class="bg-black text-white px-6 py-2 rounded-md transition-colors font-medium"
          >
            Contact Us
          </NuxtLink>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-8 pt-8 border-t border-gray-200 text-center">
        <p class="text-gray-500 text-sm" style="font-weight: 400">
          © 2024 hellokk. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No additional JavaScript needed for this component
import { Icon } from "@iconify/vue";
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
