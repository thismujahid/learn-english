<template>
  <header class="border-b border-slate-800/50 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-6 py-8">
      <RouterLink to="/" class="flex items-center gap-3">
        <ArrowLongRightIcon class="w-6 h-6 text-cyan-400" /> العودة للرئيسية
      </RouterLink>
      <div class="flex items-center gap-3">
        <div
          class="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30"
        >
          <BookOpenIcon class="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h1 class="text-3xl text-white">{{ title }}</h1>
          <p class="text-slate-400 text-sm mt-1">
            {{ description }}
          </p>
        </div>
      </div>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { BookOpenIcon, ArrowLongRightIcon } from "@heroicons/vue/24/solid";

const props = defineProps<{
  title: string;
  description: string;
}>();
</script>
