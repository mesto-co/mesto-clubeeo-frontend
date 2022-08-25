<template>
  <q-no-ssr>
    <q-layout view="lHh Lpr lFf">
    <q-header
      class='md-hide lg-hide xl-hide'
      style='background-color: rgb(29 29 39)'
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title></q-toolbar-title>

<!--        <div>Quasar v{{ $q.version }}</div>-->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered dark>
      <div class='flex' style='width: 299px'>
       <div style='padding: 12px; width: 76px; background-color: rgb(17 17 23); min-height: 100vh'>

         <q-list style='width: 52px'>
<!--           <q-item-label header> Club dashboard </q-item-label>-->
<!--{{clubList}}-->

           <template
             v-for="club in clubList"
             :key="club.slug"
           >

             <q-item
               clickable
               :to='{name: club.slug}'
               style='width: 52px; height: 52px; border-radius: 8px; padding: 0; margin: 0 0 4px'
               :class='{demoActive: club.selected, demoItem: true}'
             >
<!--               <q-btn>-->
<!--                 {{club.name[0] + club.name[1]}}-->
<!--               </q-btn>-->
<!--               <q-item-section avatar>-->
               <q-avatar style='margin: 2px'>
                 <q-img
                   src='https://clubeeo.com/demo/charitykiss_logo.svg'
                   width='48px'
                   height='48px'
                   ratio='1'
                   :alt='`${club.name} logo`'
                 />
               </q-avatar>
<!--               </q-item-section>-->

<!--               <q-item-section>-->
<!--                 <q-item-label>{{ title }}</q-item-label>-->
<!--                 <q-item-label caption>-->
<!--                   {{ caption }}-->
<!--                 </q-item-label>-->
<!--               </q-item-section>-->
             </q-item>

           </template>
         </q-list>

       </div>

       <div style='background-color: rgb(29 29 39); width: 223px'>

         <q-scroll-area style='height: calc(100vh - 48px); width: 223px; background-color: rgb(29 29 39);'>
           <q-list style='margin: 12px 8px 12px 8px;'>
           <q-btn
             unelevated
             no-caps class='full-width q-mb-md'
             label='Demo Club'
             style='border-radius: 8px'
           >

           </q-btn>

           <template
             v-for="link in essentialLinks"
             :key="link.title"
           >
             <q-item
               v-if='link.type == "split"'
               dense
               style='color: rgba(255,255,255,0.5); margin: 12px 0 0; font-weight: 700'
             >
               <q-item-section>
                {{ link.title }}
               </q-item-section>
             </q-item>

             <q-item
               v-else
               clickable
               :to='{name: link.toName}'
               dense
               style='border-radius: 8px; margin: 2px 0'
               :class='{clubButtonActive: isCurrentRoute(link.toName), clubMenuItem: true}'
             >
               <q-item-section v-if="link.icon" avatar>
                 <q-icon :name="link.icon" />
               </q-item-section>

               <q-item-section>
                 <q-item-label>{{ link.title }}</q-item-label>
<!--                 <q-item-label caption>-->
<!--                   {{ link.caption }}-->
<!--                 </q-item-label>-->
               </q-item-section>
             </q-item>

           </template>
         </q-list>
         </q-scroll-area>

         <div
           style='height: 48px; width: 223px; background-color: rgb(29 29 39); cursor: pointer; justify-content: space-between; border-radius: 6px 6px 0 0'
           :class='{flex: true, clubButtonActive: isCurrentRoute("demo-club-me")}'
           @click='$router.push({name: "demo-club-me"})'
         >
           <q-avatar>
             <q-img
               style='border-radius: 6px'
               height='34px'
               width='34px'
               :src='`https://ui-avatars.com/api/?name=$JD&size=128&bold=true&format=svg&background=1c1c1f&color=fff`'
             />
           </q-avatar>

           <div style='padding: 6px 0; height: 36px; flex-grow: 2'>
             <div style='font-size: 0.75rem; font-weight: bold'>John Doe</div>
             <div style='font-size: 0.75rem'>{{shortenAddress({address: '0x000000000000000', chain: 'eth'})}}</div>
           </div>

           <div class='flex q-pa-xs' style='flex-direction: column; justify-content: center; padding-right: 6px'>
             <div>
               <q-btn
                 icon='fa-solid fa-user'
                 size='sm'
                 dense flat
               />
             </div>
           </div>
         </div>

       </div>
      </div>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  </q-no-ssr>
</template>

<style lang='scss'>
.demoItem {
  transition: color 0.3s, background-color 0.3s;
}
.demoActive {
  //background-color: rgb(26, 92, 255);
  box-shadow: rgb(26, 92, 255) -12px 0 20px -10px;
  background: linear-gradient(30deg,rgba(rgb(21, 75, 208),1) 25%,rgba(rgb(111, 23, 212),1));

  .q-focus-helper {
    opacity: 0 !important;
    color: inherit;
  }

  //:before {
  //  content: "";
  //  background: linear-gradient(30deg,rgba(rgb(121, 26, 255),0) 33%,rgba(rgb(133, 26, 255),1));
  //  position: absolute;
  //  top: 0;
  //  left: 0;
  //  width: 100%;
  //  height: 100%;
  //  border-radius: inherit;
  //  pointer-events: none;
  //  -webkit-transition: all .4s ease;
  //  transition: all .4s ease;
  //  z-index: -1;
  //  -webkit-filter: hue-rotate(-40deg);
  //  filter: hue-rotate(-40deg);
  //  -webkit-box-sizing: border-box;
  //  box-sizing: border-box;
  //}
}

.q-item.clubMenuItem {
  color: inherit;

  a {
    color: inherit;
  }
}


//.btn-grad {
//  background-image: linear-gradient(to right, #314755 0%, #26a0da  51%, #314755  100%);
//  margin: 10px;
//  padding: 15px 45px;
//  text-align: center;
//  text-transform: uppercase;
//  transition: 0.5s;
//  background-size: 200% auto;
//  color: white;
//  box-shadow: 0 0 20px #eee;
//  border-radius: 10px;
//  display: block;
//}
//
//.btn-grad:hover {
//  background-position: right center; /* change the direction of the change here */
//  color: #fff;
//  text-decoration: none;
//}

</style>

<script lang="ts">

import { useRoute } from 'vue-router';

const longLinksList = [
  {
    title: 'home',
    toName: 'demo-club-home'
  },
  {
    title: 'contests',
    toName: 'demo-contest-create'
  },
  {
    type: 'split',
    title: 'ADMINISTRATION'
  },
  // {
  //   title: 'information',
  //   toName: 'demo-club-info'
  // },
  {
    title: 'members',
    toName: 'demo-club-members'
  },
  {
    title: 'roles',
    toName: 'demo-club-roles',
    selected: true
  },
  // {
  //   title: 'Docs',
  //   caption: 'quasar.dev',
  //   icon: 'school',
  //   link: 'https://quasar.dev',
  // },
  // {
  //   title: 'Github',
  //   caption: 'github.com/quasarframework',
  //   icon: 'code',
  //   link: 'https://github.com/quasarframework',
  // },
  // {
  //   title: 'Discord Chat Channel',
  //   caption: 'chat.quasar.dev',
  //   icon: 'chat',
  //   link: 'https://chat.quasar.dev',
  // },
  // {
  //   title: 'Forum',
  //   caption: 'forum.quasar.dev',
  //   icon: 'record_voice_over',
  //   link: 'https://forum.quasar.dev',
  // },
  // {
  //   title: 'Twitter',
  //   caption: '@quasarframework',
  //   icon: 'rss_feed',
  //   link: 'https://twitter.quasar.dev',
  // },
  // {
  //   title: 'Facebook',
  //   caption: '@QuasarFramework',
  //   icon: 'public',
  //   link: 'https://facebook.quasar.dev',
  // },
  // {
  //   title: 'Quasar Awesome',
  //   caption: 'Community Quasar projects',
  //   icon: 'favorite',
  //   link: 'https://awesome.quasar.dev',
  // },
];

const linksList = [
  {
    title: 'home',
    toName: 'demo-club-home'
  },
  {
    title: 'me',
    toName: 'demo-club-me'
  },
  {
    type: 'split',
    title: 'ADMINISTRATION'
  },
  // {
  //   title: 'edit profile',
  //   toName: 'demo-club-profile-edit'
  // },
  {
    title: 'members',
    toName: 'demo-club-members'
  },
  {
    title: 'roles',
    toName: 'demo-club-roles',
    selected: true
  },
]

const clubList = [
  {
    name: 'Club1',
    slug: 'club',
    selected: true
  },
  {
    name: 'Club1',
    slug: 'club'
  },
];

import { computed, defineComponent, ref } from 'vue';
import { shortenAddress } from 'src/lib/components/chains';

export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  setup() {
    const $route = useRoute();
    // const slug = computed(() => String($route.params.clubSlug));

    const leftDrawerOpen = ref(false);

    const isCurrentRoute = (routeName: string) => {
      return $route.name === routeName;
    };

    return {
      essentialLinks: computed(() => $route.query.short ? linksList : longLinksList ),
      clubList,
      leftDrawerOpen,
      isCurrentRoute,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      shortenAddress,
    };
  },
});
</script>
