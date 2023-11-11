<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page padding>
    <!-- content -->
    <div class="q-pa-md items-start q-gutter-sm">
      <q-card class="my-card">
         <q-card-section>
          <div class="row items-start">
            <div class="col-xs-6 col-md-3 q-pa-sm" v-for="(prod, index) in productos" :key="index">
              <q-card class="my-card justify-center" flat bordered>
                <img
                  :src="rutaTienda + prod.img_pro" :alt="prod.nom_pro" style="height: 200px;"
                />
                <q-card-section>
                  <!-- <div class="text-overline text-orange-9">Overline</div> -->
                  <div class="text-h5 text-blue-6 text-center ellipsis q-mt-sm q-mb-xs">{{prod.nom_pro}}</div>
                  <div class="text-h6 text-blue-6 text-center ellipsis q-mt-sm q-mb-xs">{{formatPrice(prod.precio_ult)}}</div>
                  <!-- <div class="text-caption text-grey">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </div> -->
                </q-card-section>
                <q-card-actions class="justify-center">
                  <q-btn flat color="positive" :href="rutaTienda + '/MemberCompra/Carrito.aspx?P='+ prod.id_Prod" icon="shopping_cart" />
                </q-card-actions>
              </q-card>
            </div>
          </div>
         </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'
import { ref } from 'vue'

export default {
  // name: 'PageName',
  setup () {
    const prods=ref([])
    const productos=ref([])

    function consultarProductos(){
      api.post("Productos/consultarProductos", {
          }).then((res) => {
            this.productos=res.data
            console.log(this.productos)
          });
    }

    

    return {
      productos,
      rutaTienda:ref('https://compraloahora.com.mx/'),
      consultarProductos,
      
      formatPrice (value) {
        const val = (value / 1).toFixed(2)
        return '$' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      }
    }
    
  },

  mounted: function(){
    this.consultarProductos()
  }
  
}
</script>
