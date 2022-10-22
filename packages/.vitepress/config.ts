import { defineConfig } from 'vitepress'

const Guide = [
  { text: 'Get Started', link: '/guide/' },
]

const  CoreCategories = [
  { text: "useProp", link: "/composable/useProp/" }
]

const DefaultSideBar = [
  { text: 'Guide', items: Guide },
  { text: 'Core', items: CoreCategories },
]

export default defineConfig({
  title: 'Charrue Composable',
  description: 'Collection of essential Vue Composition Utilities',

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      {
        text: 'Guide',
        items: [
          { text: 'Guide', link: "/guide/" },
        ],
      },
    ],
    sidebar: {
      '/guide/': DefaultSideBar,
    },
  },
})
