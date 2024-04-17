<template>
  <q-tabs class='inline-block clubAppMenu'>
    <q-route-tab
      class='clubAppMenu_tab'
      label='app'
      no-caps
      :to="{name: 'club-app-manage'}"
      exact
    />
    <q-route-tab
      label='permissions'
      no-caps
      :to="{name: 'club-dynamic-app-config'}"
      exact
    />
    <q-route-tab
      label='logs'
      no-caps
      :to="{name: 'club-app-logs'}"
      exact
    />
  </q-tabs>
</template>

<style scoped lang='scss'>
.clubAppMenu {
  .clubAppMenu_tab {
    height: 64px;
  }
}
</style>
