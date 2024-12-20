export default {
  wrapper: 'mx-auto w-fit pointer-events-auto',
  container: 'px-2 py-1.5 border flex items-center gap-1.5',
  shadow: 'shadow-md shadow-{color}-100 dark:shadow-{color}-900',
  rounded: 'rounded-md',
  border: 'border-{color}-400 dark:border-{color}-600',
  background: 'bg-{color}-50 dark:bg-{color}-900',
  content: 'text-xs font-sans font-bold text-{color}-500 dark:text-{color}-300',
  type: {
    success: {
      color: 'emerald',
      icon: 'tabler:circle-check',
    },
    warning: {
      color: 'amber',
      icon: 'tabler:alert-circle',
    },
    error: {
      color: 'red',
      icon: 'tabler:circle-x',
    },
    info: {
      color: 'blue',
      icon: 'tabler:info-circle',
    },
  },
  default: {
    type: 'info',
    color: 'primary',
    duration: 4000,
  },
}
