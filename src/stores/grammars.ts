import { defineStore } from "pinia"
interface FlashCard {
    tenseName: string;
    category: "past" | "present" | "future";
    form: string;
    usage: string;
    example: string;
}
export const useGrammarsStore = defineStore("grammars", () => {
    const tenses: FlashCard[] = [
        {
            tenseName: 'المضارع البسيط',
            category: 'present' as const,
            form: 'Subject + V1 (+ s/es)\n\nالفاعل + التصريف الأول للفعل (مع إضافة s أو es إذا كان الفاعل مفرداً)',
            usage: 'يُستخدم للتعبير عن العادات والروتين اليومي، الحقائق العامة الثابتة، والمواعيد المجدولة مستقبلاً.',
            example: 'She writes code every day.\n\nهي تكتب الكود كل يوم.',
        },
        {
            tenseName: 'المضارع المستمر',
            category: 'present' as const,
            form: 'Subject + am/is/are + V-ing\n\nالفاعل + (am/is/are) + الفعل مضافاً إليه ing',
            usage: 'يُستخدم للتعبير عن أحداث تقع الآن في لحظة التحدث، أو مواقف مؤقتة مستمرة لفترة.',
            example: 'I am studying English grammar right now.\n\nأنا أذاكر قواعد اللغة الإنجليزية في الوقت الحالي.',
        },
        {
            tenseName: 'المضارع التام',
            category: 'present' as const,
            form: 'Subject + have/has + V3\n\nالفاعل + (have/has) + التصريف الثالث للفعل',
            usage: 'يُستخدم لأفعال اكتملت وانتهت في وقت غير محدد في الماضي، أو أفعال لها تأثير وعلاقة قوية بالحاضر.',
            example: 'They have finished the project.\n\nلقد انتهوا من المشروع.',
        },
        {
            tenseName: 'المضارع التام المستمر',
            category: 'present' as const,
            form: 'Subject + have/has + been + V-ing\n\nالفاعل + (have/has) + been + الفعل مضافاً إليه ing',
            usage: 'يُستخدم لأفعال بدأت في الماضي وما زالت مستمرة حتى لحظة الحاضر، مع التركيز على مدة الحدث.',
            example: 'I have been coding for three hours.\n\nأنا أبرمج منذ ثلاث ساعات (وما زلت مستمراً).',
        },
        {
            tenseName: 'الماضي البسيط',
            category: 'past' as const,
            form: 'Subject + V2\n\nالفاعل + التصريف الثاني للفعل (الفعل في الماضي)',
            usage: 'يُستخدم للتعبير عن أفعال بدأت وانتهت بالكامل في وقت محدد ومعلوم في الماضي.',
            example: 'He learned React last year.\n\nهو تعلّم ريأكت العام الماضي.',
        },
        {
            tenseName: 'الماضي المستمر',
            category: 'past' as const,
            form: 'Subject + was/were + V-ing\n\nالفاعل + (was/were) + الفعل مضافاً إليه ing',
            usage: 'يُستخدم لأحداث كانت مستمرة ومألوفة في وقت معين في الماضي (غالباً قطعها حدث آخر).',
            example: 'We were discussing the design when she called.\n\nكنا نناقش التصميم عندما اتصلت هي.',
        },
        {
            tenseName: 'الماضي التام',
            category: 'past' as const,
            form: 'Subject + had + V3\n\nالفاعل + had + التصريف الثالث للفعل',
            usage: 'يُستخدم للتعبير عن حدث اكتمل تماماً في الماضي قبل وقوع حدث آخر يليه في الماضي أيضاً.',
            example: 'She had already left when I arrived.\n\nلقد غادرت بالفعل عندما وصلت أنا.',
        },
        {
            tenseName: 'الماضي التام المستمر',
            category: 'past' as const,
            form: 'Subject + had + been + V-ing\n\nالفاعل + had + been + الفعل مضافاً إليه ing',
            usage: 'يُستخدم لوصف حدث كان مستمراً لفترة في الماضي قبل أن يكتمل تماماً قبل وقوع حدث ماضي آخر.',
            example: 'They had been working for hours before the deadline.\n\nكانوا يعملون لساعات طويلة قبل حلول الموعد النهائي.',
        },
        {
            tenseName: 'المستقبل البسيط',
            category: 'future' as const,
            form: 'Subject + will + V1\n\nالفاعل + will + التصريف الأول للفعل (المصدر)',
            usage: 'يُستخدم للتنبؤات المستقبلية، اتخاذ القرارات المفاجئة والسريعة، أو الحقائق المستقبلية المؤكدة.',
            example: 'I will attend the meeting tomorrow.\n\nسوف أحضر الاجتماع غداً.',
        },
        {
            tenseName: 'المستقبل المستمر',
            category: 'future' as const,
            form: 'Subject + will + be + V-ing\n\nالفاعل + will + be + الفعل مضافاً إليه ing',
            usage: 'يُستخدم لأحداث ستكون مستمرة وقيد التنفيذ في وقت محدد ومعين في المستقبل.',
            example: 'This time next week, I will be traveling to Paris.\n\nفي مثل هذا الوقت من الأسبوع القادم، سأكون مسافراً إلى باريس.',
        },
        {
            tenseName: 'المستقبل التام',
            category: 'future' as const,
            form: 'Subject + will + have + V3\n\nالفاعل + will + have + التصريف الثالث للفعل',
            usage: 'يُستخدم للتعبير عن حدث سوف ينتهي ويكتمل بالكامل قبل حلول وقت محدد في المستقبل.',
            example: 'By next month, we will have launched the app.\n\nبحلول الشهر القادم، سنكون قد أطلقنا التطبيق.',
        },
        {
            tenseName: 'المستقبل التام المستمر',
            category: 'future' as const,
            form: 'Subject + will + have + been + V-ing\n\nالفاعل + will + have + been + الفعل مضافاً إليه ing',
            usage: 'يُستخدم لوصف أفعال مستمرة ستظل تحدث وتستمر حتى نقطة زمنية معينة في المستقبل.',
            example: 'By December, I will have been learning English for five years.\n\nبحلول شهر ديسمبر، سأكون قد أمضيت خمس سنوات في تعلم اللغة الإنجليزية.',
        },
    ];
    return {
        tenses
    }
});

