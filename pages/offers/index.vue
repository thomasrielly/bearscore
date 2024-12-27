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

const isRecommended = computed(() => {
  // Get the top 3 demos from the first page
  const topThreeOnFirstPage = demos.value.slice(0, 3);
  return (demo: Demo) => topThreeOnFirstPage.includes(demo);
});


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

const getTrophyStyles = (index: number) => {
  if (index === 0) {
    return {
      bgColor: 'rgb(245 158 11 / 1)', // Gold background
      iconColor: '#fff' // Dark gold for the trophy
    };
  } else if (index === 1) {
    return {
      bgColor: '#656565', // Silver background
      iconColor: '#FFFFFF' // White for contrast
    };
  } else if (index === 2) {
    return {
      bgColor: '#ad4b03', // Bronze background
      iconColor: '#FFFFFF' // White for contrast
    };
  }
  return null; // No trophy for other indexes
};

const resetFilters = () => {
  search.value = '';
  location.value = '';
  selectedCategory.value = 'all';
  selectedRange.value = 'all';
  currentPage.value = 1;
};
</script>

<template>
  <div>
    <!-- Search bar -->
    <div class="relative">
      <BaseCard
        rounded="lg"
        class="ptablet:py-6 ptablet:px-4 ptablet:grid ptablet:grid-cols-12 ltablet:divide-x divide-muted-200 dark:divide-muted-700 mb-10 flex w-full flex-col items-center py-2 sm:flex-row sm:py-0 lg:divide-x"
      >
        <div
          class="ptablet:ps-4 ptablet:col-span-6 w-full py-2 pe-4 ps-4 sm:w-auto sm:grow sm:ps-2"
        >
          <BaseInput
            v-model.trim="search"
            rounded="lg"
            icon="lucide:search"
            placeholder="Keywords"
          />
        </div>
        <div class="ptablet:col-span-6 w-full flex-1 px-4 py-2 sm:w-auto">
          <BaseInput
            v-model.trim="location"
            rounded="lg"
            icon="lucide:map-pin"
            placeholder="Location"
          />
        </div>
        <div class="ptablet:col-span-6 w-full flex-1 px-4 py-2 sm:w-auto">
          <BaseSelect
            v-model="selectedCategory"
            rounded="lg"
            icon="lucide:banknote"
            label=""
            hide-label
          >
            <option value="all">
    All
  </option>
  <option value="Car Loan">
    Car Loan
  </option>
  <option value="Personal Loan">
    Personal Loan
  </option>
  <option value="Home Loan">
    Home Loan
  </option>
  <option value="Credit Card">
    Credit Card
  </option>
          </BaseSelect>
        </div>
        <div class="ptablet:col-span-6 w-full flex-1 px-4 py-2 sm:w-auto">
          <BaseSelect
            v-model="selectedRange"
            rounded="lg"
            icon="lucide:dollar-sign"
            label=""
            hide-label
          >
            <option value="">
              Select a range
            </option>
            <option value="all">
  All
</option>
<option value="<10k">
  &lt; 10k
</option>
<option value="10k-20k">
  10k ~ 20k
</option>
<option value="20k-40k">
  20k ~ 40k
</option>
<option value="40k-75k">
  40k ~ 75k
</option>
<option value="75k-100k">
  75k ~ 100k
</option>
<option value="100k+">
  100k+
</option>
          </BaseSelect>
        </div>
        <div class="ptablet:col-span-12 w-full px-4 py-2 sm:w-auto">
          <BaseButton
            rounded="lg"
            color="primary"
            class="ptablet:w-full w-full sm:w-32"
            @click="resetFilters"
          >
            Reset
          </BaseButton>
        </div>
      </BaseCard>
    </div>
    <!-- Grid -->
    <div class="grid grid-cols-12 gap-6">
      <!-- Column -->
      <div class="col-span-12">
        <!-- Title -->
        <div class="mb-6 mt-12 sm:mt-0">
          <BaseHeading
            as="h3"
            size="lg"
            weight="light"
            lead="tight"
            class="text-muted-800 dark:text-white"
          >
            <span>Showing {{ selectedDemos.length }} Personalised Offers</span>
          </BaseHeading>
          <BaseParagraph size="sm">
            <span class="text-muted-500">
              These are the matching offers we found
            </span>
          </BaseParagraph>
        </div>
        <!-- Inner demos grid -->
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div
            v-for="(demo, index) in paginatedDemos"
            :key="index"
            class="relative"
          >
            <BaseCard rounded="lg" class="p-6">
              <div class="absolute top-2 right-2">
  <div
    v-if="isRecommended(demo)"
    class="text-sm font-semibold text-white flex items-center justify-center px-3 py-1 rounded-full"
    :style="{
      backgroundColor: 'rgb(16 185 129)',
      color: '#FFFFFF',
    }"
  >
    Recommended
  </div>
</div>

              <div class="flex w-full flex-col gap-4 sm:flex-row">
                <div :data-nui-tooltip="demo.company">
                  <img 
  :src="demo.logo" 
  :alt="demo.company" 
  style="max-width:50px; height:auto; border-radius: 100px;"
/>


                </div>
                <div>
                  <BaseHeading
                    as="h4"
                    size="md"
                    weight="semibold"
                    lead="tight"
                    class="after:text-muted-800 mb-4 dark:text-white"
                  >
                    <span>{{ demo.company }}</span>
                  </BaseHeading>
                  <BaseParagraph size="sm">
                    <span
                      class="text-muted-500 dark:text-muted-400 line-clamp-4"
                    >
                      {{ demo.description }}
                    </span>
                  </BaseParagraph>
                  <!-- <div class="flex flex-wrap items-center gap-3 py-4">
  Categories
  <BaseTag
    v-for="cat in demo.category"
    :key="cat"
    size="sm"
    class="text-sm flex items-center gap-2 border border-muted-400 dark:border-muted-600 px-3 py-2 rounded"
  >
    <Icon
      :name="cat === 'Car Loan' ? 'lucide:car-front' : cat === 'Personal Loan' ? 'lucide:briefcase' : cat === 'Home Loan' ? 'lucide:home' : 'lucide:credit-card'"
      class="size-5"
    />
    {{ cat }}
  </BaseTag> -->

  <!-- Loan Size -->
  <!-- <BaseTag
    size="sm"
    class="text-sm flex items-center gap-2 border border-muted-400 dark:border-muted-600 px-3 py-2 rounded"
  >
    <Icon name="lucide:dollar-sign" class="size-5" /> {{ demo.costRange }}
  </BaseTag> -->

  <!-- Approval Chance -->
  <!-- <BaseTag
    size="sm"
    class="text-sm flex items-center gap-2 border border-muted-400 dark:border-muted-600 px-3 py-2 rounded"
  >
    <Icon name="lucide:thumbs-up" class="size-5" /> {{ demo.approvalChance }}
  </BaseTag> -->

  <!-- Interest Rate -->
  <!-- <BaseTag
    size="sm"
    class="text-sm flex items-center gap-2 border border-muted-400 dark:border-muted-600 px-3 py-2 rounded"
  >
    <Icon name="lucide:percent" class="size-5" /> {{ demo.interestRate }}
  </BaseTag> -->

  <!-- Comparison Rate -->
  <!-- <BaseTag
    size="sm"
    class="text-sm flex items-center gap-2 border border-muted-400 dark:border-muted-600 px-3 py-2 rounded"
  >
    <Icon name="lucide:chart-pie" class="size-5" /> {{ demo.comparisonRate }}
  </BaseTag> -->

  <!-- Establishment Fee -->
  <!-- <BaseTag
    size="sm"
    class="text-sm flex items-center gap-2 border border-muted-400 dark:border-muted-600 px-3 py-2 rounded"
  >
    <Icon name="lucide:alert-octagon" class="size-5" /> {{ demo.establishmentFee }}
  </BaseTag> -->
<!-- </div> -->

<div class="flex flex-col items-start gap-1 mt-4 mb-4">
  <!-- Render 5 Filled Stars -->
  <div class="flex gap-0.5">
    <svg
      v-for="n in 5"
      :key="n"
      xmlns="http://www.w3.org/2000/svg"
      class="size-5"
      viewBox="0 0 24 24"
      :style="{ 
        fill: 'rgb(16 185 129)', 
        stroke: '#10b981' 
      }"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  </div>
  <!-- Render Review Count -->
  <span class="text-sm font-medium text-muted-800 dark:text-white">
  {{ (demo.starReviews || 0).toLocaleString() }} 5-star reviews
</span>


</div>






                  <div class="flex justify-between items-center mb-4">
                    <BaseAvatarGroup
                      :avatars="demo.team"
                      :limit="3"
                      size="xs"
                    />
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex gap-2">
                      <nuxt-link :to="{ name: 'products-id', params: { id: demo.company } }">
                        <BaseButton
                          rounded="lg"
                          color="default"
                          class="w-24"
                        >
                        Details
                        </BaseButton>
                      </nuxt-link>
                      <BaseButton
                        rounded="lg"
                        color="default"
                        class="w-24"
                        @click="openModal(demo)"
                      >
                        Video
                      </BaseButton>
                      <!-- Website Button -->
    <a
      v-if="demo.website"
      :href="demo.website"
      target="_blank"
      rel="noopener noreferrer"
    >
      <BaseButton
        rounded="lg"
        color="primary"
        class="w-24"
      >
        Website
      </BaseButton>
    </a>
                    </div>
                  </div>
                </div>
              </div>
            </BaseCard>
          </div>
        </div>
        <!-- Pagination -->
        <div class="flex justify-center mt-6">
          <BaseButton
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
            rounded="lg"
            color="default"
            class="mx-2"
          >
            Previous
          </BaseButton>
          <BaseButton
            v-for="page in totalPages"
            :key="page"
            @click="changePage(page)"
            rounded="lg"
            :color="page === currentPage ? 'primary' : 'default'"
            class="mx-2"
          >
            {{ page }}
          </BaseButton>
          <BaseButton
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
            rounded="lg"
            color="default"
            class="mx-2"
          >
            Next
          </BaseButton>
        </div>
      </div>
    </div>

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
        <!-- Display the Logo -->
        <img
          v-if="selectedDemo?.logo"
          :src="selectedDemo.logo"
          alt="Company Logo"
          class="w-10 h-10 rounded-full mr-2"
        />
        <!-- Display the Title -->
        <h3 class="font-heading dark:text-white text-lg font-medium leading-6">
          {{ selectedDemo?.title }} Video
        </h3>
      </div>
      <!-- Close Button -->
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
