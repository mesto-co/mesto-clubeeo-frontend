<template>
  <q-table
    :columns="columns"
    row-key="id"
    hide-bottom
    dark
    flat
    style="background-color: rgb(29 29 39)"
    :pagination="defaultPagination"
    :rows-per-page-options="[20, 50, 200]"
  >
    <template v-slot:body-cell-screenName="props">
      <q-td :props="props" style="font-size: 0.7rem">
        <strong>{{ props.row.screenName }}</strong>
        <div style="color: rgba(255, 255, 255, 0.66)">
          # {{ props.row.member.id }}
        </div>
      </q-td>
    </template>

    <template v-slot:body-cell-roles="props">
      <q-td :props="props">
        <template v-for="(role, i) in props.row.rolesView" v-bind:key="i">
          <q-chip dense square size="12px" :class="{ [role.class]: true }"
            >{{ role.name }}
          </q-chip>
        </template>
      </q-td>
    </template>

    <!--    <template v-slot:body-cell-wallets='props'>-->
    <!--      <q-td :props='props'>-->
    <!--        <div-->
    <!--          v-for='(wallet, i) in props.row.wallets'-->
    <!--          v-bind:key='i'-->
    <!--        >-->
    <!--          &lt;!&ndash;          {{ shortenAddress(wallet) }}&ndash;&gt;-->
    <!--          {{ wallet.address }}-->
    <!--        </div>-->
    <!--      </q-td>-->
    <!--    </template>-->
    <template v-for="(_, slotName) in $slots" v-slot:[slotName]="slotData">
      <slot :name="slotName" v-bind="slotData" />
    </template>

    <template v-slot:body-cell-userExts="props">
      <q-td :props="props">
        <div v-for="(userExt, i) in props.row.userExts" v-bind:key="i">
          <div v-if="(userExt.getAccount || {}).link">
            <q-btn
              dense
              no-caps
              flat
              size="sm"
              icon="fab fa-telegram-plane"
              type="a"
              target="_blank"
              :href="userExt.getAccount.link"
              >&nbsp;{{ userExt.getAccount.name }}</q-btn
            >
          </div>
        </div>
      </q-td>
    </template>

    <template v-slot:body-cell-wallets="props">
      <q-td :props="props" style="font-size: 0.7rem">
        <div v-for="(wallet, i) in props.row.wallets" v-bind:key="i">
          {{ shortenAddress ? shortenAddressFunction(wallet) : wallet.address }}
        </div>
      </q-td>
    </template>
  </q-table>
</template>

<script lang="ts">
import { defaultPagination } from '@src/lib/components/table';
import { defineComponent } from 'vue';
import { shortenAddress as shortenAddressFunction } from '@src/lib/components/chains';

const columns = [
  {
    name: 'screenName',
    align: 'left',
    label: 'name',
    field: (u: { screenName?: string; memberId: number }) =>
      u.screenName || `id${u.memberId}`,
  },
  { name: 'roles', align: 'left', label: 'roles', field: 'rolesView' },
  { name: 'userExts', align: 'left', label: 'socials', field: 'userExts' },
  { name: 'wallets', align: 'right', label: 'wallet', field: 'wallets' },
];

export default defineComponent({
  props: {
    shortenAddress: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      shortenAddressFunction,
      columns,
      defaultPagination,
    };
  },
});
</script>
