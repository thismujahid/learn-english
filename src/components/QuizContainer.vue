<template>
  <div class="max-w-7xl mx-auto my-12 p-8  rounded-2xl shadow-sm border border-(--accent)" dir="ltr">
    
    <div v-if="quizCompleted" class="text-center py-10 animate-fade-in">
      <div class="text-6xl mb-4">🏆</div>
      <h2 class="text-2xl font-bold text-slate-800 mb-2">اكتمل الاختبار بنجاح!</h2>
      <p class="text-lg mb-6">
        نتيجتك النهائية هي: 
        <span class="font-bold text-emerald-600 text-2xl mx-1">{{ score }}</span> من 
        <span class="font-bold  text-2xl mx-1">{{ localQuestions.length }}</span>
      </p>
      <button 
        @click="restartQuiz" 
        class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700  font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
      >
        إعادة المحاولة
      </button>
    </div>

    <div v-else-if="localQuestions && localQuestions.length > 0">
      <div class="flex justify-between items-center mb-6 text-sm text-slate-500 font-medium border-b border-slate-50 pb-4">
        <span class="bg-slate-50 px-3 py-1.5 rounded-lg text-slate-600">
          السؤال {{ currentQuestionIndex + 1 }} من {{ localQuestions.length }}
        </span>
        <span class="bg-indigo-50 px-3 py-1.5 rounded-lg text-indigo-700 font-semibold">
          النقاط: {{ score }}
        </span>
      </div>

      <h3 class="text-xl font-bold text-slate-800 mb-6 leading-relaxed tracking-wide">
        {{ currentQuestion.question }}
      </h3>

      <div class="mb-6">
        <button 
          @click="showHint = !showHint" 
          class="text-sm text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-1.5 transition-colors focus:outline-none"
        >
          💡 {{ showHint ? 'إخفاء التلميح المساعد' : 'إظهار تلميح مساعد' }}
        </button>
        <p 
          v-if="showHint" 
          class="mt-3 p-4 bg-amber-50/60 border border-amber-100 rounded-xl text-sm text-amber-900 leading-relaxed transition-all"
        >
          {{ currentQuestion.hint }}
        </p>
      </div>

      <div class="space-y-3.5 mb-8">
        <button
          v-for="(option, index) in currentQuestion.answerOptions"
          :key="index"
          @click="selectOption(option)"
          :disabled="hasAnswered"
          :class="[
            'w-full text-right p-4 rounded-xl border-2 transition-all duration-200 font-medium flex flex-col justify-center focus:outline-none',
            getOptionClass(option)
          ]"
        >
          <span class="text-base tracking-wide">{{ option.text }}</span>
          
          <span 
            v-if="hasAnswered && (option.isCorrect || option === selectedOption)" 
            class="text-xs mt-1.5 block opacity-90 font-normal leading-normal"
          >
            {{ option.rationale }}
          </span>
        </button>
      </div>

      <div class="flex justify-between items-center border-t pt-5 border-slate-100 mt-6">
        <button
          @click="prevQuestion"
          :disabled="currentQuestionIndex === 0"
          class="px-5 py-2.5 border border-slate-200 rounded-xl  hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition-all text-sm font-semibold"
        >
          السابق
        </button>
        
        <button
          v-if="hasAnswered"
          @click="nextQuestion"
          class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700  rounded-xl shadow-sm hover:shadow transition-all text-sm font-semibold transform hover:-translate-y-0.5"
        >
          {{ currentQuestionIndex === localQuestions.length - 1 ? 'عرض النتيجة النهائية' : 'السؤال التالي' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// تعريف الـ Interfaces للـ TypeScript لضمان قوة الكود وتجنب الأخطاء
interface AnswerOption {
  text: string
  rationale: string
  isCorrect: boolean
}

interface Question {
  questionNumber: number
  question: string
  answerOptions: AnswerOption[]
  hint: string
}

// مصفوفة الـ 20 سؤالاً الثابتة لزمن الماضي البسيط (تم تكييفها لتطابق تصميمك)
const localQuestions = ref<Question[]>([
  {
    "questionNumber": 1,
    "question": "Which sentence is in the Past Simple tense?",
    "answerOptions": [
      {"text": "She is going to the market.", "rationale": "This is the Present Continuous tense, showing an action happening now.", "isCorrect": false},
      {"text": "She went to the market yesterday.", "rationale": "This correctly uses the irregular past form 'went' and a past time marker 'yesterday'.", "isCorrect": true},
      {"text": "She has gone to the market.", "rationale": "This is the Present Perfect tense, connecting the past to the present.", "isCorrect": false},
      {"text": "She will go to the market.", "rationale": "This is the Future Simple tense, indicating a future action.", "isCorrect": false}
    ],
    "hint": "Look for the sentence that uses the second form of the verb (V2) and mentions a completed time in the past."
  },
  {
    "questionNumber": 2,
    "question": "What is the past simple form of the verb 'study'?",
    "answerOptions": [
      {"text": "studyed", "rationale": "Verbs ending in consonant + 'y' change the 'y' to 'i' before adding 'ed'.", "isCorrect": false},
      {"text": "studying", "rationale": "This is the present participle form used in continuous tenses.", "isCorrect": false},
      {"text": "studied", "rationale": "Correctly changes 'y' to 'i' and adds 'ed' according to spelling rules.", "isCorrect": true},
      {"text": "studies", "rationale": "This is the third-person singular form in the Present Simple tense.", "isCorrect": false}
    ],
    "hint": "Remember the spelling rule for regular verbs that end in a consonant followed by the letter 'y'."
  },
  {
    "questionNumber": 3,
    "question": "Complete the sentence: 'They _______ a new car last week.'",
    "answerOptions": [
      {"text": "buy", "rationale": "This is the base form, which is incorrect for a completed past action.", "isCorrect": false},
      {"text": "bought", "rationale": "This is the correct irregular past simple form of the verb 'buy'.", "isCorrect": true},
      {"text": "buyed", "rationale": "The verb 'buy' is irregular; it does not take the 'ed' ending.", "isCorrect": false},
      {"text": "have bought", "rationale": "This is Present Perfect, which shouldn't be used with a specific past time like 'last week'.", "isCorrect": false}
    ],
    "hint": "The verb 'buy' is irregular. Think of its past tense form."
  },
  {
    "questionNumber": 4,
    "question": "Choose the correct negative sentence: 'I didn't _______ the answer.'",
    "answerOptions": [
      {"text": "knew", "rationale": "After 'didn't', the verb must return to its base form, not remain in the past tense.", "isCorrect": false},
      {"text": "known", "rationale": "This is the past participle form, which is incorrect here.", "isCorrect": false},
      {"text": "know", "rationale": "Correct. 'Didn't' is already auxiliary in the past, so it takes the base form of the main verb.", "isCorrect": true},
      {"text": "knowing", "rationale": "This is the continuous form and does not follow the auxiliary 'didn't' in this context.", "isCorrect": false}
    ],
    "hint": "The auxiliary verb 'did' already carries the past tense, so what happens to the main verb?"
  },
  {
    "questionNumber": 5,
    "question": "Form a question: '_______ you see the movie last night?'",
    "answerOptions": [
      {"text": "Do", "rationale": "This auxiliary is used for the Present Simple tense.", "isCorrect": false},
      {"text": "Have", "rationale": "This auxiliary would require the past participle 'seen' instead of the base form 'see'.", "isCorrect": false},
      {"text": "Did", "rationale": "Correct. 'Did' is the standard auxiliary verb used to form questions in the Past Simple.", "isCorrect": true},
      {"text": "Were", "rationale": "This would require a continuous verb form (e.g., 'Were you seeing') or an adjective/noun phrase.", "isCorrect": false}
    ],
    "hint": "Identify the standard auxiliary verb used to make questions for completed actions in the past."
  },
  {
    "questionNumber": 6,
    "question": "What is the past simple form of 'be' for the pronoun 'We'?",
    "answerOptions": [
      {"text": "was", "rationale": "'Was' is used with singular pronouns like I, he, she, and it.", "isCorrect": false},
      {"text": "were", "rationale": "Correct. 'Were' is the past simple form of 'be' for plural pronouns and 'you'.", "isCorrect": true},
      {"text": "are", "rationale": "This is the present tense form for plural pronouns.", "isCorrect": false},
      {"text": "been", "rationale": "This is the past participle form, not the past simple form.", "isCorrect": false}
    ],
    "hint": "Consider whether 'We' is a singular or plural pronoun when choosing the past form of 'be'."
  },
  {
    "questionNumber": 7,
    "question": "Complete the sentence: 'He _______ at home yesterday afternoon.'",
    "answerOptions": [
      {"text": "is", "rationale": "This is the present tense form, but the time marker 'yesterday' requires the past tense.", "isCorrect": false},
      {"text": "was", "rationale": "Correct. 'Was' is the past simple singular form of the verb 'be' matching 'He'.", "isCorrect": true},
      {"text": "were", "rationale": "'Were' is plural and does not agree with the singular pronoun 'He'.", "isCorrect": false},
      {"text": "did", "rationale": "'Did' is an auxiliary or action verb, but here we need a state of being linking verb.", "isCorrect": false}
    ],
    "hint": "We need the past tense of 'to be' that agrees with the singular pronoun 'He'."
  },
  {
    "questionNumber": 8,
    "question": "Which of the following is a time expression commonly used with the Past Simple?",
    "answerOptions": [
      {"text": "Tomorrow", "rationale": "This indicates a future time, not a past time.", "isCorrect": false},
      {"text": "Two days ago", "rationale": "Correct. 'Ago' is a classic time marker used to signify a completed duration in the past.", "isCorrect": true},
      {"text": "Right now", "rationale": "This indicates the present continuous moment.", "isCorrect": false},
      {"text": "Since 2010", "rationale": "This expression is typically used with the Present Perfect tense to show an ongoing duration.", "isCorrect": false}
    ],
    "hint": "Look for the phrase that refers to a specific, completed period back in time."
  },
  {
    "questionNumber": 9,
    "question": "What is the past simple of the irregular verb 'go'?",
    "answerOptions": [
      {"text": "goed", "rationale": "The verb 'go' is irregular and does not follow the regular '-ed' rule.", "isCorrect": false},
      {"text": "gone", "rationale": "This is the past participle (V3), not the past simple (V2) form.", "isCorrect": false},
      {"text": "went", "rationale": "Correct. 'Went' is the standard past simple form of 'go'.", "isCorrect": true},
      {"text": "goes", "rationale": "This is the present tense third-person singular form.", "isCorrect": false}
    ],
    "hint": "This is one of the most common irregular verbs; its past form changes completely."
  },
  {
    "questionNumber": 10,
    "question": "Complete the question: 'Where _______ you go for your last vacation?'",
    "answerOptions": [
      {"text": "did", "rationale": "Correct. 'Did' is the necessary auxiliary verb for past simple questions with action verbs.", "isCorrect": true},
      {"text": "were", "rationale": "Using 'were' with the base verb 'go' is grammatically incorrect.", "isCorrect": false},
      {"text": "do", "rationale": "This would make the question present tense, which conflicts with 'last vacation'.", "isCorrect": false},
      {"text": "have", "rationale": "This auxiliary would require the past participle 'gone' instead of 'go'.", "isCorrect": false}
    ],
    "hint": "Look for the past tense auxiliary verb that pairs with the base action verb 'go'."
  },
  {
    "questionNumber": 11,
    "question": "Identify the sentence with a spelling error in the past verb:",
    "answerOptions": [
      {"text": "She planned the party carefully.", "rationale": "Correct spelling. Short vowel verbs ending in consonant-vowel-consonant double the final consonant.", "isCorrect": false},
      {"text": "He stoped at the red light.", "rationale": "Incorrect spelling. The verb 'stop' should double the 'p' to become 'stopped'.", "isCorrect": true},
      {"text": "They played soccer in the park.", "rationale": "Correct spelling. Verbs ending in a vowel + 'y' just add 'ed'.", "isCorrect": false},
      {"text": "We carried the heavy boxes.", "rationale": "Correct spelling. Consonant + 'y' changes to 'ied'.", "isCorrect": false}
    ],
    "hint": "One of these regular verbs did not double its final consonant when it should have."
  },
  {
    "questionNumber": 12,
    "question": "What did they do? 'They _______ (not / enjoy) the concert.'",
    "answerOptions": [
      {"text": "don't enjoy", "rationale": "This is present tense negation, but the context implies a completed past event.", "isCorrect": false},
      {"text": "didn't enjoyed", "rationale": "After 'didn't', the verb must be in its base form, without '-ed'.", "isCorrect": false},
      {"text": "didn't enjoy", "rationale": "Correct. Uses 'didn't' followed by the base form of the verb.", "isCorrect": true},
      {"text": "not enjoyed", "rationale": "In English, past simple negative sentences require the auxiliary 'did' alongside 'not'.", "isCorrect": false}
    ],
    "hint": "To negate a past simple sentence, use the past auxiliary helper followed by the infinitive form."
  },
  {
    "questionNumber": 13,
    "question": "What is the past simple of 'run'?",
    "answerOptions": [
      {"text": "ran", "rationale": "Correct. The vowel changes from 'u' to 'a' in the past simple form of this irregular verb.", "isCorrect": true},
      {"text": "runned", "rationale": "The verb 'run' is irregular and cannot take an '-ed' ending.", "isCorrect": false},
      {"text": "running", "rationale": "This is the present participle or gerund form.", "isCorrect": false},
      {"text": "runs", "rationale": "This is the present tense form for singular subjects.", "isCorrect": false}
    ],
    "hint": "Change the middle vowel of the verb to find its past form."
  },
  {
    "questionNumber": 14,
    "question": "Complete: 'When I was a child, we _______ in a small village.'",
    "answerOptions": [
      {"text": "live", "rationale": "This is present tense, but the introductory clause sets a clear past time frame.", "isCorrect": false},
      {"text": "lived", "rationale": "Correct. 'Lived' is the past simple form of the regular verb 'live', perfect for a past state.", "isCorrect": true},
      {"text": "are living", "rationale": "This is present continuous and implies the action is happening now.", "isCorrect": false},
      {"text": "have lived", "rationale": "Present perfect implies a connection to now, whereas being a child is entirely in the past.", "isCorrect": false}
    ],
    "hint": "The phrase 'When I was a child' indicates that the action is a completed state from the past."
  },
  {
    "questionNumber": 15,
    "question": "Choose the correct past simple form for the verb 'catch':",
    "answerOptions": [
      {"text": "catched", "rationale": "'Catch' is an irregular verb, so adding '-ed' is incorrect.", "isCorrect": false},
      {"text": "caught", "rationale": "Correct. 'Caught' is the correct irregular past simple spelling for 'catch'.", "isCorrect": true},
      {"text": "cought", "rationale": "This is a misspelling of the irregular past form.", "isCorrect": false},
      {"text": "chose", "rationale": "This is the past tense of the verb 'choose', not 'catch'.", "isCorrect": false}
    ],
    "hint": "The past form of this verb ends with the letters '-ought'."
  },
  {
    "questionNumber": 16,
    "question": "Select the correct question: '_______ the homework yesterday?'",
    "answerOptions": [
      {"text": "Finished you", "rationale": "English requires an auxiliary verb to form past questions; you cannot just invert the main verb.", "isCorrect": false},
      {"text": "Did you finished", "rationale": "You cannot have both the auxiliary 'did' and the main verb in the past tense form.", "isCorrect": false},
      {"text": "Did you finish", "rationale": "Correct. 'Did' signals the past tense, and 'finish' stays in the base form.", "isCorrect": true},
      {"text": "Do you finished", "rationale": "Mixing present auxiliary 'do' with past tense 'finished' is grammatically incorrect.", "isCorrect": false}
    ],
    "hint": "Make sure your question structure uses the past auxiliary followed by the subject and the infinitive verb."
  },
  {
    "questionNumber": 17,
    "question": "What is the past simple of 'eat'?",
    "answerOptions": [
      {"text": "eated", "rationale": "'Eat' is an irregular verb and does not take the regular '-ed' ending.", "isCorrect": false},
      {"text": "ate", "rationale": "Correct. 'Ate' is the irregular past simple form of 'eat'.", "isCorrect": true},
      {"text": "aten", "rationale": "This is a misspelling; the past participle is spelled 'eaten'.", "isCorrect": false},
      {"text": "eating", "rationale": "This is the continuous form or participle, not the simple past.", "isCorrect": false}
    ],
    "hint": "The past form of this word rearranges the same letters: e-a-t."
  },
  {
    "questionNumber": 18,
    "question": "Complete the sentence: 'The train _______ at 8:00 AM this morning.'",
    "answerOptions": [
      {"text": "left", "rationale": "Correct. 'Left' is the irregular past simple form of 'leave', indicating a completed event.", "isCorrect": true},
      {"text": "leaved", "rationale": "'Leave' is an irregular verb, making 'leaved' incorrect.", "isCorrect": false},
      {"text": "leaves", "rationale": "This is the present tense third-person singular form.", "isCorrect": false},
      {"text": "has left", "rationale": "The specific time marker 'at 8:00 AM this morning' prefers the definite Past Simple tense.", "isCorrect": false}
    ],
    "hint": "Think of the irregular past form of the verb 'leave'."
  },
  {
    "questionNumber": 19,
    "question": "Which sentence correctly describes a past habit or routine?",
    "answerOptions": [
      {"text": "I always walked to school when I was young.", "rationale": "Correct. Past simple can describe habitual actions in the past when accompanied by a past time frame.", "isCorrect": true},
      {"text": "I am always walking to school.", "rationale": "This describes a present habit, often implying annoyance, in the Present Continuous.", "isCorrect": false},
      {"text": "I have always walked to school.", "rationale": "This implies a habit that started in the past and still continues until now.", "isCorrect": false},
      {"text": "I will always walk to school.", "rationale": "This expresses a promise or habit oriented toward the future.", "isCorrect": false}
    ],
    "hint": "Look for the sentence that couples a frequency adverb like 'always' with a past tense verb and a past clause."
  },
  {
    "questionNumber": 20,
    "question": "Complete the sentence: 'Shakespeare _______ many famous plays.'",
    "answerOptions": [
      {"text": "writes", "rationale": "This is present tense, but Shakespeare is historical and no longer alive to write.", "isCorrect": false},
      {"text": "wrote", "rationale": "Correct. Since Shakespeare is a historical figure, his actions are completed in the past.", "isCorrect": true},
      {"text": "has written", "rationale": "Present perfect is used for living people whose actions can still continue or repeat.", "isCorrect": false},
      {"text": "writed", "rationale": "The verb 'write' is irregular and cannot take the regular '-ed' ending.", "isCorrect": false}
    ],
    "hint": "Since the person performing the action is a historical figure, the action is fully completed in the past."
  }
])

// تعريف حالات المكوّن (State) مع الحفاظ على الـ Types
const currentQuestionIndex = ref<number>(0)
const selectedOption = ref<AnswerOption | null>(null)
const hasAnswered = ref<boolean>(false)
const showHint = ref<boolean>(false)
const score = ref<number>(0)
const quizCompleted = ref<boolean>(false)

const currentQuestion = computed<Question>(() => {
  return localQuestions.value[currentQuestionIndex.value]
})

watch(currentQuestionIndex, () => {
  selectedOption.value = null
  hasAnswered.value = false
  showHint.value = false
})

// تلوين الخيارات ليتطابق مع الـ Indigo الخاص بموقعك في الحالة العادية، مع الأخضر والأحمر للأجوبة
function getOptionClass(option: AnswerOption): string {
  if (!hasAnswered.value) {
    return 'border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/20 text-slate-700 shadow-sm'
  }
  if (option.isCorrect) {
    return 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm'
  }
  if (option === selectedOption.value && !option.isCorrect) {
    return 'border-rose-500 bg-rose-50 text-rose-900'
  }
  return 'border-slate-100 bg-slate-50/50 text-slate-400'
}

function selectOption(option: AnswerOption): void {
  if (hasAnswered.value) return
  
  selectedOption.value = option
  hasAnswered.value = true

  if (option.isCorrect) {
    score.value++
  }
}

function nextQuestion(): void {
  if (currentQuestionIndex.value < localQuestions.value.length - 1) {
    currentQuestionIndex.value++
  } else {
    quizCompleted.value = true
  }
}

function prevQuestion(): void {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

function restartQuiz(): void {
  currentQuestionIndex.value = 0
  selectedOption.value = null
  hasAnswered.value = false
  showHint.value = false
  score.value = 0
  quizCompleted.value = false
}
</script>

<style scoped>
.quiz-container {
  font-family: system-ui, -apple-system, sans-serif;
}
.animate-fade-in {
  animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>