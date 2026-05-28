<template>
  <div
    class="perspective-1000 h-80 cursor-pointer"
    @mouseenter="toggleFlip"
    @mouseleave="toggleFlip"
  >
    <motion.div
      class="relative w-full h-full"
        :class="isFlipped ? 'h-fit' : 'h-80'"

      :initial="{ rotateY: 0, scale: 1 }"
      :animate="{
        rotateY: isFlipped ? 180 : 0,
        scale: isFlipped ? 1.1 : 1,
        zIndex: isFlipped ? 2 : 1,
      }"
      :transition="{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }"
      :style="{ transformStyle: 'preserve-3d' }"
    >
      <div
        :class="isFlipped ? 'h-100' : 'h-80'"
        class="absolute hover:border-[--accent] inset-0 rounded-2xl border transition-all duration-300 hover:scale-[1.02] text-right p-6 flex flex-col justify-between"
        :style="{
          backfaceVisibility: 'hidden',
          backgroundColor: 'var(--bg)',
          borderColor: 'var(--border)',
        }"
      >
        <div class="flex flex-row-reverse justify-between items-start">
          <span
            class="px-3 py-1 rounded-full text-xs border"
            :style="{
              backgroundColor: 'var(--accent-bg)',
              borderColor: 'var(--accent-border)',
              color: 'var(--accent)',
            }"
          >
            {{
              translateCategory(
                tense.category.charAt(0).toUpperCase() +
                  tense.category.slice(1),
              )
            }}
          </span>
          <CursorArrowRippleIcon
            class="w-4 h-4"
            :style="{ color: 'var(--text)' }"
          />
        </div>

        <div>
          <h3
            class="text-2xl font-semibold mb-2 leading-tight text-right"
            :style="{ color: 'var(--text-h)', fontFamily: 'var(--heading)' }"
          >
            {{ tense.tenseName }}
          </h3>
          <motion.div
            :initial="{ transform: 'translateZ(0)' }"
            :animate="{
              transform: startFlip
                ? 'translateX(-300px)'
                : 'translateX(0) rotateY(0deg)',
            }"
            :transition="{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }"
            :style="{
              transformStyle: 'preserve-3d',
              backgroundColor: 'var(--accent)',
              overflow: 'hidden',
            }"
            class="h-1 w-16 rounded-full mr-0 ml-auto"
          ></motion.div>
          <p
            class="text-sm mb-3 leading-relaxed text-right"
            :style="{ color: 'var(--text-h)' }"
          >
            {{ tense.usage }}
          </p>
        </div>

        <div class="text-sm text-right" :style="{ color: 'var(--text)' }">
          مرر الماوس للتفاصيل
        </div>
      </div>

      <div
        :class="isFlipped ? 'h-fit' : 'h-80'"

        class="absolute inset-0 rounded-2xl border text-right p-6 flex flex-col justify-between"
        :style="{
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          backgroundColor: 'var(--bg)',
          borderColor: 'var(--accent-border)',
          boxShadow: 'var(--shadow)',
        }"
      >
        <div>
          <div class="flex flex-row-reverse justify-between items-start mb-4">
            <span
              class="px-3 py-1 rounded-full text-xs border"
              :style="{
                backgroundColor: 'var(--accent-bg)',
                borderColor: 'var(--accent-border)',
                color: 'var(--accent)',
              }"
            >
              {{
                translateCategory(
                  tense.category.charAt(0).toUpperCase() +
                    tense.category.slice(1),
                )
              }}
            </span>
            <CursorArrowRippleIcon
              class="w-4 h-4"
              :style="{ color: 'var(--text)' }"
            />
          </div>

          <h4
            class="text-xs uppercase tracking-wider mb-2 text-right"
            :style="{ color: 'var(--text)' }"
          >
            التكوين / Form
          </h4>

          <div
            class="border rounded-lg px-4 py-3 mb-4 text-left"
            dir="ltr"
            :style="{
              backgroundColor: 'var(--code-bg)',
              borderColor: 'var(--border)',
            }"
          >
            <code
              class="text-sm block w-full"
              :style="{ color: 'var(--accent)', fontFamily: 'var(--mono)' }"
            >
              <span dir="ltr">
                {{ tense.form.split("\n")[0] }} </span
              ><br />
              <span dir="rtl" class="block text-right">
                {{ tense.form.split("\n")[2] }}
              </span>
            </code>
          </div>

          <h4
            class="text-xs uppercase tracking-wider mb-2 text-right"
            :style="{ color: 'var(--text)' }"
          >
            الاستخدام / Usage
          </h4>
          <p
            class="text-sm mb-3 leading-relaxed text-right"
            :style="{ color: 'var(--text-h)' }"
          >
            {{ tense.usage }}
          </p>

          <h4
            class="text-xs uppercase tracking-wider mb-2 text-right"
            :style="{ color: 'var(--text)' }"
          >
            مثال / Example
          </h4>
          <div
            class="border rounded-lg px-4 py-3 mb-4 text-left"
            dir="ltr"
            :style="{
              backgroundColor: 'var(--code-bg)',
              borderColor: 'var(--border)',
            }"
          >
            <code
              class="text-sm block w-full"
              :style="{ color: 'var(--accent)', fontFamily: 'var(--mono)' }"
            >
              <span dir="ltr"> {{ tense.example.split("\n")[0] }} </span><br />
              <span dir="rtl" class="block text-right">
                {{ tense.example.split("\n")[2] }}
              </span>
            </code>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</template>

<script lang="ts" setup>
import { motion } from "motion-v";
import { CursorArrowRippleIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";

interface FlashCard {
  tenseName: string;
  category: "past" | "present" | "future";
  form: string;
  usage: string;
  example: string;
}

defineProps<{
  tense: FlashCard;
}>();

const isFlipped = ref(false);
const startFlip = ref(false);
function translateCategory(category: string) {
  switch (category) {
    case "Past":
      return "الماضي";
    case "Present":
      return "الحاضر";
    case "Future":
      return "المستقبل";
    default:
      return category;
  }
}
function toggleFlip() {
  if (isFlipped.value) {
    isFlipped.value = !isFlipped.value;
    setTimeout(() => {
      startFlip.value = !startFlip.value;
    }, 150);
  } else {
    startFlip.value = !startFlip.value;
    setTimeout(() => {
      isFlipped.value = !isFlipped.value;
    }, 50);
  }
}
</script>
