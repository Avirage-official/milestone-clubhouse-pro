import { uniqueId } from 'lodash'

export interface ChildItem {
  id?: number | string
  name?: string
  icon?: string
  children?: ChildItem[]
  item?: unknown
  url?: string
  color?: string
  disabled?: boolean
  subtitle?: string
  badge?: boolean
  badgeType?: string
  isPro?: boolean
}

export interface MenuItem {
  heading?: string
  name?: string
  icon?: string
  id?: number | string
  to?: string
  items?: MenuItem[]
  children?: ChildItem[]
  url?: string
  disabled?: boolean
  subtitle?: string
  badgeType?: string
  badge?: boolean
  isPro?: boolean
}

const SidebarContent: MenuItem[] = [
  {
    heading: 'Home',
    children: [
      {
        name: 'Dashboard',
        icon: 'solar:widget-2-linear',
        id: uniqueId(),
        url: '/dashboard',
      },
      {
        name: 'Manager Hub',
        icon: 'solar:users-group-rounded-linear',
        id: uniqueId(),
        url: '/managers-hub',
      },
      {
        name: 'Home Hub',
        icon: 'solar:home-smile-linear',
        id: uniqueId(),
        url: '/employee-home-hub',
      },
    ],
  },

  {
    heading: 'Pages',
    children: [
      {
        name: 'Table',
        icon: 'solar:server-linear',
        id: uniqueId(),
        url: '/utilities/table',
      },
      {
        name: 'Form',
        icon: 'solar:document-add-linear',
        id: uniqueId(),
        url: '/utilities/form',
      },
      {
        id: uniqueId(),
        name: 'My Profile',
        icon: 'solar:user-circle-linear',
        url: '/user-profile',
      },
    ],
  },
  {
    heading: 'Apps',
    children: [
      {
        id: uniqueId(),
        name: 'Work Notes',
        icon: 'solar:notes-linear',
        url: '/apps/notes',
      },
      {
        id: uniqueId(),
        name: 'Change Requests',
        icon: 'solar:ticker-star-linear',
        url: '/apps/tickets',
      },
      {
        id: uniqueId(),
        name: 'Approvals',
        icon: 'solar:checklist-minimalistic-linear',
        url: '/apps/manager-approvals',
      },
      {
        id: uniqueId(),
        name: 'HR · People & Onboarding',
        icon: 'solar:users-group-two-rounded-linear',
        url: '/apps/hr',
      },
      {
        id: uniqueId(),
        name: 'People Overview',
        icon: 'solar:users-group-rounded-linear',
        url: '/apps/team-overview',
        subtitle: 'HR',
      },
      {
        id: uniqueId(),
        name: 'My Team',
        icon: 'solar:users-group-rounded-linear',
        url: '/apps/team-overview',
        subtitle: 'Managers',
      },
      {
        name: 'Blogs',
        id: uniqueId(),
        icon: 'solar:sort-by-alphabet-linear',
        children: [
          {
            id: uniqueId(),
            name: 'Blog Post',
            url: '/apps/blog/post',
          },
          {
            id: uniqueId(),
            name: 'Blog Detail',
            url: '/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow',
          },
        ],
      },
    ],
  },
]

export default SidebarContent
