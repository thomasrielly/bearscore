<script setup lang="ts">
import { Calendar } from 'v-calendar'

import 'v-calendar/dist/style.css'
import '~/css/vcalendar.css'

definePageMeta({
  title: 'Hobbies',
  preview: {
    title: 'Hobbies dashboard',
    description: 'For hobbies and interests',
    categories: ['dashboards'],
    src: '/img/screens/dashboards-hobbies.png',
    srcDark: '/img/screens/dashboards-hobbies-dark.png',
    order: 16,
  },
})

// Just reusing the same arrays if needed, but not actually using "trending" or "popular" in the template:
const trending = [
  {
    name: 'Extreme foot trekk',
    date: 'Oct 31, 2022',
    image: '/img/illustrations/dashboards/hobbies/landscape-thumb-1.svg',
    icon: 'tabler:trekking',
  },
  {
    name: 'Corporate rafting trip',
    date: 'Nov 14, 2022',
    image: '/img/illustrations/dashboards/hobbies/landscape-thumb-1.svg',
    icon: 'map:rafting',
  },
  {
    name: 'Hiking in the Alps',
    date: 'Dec 3, 2022',
    image: '/img/illustrations/dashboards/hobbies/landscape-thumb-1.svg',
    icon: 'map:climbing',
  },
  {
    name: 'Bicycle team mastery',
    date: 'Dec 17, 2022',
    image: '/img/illustrations/dashboards/hobbies/landscape-thumb-1.svg',
    icon: 'map:bicycle-store',
  },
]

const popular = [
  {
    name: 'Extreme triathlon',
    date: 'Feb 4, 2023',
    image: '/img/illustrations/dashboards/hobbies/landscape-thumb-1.svg',
    icon: 'map:kayaking',
  },
  {
    name: 'Jungle hiking',
    date: 'Jan 11, 2023',
    image: '/img/illustrations/dashboards/hobbies/landscape-thumb-1.svg',
    icon: 'map:playground',
  },
  {
    name: 'Archery challenge',
    date: 'Dec 3, 2022',
    image: '/img/illustrations/dashboards/hobbies/landscape-thumb-1.svg',
    icon: 'map:archery',
  },
  {
    name: 'Extreme waterskiing',
    date: 'Dec 21, 2022',
    image: '/img/illustrations/dashboards/hobbies/landscape-thumb-1.svg',
    icon: 'map:waterskiing',
  },
]
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-8 flex flex-col justify-between md:flex-row md:items-center">
      <div
        class="ltablet:max-w-full flex max-w-[425px] flex-col items-center gap-4 text-center md:flex-row md:text-left lg:max-w-full"
      >
        <div>
          <BaseHeading
            as="h2"
            size="xl"
            weight="light"
            lead="tight"
            class="text-muted-800 dark:text-white"
          >
            <span>Explore Hobbies</span>
          </BaseHeading>
          <BaseParagraph>
            <span class="text-muted-500">
              Explore some of the best activities nearby in your region
            </span>
          </BaseParagraph>
        </div>
      </div>
      <div
        class="mt-4 flex items-center justify-center gap-2 md:mt-0 md:justify-start"
      >
        <BaseButton color="primary" class="w-32">
          <span>View All</span>
        </BaseButton>
      </div>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-12 gap-4">
      <!-- Left Column -->
      <div class="ltablet:col-span-8 col-span-12 lg:col-span-8">
        <div class="grid grid-cols-12 gap-4">
          <!-- First row of hobbies -->
          <div class="col-span-6 sm:col-span-3">
            <NuxtLink
              to="#"
              class="group relative flex w-full flex-col overflow-hidden rounded-2xl"
            >
              <img
                class="h-80 w-full object-cover object-center"
                src="/img/illustrations/dashboards/hobbies/hobby-1.svg"
                alt="Hobby cover"
              />
              <div
                class="bg-muted-900 absolute inset-0 z-10 h-full w-full opacity-0 transition-opacity duration-300 group-hover:opacity-50"
              ></div>
              <div
                class="absolute inset-0 z-20 flex h-full w-full flex-col justify-between p-6"
              >
                <div class="flex items-center justify-between">
                  <h3
                    class="-translate-y-2 font-sans tracking-wider text-white opacity-0 transition-all delay-100 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    Tips to increase your score
                  </h3>
                  <Icon
                    name="eos-icons:bootstrapping"
                    class="h-5 w-5 -translate-y-2 text-white opacity-0 transition-all delay-300 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </div>
                <div class="flex items-center justify-between">
                  <h3
                    class="translate-y-2 font-sans text-sm text-white underline underline-offset-4 opacity-0 transition-all delay-500 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    View Tips
                  </h3>
                  <Icon
                    name="lucide:arrow-right"
                    class="h-4 w-4 translate-y-2 text-white opacity-0 transition-all delay-700 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </div>
              </div>
            </NuxtLink>
          </div>

          <div class="col-span-6 sm:col-span-3">
            <NuxtLink
              to="#"
              class="group relative flex w-full flex-col overflow-hidden rounded-2xl"
            >
              <img
                class="h-80 w-full object-cover object-center"
                src="/img/illustrations/dashboards/hobbies/hobby-2.svg"
                alt="Hobby cover"
              />
              <div
                class="bg-muted-900 absolute inset-0 z-10 h-full w-full opacity-0 transition-opacity duration-300 group-hover:opacity-50"
              ></div>
              <div
                class="absolute inset-0 z-20 flex h-full w-full flex-col justify-between p-6"
              >
                <div class="flex items-center justify-between">
                  <h3
                    class="-translate-y-2 font-sans tracking-wider text-white opacity-0 transition-all delay-100 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    Cycling
                  </h3>
                  <Icon
                    name="fluent-emoji-high-contrast:wheel"
                    class="h-5 w-5 -translate-y-2 text-white opacity-0 transition-all delay-300 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </div>
                <div class="flex items-center justify-between">
                  <h3
                    class="translate-y-2 font-sans text-sm text-white underline underline-offset-4 opacity-0 transition-all delay-500 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    View activities
                  </h3>
                  <Icon
                    name="lucide:arrow-right"
                    class="h-4 w-4 translate-y-2 text-white opacity-0 transition-all delay-700 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </div>
              </div>
            </NuxtLink>
          </div>

          <div class="col-span-6 sm:col-span-3">
            <NuxtLink
              to="#"
              class="group relative flex w-full flex-col overflow-hidden rounded-2xl"
            >
              <img
                class="h-80 w-full object-cover object-center"
                src="/img/illustrations/dashboards/hobbies/hobby-3.svg"
                alt="Hobby cover"
              />
              <div
                class="bg-muted-900 absolute inset-0 z-10 h-full w-full opacity-0 transition-opacity duration-300 group-hover:opacity-50"
              ></div>
              <div
                class="absolute inset-0 z-20 flex h-full w-full flex-col justify-between p-6"
              >
                <div class="flex items-center justify-between">
                  <h3
                    class="-translate-y-2 font-sans tracking-wider text-white opacity-0 transition-all delay-100 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    Exploration
                  </h3>
                  <Icon
                    name="fa6-solid:compass"
                    class="h-5 w-5 -translate-y-2 text-white opacity-0 transition-all delay-300 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </div>
                <div class="flex items-center justify-between">
                  <h3
                    class="translate-y-2 font-sans text-sm text-white underline underline-offset-4 opacity-0 transition-all delay-500 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    View activities
                  </h3>
                  <Icon
                    name="lucide:arrow-right"
                    class="h-4 w-4 translate-y-2 text-white opacity-0 transition-all delay-700 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </div>
              </div>
            </NuxtLink>
          </div>

          <div class="col-span-6 sm:col-span-3">
            <NuxtLink
              to="#"
              class="group relative flex w-full flex-col overflow-hidden rounded-2xl"
            >
              <img
                class="h-80 w-full object-cover object-center"
                src="/img/illustrations/dashboards/hobbies/hobby-4.svg"
                alt="Hobby cover"
              />
              <div
                class="bg-muted-900 absolute inset-0 z-10 h-full w-full opacity-0 transition-opacity duration-300 group-hover:opacity-50"
              ></div>
              <div
                class="absolute inset-0 z-20 flex h-full w-full flex-col justify-between p-6"
              >
                <div class="flex items-center justify-between">
                  <h3
                    class="-translate-y-2 font-sans tracking-wider text-white opacity-0 transition-all delay-100 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    Hiking
                  </h3>
                  <Icon
                    name="mdi:pickaxe"
                    class="h-5 w-5 -translate-y-2 text-white opacity-0 transition-all delay-300 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </div>
                <div class="flex items-center justify-between">
                  <h3
                    class="translate-y-2 font-sans text-sm text-white underline underline-offset-4 opacity-0 transition-all delay-500 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    View activities
                  </h3>
                  <Icon
                    name="lucide:arrow-right"
                    class="h-4 w-4 translate-y-2 text-white opacity-0 transition-all delay-700 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- Second row of hobbies (same or new images if you prefer) -->
          <div class="col-span-6 sm:col-span-3">
            <NuxtLink
              to="#"
              class="group relative flex w-full flex-col overflow-hidden rounded-2xl"
            >
              <img
                class="h-80 w-full object-cover object-center"
                src="/img/illustrations/dashboards/hobbies/hobby-1.svg"
                alt="Hobby cover"
              />
              <div
                class="bg-muted-900 absolute inset-0 z-10 h-full w-full opacity-0 transition-opacity duration-300 group-hover:opacity-50"
              ></div>
              <div
                class="absolute inset-0 z-20 flex h-full w-full flex-col justify-between p-6"
              >
                <div class="flex items-center justify-between">
                  <h3
                    class="-translate-y-2 font-sans tracking-wider text-white opacity-0 transition-all delay-100 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    Rock climbing basics
                  </h3>
                  <Icon
                    name="mdi:pickaxe"
                    class="h-5 w-5 -translate-y-2 text-white opacity-0 transition-all delay-300 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </div>
                <div class="flex items-center justify-between">
                  <h3
                    class="translate-y-2 font-sans text-sm text-white underline underline-offset-4 opacity-0 transition-all delay-500 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    View activities
                  </h3>
                  <Icon
                    name="lucide:arrow-right"
                    class="h-4 w-4 translate-y-2 text-white opacity-0 transition-all delay-700 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </div>
              </div>
            </NuxtLink>
          </div>

          <div class="col-span-6 sm:col-span-3">
            <NuxtLink
              to="#"
              class="group relative flex w-full flex-col overflow-hidden rounded-2xl"
            >
              <img
                class="h-80 w-full object-cover object-center"
                src="/img/illustrations/dashboards/hobbies/hobby-2.svg"
                alt="Hobby cover"
              />
              <div
                class="bg-muted-900 absolute inset-0 z-10 h-full w-full opacity-0 transition-opacity duration-300 group-hover:opacity-50"
              ></div>
              <div
                class="absolute inset-0 z-20 flex h-full w-full flex-col justify-between p-6"
              >
                <div class="flex items-center justify-between">
                  <h3
                    class="-translate-y-2 font-sans tracking-wider text-white opacity-0 transition-all delay-100 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    Nature photography
                  </h3>
                  <Icon
                    name="fa6-solid:camera"
                    class="h-5 w-5 -translate-y-2 text-white opacity-0 transition-all delay-300 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </div>
                <div class="flex items-center justify-between">
                  <h3
                    class="translate-y-2 font-sans text-sm text-white underline underline-offset-4 opacity-0 transition-all delay-500 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    View activities
                  </h3>
                  <Icon
                    name="lucide:arrow-right"
                    class="h-4 w-4 translate-y-2 text-white opacity-0 transition-all delay-700 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </div>
              </div>
            </NuxtLink>
          </div>

          <div class="col-span-6 sm:col-span-3">
            <NuxtLink
              to="#"
              class="group relative flex w-full flex-col overflow-hidden rounded-2xl"
            >
              <img
                class="h-80 w-full object-cover object-center"
                src="/img/illustrations/dashboards/hobbies/hobby-3.svg"
                alt="Hobby cover"
              />
              <div
                class="bg-muted-900 absolute inset-0 z-10 h-full w-full opacity-0 transition-opacity duration-300 group-hover:opacity-50"
              ></div>
              <div
                class="absolute inset-0 z-20 flex h-full w-full flex-col justify-between p-6"
              >
                <div class="flex items-center justify-between">
                  <h3
                    class="-translate-y-2 font-sans tracking-wider text-white opacity-0 transition-all delay-100 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    Survival guide
                  </h3>
                  <Icon
                    name="mdi:tent"
                    class="h-5 w-5 -translate-y-2 text-white opacity-0 transition-all delay-300 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </div>
                <div class="flex items-center justify-between">
                  <h3
                    class="translate-y-2 font-sans text-sm text-white underline underline-offset-4 opacity-0 transition-all delay-500 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    View activities
                  </h3>
                  <Icon
                    name="lucide:arrow-right"
                    class="h-4 w-4 translate-y-2 text-white opacity-0 transition-all delay-700 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </div>
              </div>
            </NuxtLink>
          </div>

          <div class="col-span-6 sm:col-span-3">
            <NuxtLink
              to="#"
              class="group relative flex w-full flex-col overflow-hidden rounded-2xl"
            >
              <img
                class="h-80 w-full object-cover object-center"
                src="/img/illustrations/dashboards/hobbies/hobby-4.svg"
                alt="Hobby cover"
              />
              <div
                class="bg-muted-900 absolute inset-0 z-10 h-full w-full opacity-0 transition-opacity duration-300 group-hover:opacity-50"
              ></div>
              <div
                class="absolute inset-0 z-20 flex h-full w-full flex-col justify-between p-6"
              >
                <div class="flex items-center justify-between">
                  <h3
                    class="-translate-y-2 font-sans tracking-wider text-white opacity-0 transition-all delay-100 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    Bird watching
                  </h3>
                  <Icon
                    name="mdi:binoculars"
                    class="h-5 w-5 -translate-y-2 text-white opacity-0 transition-all delay-300 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </div>
                <div class="flex items-center justify-between">
                  <h3
                    class="translate-y-2 font-sans text-sm text-white underline underline-offset-4 opacity-0 transition-all delay-500 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    View activities
                  </h3>
                  <Icon
                    name="lucide:arrow-right"
                    class="h-4 w-4 translate-y-2 text-white opacity-0 transition-all delay-700 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </div>
              </div>
            </NuxtLink>
          </div>

        </div>
      </div>

      <!-- Right Column (sidebar) -->
      <div class="ltablet:col-span-4 col-span-12 lg:col-span-4">
        <div class="flex flex-col gap-6">
          <!-- Search Widget -->
          <BaseCard class="p-6" shape="curved">
            <div class="flex w-full items-center justify-between">
              <DemoSearchCompact shape="curved" />
            </div>
          </BaseCard>

          <!-- Calendar Widget -->
          <BaseCard shape="curved" class="p-4">
            <Calendar
              :attributes="[{
                  key: 'today',
                  dot: true,
                  dates: [new Date()],
                }]"
              title-position="left"
              expanded
              borderless
              transparent
              trim-weeks
              class="max-w-full rounded-xl"
            />
          </BaseCard>

          <!-- Locations Widget -->
          <BaseCard class="p-6" shape="curved">
            <div class="mb-6">
              <BaseHeading
                as="h3"
                size="md"
                weight="semibold"
                lead="tight"
                class="text-muted-800 dark:text-white"
              >
                <span>Locations</span>
              </BaseHeading>
            </div>
            <div class="space-y-1">
              <!-- Item -->
              <NuxtLink
                to="#"
                class="hover:bg-muted-100 dark:hover:bg-muted-700/50 flex items-center gap-3 rounded-xl px-2 py-3 transition-colors duration-300"
              >
                <img
                  src="/img/illustrations/dashboards/hobbies/landscape-thumb-1.svg"
                  alt="Hello"
                  class="max-w-[48px]"
                />
                <div>
                  <BaseHeading
                    as="h4"
                    size="sm"
                    weight="medium"
                    lead="tight"
                    class="text-muted-800 dark:text-white"
                  >
                    <span>Mt Wilbur</span>
                  </BaseHeading>
                  <BaseParagraph size="xs">
                    <span class="text-muted-400">Oregon · Lvl 3</span>
                  </BaseParagraph>
                </div>
                <div class="ms-auto flex items-center">
                  <BaseButtonIcon shape="curved" muted class="scale-75">
                    <Icon name="lucide:arrow-right" class="h-5 w-5" />
                  </BaseButtonIcon>
                </div>
              </NuxtLink>
              <!-- Item -->
              <NuxtLink
                to="#"
                class="hover:bg-muted-100 dark:hover:bg-muted-700/50 flex items-center gap-3 rounded-xl px-2 py-3 transition-colors duration-300"
              >
                <img
                  src="/img/illustrations/dashboards/hobbies/landscape-thumb-7.svg"
                  alt="Hello"
                  class="max-w-[48px]"
                />
                <div>
                  <BaseHeading
                    as="h4"
                    size="sm"
                    weight="medium"
                    lead="tight"
                    class="text-muted-800 dark:text-white"
                  >
                    <span>Devil's Lair</span>
                  </BaseHeading>
                  <BaseParagraph size="xs">
                    <span class="text-muted-400">Alabama · Lvl 7</span>
                  </BaseParagraph>
                </div>
                <div class="ms-auto flex items-center">
                  <BaseButtonIcon shape="curved" muted class="scale-75">
                    <Icon name="lucide:arrow-right" class="h-5 w-5" />
                  </BaseButtonIcon>
                </div>
              </NuxtLink>
              <!-- Item -->
              <NuxtLink
                to="#"
                class="hover:bg-muted-100 dark:hover:bg-muted-700/50 flex items-center gap-3 rounded-xl px-2 py-3 transition-colors duration-300"
              >
                <img
                  src="/img/illustrations/dashboards/hobbies/landscape-thumb-4.svg"
                  alt="Hello"
                  class="max-w-[48px]"
                />
                <div>
                  <BaseHeading
                    as="h4"
                    size="sm"
                    weight="medium"
                    lead="tight"
                    class="text-muted-800 dark:text-white"
                  >
                    <span>Dragon's Den</span>
                  </BaseHeading>
                  <BaseParagraph size="xs">
                    <span class="text-muted-400">Missouri · Lvl 4</span>
                  </BaseParagraph>
                </div>
                <div class="ms-auto flex items-center">
                  <BaseButtonIcon shape="curved" muted class="scale-75">
                    <Icon name="lucide:arrow-right" class="h-5 w-5" />
                  </BaseButtonIcon>
                </div>
              </NuxtLink>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  </div>
</template>
