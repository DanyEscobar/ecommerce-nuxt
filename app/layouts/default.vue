<template>
  <div class="layout-wrapper">
    <AppHeader />
    
    <main class="container">
      <slot />
    </main>
    
    <AppFooter />
  </div>
</template>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main.container {
  flex: 1;
  padding-bottom: var(--space-12);
}
</style>
