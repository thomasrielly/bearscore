<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import demosData from '../../demos.json'; // Adjust the path according to your project structure

const route = useRoute();
const router = useRouter();
const page = computed(() => parseInt((route.query.page as string) ?? '1'));

const filter = ref('');
const perPage = ref(6); // Updated from 10 to 6

watch([filter, perPage], () => {
  router.push({
    query: {
      page: 1,
    },
  });
});

const query = computed(() => {
  return {
    filter: filter.value,
    perPage: perPage.value,
    page: page.value,
  };
});

// Extract company ID from the route params and cast it to string
const companyId = computed(() => (route.params.id as string).toLowerCase());

// Fetch the company data for the specific company
const company = computed(() => {
  return demosData.find(demo => demo.company.toLowerCase() === companyId.value);
});

// Fetch the products for the company
const products = computed(() => {
  return company.value?.products ?? [];
});

// Get the total number of pages
const totalPages = computed(() => {
  return Math.ceil(products.value.length / perPage.value);
});

// Slice the products array to get the products for the current page
const paginatedProducts = computed(() => {
  const start = (page.value - 1) * perPage.value;
  const end = start + perPage.value;
  return products.value.slice(start, end);
});

const changePage = (newPage: number) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    router.push({
      query: {
        ...route.query,
        page: newPage,
      },
    });
  }
};

// Map for icons based on loan type
const loanTypeIconMap: { [key: string]: string } = {
  "Personal Loan": "lucide:dollar-sign",
  "Car Loan": "lucide:car-front",
  "Home Loan": "lucide:home",
  "Credit Card": "lucide:credit-card",
};

const otherOffers = computed(() => {
  return demosData
    .filter((demo) => demo.company.toLowerCase() !== companyId.value)
    .slice(0, 4);
});
</script>

<template>
  <div>
    <TairoContentWrapper>
      <!-- Company Logo and Title -->
      <div class="flex items-center space-x-4 mb-6">
        <img
          :src="company?.logo"
          alt="Company Logo"
          style="border-radius: 100px; width: 64px; height: 64px;"
        />
        <h1 class="text-2xl font-bold">{{ company?.title }} Products</h1>
      </div>

      <!-- Secondary heading -->
      <div class="mb-6 mt-12 sm:mt-0">
        <BaseHeading
          as="h3"
          size="lg"
          weight="light"
          lead="tight"
          class="text-muted-800 dark:text-white"
        >
          <span>{{ products.length }} Products</span>
        </BaseHeading>
      </div>
      
      

      <div>
        <div v-if="paginatedProducts.length === 0">
          <BasePlaceholderPage
            title="No matching results"
            subtitle="Looks like we couldn't find any matching products for this company. Try another company."
          >
            <template #image>
              <img
                class="block dark:hidden"
                src="/img/illustrations/placeholders/flat/placeholder-search-4.svg"
                alt="Placeholder image"
              >
              <img
                class="hidden dark:block"
                src="/img/illustrations/placeholders/flat/placeholder-search-4-dark.svg"
                alt="Placeholder image"
              >
            </template>
          </BasePlaceholderPage>
        </div>
        <div v-else class="pt-6">
       <div>
            <DemoFlexTableRow
              v-for="(product, index) in paginatedProducts"
              :key="index"
              rounded="none"
              condensed
              spaced
            >
              <template #start>
                <DemoFlexTableStart
                  label="Type"
                  :hide-label="index > 0"
                  :title="product.subType ? `${product.type} (${product.subType})` : product.type"
                  :subtitle="'Loan Product'"
                  :icon="loanTypeIconMap[product.type] ?? 'lucide:briefcase'"
                />
              </template>
              <template #end>
                <DemoFlexTableCell
                  label="Interest Rate"
                  :hide-label="index > 0"
                  class="w-full sm:w-40 cell"
                >
                  <span
                    class="text-muted-500 dark:text-muted-400 font-sans text-sm"
                  >
                    {{ product.interestRate }}
                  </span>
                </DemoFlexTableCell>
                <DemoFlexTableCell
                  label="Comparison Rate"
                  :hide-label="index > 0"
                  class="w-full sm:w-40 cell"
                >
                  <span
                    class="text-muted-500 dark:text-muted-400 font-sans text-sm"
                  >
                    {{ product.comparisonRate }}
                  </span>
                </DemoFlexTableCell>
                <DemoFlexTableCell
                  label="Establishment Fee"
                  :hide-label="index > 0"
                  class="w-full sm:w-40 cell"
                >
                  <span
                    class="text-muted-500 dark:text-muted-400 font-sans text-sm"
                  >
                    {{ product.fees?.establishmentFee || 'N/A' }}
                  </span>
                </DemoFlexTableCell>
                <DemoFlexTableCell
                  label="Loan Amount"
                  :hide-label="index > 0"
                  class="w-full sm:w-40 cell"
                >
                  <span
                    class="text-muted-500 dark:text-muted-400 font-sans text-sm"
                  >
                    {{ product.costRange }}
                  </span>
                </DemoFlexTableCell>
                <DemoFlexTableCell
                  label="Approval Chance"
                  :hide-label="index > 0"
                  class="w-full sm:w-40 cell"
                >
                  <span
                    class="text-muted-500 dark:text-muted-400 font-sans text-sm"
                  >
                    {{ product.approvalChance }}
                  </span>
                </DemoFlexTableCell>
                <DemoFlexTableCell
                  label="Apply Now"
                  :hide-label="index > 0"
                  class="w-full sm:w-40 cell"
                >
                  <a
                    :href="company?.website"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BaseButton color="primary" rounded="lg" class="w-full">
                      Apply Now
                    </BaseButton>
                  </a>
                </DemoFlexTableCell>
              </template>
            </DemoFlexTableRow>
          </div>
        </div>
        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-4">
          <BasePagination
            :total-items="products.length"
            :item-per-page="perPage"
            :current-page="page"
            rounded="full"
            @change="changePage"
          />
        </div>
      </div>
<!-- Other Offers Section -->
<div class="mt-12">
  <h2 class="text-lg font-bold mb-4">Other Offers</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <BaseCard
      v-for="offer in otherOffers"
      :key="offer.company"
      rounded="lg"
      class="p-6 flex flex-col items-center justify-between text-center"
    >
      <!-- Logo -->
      <img
        :src="offer.logo"
        alt="Offer Logo"
        class="h-16 w-16 rounded-full mb-4"
      />

      <!-- Company Name -->
      <h3 class="font-semibold text-base mb-2">{{ offer.company }}</h3>

      <!-- Summary -->
      <p class="text-sm text-muted-500 mb-4">
        {{ offer.description.length > 100 ? offer.description.slice(0, 100) + '...' : offer.description }}
      </p>

<!-- Reviews Section -->
<div class="flex flex-col items-center mb-4">
  <!-- Five Green Stars -->
  <div class="flex gap-0.5 mb-1">
    <svg
      v-for="n in 5"
      :key="n"
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4"
      viewBox="0 0 24 24"
      fill="currentColor"
      :style="{ fill: 'rgb(16, 185, 129)', stroke: '#10b981' }"
    >
      <path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  </div>
  <!-- Review Count -->
  <span class="text-sm font-sans text-muted-500 dark:text-muted-400">
    {{ (offer.starReviews || 0).toLocaleString() }} Reviews
  </span>
</div>


      <!-- Avatars -->
      <div class="flex justify-center mb-4">
        <BaseAvatarGroup
          :avatars="offer.team"
          :limit="3"
          size="sm"
          class="gap-2"
        />
      </div>

      <!-- Buttons -->
      <div class="flex space-x-2">
        <nuxt-link :to="{ name: 'products-id', params: { id: offer.company } }">
          <BaseButton rounded="lg" color="default">
            Details
          </BaseButton>
        </nuxt-link>
        <a
          :href="offer.website"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BaseButton rounded="lg" color="primary">
            Website
          </BaseButton>
        </a>
      </div>
    </BaseCard>
  </div>
</div>


    </TairoContentWrapper>
  </div>
</template>

<style scoped>
.cell {
  display: flex;
  align-items: center;
}
</style>