<template>
  <div>&nbsp;</div>

  <div
    v-if='!isClubLoading'
    style='padding: 30px 0'
  >

    <template v-if='!isLoggedIn'>
      <div
        v-html='club.welcome || clubWelcomeDefault'
      />

      <login-buttons
        :meInClub='meInClub'
      />

      <div>Next Steps:</div>

      <club-button
        class='full-width q-mb-sm'
        scheme='inverse'
        disabled='true'
        icon='fab fa-telegram-plane'
        label='Verify Telegram'
      />

      <club-button
        class='full-width q-mb-sm'
        scheme='inverse'
        disabled='true'
        icon='fab fa-telegram-plane'
        label='Join Telegram'
      />

      <club-button
        class='full-width q-mb-sm'
        scheme='inverse'
        disabled='true'
        icon='fab fa-discord'
        label='Join Discord'
      />

    </template>

    <template v-else-if='isLoggedIn && discordValidation'>
      <discord-validation-btn
        class='full-width q-mb-sm'
        :code='discordValidation'
      />
    </template>

    <template v-else-if='isLoggedIn'>

      <div>Done:</div>
      <div class='q-pb-md'>
        <club-button
          class='full-width q-mb-sm'
          scheme='inverse'
          disabled='true'
          icon='fa fa-check'
          label='Verify wallet'
        />

        <club-button
          v-if='meInClub.services.tg.loggedIn'
          class='full-width q-mb-sm'
          scheme='inverse'
          disabled='true'
          icon='fa fa-check'
          label='Verify Telegram'
        />
      </div>

      <template v-if='!meInClub.services.tg.loggedIn'>
        <telegram-bot-login-btn
          label='Verify Telegram'
          class='full-width q-mb-sm'
          :telegram-login-bot='meInClub.services.tg.telegramLoginBot'
          :login-code='meInClub.services.tg.telegramLoginCode'
          @click='onTelegramLoginClicked'
        />

        <div>Next Steps:</div>

        <club-button
          class='full-width q-mb-sm'
          scheme='inverse'
          disabled='true'
          icon='fab fa-discord'
          label='Join Telegram'
        />

        <club-button
          class='full-width q-mb-sm'
          scheme='inverse'
          disabled='true'
          icon='fab fa-discord'
          label='Join Discord'
        />
      </template>

      <template v-else>
        <template v-if='meInClub.services.tg.chatInviteLink && !club.settings.asideDisableTelegram'>
          <club-button
            :href='meInClub.services.tg.chatInviteLink'
            label='Join Telegram'
            class='full-width q-mb-sm'
            icon='fab fa-telegram-plane'
            scheme='inverse'
          />
        </template>

        <template v-if='club.socialLinks.discord && !club.settings.asideDisableDiscord'>
          <club-button
            :href='club.socialLinks.discord'
            class='full-width q-mb-sm'
            scheme='inverse'
            :icon='mapSocialToIcon("discord")'
            label='Join Discord'
          />
        </template>

        <template v-if='club.settings.mintButton'>
          <club-button
            label='Mint'
            class='full-width q-mb-sm'
            scheme='inverse'
            icon='fa-solid fa-circle-plus'
            @click='onMintClick'
          />
        </template>

        <template v-if='club.buyLinks.collections'>
          <template
            v-for='(collection, collectionIndex) in club.buyLinks.collections'
            v-bind:key='collectionIndex'
          >
            <club-button
              class='full-width q-mb-sm'
              :href='collection.url'>
              {{ collection.siteName ? `On ${collection.siteName}` : 'Buy' }}&nbsp;<q-icon name='fa-solid fa-chevron-right' size='xs'/>
            </club-button>
          </template>
        </template>
      </template>

      <template v-if='club.settings.showDashboardLink'>
        <club-button
          :to='{name: "club-home"}'
          class='full-width q-mb-sm'
          scheme='inverse'
        >
          <q-img
            src='/icons/Fav-Icon-Black.png' width='24px' height='24px'
            class='q-mr-sm'
          />
          {{ `${club.name || club.slug} club` }}
        </club-button>
      </template>

      <template v-if='meInClub.services.tg.loggedIn && club.settings.whitelistButton'>
        <whitelist-button
          :club='club'
        />
      </template>
    </template>

  </div>

  <div></div>
</template>

<script lang='ts'>
import { computed, defineComponent, inject } from 'vue';
import { api } from 'boot/axios';
import { state } from 'src/state';
import { IClubStyle } from 'src/models/clubStyle';
import { useQuasar } from 'quasar';
import ClubButton from 'components/clubpage/ClubButton.vue';
import TelegramBotLoginBtn from 'components/telegram/TelegramBotLoginBtn.vue';
import { useRoute } from 'vue-router';
import DiscordValidationBtn from 'src/apps/DiscordApp/components/DiscordValidationBtn.vue';
import { mapSocialToIcon } from 'src/lib/components/socials';
import WhitelistButton from 'components/clubpage/WhitelistButton.vue';
import LoginButtons from 'components/clubpage/LoginButtons.vue';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { provider } from 'web3-core';
import axios from 'axios';
import { AbiItem } from 'web3-utils';
import { axiosErrorNotifier, errorNotification } from 'src/lib/notifications';

const clubWelcomeDefault = '<h2>Welcome to the club</h2><p>Please, log in using a wallet with NFT community pass</p>';

export default defineComponent({
  name: 'ClubAside2',
  components: {
    LoginButtons,
    WhitelistButton,
    DiscordValidationBtn,
    TelegramBotLoginBtn,
    ClubButton
  },
  emits: ['reload'],
  setup(props, { emit }) {
    const $q = useQuasar();
    const $route = useRoute();

    const discordValidation = computed(() => $route.query.discordValidation);

    const clubStyle = inject<IClubStyle>('clubStyle');

    const showMetaMask = computed(() => {
      return !$q.platform.is.safari;
    });

    const meInClub = state.$club.meInClub;

    const isLoggedIn = computed(() => {
      if (meInClub.wallets.eth?.loggedIn) return true;
      if (meInClub.wallets.near?.loggedIn) return true;
      return false;
    });

    const club = state.$club.club;

    const onTelegramLoginClicked = () => {
      const interval = setInterval(() => {
        if (meInClub.services.tg?.loggedIn) {
          clearInterval(interval);

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (club.settings?.whitelistOnTelegramLogIn) {
            void api.post<{
              clubFormApplication: {
                id: number,
                clubId: number,
                userId: number,
                formType: string,
              }
            }>(`/api/club/${club.id}/applications`, {
              formType: 'whitelist-application'
            });
          }
        } else {
          emit('reload', { reason: 'telegram-await-login' });
          // void onLoad({ background: true });
        }
      }, 1000);
    };

    const onMintClick = async () => {
      const detectedProvider = await detectEthereumProvider() as provider;

      const mintButton = club.settings?.mintButton as {
        contractAbiUrl: string,
        signatureUrl: string,
        tokenContractAddress: string,
        chainId: string,
      };

      if (!mintButton.contractAbiUrl) return errorNotification('contractAbiUrl is not defined');
      if (!mintButton.signatureUrl) return errorNotification('signatureUrl is not defined');
      if (!mintButton.tokenContractAddress) return errorNotification('tokenContractAddress is not defined');
      if (!mintButton.chainId) return errorNotification('chainId is not defined');

      if (detectedProvider) {
        // connected

        const web3: Web3 = new Web3(detectedProvider); // this retrieves the web3 instance from the wallet

        const { data: { contractAbi } } = await axios.get<{ contractAbi: { abi: AbiItem[] } }>(mintButton.contractAbiUrl)
          .catch(axiosErrorNotifier);

        // const networkId = await web3.eth.net.getId();
        // // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        // await detectedProvider.request({
        //   method: 'wallet_addEthereumChain',
        //   params: [{
        //     chainId: web3.utils.toHex('4'),
        //     chainName: 'Rinkeby',
        //     nativeCurrency: {
        //       name: 'RinkebyETH',
        //       symbol: 'RinkebyETH',
        //       decimals: 18
        //     },
        //     rpcUrls: ['https://polygon-rpc.com'],
        //     blockExplorerUrls: ['https://www.polygonscan.com']
        //   }],
        // })
        //   .then(() => console.log('network added'))
        //   .catch(() => console.log('could not add network'))

        /* eslint-disable */
        // @ts-ignore
        await detectedProvider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: web3.utils.toHex(mintButton.chainId) }],
        }) .then(() => console.log('network has been set'))
          .catch((e: {code: number}) => {
            if (e.code === 4902) {
              errorNotification(`Network #${mintButton.chainId} is not available, please add it to your wallet`)
            } else {
              errorNotification(`Can't setup network #${mintButton.chainId}`)
            }
          })
        /* eslint-enable */

        const walletAddress = (await web3.eth.getAccounts())[0];
        if (walletAddress !== meInClub.mainWallet.address) {
          return errorNotification("Active wallet account doesn't match your account")
        }

        const { data: signatureData } = await axios.get<{
          dt: number,
          token_id: number,
          signature: string
        }>(`${mintButton.signatureUrl}/${walletAddress}`)
          .catch(axiosErrorNotifier);

        const tokenContract = new web3.eth.Contract(
          contractAbi.abi,
          mintButton.tokenContractAddress
        );

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
        await tokenContract.methods
          .userMint(signatureData.token_id, signatureData.dt, signatureData.signature)
          .send({ from: walletAddress, gas: 500000 });
      }
    }

    return {
      club,
      meInClub: state.$club.meInClub,
      isClubLoading: state.$club.isLoading,
      onTelegramLoginClicked,
      isLoggedIn,
      clubWelcomeDefault,
      clubStyle,
      showMetaMask,
      discordValidation,
      mapSocialToIcon,
      onMintClick
    };
  }
});
</script>
