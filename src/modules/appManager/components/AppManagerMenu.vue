<template>
  <q-tabs class='inline-block appManagerMenu'>
    <q-route-tab
      class='appManagerMenu_tab'
      label='club apps'
      no-caps
      :to="{name: 'club-apps'}"
      exact
    />
    <q-route-tab
      label='registry'
      no-caps
      :to="{name: 'club-apps-registry'}"
      exact
    />
  </q-tabs>
</template>

<style scoped lang='scss'>
.appManagerMenu {
  .appManagerMenu_tab {
    height: 64px;
  }
}
</style>
