<template>
  <q-page style='background-color: rgb(17 17 23); color: #FFFFFF; padding: 12px 24px'>

    <div class='text-h6 q-pb-md'>roles</div>

    <q-table
      :rows="rows"
      :columns="columns"
      row-key="name"
      hide-bottom
      dark
      style='background-color: rgb(29 29 39);'
      :pagination="initialPagination"
    >
    </q-table>

  </q-page>
</template>

<script>
const columns = [
  // {
  //   name: 'desc',
  //   required: true,
  //   label: 'Dessert (100g serving)',
  //   align: 'left',
  //   field: row => row.name,
  //   format: val => `${val}`,
  //   sortable: true
  // },
  {
    name: 'desc',
    required: true,
    label: 'Role',
    align: 'left',
    field: 'name',
  },
  { name: 'members', align: 'center', label: 'Members', field: 'members' },
  { name: 'type', align: 'center', label: 'Type', field: 'type' },
  // { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  // { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  // { name: 'protein', label: 'Protein (g)', field: 'protein' },
  // { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

const rows = [
  {
    id: 1,
    name: 'NFT owner',
    members: 1000,
    type: 'NFT'
  },
  {
    id: 2,
    name: 'Rare NFT owner',
    members: 32,
    type: 'NFT'
  },
  {
    id: 3,
    name: 'Early bird',
    members: 43,
    type: 'whitelist'
  },
  {
    id: 4,
    name: 'DAO member',
    members: 8,
    type: 'coin'
  },
  // {
  //   name: 'Cupcake',
  // }
]

export default {
  setup () {
    return {
      columns,
      rows,
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 1000
      },
    }
  }
}
</script>
