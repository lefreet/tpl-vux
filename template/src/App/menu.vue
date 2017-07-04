<template>
  <div id="menu">
    <group :title="title">
      <cell v-for="(val, key) in menus" :title="key" :link="val" :key="key" is-link></cell>
    </group>
  </div>
</template>

<script>

import { Group, Cell } from 'vux'

const menus = {
  {{#demo}}
  'demo': '/demo'
  {{/demo}}
}

export default {
  components: { Group, Cell },
  data () {
    return {
      title: '导航菜单',
      menus: menus
    }
  }
}
</script>
