<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import demosData from '~/demos.json';

interface TeamMember {
  tooltip: string;
  src: string;
}

interface Demo {
  company: string;
  logo: string;
  title: string;
  description: string;
  tags: string[];
 category: string[]; // Updated to an array
  costRange: string;
  averageCost: number;
  team: TeamMember[];
  location: string;
  video: string;
  likes: number;
}

const search = ref('');
const location = ref('');
const alertKeyword = ref('');

const selectedCategory = ref<'all' | 'Car Loan' | 'Personal Loan' | 'Home Loan' | 'Credit Card'>('all');
const selectedRange = ref<'all' | '<10k' | '10k-20k' | '20k-40k' | '40k-75k' | '75k+'>('all');

const currentPage = ref(1);
const demosPerPage = 9;

const isModal3XlOpen = ref(false);
const selectedDemo = ref<Demo | null>(null);

const demos = ref(demosData as Demo[]);
const likedDemos = ref<string[]>([]);

const rangeValues = {
  all: [0, Infinity],
  '<10k': [0, 10000],
  '10k-20k': [10000, 20000],
  '20k-40k': [20000, 40000],
  '40k-75k': [40000, 75000],
  '75k-100k': [75000, 100000],
  '100k+': [100000, Infinity],
} as const;


const selectedDemos = computed(() => {
  let filteredDemos = demos.value;


  // Filter by cost range
  if (selectedRange.value !== 'all') {
    const [minRangeValue, maxRangeValue] = rangeValues[selectedRange.value];
    filteredDemos = filteredDemos.filter(demo => {
      const [demoMin, demoMax] = demo.costRange
        .split('-')
        .map(value => parseInt(value.trim(), 10)); // Convert to numeric values
      return demoMax >= minRangeValue && demoMin <= maxRangeValue;
    });
  }

  if (search.value.trim() !== '') {
    const searchTerm = search.value.trim().toLowerCase();
    filteredDemos = filteredDemos.filter(demo =>
      demo.company.toLowerCase().includes(searchTerm) || 
      demo.title.toLowerCase().includes(searchTerm) ||
      demo.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  if (location.value.trim() !== '') {
    const locationTerm = location.value.trim().toLowerCase();
    filteredDemos = filteredDemos.filter(demo =>
      demo.location.toLowerCase().includes(locationTerm)
    );
  }

  if (selectedCategory.value !== 'all') {
    filteredDemos = filteredDemos.filter(demo =>
      demo.category.includes(selectedCategory.value)
    );
  }



  return filteredDemos;
});

const paginatedDemos = computed(() => {
  const start = (currentPage.value - 1) * demosPerPage;
  const end = start + demosPerPage;
  return selectedDemos.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(selectedDemos.value.length / demosPerPage);
});

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const openModal = (demo: Demo) => {
  selectedDemo.value = demo;
  isModal3XlOpen.value = true;
};

const toggleLike = (demo: Demo) => {
  const index = likedDemos.value.indexOf(demo.company);
  if (index === -1) {
    likedDemos.value.push(demo.company);
  } else {
    likedDemos.value.splice(index, 1);
  }
};

// Watchers to reset the current page when search or filter criteria change
watch([search, location, selectedCategory, selectedRange], () => {
  currentPage.value = 1;
});

const resetFilters = () => {
  search.value = '';
  location.value = '';
  selectedCategory.value = 'all';
  selectedRange.value = 'all';
  currentPage.value = 1;
};
</script>



<template>
   


   <div class="mb-4 flex gap-4">
  <!-- Welcome Section -->
  <BaseCard
    rounded="md"
    class="w-full max-w-lg p-6"
  >
    <div class="flex h-full flex-col justify-between gap-5">
      <BaseHeading
        as="h4"
        size="sm"
        weight="medium"
        lead="none"
        class="text-muted-400 uppercase"
      >
        Thomas'
      </BaseHeading>

      <h2
        class="font-heading ptablet:text-2xl text-muted-800 text-4xl font-medium dark:text-white"
      >
        Welcome back, Thomas 👋
      </h2>
      <BaseParagraph class="text-muted-500">
        Everything seems ok and up-to-date with your account since your last
        visit. Would you like to fund it?
      </BaseParagraph>
      <BaseButton
        color="primary"
        rounded="md"
        size="lg"
        class="w-full"
        shadow="hover"
      >
        Fund my Account
      </BaseButton>
    </div>
  </BaseCard>

</div>





  <div>

   
    <!-- Modal for Demo -->
    <TairoModal
      :open="isModal3XlOpen"
      size="3xl"
      @close="isModal3XlOpen = false"
      class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <template #header>
        <!-- Header -->
        <div class="flex items-center w-full justify-between p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center">
            <Icon
              v-if="selectedDemo"
              :name="selectedDemo.logo"
              class="w-10 h-10 mr-2"
            />
            <h3 class="font-heading dark:text-white text-lg font-medium leading-6">
              {{ selectedDemo ? selectedDemo.title : '' }} Demo Video
            </h3>
          </div>
          <BaseButtonClose @click="isModal3XlOpen = false" />
        </div>
      </template>
      <!-- Body -->
      <div class="relative pb-9/16">
        <iframe
          v-if="selectedDemo"
          :src="`https://www.youtube.com/embed/${selectedDemo.video.split('v=')[1].split('&')[0]}?autoplay=1`"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
        ></iframe>
      </div>
    </TairoModal>
  </div>
</template>

<style scoped>
.text-6xl {
  font-size: 6rem;
}
.text-3xl {
  font-size: 3rem;
}
.text-xl {
  font-size: 1.5rem;
}
.text-lg {
  font-size: 1.25rem;
}
.pb-9\/16 {
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
}
</style>
