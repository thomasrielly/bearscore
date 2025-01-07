<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';

/* 
const workspaces = ref([
  {
    id: 1,
    name: 'Personal Loans',
    icon: '',
  },
  {
    id: 2,
    name: 'Car Loans',
    icon: '',
  },
  {
    id: 3,
    name: 'Home Loans',
    icon: '',
  },
  {
    id: 4,
    name: 'Credit Cards',
    icon: '',
  },
]);

const selectedWorkspace = ref(workspaces.value[0]);
const target = ref(null);
const open = ref(false);

function openDropdown() {
  open.value = true;
}

function closeDropdown() {
  open.value = false;
}

function setWorkspace(workspace: any) {
  selectedWorkspace.value = workspace;
  closeDropdown();
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeDropdown();
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown);
});
*/
</script>

<template>
  <!-- Commenting out the entire dropdown UI -->
  <!-- 
  <div
    ref="target"
    class="group/workspace relative z-10 ms-auto w-full max-w-[170px] md:ms-0 md:max-w-[240px]"
  >
    <button
      type="button"
      class="group-hover/workspace:bg-muted-100 dark:group-hover/workspace:bg-muted-900/60 w-full max-w-[170px] rounded-xl py-2 pe-3 ps-2 transition-colors duration-300 md:max-w-[240px]"
      :class="open && 'bg-muted-100 dark:bg-muted-900/60'"
      @click="openDropdown()"
    >
      <span class="flex w-full items-center gap-3 text-start">
        <Icon :name="selectedWorkspace.icon" class="text-muted-800 dark:text-muted-200 size-5" />
        <div>
          <BaseText
            size="sm"
            class="text-muted-800 dark:text-muted-200 line-clamp-1 block"
          >
            {{ selectedWorkspace.name }}
          </BaseText>
        </div>
        <Icon
          name="lucide:chevrons-up-down"
          class="text-muted-400 ms-auto size-4 transition-transform duration-300"
          :class="open && 'rotate-180'"
        />
      </span>
    </button>

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="open"
        class="border-muted-200 dark:border-muted-800 dark:bg-muted-950 shadow-muted-400/10 dark:shadow-muted-800/10 absolute end-0 top-12 w-full min-w-[280px] overflow-hidden rounded-xl border bg-white shadow-xl md:start-0 md:min-w-[575px]"
      >
        <ul class="py-2">
          <li
            v-for="workspace in workspaces"
            :key="workspace.id"
            @click="setWorkspace(workspace)"
            class="cursor-pointer px-4 py-2 hover:bg-muted-100 dark:hover:bg-muted-900 flex items-center gap-3 transition-colors duration-300"
          >
            <Icon :name="workspace.icon" class="text-muted-800 dark:text-muted-200 size-5" />
            <span class="text-muted-800 dark:text-muted-200">
              {{ workspace.name }}
            </span>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
  -->
</template>
