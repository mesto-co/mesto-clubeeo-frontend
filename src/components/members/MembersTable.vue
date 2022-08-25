<template>

  <q-table
    :columns='columns'
    row-key='id'
    hide-bottom
    dark flat
    style='background-color: rgb(29 29 39);'
    :pagination='defaultPagination'
  >

    <template v-slot:body-cell-roles='props'>
      <q-td :props='props'>
        <template
          v-for='(role, i) in props.row.rolesView'
          v-bind:key='i'
        >
          <q-chip
            dense
            square
            size='12px'
            :class='{[role.class]: true}'
          >{{ role.name }}
          </q-chip>
        </template>
      </q-td>
    </template>

    <template v-slot:body-cell-wallets='props'>
      <q-td :props='props'>
        <div
          v-for='(wallet, i) in props.row.wallets'
          v-bind:key='i'
        >
          {{ shortenAddress(wallet) }}
        </div>
      </q-td>
    </template>

  </q-table>

</template>

<script lang='ts'>
import { defaultPagination } from 'src/lib/components/table';
import { defineComponent } from 'vue';
import { shortenAddress } from 'src/lib/components/chains';

const columns = [
  { name: 'screenName', align: 'left', label: 'name', field: (u: {screenName?: string, id: number}) => u.screenName || `id${u.id}` },
  { name: 'roles', align: 'left', label: 'roles', field: 'rolesView' },
  { name: 'wallets', align: 'right', label: 'wallet', field: 'wallets' }
];

export default defineComponent({
  setup() {
    return {
      shortenAddress,
      columns,
      defaultPagination,
    };
  }
});
</script>
