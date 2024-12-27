import { ref, toValue, watch, readonly } from 'vue';

function useNinjaId(id) {
  const internal = ref(toValue(id));
  watch(
    () => toValue(id),
    (value) => {
      internal.value = value || `nui-input-${crypto.randomUUID()}`;
    }
  );
  return readonly(internal);
}

export { useNinjaId as u };
//# sourceMappingURL=input-id-DYCO6xqi.mjs.map
