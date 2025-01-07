<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import demosData from '~/demos.json';
import { shallowRef } from 'vue';

// Define the TeamMember, Review, and Demo interfaces
interface TeamMember {
  tooltip: string;
  src: string;
}

interface Review {
  username: string;
  position: string;
  src: string;
  location: string;
  industry: string;
  status: string;
  review: string;
  rating: number;
}

interface Demo {
  company: string;
  logo: string;
  title: string;
  overview: string;
  description: string;
  tags: string[];
  category: string;
  costRange: string;
  team: TeamMember[];
  location: string;
  video: string;
  likes: number;
  reviews: Review[];
  website: string;
  industry: string;
  companySize: string;
  headquarters: string;
  subCategory: string;
}

const route = useRoute();

const demos = demosData as Demo[];

// Find the company based on the id parameter
const company = computed(() => {
  return demos.find(demo => demo.company === route.params.id);
});

const activeTab = ref('tab-1');
const isModal3XlOpen = ref(false);
const selectedDemo = shallowRef<Demo | null>(null);

const openModal = (demo: Demo) => {
  selectedDemo.value = demo;
  isModal3XlOpen.value = true;
};
</script>

<template>
  <div>
    <!-- Header bg -->
    <div
      class="ltablet:h-[410px] dark:bg-muted-800 absolute start-0 top-0 h-[590px] w-full bg-white lg:h-[410px]"
    />
    <!-- Header -->
    <div
      class="ltablet:h-64 ltablet:flex-row relative flex h-[460px] w-full flex-col lg:h-64 lg:flex-row"
    >
      <div
        class="ltablet:flex-row relative z-10 flex w-full flex-col gap-6 lg:flex-row"
      >
        <div class="ltablet:mx-0 mx-auto lg:mx-0">
          <Icon v-if="company?.logo" :name="company.logo" class="size-16 shrink-0" />
        </div>
        <div class="ltablet:text-left text-center lg:text-left">
          <BaseHeading
            as="h2"
            size="xl"
            weight="semibold"
            class="ltablet:justify-start flex items-center justify-center gap-2 lg:justify-start"
          >
            <span class="text-muted-800 dark:text-white">{{ company?.company }}</span>
          </BaseHeading>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div class="flex items-center">
              <Icon name="mdi:web" class="text-primary-500 size-6 mr-2" />
              <BaseParagraph size="sm" class="text-muted-800 dark:text-muted-100">
                <a :href="company?.website" target="_blank">{{ company?.website }}</a>
              </BaseParagraph>
            </div>
            <div class="flex items-center">
              <Icon name="mdi:domain" class="text-primary-500 size-6 mr-2" />
              <BaseParagraph size="sm" class="text-muted-800 dark:text-muted-100">
                {{ company?.industry }}
              </BaseParagraph>
            </div>
            <div class="flex items-center">
              <Icon name="mdi:account-group" class="text-primary-500 size-6 mr-2" />
              <BaseParagraph size="sm" class="text-muted-800 dark:text-muted-100">
                {{ company?.companySize }}
              </BaseParagraph>
            </div>
            <div class="flex items-center">
              <Icon name="mdi:map-marker" class="text-primary-500 size-6 mr-2" />
              <BaseParagraph size="sm" class="text-muted-800 dark:text-muted-100">
                {{ company?.headquarters }}
              </BaseParagraph>
            </div>
            <div class="flex items-center">
              <Icon name="mdi:subdirectory-arrow-right" class="text-primary-500 size-6 mr-2" />
              <BaseParagraph size="sm" class="text-muted-800 dark:text-muted-100">
                {{ company?.subCategory }}
              </BaseParagraph>
            </div>
          </div>
          <BaseProse
            class="ltablet:mx-0 prose-sm mx-auto mb-6 max-w-xl lg:mx-0"
          >
            <p class="line-clamp-3 text-muted-800 dark:text-muted-100">
              {{ company?.overview }}
            </p>
          </BaseProse>
        </div>
      </div>
      <!-- Action -->
      <div
        class="ltablet:justify-start ltablet:ms-auto ltablet:mt-0 mt-4 flex shrink-0 justify-center lg:ms-auto lg:mt-0 lg:justify-start"
      >
        <BaseButton
          class="ltablet:w-auto ltablet:mx-0 mx-auto w-52 lg:mx-0 lg:w-auto"
        >
          <Icon name="lucide:plus" class="size-4" />
          <span>Contact</span>
        </BaseButton>
      </div>
      <!-- Tabs -->
      <div
        class="ltablet:bottom-[-70px] absolute bottom-[-48px] start-0 flex items-end gap-2 lg:bottom-[-70px]"
      >
        <button
          type="button"
          class="inline-flex items-center justify-center border-b-2 px-4 py-3 font-sans text-sm"
          :class="
            activeTab === 'tab-1'
              ? 'border-primary-500 text-muted-800 dark:text-muted-100'
              : 'border-transparent text-muted-400 dark:text-muted-400'
          "
          @click="activeTab = 'tab-1'"
        >
          <span>Demos</span>
        </button>
        <button
          type="button"
          class="inline-flex items-center justify-center border-b-2 px-4 py-3 font-sans text-sm"
          :class="
            activeTab === 'tab-2'
              ? 'border-primary-500 text-muted-800 dark:text-muted-100'
              : 'border-transparent text-muted-400 dark:text-muted-400'
          "
          @click="activeTab = 'tab-2'"
        >
          <span>Reviews</span>
        </button>
      </div>
    </div>
    <!-- Dashboard content -->
    <div class="w-full">
      <!-- Tab content -->
      <div v-if="activeTab === 'tab-1'" class="mt-28">
        <BaseCard class="p-8">
         
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BaseCard
              v-for="demo in demos.filter(d => d.company === company?.company)"
              :key="demo.title"
              class="p-4"
            >
              <div class="flex items-center gap-4">
                <Icon :name="demo.logo" class="size-10 shrink-0" />
                <div>
                  <BaseHeading
                    as="h4"
                    size="md"
                    weight="semibold"
                    lead="tight"
                    class="text-muted-800 dark:text-white"
                  >
                    <span>{{ demo.title }}</span>
                  </BaseHeading>
                  <BaseParagraph size="sm" class="text-muted-500 dark:text-muted-400">
                    <span class="line-clamp-2">{{ demo.description }}</span>
                  </BaseParagraph>
                  <BaseButton
                    class="mt-2"
                    color="primary"
                    size="sm"
                    variant="pastel"
                    rounded="md"
                    @click="openModal(demo)"
                  >
                    <Icon name="mdi:play" class="size-4" />
                    <span>Watch Video</span>
                  </BaseButton>
                </div>
              </div>
            </BaseCard>
          </div>
        </BaseCard>
      </div>
      <!-- Tab content -->
      <div v-else-if="activeTab === 'tab-2'" class="mt-28">
        <!-- Reviews -->
        <BaseCard class="p-8">
          <div class="mb-8 flex items-center gap-2">
            <h4 class="text-muted-400 dark:text-muted-400 font-sans text-xs font-semibold uppercase">
              Reviews
            </h4>
          </div>
          <div class="grid gap-6 sm:grid-cols-2">
            <div v-for="review in company?.reviews" :key="review.username" class="bg-muted-100 dark:bg-muted-700/60 rounded-md p-5">
              <div class="flex flex-col py-4">
                <BaseAvatar :src="review.src" size="lg" class="mx-auto" />
                <div class="py-4 text-center">
                  <BaseHeading tag="h3" size="md" weight="medium" class="text-muted-800 dark:text-muted-100">
                    {{ review.username }}
                  </BaseHeading>
                  <BaseText size="xs" class="text-muted-400 dark:text-muted-400 mb-4">
                    <span>{{ review.position }}</span>
                  </BaseText>
                  <BaseParagraph size="xs" class="text-muted-800 dark:text-muted-100">
                    <span>{{ review.review }}</span>
                  </BaseParagraph>
                  <div class="mt-4">
                    <BaseText size="xs" class="text-primary-500 dark:text-primary-500">
                      <span>{{ review.rating }} stars</span>
                    </BaseText>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BaseCard>
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
.size-16 {
  width: 4rem;
  height: 4rem;
}
.pb-9\/16 {
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
}
</style>
