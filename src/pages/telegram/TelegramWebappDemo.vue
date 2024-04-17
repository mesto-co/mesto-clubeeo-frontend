<template>
  <q-page class="clubPage flex flex-center" style="padding: 0">
    <div
      class="full-height full-width"
      style="
        max-width: 500px;
        min-height: 100vh;
        background-color: #1d1d27;
        color: white;
      "
    >
      <div class="q-py-sm q-px-md text-h6">demo community</div>

      <q-list bordered>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar round>
              <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>main channel</q-item-label>
            <q-item-label caption lines="2" style="color: #cccccc"
              >public</q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption style="color: #cccccc"
              >16403 members</q-item-label
            >
            <q-icon name="check" color="green" />
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar round>
              <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>chat</q-item-label>
            <q-item-label caption lines="2" style="color: #cccccc"
              >public</q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption style="color: #cccccc"
              >307 members</q-item-label
            >
            <q-icon name="check" color="green" />
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar round>
              <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>premium subscription chat</q-item-label>
            <q-item-label caption lines="2" style="color: #cccccc">
              <q-badge class="clubButtonActive">premium</q-badge>
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption style="color: #cccccc"
              >86 members</q-item-label
            >
            <q-icon name="fa-solid fa-lock" color="grey" />
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar round>
              <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>NFT holder chat</q-item-label>
            <q-item-label caption lines="2" style="color: #cccccc">
              <q-badge class="clubButtonFire">holder</q-badge>
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption style="color: #cccccc"
              >96 members</q-item-label
            >
            <q-icon name="fa-solid fa-lock" color="grey" />
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar round>
              <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>scoreboard</q-item-label>
            <q-item-label caption lines="2" style="color: #cccccc">
              <q-badge class="clubButtonBlue">10 score points</q-badge>
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption style="color: #cccccc"
              >315 members</q-item-label
            >
            <q-icon name="fa-solid fa-unlock" color="grey" />
          </q-item-section>
        </q-item>
      </q-list>

      <div class="q-pa-md flex flex-center">
        <q-card
          style="
            border-radius: 12px;
            background-color: rgb(29, 29, 39);
            width: 96px;
          "
          class="q-mr-md"
          flat
        >
          <q-img ratio="1" src="/demo/me/nft_demo_1.png" />

          <q-card-actions class="text-center q-pa-none">
            <q-btn
              dense
              flat
              no-caps
              size="sm"
              class="full-width"
              style="border-radius: 0 0 12px 12px; background-color: #272736"
            >
              buy NFT to get
              <q-badge
                class="clubButtonFire"
                style="font-size: inherit; padding: 1px 2px"
                >holder</q-badge
              >&nbsp; role
            </q-btn>
          </q-card-actions>
        </q-card>

        <q-card
          style="
            border-radius: 12px;
            background-color: rgb(29, 29, 39);
            width: 96px;
          "
          class="q-mr-md"
          flat
        >
          <q-img ratio="1" src="/demo/me/nft_demo_2.png" />

          <q-card-actions class="text-center q-pa-none">
            <q-btn
              dense
              flat
              no-caps
              size="sm"
              class="full-width"
              style="border-radius: 0 0 12px 12px; background-color: #272736"
            >
              subscribe to get
              <q-badge
                class="clubButtonActive"
                style="font-size: inherit; padding: 1px 2px"
                >premium</q-badge
              >&nbsp; role
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>

      <div class="q-px-md q-pb-xs flex" style="justify-content: space-between">
        <div>@johndoe</div>

        <div class="text-grey">
          your community profile
          <q-btn
            icon="edit"
            dense
            round
            size="xs"
            style="background-color: #272736"
            flat
          />
        </div>
      </div>

      <div class="q-px-md q-pb-xs flex">
        <q-badge class="clubButtonEmerald q-mr-xs">verified</q-badge>

        <q-badge class="clubButtonBlue q-mr-xs">150 score points</q-badge>
      </div>

      <div class="q-px-md q-pb-xs flex">I'm big fan of this community</div>

      <div class="q-px-md q-pb-xs flex" style="justify-content: space-between">
        <div></div>

        <div class="text-grey">
          tasks
          <q-btn
            icon="fa-solid fa-chevron-right"
            dense
            round
            size="xs"
            style="background-color: #272736"
            flat
          />
        </div>
      </div>

      <q-list bordered>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-badge class="clubButtonBlue">+5</q-badge>
          </q-item-section>

          <q-item-section>
            <q-item-label>daily check-in</q-item-label>
            <q-item-label caption lines="2" style="color: #cccccc"
              >for
              <q-badge class="clubButtonEmerald q-mr-xs"
                >verified</q-badge
              ></q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption style="color: #cccccc">done</q-item-label>
            <q-icon name="check" color="green" />
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-badge class="clubButtonBlue">+40</q-badge>
          </q-item-section>

          <q-item-section>
            <q-item-label>invite a friend</q-item-label>
            <q-item-label caption lines="2" style="color: #cccccc"
              >for
              <q-badge class="clubButtonEmerald q-mr-xs"
                >verified</q-badge
              ></q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption style="color: #cccccc">done</q-item-label>
            <q-icon name="check" color="green" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>
