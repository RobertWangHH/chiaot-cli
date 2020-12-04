import Layout from '../layout'

const home = r => require.ensure([], () => r(require('@/pages/Home')), 'home')

export default [{
  path: '/',
  component: Layout,
  children: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: home
    }
  ]
}]
