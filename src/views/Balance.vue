<template>
  <div>
    <div v-if="detail !== null">
      <v-container class="mt-6">
        <v-row>
          <v-col cols="4" class="color-primary--bg radius-5 p-4">
            <p class="font-24 font-weight-bold color-white">Balance</p>

            <p v-if="loading" class="font-18 mt-4 color-white">Loading...</p>
            <p v-else class="font-18 mt-4 color-white">
              {{ detail && nominalFormat }}
            </p>
          </v-col>
        </v-row>
      </v-container>

      <template v-if="statusFinish === 'order'">
        <v-container v-if="detail.status === 'empty'" class="mt-6">
          <v-row>
            <v-col cols="12">
              <p class="font-24 font-weight-bold mt-6">Balance Add Temporary</p>

              <p v-if="loading" class="font-18 mt-4 color-white">Loading...</p>
              <p v-else class="font-18 mt-4">{{ nominalTempFormat }}</p>
            </v-col>
          </v-row>

          <v-row class="mt-4">
            <v-col cols="4">
              <v-btn
                class="mr-2 mt-2"
                outlined
                color="primary"
                :disabled="loading"
                @click="addBalanceTemp(2000)"
              >
                Rp 2000
              </v-btn>

              <v-btn
                class="mr-2 mt-2"
                outlined
                color="primary"
                :disabled="loading"
                @click="addBalanceTemp(5000)"
              >
                Rp 5000
              </v-btn>

              <v-btn
                class="mr-2 mt-2"
                outlined
                color="primary"
                :disabled="loading"
                @click="addBalanceTemp(10000)"
              >
                Rp 10000
              </v-btn>

              <v-btn
                class="mr-2 mt-2"
                outlined
                color="primary"
                :disabled="loading"
                @click="addBalanceTemp(20000)"
              >
                Rp 20000
              </v-btn>

              <v-btn
                class="mr-2 mt-2"
                outlined
                color="primary"
                :disabled="loading"
                @click="addBalanceTemp(50000)"
              >
                Rp 50000
              </v-btn>
            </v-col>
          </v-row>

          <v-row class="mt-4">
            <v-col cols="4" class="text-right">
              <v-btn
                v-if="nominalTemp > 0"
                class="mr-2 mt-2"
                color="primary"
                outlined
                @click="cancelBalance()"
              >
                Cancel
              </v-btn>

              <v-btn
                class="mr-2 mt-2"
                color="primary"
                :disabled="loading"
                @click="addBalance()"
              >
                {{ loading ? 'Loading...' : 'Add Balance' }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>

        <v-container class="mt-6" v-if="detail.status === 'fill'">
          <v-row>
            <v-col cols="12">
              <p class="font-24 font-weight-bold">Menu</p>
            </v-col>
          </v-row>

          <v-row v-if="listProduct !== null">
            <v-col
              cols="2"
              v-for="(dt, indexKey) in listProduct.data"
              :key="indexKey"
            >
              <button class="width-full" @click="addOrder(dt)">
                <p>{{ dt.name }}</p>
                <p>Stock: {{ dt.qty }} pcs</p>
                <p>Price: {{ numberFormat(dt.price) }}</p>
              </button>
            </v-col>

            <!--<v-col cols="2">
              <button class="width-full">
                <p>Cokelat</p>
                <p>Stock: 5</p>
                <p>Price: Rp 15.000</p>
              </button>
            </v-col>-->
          </v-row>

          <v-row class="mt-4">
            <v-col cols="12">
              <v-btn
                depressed
                color="primary"
                :disabled="
                  loading ||
                  detail.nominal < totalOrder ||
                  listOrder.length === 0
                "
                @click="checkout"
              >
                Checkout
              </v-btn>

              <v-btn
                v-if="listOrder.length"
                class="ml-2"
                color="primary"
                outlined
                @click="listOrder = []"
              >
                Clear
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <template v-if="detail.status === 'fill' || statusFinish === 'finish'">
        <v-container>
          <v-row>
            <v-col cols="12">
              <p class="font-24 font-weight-bold">List order</p>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <ul v-if="listOrder.length">
                <li v-for="(dt2, indexKey2) in listOrder" :key="indexKey2">
                  {{ dt2.name }} / {{ dt2.qty }} pcs / Rp {{ dt2.price }}
                </li>
              </ul>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <p class="font-18 font-weight-bold">
                Total {{ numberFormat(totalOrder) }}
              </p>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <template v-if="statusFinish === 'finish' || statusFinish === 'cancel'">
        <v-container>
          <v-row>
            <v-col cols="12">
              <p class="font-18 font-weight-bold">
                Returns {{ numberFormat(nominalReturn) }}
              </p>

              <v-btn depressed color="primary" @click="okFinish"> Ok </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </div>
    <div class="mt-6" v-else>
      <v-container>
        <h3>Please wait...</h3>
      </v-container>
    </div>
  </div>
</template>

<script>
import { index, add } from '@/service/balance'
import { index as indexProduct } from '@/service/product'
import { add as addOrder } from '@/service/order'

export default {
  data() {
    return {
      loading: false,
      statusFinish: 'order',
      detail: null,
      nominalTemp: 0,
      listProduct: null,
      listOrder: [],
      nominalReturn: 0,
    }
  },

  computed: {
    nominalFormat() {
      const formattedNumber = this.detail.nominal.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
      })

      return formattedNumber
    },

    nominalTempFormat() {
      const formattedNumber = this.nominalTemp.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
      })

      return formattedNumber
    },

    totalOrder() {
      let total = 0

      if (this.listOrder.length) {
        this.listOrder.map((dt) => {
          total += dt.price
        })
      }

      return total
    },
  },

  created() {
    this.getProduct()
    this.getBalance()
  },

  methods: {
    numberFormat(nominal) {
      const formattedNumber = nominal.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
      })

      return formattedNumber
    },

    getBalance() {
      this.loading = true
      this.detail = null

      index()
        .then(({ data }) => {
          this.detail = data
        })
        .catch((err) => {})
        .finally(() => (this.loading = false))
    },

    getProduct() {
      this.listProduct = null

      indexProduct()
        .then(({ data }) => {
          this.listProduct = data
        })
        .catch((err) => {})
    },

    //finished
    okFinish() {
      this.listOrder = []
      this.nominalReturn = 0
      this.statusFinish = 'order'
    },

    //fill
    checkout() {
      this.loading = true
      this.detail = null

      let formData = {
        orders: this.listOrder,
      }

      addOrder(formData)
        .then(({ data }) => {
          this.nominalReturn = data.returns
          this.statusFinish = 'finish'
        })
        .catch((err) => {})
        .finally(() => {
          this.getBalance()
        })
    },

    addOrder(data) {
      const indexKey = this.listOrder.findIndex((item) => item.id === data.id)

      let { id, name, price } = data

      let dataTemp = {
        id,
        name,
        qty: 1,
        price,
      }

      if (indexKey !== -1) {
        this.listOrder[indexKey].qty += 1
        this.listOrder[indexKey].price += dataTemp.price
      } else {
        this.listOrder = [...this.listOrder, dataTemp]
      }
    },

    //empty
    addBalance() {
      this.loading = true
      this.detail = null

      let data = {
        nominal: this.nominalTemp,
      }

      add(data)
        .then(() => {
          this.nominalTemp = 0
        })
        .catch((err) => {})
        .finally(() => {
          this.getBalance()
        })
    },

    addBalanceTemp(nominal) {
      this.nominalTemp += nominal
    },

    cancelBalance() {
      this.nominalReturn = this.nominalTemp
      this.statusFinish = 'cancel'
      this.nominalTemp = 0
    },
  },
}
</script>