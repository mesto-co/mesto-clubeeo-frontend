<template>
  <main
    class='clubeeo-wrapper'
    :style='clubPageStyle'
  >
    <section class='main-content-section'>

      <div class='content-wrapper'>
        <club-hero
          max-height='250px'
        />

        <div class='row'>
          <div class='col'>
            <q-card dark class='clubBgDefault q-pb-sm q-mb-md q-ma-xl' flat>
              <q-card-section class='text-subtitle1 q-pb-none flex justify-between'>
                <div>
                  Quest terms
                </div>
              </q-card-section>

              <q-card-section class='q-pb-xs'>
                <div style='color: rgba(255,255,255,0.66)'>
                  time left
                </div>
                <div class='col text-h4'>
                  {{ timeLeft }}
                  <small style='font-size: 0.66em; color: rgba(255,255,255,0.66)'>{{ timeLeftMs }}</small>
                </div>
              </q-card-section>

              <q-card-section class='row q-col-gutter-md q-pb-xs'>
                <div class='col'>
                  <div class='q-pa-sm'>
                    <club-button class='clubButtonActive'>
                      <q-icon name='fa-brands fa-twitter' />&nbsp; Subscribe to our Twitter
                    </club-button>
                  </div>
                  <div class='q-pa-sm'>
                    <club-button class='clubButtonActive'>
                      <q-icon name='fa-brands fa-telegram' />&nbsp; Subscribe to our Telegram
                    </club-button>
                  </div>
                  <div class='q-pa-sm'>
                    <club-button class='clubButtonActive'>
                      <q-icon name='fas fa-link' />&nbsp; Get Standard Cat NFT
                    </club-button>
                  </div>
                  <!--               <li>Subscribe to Telegram</li>-->
                  <!--               <li>Collect NFT from <a href="#">opensea.io/collection/cats</a></li>-->

                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class='col'>
            <q-card dark class='clubBgDefault q-pb-sm q-mb-md q-ma-xl' flat>
              <q-card-section class='text-subtitle1 q-pb-none flex justify-between'>
                <div>
                  Prize
                </div>
              </q-card-section>

              <q-card-section
                class='row q-col-gutter-md q-pb-xs'
              >
                <div class='col-auto'>
                  <div class='q-pa-sm'>

                    <q-card style='width: 200px; border-radius: 12px; background-color: #1D1D1D; border: 1px solid rgba(255,255,255,0.66)' class='q-mr-md' flat>
                      <q-img
                        ratio='1'
                        src='/demo/me/nft_demo_1.png'
                      />

                      <q-card-section class='text-center q-pa-xs'>
                        <small class='flex justify-between'>
                          <div style='flex-grow: 2'>
                            Premium Cat NFT
                          </div>
                        </small>
                      </q-card-section>
                    </q-card>

                  </div>
                </div>
                <div class='col'>
                  First 100 winners will get an Awesome Cat NFT granting
                  <q-badge :class='{"q-ml-xs": true, clubButtonActive: true}'>premium</q-badge> access to the club
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <div></div>

      </div>

    </section>

        <aside class='token-gate-invite' :style='clubAsideStyle'>
          <div>&nbsp;</div>

          <club-button class='clubButtonActive'>
            Log in with Wallet
          </club-button>

          <div>&nbsp;</div>
        </aside>
  </main>
</template>

<style lang='scss'>

main.clubeeo-wrapper {
  @media (max-width: $breakpoint-xs-max) {
    display: flex;
    flex-direction: column-reverse !important;
    min-height: 100vh;
  }

  margin: 0 auto;
  display: flex;

  overflow: hidden;

  section.main-content-section {

    @media (min-width: $breakpoint-xs-max) {
      overflow-y: scroll;
      width: 100%;
      height: 100vh;
    }

    .content-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;

      @media (max-width: $breakpoint-xs-max) {
        min-height: 100%;
      }
      @media (min-width: $breakpoint-xs-max) {
        min-height: 100vh;
      }
    }
  }

  aside.token-gate-invite {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;

    @media (min-width: $breakpoint-xs-max) {
      width: 534px;
      height: 100vh;
    }

    background-color: #212121;
    padding: 0 30px;
    //padding: 210px 30px 30px;

    font-weight: 600;
    color: #FFFFFF;

    h1, h2, h3, h4, h5, h6 {
      margin: 0;
      font-weight: 600;
    }

    ol {
      font-size: 16px;
      line-height: 21px;

      li {
        margin-bottom: 18px;
      }

    }
  }
}

</style>

<script lang='ts'>
import { computed, defineComponent, provide, ref } from 'vue';
import moment from 'moment';
import ClubButton from 'components/clubpage/ClubButton.vue';
import ClubHero from 'components/clubpage/ClubHero.vue';

export default defineComponent({
  components: { ClubButton, ClubHero },
  setup() {

    const clubStyle = computed(() => ({
      color: '#111117',
      textColor: '#ffffff',
      primaryColor: '#1D1D27',
      primaryTextColor: '#ffffff',
      socialColor: '#1D1D27',
      socialTextColor: '#FFFFFF',
      heroImg: '/imgs/clubeeo-header.jpg',
      font: '',
      aside: 'left'
    }));

    provide('clubStyle', clubStyle);

    const clubPageStyle = computed(() => ({
      fontFamily: `'${clubStyle.value.font}', sans-serif`,
      backgroundColor: clubStyle.value.color || '#ffffff',
      color: clubStyle.value.textColor || '#000000',
      flexDirection: clubStyle.value.aside === 'left' ? 'row-reverse' : ''
    }));

    const clubAsideStyle = computed(() => ({
      fontFamily: `'${clubStyle.value.font}', sans-serif`,
      backgroundColor: clubStyle.value.primaryColor || '#212121',
      color: clubStyle.value.primaryTextColor || '#ffffff'
    }));


    const lz = (val: string | number, decimals = 2): string => {
      const valStr = val.toString();
      if (valStr.length < decimals) {
        const zeros = decimals - valStr.length;
        return `${new Array(zeros + 1).join('0')}${valStr}`
      }
      return valStr;
    }
    const toDate = moment().add(35, 'h').add(12, 'm').add(11, 's').add(300, 'ms');
    const timeLeft = ref('');
    const timeLeftMs = ref('');
    const timeLeftUpdate = () => {
      const duration = moment.duration(toDate.diff(moment()));
      timeLeft.value = `${duration.days()} day ${lz(duration.hours())}:${lz(duration.minutes())}:${lz(duration.seconds())}`;
      timeLeftMs.value = lz(duration.milliseconds().toString(), 3);
    }
    timeLeftUpdate()
    setInterval(timeLeftUpdate, 23);

    return {
      moment,
      clubPageStyle,
      clubAsideStyle,
      clubStyle,
      timeLeft,
      timeLeftMs,
    };
  }
});
</script>
