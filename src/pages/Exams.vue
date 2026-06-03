<template>
    <div>
  <PageHeader description="يتم إنشاء الامتحان بواسطة الذكاء الاصطناعي اكتب اسم قاعدة او اكتر او موضوع ما وعدد الاسئلة وهيتم إعداد الامتحان تلقائيا." title="اختبر نفسك دلوقتي" />
    <QuizContainer />
    </div>
</template>
<script setup lang="ts">
import PageHeader from "../components/PageHeader.vue";
import QuizContainer from "../components/QuizContainer.vue";
</script>
