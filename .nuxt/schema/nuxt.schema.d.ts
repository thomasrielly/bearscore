export interface NuxtCustomSchema {
 appConfig?: {
  /**
   * Nuxt Icon
   * 
   * Configure Nuxt Icon module preferences.
   * 
  */
  nuxtIcon?: {
   /**
    * Icon Size
    * 
    * Set the default icon size. Set to false to disable the sizing of icon in style.
    * 
    * @default "1em"
    * 
    * @studioIcon material-symbols:format-size-rounded
   */
   size?: string | false,

   /**
    * CSS Class
    * 
    * Set the default CSS class.
    * 
    * @default ""
    * 
    * @studioIcon material-symbols:css
   */
   class?: string,

   /**
    * Icon aliases
    * 
    * Define Icon aliases to update them easily without code changes.
    * 
    * 
    * @studioIcon material-symbols:star-rounded
   */
   aliases?: { [alias: string]: string },

   /**
    * Iconify API Options
    * 
    * Define preferences for Iconify API fetch.
    * 
    * 
    * @studioIcon material-symbols:tv-options-input-settings
   */
   iconifyApiOptions?: {
    /**
     * Iconify API URL
     * 
     * Define a custom Iconify API URL. Useful if you want to use a self-hosted Iconify API. Learn more: https://iconify.design/docs/api.
     * 
     * @default "https://api.iconify.design"
     * 
     * @studioIcon material-symbols:api
    */
    url?: string,

    /**
     * Public Iconify API fallback
     * 
     * Define if the public Iconify API should be used as fallback.
     * 
     * @default false
     * 
     * @studioIcon material-symbols:public
    */
    publicApiFallback?: boolean,
   },
  },

  nui?: {
   BaseAccordion?: {
    /**
     * The action icon of the accordion.
     * 
     * @default "dot"
    */
    action?: 'dot' | 'chevron' | 'plus',

    /**
     * Default color for the accordion dot
     * 
     * @default "primary"
    */
    dotColor?: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'dark' | 'black',

    /**
     * The color of the accordion.
     * 
     * @default "default"
    */
    color?: 'default' | 'default-contrast' | 'muted' | 'muted-contrast',

    /**
     * The radius of the accordion.
     * 
     * @default "sm"
    */
    rounded?: 'none' | 'sm' | 'md' | 'lg',
   },

   BaseAvatar?: {
    /**
     * Default color for the avatar
     * 
     * @default "muted"
    */
    color?: 'white' | 'muted' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'pink' | 'yellow' | 'indigo' | 'violet',

    /**
     * The radius of the avatar.
     * 
     * @default "full"
    */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full',

    /**
     * The size of the avatar.
     * 
     * @default "sm"
    */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl',
   },

   BaseAvatarGroup?: {
    /**
     * The limit of avatars to display.
     * 
     * @default 4
    */
    limit?: number,

    /**
     * The size of the avatar group.
     * 
     * @default "sm"
    */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl',
   },

   BaseBreadcrumb?: {
    /**
     * Defines the hover color of the breadcrumb links
     * 
     * @default "primary"
    */
    color?: 'primary' | 'dark' | 'black',
   },

   BaseButton?: {
    /**
     * Default color for the BaseButton component
     * 
     * @default "default"
    */
    color?: 'default' | 'default-contrast' | 'muted' | 'muted-contrast' | 'light' | 'dark' | 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'none',

    /**
     * Default rounded for the BaseButton component
     * 
     * @default "md"
    */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full',

    /**
     * Default size for the BaseButton component
     * 
     * @default "md"
    */
    size?: 'sm' | 'md' | 'lg' | 'xl',

    /**
     * Default variant for the BaseButton component
     * 
     * @default "solid"
    */
    variant?: 'solid' | 'pastel' | 'outline',
   },

   BaseButtonAction?: {
    /**
     * Default color for the BaseButtonAction component
     * 
     * @default "default"
    */
    color?: 'default' | 'default-contrast' | 'muted' | 'muted-contrast' | 'light' | 'dark' | 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'none',

    /**
     * Default rounded for the BaseButtonAction component
     * 
     * @default "md"
    */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full',
   },

   BaseButtonClose?: {
    /**
     * Default color for the BaseButtonClose component
     * 
     * @default "default"
    */
    color?: 'default' | 'default-contrast' | 'muted' | 'muted-contrast' | 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'none',

    /**
     * Default rounded for the BaseButtonClose component
     * 
     * @default "full"
    */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full',

    /**
     * Default size for the BaseButtonClose component
     * 
     * @default "sm"
    */
    size?: 'xs' | 'sm' | 'md' | 'lg',
   },

   BaseButtonGroup?: any,

   BaseButtonIcon?: {
    /**
     * Default color for the BaseButtonIcon component
     * 
     * @default "default"
    */
    color?: 'default' | 'default-contrast' | 'muted' | 'muted-contrast' | 'light' | 'dark' | 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'none',

    /**
     * Default rounded for the BaseButtonIcon component
     * 
     * @default "md"
    */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full',

    /**
     * Default size for the BaseButton component
     * 
     * @default "md"
    */
    size?: 'sm' | 'md' | 'lg' | 'xl',
   },

   BaseCard?: {
    /**
     * Default color for the BaseCard component
     * 
     * @default "default"
    */
    color?: 'default' | 'default-contrast' | 'muted' | 'muted-contrast' | 'dark' | 'black' | 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'none',

    /**
     * Default rounded for the BaseCard component
     * 
     * @default "sm"
    */
    rounded?: 'none' | 'sm' | 'md' | 'lg',
   },

   BaseDropdown?: {
    /**
     * The color of the dropdown button.
     * 
     * @default "default"
    */
    buttonColor?: 'default' | 'default-contrast' | 'muted' | 'muted-contrast' | 'light' | 'dark' | 'black' | 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'none',

    /**
     * The color of the dropdown.
     * 
     * @default "default"
    */
    color?: 'default' | 'default-contrast' | 'muted' | 'muted-contrast' | 'none',

    /**
     * The placement of the dropdown via floating-ui
     * 
     * @default "bottom-start"
    */
    placement?: 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end',

    /**
     * Default rounded for the BaseDropdown component
     * 
     * @default "sm"
    */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full',

    /**
     * Default size for the BaseDropdown component menu
     * 
     * @default "md"
    */
    size?: 'md' | 'lg',

    /**
     * The variant of the dropdown.
     * 
     * @default "button"
    */
    variant?: 'button' | 'context' | 'text',
   },

   BaseDropdownDivider?: any,

   BaseDropdownItem?: {
    /**
     * The hover color of the dropdown item inner elements.
     * 
     * @default "primary"
    */
    color?: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'dark' | 'black',

    /**
     * The contrast of the dropdown item.
     * 
     * @default "default"
    */
    contrast?: 'default' | 'contrast',

    /**
     * The radius of the dropdown item.
     * 
     * @default "sm"
    */
    rounded?: 'none' | 'sm' | 'md' | 'lg',
   },

   BaseHeading?: {
    /**
     * The tag of the heading.
     * 
     * @default "p"
    */
    as?: string,

    /**
     * The lead of the heading.
     * 
     * @default "normal"
    */
    lead?: 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose',

    /**
     * The size of the heading.
     * 
     * @default "xl"
    */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl',

    /**
     * The weight of the heading.
     * 
     * @default "semibold"
    */
    weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold',
   },

   BaseIconBox?: {
    /**
     * The color of the icon box.
     * 
     * @default "default"
    */
    color?: 'default' | 'default-contrast' | 'muted' | 'muted-contrast' | 'dark' | 'light' | 'black' | 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'none',

    /**
     * The radius of the icon box.
     * 
     * @default "sm"
    */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full',

    /**
     * The size of the icon box.
     * 
     * @default "xs"
    */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl',

    /**
     * The variant of the icon box.
     * 
     * @default "solid"
    */
    variant?: 'solid' | 'outline' | 'pastel',
   },

   BaseKbd?: {
    /**
     * The color of the kbd.
     * 
     * @default "default"
    */
    color?: 'default' | 'muted' | 'none',

    /**
     * The radius of the kbd.
     * 
     * @default "sm"
    */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full',

    /**
     * The size of the kbd.
     * 
     * @default "sm"
    */
    size?: 'xs' | 'sm' | 'md' | 'lg',
   },

   BaseLink?: any,

   BaseList?: any,

   BaseListItem?: any,

   BaseMessage?: {
    /**
     * The color of the message.
     * 
     * @default "default"
    */
    color?: 'default' | 'default-contrast' | 'muted' | 'muted-muted' | 'primary' | 'info' | 'success' | 'warning' | 'danger',

    /**
     * The radius of the message.
     * 
     * @default "sm"
    */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full',

    /**
     * The default icons of the message.
     * 
    */
    defaultIcons?: {
                default?: string
                'default-contrast'?: string
                muted?: string
                'muted-contrast'?: string
                info?: string
                success?: string
                warning?: string
                danger?: string
                primary?: string
              },
   },

   BasePagination?: {
    /**
     * The color of the pagination.
     * 
     * @default "primary"
    */
    color?: 'primary' | 'dark' | 'black',

    /**
     * The radius of the pagination.
     * 
     * @default "sm"
    */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full',
   },

   BaseParagraph?: {
    /**
     * The tag of the paragraph.
     * 
     * @default "p"
    */
    as?: string,

    /**
     * The lead of the paragraph.
     * 
     * @default "normal"
    */
    lead?: 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose',

    /**
     * The size of the paragraph.
     * 
     * @default "md"
    */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl',

    /**
     * The weight of the paragraph.
     * 
     * @default "normal"
    */
    weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold',
   },

   BasePlaceholderPage?: {
    /**
     * The size of the placeholder image.
     * 
     * @default "xs"
    */
    imageSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
   },

   BasePlaceload?: any,

   BaseProgress?: {
    /**
     * The color of the progress.
     * 
     * @default "primary"
    */
    color?: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'light' | 'dark' | 'black',

    /**
     * The grey shade of the progress.
     * 
     * @default "default"
    */
    contrast?: 'default' | 'contrast',

    /**
     * The radius of the progress.
     * 
     * @default "full"
    */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full',

    /**
     * The size of the progress.
     * 
     * @default "sm"
    */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
   },

   BaseProgressCircle?: {
    /**
     * The color of the progress circle.
     * 
     * @default "primary"
    */
    color?: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'light' | 'dark' | 'black',
   },

   BaseProse?: {
    /**
     * The radius of the prose.
     * 
     * @default "none"
    */
    rounded?: 'none' | 'sm' | 'md' | 'lg',
   },

   BaseSnack?: {
    /**
     * The color of the snack.
     * 
     * @default "default"
    */
    color?: 'default' | 'default-contrast' | 'muted' | 'muted-contrast',

    /**
     * The size of the snack.
     * 
     * @default "md"
    */
    size?: 'xs' | 'sm' | 'md',
   },

   BaseTabs?: {
    /**
     * The color of the active tab.
     * 
     * @default "primary"
    */
    color?: 'default' | 'primary' | 'light' | 'dark' | 'black',

    /**
     * The alignment of the tabs.
     * 
     * @default "start"
    */
    justify?: 'start' | 'center' | 'end',

    /**
     * The type of the tabs.
     * 
     * @default "tabs"
    */
    type?: 'tabs' | 'box',
   },

   BaseTabSlider?: {
    /**
     * The color of the active tab.
     * 
     * @default "default"
    */
    color?: 'default' | 'default-contrast' | 'primary' | 'light' | 'dark' | 'black',

    /**
     * The alignment of the tabs.
     * 
     * @default "start"
    */
    justify?: 'start' | 'center' | 'end',

    /**
     * The radius of the tabs.
     * 
     * @default "lg"
    */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full',

    /**
     * The size of the tabs.
     * 
     * @default "md"
    */
    size?: 'sm' | 'md',
   },

   BaseTag?: {
    /**
     * The color of the tag.
     * 
     * @default "default"
    */
    color?: 'default' | 'default-contrast' | 'muted' | 'muted-contrast' | 'light' | 'dark' | 'black' | 'primary' | 'info' | 'success' | 'warning' | 'danger',

    /**
     * The radius of the tag.
     * 
     * @default "lg"
    */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full',

    /**
     * The size of the tag.
     * 
     * @default "md"
    */
    size?: 'sm' | 'md',

    /**
     * The variant of the tag.
     * 
     * @default "solid"
    */
    variant?: 'solid' | 'pastel' | 'outline',
   },

   BaseText?: {
    /**
     * The lead of the text span.
     * 
     * @default "normal"
    */
    lead?: 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose',

    /**
     * The size of the text span.
     * 
     * @default "md"
    */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl',

    /**
     * The weight of the text span.
     * 
     * @default "normal"
    */
    weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold',
   },

   BaseThemeSwitch?: {
    /**
     * Disables transitions when toggling between light and dark mode.
     * 
     * @default false
    */
    disableTransitions?: boolean,
   },

   BaseThemeToggle?: {
    /**
     * Disables transitions when toggling between light and dark mode.
     * 
     * @default false
    */
    disableTransitions?: boolean,
   },

   BaseAutocomplete?: {
    /**
     * The contrast of the autocomplete.
     * 
     * @default "default"
    */
    contrast?: 'default' | 'default-contrast' | 'muted' | 'muted-contrast',

    /**
     * Translation strings.
     * 
    */
    i18n?: Record<'empty' | 'pending', string>,

    /**
     * The radius of the autocomplete.
     * 
     * @default "sm"
    */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full',

    /**
     * The size of the autocomplete.
     * 
     * @default "md"
    */
    size?: 'sm' | 'md' | 'lg',
   },

   BaseAutocompleteItem?: {
    /**
     * The radius of the autocomplete item.
     * 
     * @default "sm"
    */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full',
   },

   BaseCheckbox?: {
    /**
     * Default color for the BaseCheckbox component
     * 
     * @default "default"
    */
    color?: 'default' | 'muted' | 'light' | 'dark' | 'black' | 'primary' | 'info' | 'success' | 'warning' | 'danger',

    /**
     * Default rounded for the BaseCheckbox component
     * 
     * @default "sm"
    */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full',
   },

   BaseCheckboxAnimated?: {
    /**
     * Default color for the BaseCheckbox component
     * 
     * @default "primary"
    */
    color?: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'light' | 'muted' | 'dark' | 'black',
   },

   BaseCheckboxHeadless?: any,

   BaseFullscreenDropfile?: {
    /**
     * The color of the icon.
     * 
     * @default "primary"
    */
    color?: 'primary' | 'dark' | 'black',
   },

   BaseInput?: {
    /**
     * The contrast of the input.
     * 
     * @default "default"
    */
    contrast?: 'default' | 'default-contrast' | 'muted' | 'muted-contrast',

    /**
     * The radius of the input.
     * 
     * @default "sm"
    */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full',

    /**
     * The size of the input.
     * 
     * @default "md"
    */
    size?: 'sm' | 'md' | 'lg',
   },

   BaseInputFile?: {
    /**
     * The contrast of the input.
     * 
     * @default "default"
    */
    contrast?: 'default' | 'default-contrast',

    /**
     * The radius of the input.
     * 
     * @default "sm"
    */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full',

    /**
     * The size of the input.
     * 
     * @default "md"
    */
    size?: 'sm' | 'md' | 'lg',

    /**
     * The translation strings for the input file.
     * 
    */
    i18n?: { empty: string; invalid: string; multiple: string },
   },

   BaseInputFileHeadless?: any,

   BaseInputNumber?: {
    /**
     * The contrast of the input.
     * 
     * @default "default"
    */
    contrast?: 'default' | 'default-contrast' | 'muted' | 'muted-contrast',

    /**
     * The radius of the input.
     * 
     * @default "sm"
    */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full',

    /**
     * The size of the input.
     * 
     * @default "md"
    */
    size?: 'sm' | 'md' | 'lg',
   },

   BaseInputHelpText?: {
    /**
     * The color of the text.
     * 
     * @default "default"
    */
    color?: 'default' | 'default-contrast' | 'muted' | 'muted-contrast' | 'light' | 'dark' | 'black' | 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'none',
   },

   BaseListbox?: {
    /**
     * The contrast of the input.
     * 
     * @default "default"
    */
    contrast?: 'default' | 'default-contrast' | 'muted' | 'muted-contrast',

    /**
     * The placement of the dropdown via floating-ui
     * 
     * @default "bottom-start"
    */
    placement?: 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end',

    /**
     * The radius of the input.
     * 
     * @default "sm"
    */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full',

    /**
     * The size of the input.
     * 
     * @default "md"
    */
    size?: 'sm' | 'md' | 'lg',
   },

   BaseListboxItem?: any,

   BaseRadio?: {
    /**
     * Default color for the BaseRadio component
     * 
     * @default "default"
    */
    color?: 'default' | 'light' | 'muted' | 'dark' | 'black' | 'primary' | 'info' | 'success' | 'warning' | 'danger',
   },

   BaseRadioHeadless?: any,

   BaseSelect?: {
    /**
     * The contrast of the select.
     * 
     * @default "default"
    */
    contrast?: 'default' | 'default-contrast' | 'muted' | 'muted-contrast',

    /**
     * The radius of the select.
     * 
     * @default "sm"
    */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full',

    /**
     * The size of the select.
     * 
     * @default "md"
    */
    size?: 'sm' | 'md' | 'lg',
   },

   BaseSwitchBall?: {
    /**
     * The color of the switch.
     * 
     * @default "primary"
    */
    color?: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'dark' | 'black',
   },

   BaseSwitchThin?: {
    /**
     * The color of the switch.
     * 
     * @default "primary"
    */
    color?: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'dark' | 'black',
   },

   BaseTextarea?: {
    /**
     * The contrast of the textarea.
     * 
     * @default "default"
    */
    contrast?: 'default' | 'default-contrast' | 'muted' | 'muted-contrast',

    /**
     * The radius of the textarea.
     * 
     * @default "sm"
    */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full',

    /**
     * The size of the textarea.
     * 
     * @default "md"
    */
    size?: 'sm' | 'md' | 'lg',
   },

   BaseTreeSelectItem?: {
    /**
     * The radius of the tree select item.
     * 
     * @default "sm"
    */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full',
   },
  },

  tairo?: {
   /** @default "Tairo" */
   title?: string,

   error?: {
    logo?: {
     /** @default "TairoLogo" */
     component?: string,

     props?: any,
    },
   },

   panels?: Array<{
    name: string,

    /**
     * 
     * @$default left
    */
    position?: 'left' | 'right',

    /**
     * 
     * @$default sm
    */
    size?: 'sm' | 'md',

    component: string,

    props?: {
    },

    /**
     * 
     * @$default true
    */
    overlay?: boolean,
   }>,

   topnav?: {
    circularMenu?: {
     /** @default true */
     enabled?: boolean,

     tools?: Array<{
      component?: string,

      props?: {
      },
     }>,
    },

    toolbar?: {
     /** @default true */
     enabled?: boolean,

     /** @default true */
     showTitle?: boolean,

     tools?: Array<{
      component?: string,

      props?: {
      },
     }>,
    },

    navigation?: {
     /** @default true */
     enabled?: boolean,

     logo?: {
      /** @default "TairoLogo" */
      component?: string,

      props?: any,
     },

     header?: {
      component?: any,

      props?: any,
     },

     items?: Array<{
      name: string,

      to?: string,

      activePath?: string,

      position?: 'start' | 'end',

      divider?: boolean,

      /**
       * 
       * @required name
      */
      icon?: {
       name: string,

       class?: string,
      },

      /**
       * 
       * @required name
      */
      component?: {
       component?: string,

       props?: {
       },
      },

      click?: () => any,
     }>,
    },

    footer?: {
     /** @default true */
     enabled?: boolean,

     logoSeparator?: {
      /** @default "TairoLogo" */
      component?: string,

      props?: any,
     },

     logo?: {
      /** @default "TairoLogoText" */
      component?: string,

      props?: any,
     },

     copyright?: {
      /** @default "" */
      name?: string,

      /** @default "" */
      to?: string,

      /** @default "" */
      since?: string,
     },

     links?: Array<{
      name: string,

      to: string,

      rel?: string,

      target?: string,
     }>,
    },
   },

   collapse?: {
    circularMenu?: {
     /** @default true */
     enabled?: boolean,

     tools?: Array<{
      component?: string,

      props?: {
      },
     }>,
    },

    toolbar?: {
     /** @default true */
     enabled?: boolean,

     /** @default true */
     showTitle?: boolean,

     /** @default false */
     showNavBurger?: boolean,

     tools?: Array<{
      component?: string,

      props?: {
      },
     }>,
    },

    navigation?: {
     /** @default true */
     enabled?: boolean,

     header?: {
      /** @default "" */
      component?: string,

      props?: any,
     },

     footer?: {
      /** @default "" */
      component?: string,

      props?: any,
     },

     items?: Array<{
      name: string,

      to?: string,

      activePath?: string,

      position?: 'start' | 'end',

      divider?: boolean,

      /**
       * 
       * @required name
      */
      icon?: {
       name: string,

       class?: string,
      },

      children?: Array<{
       name: string,

       to?: string,

       activePath?: string,

       position?: 'start' | 'end',

       /**
        * 
        * @required name
       */
       icon?: {
        name: string,

        class?: string,
       },
      }>,

      /**
       * 
       * @required name
      */
      component?: {
       name: string,

       props?: {
       },
      },

      click?: () => any,
     }>,
    },
   },

   sidebar?: {
    circularMenu?: {
     /** @default true */
     enabled?: boolean,

     tools?: Array<{
      component?: string,

      props?: {
      },
     }>,
    },

    toolbar?: {
     /** @default true */
     enabled?: boolean,

     /** @default true */
     showTitle?: boolean,

     /** @default false */
     showNavBurger?: boolean,

     tools?: Array<{
      component?: string,

      props?: {
      },
     }>,
    },

    navigation?: {
     /** @default true */
     enabled?: boolean,

     /** @default true */
     startOpen?: boolean,

     logo?: {
      /** @default "TairoLogo" */
      component?: string,

      props?: any,
     },

     items?: Array<{
      title: string,

      /**
       * 
       * @$default 10
      */
      order?: number,

      activePath?: string,

      /**
       * 
       * @$default start
      */
      position?: 'start' | 'end',

      component?: string,

      props?: {
      },

      /**
       * 
       * @required name
      */
      icon?: {
       name: string,

       class?: string,
      },

      to?: string,

      click?: () => any,

      /**
       * 
       * @required name
      */
      subsidebar?: {
       component?: string,

       props?: {
       },
      },
     }>,
    },
   },
  },
 },
}
export type CustomAppConfig = Exclude<NuxtCustomSchema['appConfig'], undefined>
type _CustomAppConfig = CustomAppConfig

declare module '@nuxt/schema' {
  interface NuxtConfig extends Omit<NuxtCustomSchema, 'appConfig'> {}
  interface NuxtOptions extends Omit<NuxtCustomSchema, 'appConfig'> {}
  interface CustomAppConfig extends _CustomAppConfig {}
}

declare module 'nuxt/schema' {
  interface NuxtConfig extends Omit<NuxtCustomSchema, 'appConfig'> {}
  interface NuxtOptions extends Omit<NuxtCustomSchema, 'appConfig'> {}
  interface CustomAppConfig extends _CustomAppConfig {}
}
