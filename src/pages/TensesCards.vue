<template>
  <PageHeader description="ملخص بسيط لكل زمن من حيث التكوين والاستخدام مع مثال للتوضيح" title="الأزمنة في الإنجليزية" />
  <div
    class="p-3 max-w-7xl mx-auto grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
  >
    <TenseCard v-for="tense in tenses" :key="tense.tenseName" :tense="tense" />
  </div>
</template>

<script lang="ts" setup>
import PageHeader from "../components/PageHeader.vue";
import TenseCard from "../components/TenseCard.vue";
import { useGrammarsStore } from "../stores/grammars.ts";
const { tenses } = useGrammarsStore();
</script>
