import { ISnippetData } from 'src/models/snippetTypes';
import { formUrl } from 'src/models/snippetData/links';

export const demoSub = `<p class="text-center" style="font-size: 0.7rem; font-weight: 500">this is demo, please <a href="${formUrl}" target='_blank'>apply here</a> to create membership experience for your community</p>`;

export const demoLendingPageTaskShort: ISnippetData = {
  type: 'renderer:buttonList',
  steps: [
    {
      icon: 'img:/imgs/MetaMask_Fox.svg',
      label: 'verify MetaMask',
      state: 'completed',
      class: 'clubButtonActive'
    },
    {
      icon: 'telegram',
      label: 'verify Telegram',
      state: 'available',
      link: 'https://t.me/clubeeo',
      class: 'clubButtonActive'
    },
    {
      icon: 'fa-solid fa-hourglass',
      label: 'join waitlist',
      state: 'locked',
      class: 'clubButtonActive'
    }
  ]
}

export const demoLendingPageTaskReferral: ISnippetData = {
  type: 'renderer:buttonList',
  steps: [
    {
      icon: 'img:/imgs/MetaMask_Fox.svg',
      label: 'verify MetaMask',
      state: 'completed',
      class: 'clubButtonActive',
      pointsClass: 'clubButtonFire',
      points: 5,
    },
    {
      icon: 'telegram',
      label: 'verify Telegram',
      state: 'available',
      link: 'https://t.me/clubeeo',
      class: 'clubButtonActive',
      pointsClass: 'clubButtonFire',
      points: 5,
    },
    {
      icon: 'fa-solid fa-hourglass',
      label: 'join waitlist',
      state: 'locked',
      class: 'clubButtonActive',
      pointsClass: 'clubButtonFire',
      points: 5,
    },
    {
      icon: 'fa-solid fa-share-nodes',
      label: 'invite friends',
      state: 'locked',
      class: 'clubButtonActive',
      pointsClass: 'clubButtonFire',
      points: 10,
    },
  ]
}

export const demoLendingPageTask: ISnippetData = {
  type: 'renderer:buttonList',
  steps: [
    {
      icon: 'img:/imgs/MetaMask_Fox.svg',
      label: 'verify MetaMask',
      state: 'completed',
      class: 'clubButtonActive'
    },
    {
      icon: 'email',
      label: 'verify email',
      state: 'completed',
      class: 'clubButtonActive'
    },
    {
      icon: 'telegram',
      label: 'join Telegram',
      state: 'available',
      link: 'https://t.me/clubeeo',
      class: 'clubButtonActive'
    },
    {
      icon: 'discord',
      label: 'join Discord',
      state: 'available',
      link: 'https://discord.gg/C6jHsjzZ3f',
      class: 'clubButtonActive'
    },
    {
      icon: 'img:/icons/crypto/eth.svg',
      label: 'mint NFT',
      state: 'locked',
      class: 'clubButtonActive'
    }
  ]
}

export const demoLendingPageDataShort: ISnippetData = buildDemoLandingPage({
  taskBlock: demoLendingPageTaskShort,
  taskSup: '<p class=\'text-center\'>complete tasks to join our waitlist and get notified once we launched</p>',
  taskSub: demoSub,
});


export const demoLendingPageDataReferral: ISnippetData = buildDemoLandingPage({
  topBlock: {
    type: 'renderer:hero',
    props: {
      // heroImg: '/demo/banner-g662012572_1920.jpg',
      logoImg: '/demo/racoon-logo.png',
      logoMode: 'square'
    }
  },
  middleBlock: {
    type: 'demo:leaderboard',
    data: [
      { position: 1, name: 'Han Solo', points: 90 },
      { position: 2, name: 'Jabba The Hutt', points: 45 },
      { position: 3, name: 'R2-D2', points: 30 },
      { position: 4, name: 'Luke', points: 25 },
      { position: 5, name: 'Princess Leia', points: 20 },
      { position: 6, name: 'Darth Vader', points: 15 },
      { position: 7, name: 'Random Ewok ', points: 15 },
      { position: 8, name: 'Padme', points: 10 },
      { position: 9, name: 'Kylo Ren', points: 5 },
      { position: 10, name: 'Obi-Wan', points: 5 },
    ]
  },
  footerBlock: { type: 'html', data: '' },
  taskBlock: demoLendingPageTaskReferral,
  taskSup: '<p class=\'text-center\'>join our waitlist and invite friends to win our premium and ultra-rare NFTs</p>',
  taskSub: demoSub,
  footerAside: { type: 'demo:leaderboardStatus', data: { position: 10, name: 'Obi-Wan', points: 5 }, class: 'q-mb-md' },
});

export const demoLendingPageData: ISnippetData = buildDemoLandingPage({
  taskBlock: demoLendingPageTask,
  taskSup: '<p class=\'text-center\'>complete tasks to receive our NFT<br />and get role in Discord</p>',
  taskSub: demoSub,
});

function buildDemoLandingPage(opts: {
  taskBlock: ISnippetData,
  taskSup: string,
  taskSub: string,
  topBlock?: ISnippetData,
  middleBlock?: ISnippetData,
  footerBlock?: ISnippetData,
  footerAside?: ISnippetData,
}) {
  return {
    type: 'legacy:LandingPage',
    style: ['min-height: calc(100vh - 32px)', 'background-color: #16161f'],
    top: opts.topBlock || {
      heroImg: '/demo/banner-g662012572_1920.jpg',
      logoImg: '/demo/racoon-logo.png',
      logoMode: 'square'
    },
    middle: opts.middleBlock || {
      title: 'awesome demo web3 project',
      descriptionHtml: '<p>we are P2E game, metaverse experience and investment DAO at the same time!</p>\n' +
        '<p>join us &nbsp;<span class=\'text-h6\'>👉</span></p>'
    },
    footer: opts.footerBlock || {
      socialLinks: {
        telegram: 'https://t.me/clubeeo',
        discord: 'https://discord.gg/C6jHsjzZ3f'
      },
      smallTextHtml: 'this is <a href=\'https://clubeeo.com\' target=\'_blank\'>clubeeo.com</a> demo'
    },
    aside: {
      middle: {
        type: 'divs',
        items: [
          {
            type: 'html',
            data: opts.taskSup
          },
          opts.taskBlock,
          {
            type: 'html',
            data: opts.taskSub
          }
        ]
      },
      footer: opts.footerAside,
    },
  }
}
