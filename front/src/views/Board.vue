<template>
  <v-card>
    <v-toolbar
      color="deep-purple accent-4"
      dark
      flat
    >
      <template v-slot:extension>
        <v-tabs
          v-model="currentItem"
          background-color="transparent"
          fixed-tabs
          slider-color="white"
        >
          <v-tab
            v-for="item in items"
            :key="item"
            :href="'#tab-' + item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="currentItem">
      <v-tab-item
        v-for="item in items"
        :key="item"
        :value="'tab-' + item"
      >
        <v-card flat>
          <v-card-text>
            <h2>{{ item }}</h2>
            <div v-if="item === 'inetcop'">
              <Inetcop />
            </div>
            <div v-if="item === 'securion'">
              <Securion />
            </div>
            <div v-if="item === 'holdings'">
              <Holdings />
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
  import Inetcop from '../components/Inetcop';
  import Holdings from '../components/Holdings';
  import Securion from '../components/Securion';

  export default {
    data: () => ({
      currentItem: 'tab-Web',
      items: [
        'inetcop', 'securion', 'holdings',
      ],
    }),
    components: {
      Inetcop,
      Holdings,
      Securion,
    },
    methods: {
      addItem (item) {
        const removed = this.items.splice(0, 1)
        this.items.push(
          ...this.more.splice(this.more.indexOf(item), 1)
        )
        this.more.push(...removed)
        this.$nextTick(() => { this.currentItem = 'tab-' + item })
      },
    },
  }
</script>
