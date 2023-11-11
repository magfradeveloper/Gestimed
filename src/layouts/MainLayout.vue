<template>
  <q-layout view="lHh Lpr lFf">
    <q-header glossy elevated>
      <q-toolbar class="bg-blue-6">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Mi Consultorio Médico
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

     <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
       class="bg-light-blue-10"
       elevated
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <!-- <q-item-label
              header
              class="text-white"
            >
            Essential Links
            </q-item-label> -->

             <EssentialLink
                v-for="link in essentialLinks"
                :key="link.title"
                v-bind="link"
                class="text-white"
              />
              <q-item
                clickable
                tag="a"
                @click="cerrarSesion()"
              >
              <q-item-section 
                class="text-white" 
                v-if="'logout'"
                avatar
              >
                <q-icon name="logout" />
              </q-item-section>

            <q-item-section>
              <q-item-label class="text-white">Cerrar Sesión</q-item-label>
            </q-item-section>
          </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" :src="rutaImg" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img :src="rutaFoto">
            </q-avatar>
            <div class="text-weight-bold text-black">{{nomDr}}</div>
          </div>
        </q-img>
      </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import Cookies from "js-cookie";
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import { ruta } from 'boot/rutas'

const linksList = [
  {
    title: "Panel de Control",
    // caption: "github.com/quasarframework",
    icon: "dashboard",
    link: "/",
  },
  {
    title: "Mis Pacientes",
    // caption: "github.com/quasarframework",
    icon: "people",
    link: "/#/Pacientes",
  },
  {
    title: "Consultas",
    // caption: "github.com/quasarframework",
    icon: "medical_services",
    link: "/#/Consultas",
  },
  {
    title: "Medicamentos",
    // caption: "github.com/quasarframework",
    icon: "medication",
    link: "/#/Medicamentos",
  },
  {
    title: "Quiero comprar",
    // caption: "github.com/quasarframework",
    icon: "shopping_cart",
    link: "/#/Compras",
  },
  // {
  //   title: 'Discord Chat Channel',
  //   caption: 'chat.quasar.dev',
  //   icon: 'chat',
  //   link: 'https://chat.quasar.dev'
  // },
  // {
  //   title: 'Forum',
  //   caption: 'forum.quasar.dev',
  //   icon: 'record_voice_over',
  //   link: 'https://forum.quasar.dev'
  // },
  // {
  //   title: 'Twitter',
  //   caption: '@quasarframework',
  //   icon: 'rss_feed',
  //   link: 'https://twitter.quasar.dev'
  // },
  // {
  //   title: 'Facebook',
  //   caption: '@QuasarFramework',
  //   icon: 'public',
  //   link: 'https://facebook.quasar.dev'
  // },
  // {
  //   title: 'Quasar Awesome',
  //   caption: 'Community Quasar projects',
  //   icon: 'favorite',
  //   link: 'https://awesome.quasar.dev'
  // }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const $q = useQuasar()
    const $router = useRouter()
    const nomDr=ref("")
    const rutaImg=ref("")
    const rutaFoto=ref("")

    async function validarSesion(){
      console.log(Cookies.get("tokenLogged"))
      if(Cookies.get("tokenLogged")==null || Cookies.get("tokenLogged")=='' || Cookies.get("tokenLogged")==undefined){
         $router.push({path: '/Login'})
      }
      else{
        await api.post("Medicos/validarSesion", {
              token: Cookies.get('tokenLogged')
            })
            .then((res) => {
              console.log(res.data)
              if (!res.data) {
                Cookies.remove('tokenLogged');
                $router.push({ path: '/#/Login' });
              }
            }).catch(e => {
              Cookies.remove('tokenLogged');
              $router.push({path: '/#/Login'})
            });
            
      }
    }

    function consultarDatosUsuario(){
      api.post("Medicos/consultarInfMedico", {
              token: Cookies.get('tokenLogged')
            })
            .then((res) => {
             this.nomDr="Dr. " + res.data.nom_medico + " " + res.data.app_medico + " " + res.data.apm_medico
             this.rutaImg=ruta+res.data.logo_med.substring(10, res.data.length);
             this.rutaFoto=ruta+res.data.foto_med.substring(10, res.data.length);
            });
    }

    function cerrarSesion(){
      api.post("Medicos/cerrarSesion", {
              token: Cookies.get('tokenLogged')
            })
            .then((res) => {
              if (res.data) {
                Cookies.remove('tokenLogged');
                $router.push({path: 'Login'})
              } else {
                $q.notify({
                  type: "negative",
                  message:
                    "No se ha podido cerrar la sesión, vuelva a intentarlo",
                });
              }
            });
      
    }

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      nomDr,
      rutaImg,
      rutaFoto,
      cerrarSesion,
      validarSesion,
      consultarDatosUsuario,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },

  mounted: function (){ 
    this.validarSesion();
  },

  created: function(){
    this.consultarDatosUsuario();
  }
})
</script>
