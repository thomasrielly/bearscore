/**
 * This file is used to configure the app
 *
 * If you have the "Cannot find name 'defineAppConfig'.ts(2304)" error
 * update the root tsconfig.json file to include the following:
 *
 *  "extends": "./.demo/.nuxt/tsconfig.json"
 *
 */

export default defineAppConfig({
  nuxtIcon: {},
  nui: {
    
  },
  tairo: {
    title: 'Bear Score',
    sidebar: {
      toolbar: {
        showNavBurger: true,
        tools: [
          {
            component: 'DemoThemeToggle',
            props: {
              disableTransitions: true,
            },
          },
          {
            component: 'DemoToolbarNotifications',
          },
          {
            component: 'DemoToolbarLanguage',
          },
          {
            component: 'DemoToolbarAccountMenu',
          },
        ],
      },
      circularMenu: {
        enabled: true,
        tools: [
          {
            component: 'DemoThemeToggle',
            props: {
              class: 'ms-auto',
              disableTransitions: true,
              inverted: true,
            },
          },
          {
            component: 'DemoCircularMenuLanguage',
          },
          {
            component: 'DemoCircularMenuNotifications',
          },
          {
            component: 'DemoCircularMenuActivity',
          },
        ],
      },
      navigation: {
        logo: {
          component: 'TairoLogo',
          props: { class: 'text-primary-600 h-6' },
        },
        items: [
          {
            title: 'Search',
            icon: { name: 'ph:magnifying-glass-duotone', class: 'w-5 h-5' },
            click: () => {
              const isOpen = useState('search-open', () => false)
              isOpen.value = true
            },
            position: 'end',
          },
          {
            title: 'My Account',
            component: 'DemoAccountMenu',
            position: 'end',
          },
        ],
      },
    },
    collapse: {
      toolbar: {
        enabled: true,
        showTitle: true,
        showNavBurger: true,
        tools: [
          {
            component: 'DemoThemeToggle',
          },
          {
            component: 'DemoToolbarLanguage',
          },
          {
            component: 'DemoToolbarNotifications',
          },
          {
            component: 'DemoToolbarActivity',
          },
          {
            component: 'DemoToolbarAccountMenu',
          },
        ],
      },
      circularMenu: {
        enabled: true,
        tools: [
          {
            component: 'DemoThemeToggle',
            props: {
              class: 'ms-auto',
              disableTransitions: true,
              inverted: true,
            },
          },
          {
            component: 'DemoCircularMenuLanguage',
          },
          {
            component: 'DemoCircularMenuNotifications',
          },
          {
            component: 'DemoCircularMenuActivity',
          },
        ],
      },
      navigation: {
        enabled: true,
        header: {
          component: 'DemoCollapseNavigationHeader',
        },
        footer: {
          component: 'DemoCollapseNavigationFooter',
        },
        items: [
          {
            name: 'Dashboards',
            icon: { name: 'ph:sidebar-duotone', class: 'w-5 h-5' },
            activePath: '/dashboards',
            children: [
              {
                name: 'Personal v1',
                to: '/dashboards',
                icon: { name: 'ph:coffee-duotone', class: 'w-4 h-4' },
              },
              {
                name: 'Personal v2',
                to: '/dashboards/personal-2',
                icon: { name: 'ph:chart-pie-slice-duotone', class: 'w-4 h-4' },
              },
              {
                name: 'Personal v3',
                to: '/dashboards/personal-3',
                icon: { name: 'ph:cactus-duotone', class: 'w-4 h-4' },
              },
              {
                name: 'Analytics',
                to: '/dashboards/analytics',
                icon: { name: 'ph:gauge-duotone', class: 'w-4 h-4' },
              },
              {
                name: 'Stocks',
                to: '/dashboards/stocks',
                icon: { name: 'ph:coin-duotone', class: 'w-4 h-4' },
              },
              {
                name: 'Sales',
                to: '/dashboards/sales',
                icon: { name: 'ph:shopping-cart-duotone', class: 'w-4 h-4' },
              },
            ],
          },
          {
            name: 'Layouts',
            icon: { name: 'ph:app-window-duotone', class: 'w-5 h-5' },
            activePath: '/layouts',
            children: [
              {
                name: 'List view v1',
                to: '/layouts',
                icon: { name: 'ph:list-bullets-duotone', class: 'w-4 h-4' },
              },
              {
                name: 'Score',
                to: '/score',
                icon: { name: 'ph:list-checks-duotone', class: 'w-4 h-4' },
              },
              {
                name: 'Table list v1',
                to: '/layouts/table-list-1',
                icon: { name: 'ph:table-duotone', class: 'w-4 h-4' },
              },
              {
                name: 'Card grid v1',
                to: '/layouts/card-grid-1',
                icon: { name: 'ph:circles-four-duotone', class: 'w-4 h-4' },
              },
            ],
          },
          {
            name: 'Projects',
            icon: { name: 'ph:suitcase-duotone', class: 'w-5 h-5' },
            activePath: '/layouts/projects/',
            children: [
              {
                name: 'Projects',
                to: '/layouts/projects/project-list-3',
                icon: { name: 'ph:leaf-duotone', class: 'w-4 h-4' },
              },
              {
                name: 'Project Details',
                to: '/layouts/projects/details',
                icon: {
                  name: 'ph:note-duotone',
                  class: 'w-4 h-4',
                },
              },
              {
                name: 'Kanban Board',
                to: '/layouts/projects/board',
                icon: { name: 'ph:circles-four-duotone', class: 'w-4 h-4' },
              },
            ],
          },
          {
            name: 'Auth',
            icon: { name: 'ph:lock-duotone', class: 'w-5 h-5' },
            activePath: '/layouts/projects/',
            children: [
              {
                name: 'Login',
                to: '/auth',
                icon: { name: 'ph:fingerprint-duotone', class: 'w-4 h-4' },
              },
              {
                name: 'Signup',
                to: '/auth/signup-1',
                icon: {
                  name: 'ph:plus-circle-duotone',
                  class: 'w-4 h-4',
                },
              },
              {
                name: 'Recover',
                to: '/auth',
                icon: { name: 'ph:lightning-duotone', class: 'w-4 h-4' },
              },
            ],
          },
          {
            name: 'Widgets',
            icon: { name: 'ph:nut-duotone', class: 'w-5 h-5' },
            activePath: '/dashboards/widgets',
            children: [
              {
                name: 'UI Widgets',
                to: '/dashboards/widgets',
                icon: { name: 'ph:square-half-duotone', class: 'w-4 h-4' },
              },
              {
                name: 'Creative Widgets',
                to: '/dashboards/widgets/creative',
                icon: {
                  name: 'ph:square-half-bottom-duotone',
                  class: 'w-4 h-4',
                },
              },
              {
                name: 'List Widgets',
                to: '/dashboards/widgets/list',
                icon: { name: 'ph:square-half-duotone', class: 'w-4 h-4' },
              },
            ],
          },
          {
            name: 'Divider',
            divider: true,
          },
          {
            name: 'Charts',
            icon: { name: 'ph:chart-pie-slice-duotone', class: 'w-5 h-5' },
            to: '/dashboards/charts',
          },
          {
            name: 'Wizard',
            icon: { name: 'ph:magic-wand-duotone', class: 'w-5 h-5' },
            to: '/wizard',
          },
          {
            name: 'Messaging',
            icon: { name: 'ph:chats-circle-duotone', class: 'w-5 h-5' },
            to: '/dashboards/messaging',
          },
          {
            name: 'Customize',
            icon: { name: 'ph:drop-half-bottom-duotone', class: 'w-5 h-5' },
            click: () => {
              const isSwitcherOpen = useState('switcher-open', () => false)
              isSwitcherOpen.value = true
            },
            position: 'end',
          },
        ],
      },
    },
    topnav: {
      navigation: {
        enabled: true,
        logo: {
          component: 'TairoLogo',
          props: { class: 'text-primary-600 h-10 w-10' },
        },
        header: {
          component: 'DemoTopnavWorkspaceDropdown',
        },
        items: [
          {
            name: 'Home',
            icon: { name: 'ph:gauge-duotone', class: 'w-6 h-6' },
            activePath: '/',
            to: '/',
          },
          {
            name: 'Offers',
            icon: { name: 'ph:suitcase-duotone', class: 'w-6 h-6' },
            activePath: '/offers',
            to: '/offers',
          },
          {
            name: 'Score',
            icon: { name: 'ph:users-duotone', class: 'w-6 h-6' },
            activePath: '/score',
            to: '/score',
          },
          {
            name: 'Resources',
            icon: { name: 'ph:note-duotone', class: 'w-6 h-6' },
            activePath: '/resources',
            to: '/resources',
          },
        ],
      },
      circularMenu: {
        enabled: false,
        tools: [
          {
            component: 'DemoThemeToggle',
            props: {
              class: 'ms-auto',
              disableTransitions: true,
              inverted: true,
            },
          },
          {
            component: 'DemoCircularMenuLanguage',
          },
          {
            component: 'DemoCircularMenuNotifications',
          },
          {
            component: 'DemoCircularMenuActivity',
          },
        ],
      },
      toolbar: {
        enabled: true,
        showTitle: false,
        tools: [
          {
            component: 'DemoThemeToggle',
            props: {
              disableTransitions: true,
            },
          },
          {
            component: 'DemoToolbarNotifications',
          },
          {
            component: 'DemoAccountMenu',
            props: {
              horizontal: true,
            },
          },
        ],
      },
      footer: {
        enabled: true,
        logoSeparator: {
          component: 'TairoLogo',
          props: { class: 'text-primary-500 h-5 w-5' },
        },
        logo: {
          component: 'TairoLogoText',
          props: {
            class:
              'text-muted-300 ltablet:mx-0 mx-auto h-4 transition-all duration-200 lg:mx-0',
          },
        },
        copyright: {
          name: '🐻 Bear Score',
          to: 'https://www.bearscore.gg',
          since: '2024',
        },
        links: [
          {
            name: 'Home',
            to: '/',
          },
          {
            name: 'Offers',
            to: '/offers',
          },
          {
            name: 'Score',
            to: '/pricing',
          },
          {
            name: 'Resources',
            to: '/resources',
          },
        ],
      },
    },
    panels: [
      {
        name: 'language',
        position: 'right',
        component: 'DemoPanelLanguage',
      },
      {
        name: 'activity',
        position: 'right',
        component: 'DemoPanelActivity',
      },
      {
        name: 'search',
        position: 'left',
        component: 'DemoPanelSearch',
      },
      {
        name: 'task',
        position: 'right',
        component: 'DemoPanelTask',
      },
    ],
    error: {
      logo: {
        component: 'img',
        props: {
          src: '/img/illustrations/system/404-1.svg',
          class: 'relative z-20 w-full max-w-lg mx-auto',
        },
      },
    },
  },
})
