<template>
  <div>
    <NuxtRouteAnnouncer />
    <Header />
    <div class="flex justify-center my-6">
      <img src="/logo-mockup.png" alt="Site Logo" class="w-48 h-auto" />
    </div>
    <BannerSlide />
    <Highlight />
    <Lastest />
    <Celeb />
    <Property />
    <Investment />
    <BannerAds />
    
    <Food />
    <Interview />
     
    <Travel />
    <Event />
   <BannerAds />
    <Hotel />
  
    
    
     <Footer />
  </div>
</template>
<script setup>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import Highlight from "~/components/Hightlight.vue";
import BannerSlide from "~/components/BannerSlide.vue";
import Lastest from "~/components/Lastest.vue";
import Celeb from "~/components/Celeb.vue";
import Travel from "~/components/Travel.vue";
import Event from "~/components/Event.vue";
import Food from "~/components/Food.vue";
import Hotel from "~/components/Hotel.vue";
import Property from "~/components/Property.vue";
import Interview from "~/components/Interview.vue";
import Investment from "~/components/Investment.vue";
import BannerAds from "~/components/BannerAds.vue";

// Methods / functions
// const handleClick = () => {
//   alert('Button clicked!')
// }
</script>
