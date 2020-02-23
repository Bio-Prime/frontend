export default {
  top: [
    {
      name: 'Home',
      url: '/home',
      icon: 'Home',
    },
    {
      name: 'Primers',
      icon: 'Layers',
      children: [
        {
          name: 'Analytics',
          url: '/apps/analytics',
        },
        {
          name: 'Tables',
          url: '/elements/tables',
        },
        {
          name: 'New',
          url: '/elements/forms',
        },
      ],
    },
    {
      divider: true,
    },
    {
      name: 'Export',
      icon: 'Cloud',
      children: [
        {
          name: 'Preview',
          url: '/apps/invoice',
        }
      ],
    },
  ],
  bottom: [
    {
      name: 'Account',
      url: '/dashboard',
      icon: 'User'
    },
  ],
};
