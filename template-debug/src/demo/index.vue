<template>
  <div id="menu">
    <group :title="title">
      <cell v-for="row in list" :title="row.name" :link="row.url" :key="row.id" :inline-desc="row.description" is-link></cell>
    </group>
  </div>
</template>

<script>

import { Group, Cell } from 'vux'
import api from './api.js'

export default {
  components: { Group, Cell },
  data () {
    return {
      title: '开发指南',
      list: []
    }
  },
  mounted () {
    api.get(list => {
      this.list = list
    })
  }
}

</script>
