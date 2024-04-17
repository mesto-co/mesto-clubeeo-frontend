<template>
  <q-btn
    flat class='clubButtonDisable q-ml-xs q-pa-none'
    style='min-width: 28px'
    dark-percentage dense rounded
  >
    <span
      class='reactionBtn_SlotWrap'
      :class='{reactionBtn_SlotWrap__hasAmount: hasAmount}'
    ><slot /></span>
    <span
      v-if='hasAmount'
      class='reactionBtn_Amount'
    >{{ amount }}</span>
  </q-btn>
</template>

<style>
.reactionBtn_SlotWrap {
  font-size: 18px;
  line-height: 18px
}

.reactionBtn_SlotWrap__hasAmount {
  padding-left: 8px
}

.reactionBtn_Amount {
  padding: 0 8px 0 4px
}
</style>

<script lang='ts'>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    amount: {
      type: Number,
      default: 0,
    }
  },
  setup(props) {
    return {
      hasAmount: computed(() => props.amount > 0)
    }
  }
});
</script>
