import type { DeepPartial, Strategy } from "../types/utils";

export const useUI = <T>(
  key: string,
  ui?: Ref<(DeepPartial<T> & { strategy?: Strategy }) | undefined>,
  config?: T | Ref<T>
) => {
  const _attrs = useAttrs();
  const appConfig = useAppConfig();

  const attrs = computed(() => omit(_attrs, ["class"]));

  const _computedUiConfig = computed(() => {
    const _ui = toValue(ui);
    const _config = toValue(config);

    return mergeUiConfig<T>(
      _ui?.strategy || (appConfig.rayui?.strategy as Strategy),
      _ui || {},
      getValueByPath(appConfig.rayui, key, {}),
      _config || {}
    );
  });

  return {
    ui: _computedUiConfig,
    attrs,
  };
};
