<template>
  <q-page padding>
    <!-- content -->
    <div class="q-pa-xl">
      <q-card class="my-card">
        <q-card-section>
          <div class="row">
            <div class="col-xs-12 col-md-4 q-pa-md">
              <q-input color="primary" v-model="txtnom" label="Nombre">
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
            </div>
            <div class="col-xs-12 col-md-4 q-pa-md">
              <q-input color="primary" v-model="txtapp" label="Apellido Paterno">
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
            </div>
            <div class="col-xs-12 col-md-4 q-pa-md">
              <q-input color="primary" v-model="txtapm" label="Apellido Materno">
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-6 q-pa-md">
              <q-input color="primary" v-model="txtced" label="Cédula Profesional">
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
            </div>
            <div class="col-xs-12 col-md-6 q-pa-md">
              <q-select
                  color="primary"
                  v-model="slesp"
                  label="Especialidad"
                  option-value="id_especialidad"
                  option-label="nom_especialidad"
                  :options="esp"
                  @filter="filterFn"
                  emit-value
                  map-options
                  use-input
                  behavior="menu"
                >
                  <template v-slot:prepend>
                    <q-icon name="masks" />
                  </template>
                </q-select>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-6 q-pa-md">
               <q-input color="primary" v-model="txtmail" label="Correo electrónico">
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
            </div>
            <div class="col-xs-12 col-md-6 q-pa-md">
               <q-input color="primary" v-model="txtcel" label="Celular">
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-6 q-pa-md">
              <q-input color="primary" v-model="txtpass" :type="isPwd ? 'password' : 'text'" label="Contraseña">
                  <template v-slot:append>
                        <q-icon
                          :name="isPwd ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwd = !isPwd"
                        />
                      </template>
                </q-input>
            </div>
            <div class="col-xs-12 col-md-6 q-pa-md">
              <q-input color="primary" v-model="txtpass2" :type="isPwd2 ? 'password' : 'text'" label="Confirmar Contraseña">
                  <template v-slot:append>
                        <q-icon
                          :name="isPwd2 ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwd2 = !isPwd2"
                        />
                      </template>
                </q-input>
            </div>
            <br>
          </div>
           <div class="q-pa-md">
            <div class="full-width row q-gutter-md items-start justify-center text-center">
                <q-uploader
                        v-model="txtlogo"
                        label="Logo de tu consultorio"
                        dark
                        hide-upload-btn
                        @added="agregarLogo"
                        :auto-upload="false"
                      />
                <q-uploader
                        v-model="txtFoto"
                        label="Tu foto"
                        dark
                        hide-upload-btn
                        @added="agregarFoto"
                        :auto-upload="false"
                      />
          </div>
           </div>
          
          <br>
          <div class="text-center">
              <q-btn
                color="green-13"
                style="width: 200px"
                rounded
                glossy
                @click="registrarMedico()"
              >Registrar
              <template v-slot:loading>
                <q-spinner-hourglass class="on-left" />
                    Loading...
              </template>
              </q-btn>
            </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import Cookies from "js-cookie";
import { useRouter } from 'vue-router'

export default {
  // name: 'PageName',
  setup(){
    const regex=new RegExp('^(?=.*\\d{2})(?=.*[\\u0021-\\u002b\\u003c-\\u0040]{2})(?=.*[A-Z]{3})(?=.*[a-z]{3})\\S{10}$')
    const regexEmail=new RegExp('^[^@]+@[^@]+\.[a-zA-Z]{2,}$')
    const esp = ref([{}])
    const espArray=ref([{}])
    const $q = useQuasar()
    const $router = useRouter()
    const slesp=ref(1)
    const fileLogo=ref(null)
    const fileFoto=ref(null)
    const txtnom=ref("")
    const txtapp=ref("")
    const txtapm=ref("")
    const txtcel=ref("")
    const txtced=ref("")
    const txtmail=ref("")
    const txtpass=ref("")
    const txtpass2=ref("")

    function consultarEspecialidades(){
      api.get("Medicos/consultarEspecialidades", {}).then((res) => {
            console.log(res.data);
            espArray.value=res.data;
            esp.value=this.espArray;
          });
    }

    function agregarLogo(file){
      fileLogo.value=file[0];
    }

    function agregarFoto(file){
      fileFoto.value=file[0];
    }

    function registrarMedico(){
      // console.log(regexEmail.test(this.txtmail))
      // console.log(regex.test(this.txtpass))
      let fd = new FormData();

      if(this.txtpass!==this.txtpass2){
        $q.notify({
                  type: "negative",
                  message:
                    "Las contraseñas no coinciden, valídelas y vuelva a intentarlo",
                });
      }
      else{
        if(this.txtapp==null || this.txtapp==""){
          $q.notify({
                    type: "negative",
                    message:
                      "Ingrese su apellido paterno",
                  });
        }
        else{
          if(this.txtced==null || this.txtced==""){
            $q.notify({
                    type: "negative",
                    message:
                      "Ingrese su número de cédula profesional.",
                  });
          }
          else{
            if(this.fileLogo != null) {
              fd.append("logo", this.fileLogo);
            }

            if(this.fileFoto != null){
              fd.append("foto", this.fileFoto);
            }

            fd.append("nom_medico", this.txtnom);
            fd.append("app_medico", this.txtapp);
            fd.append("apm_medico", this.txtapm);
            fd.append("email_med", this.txtmail);
            fd.append("cel_med", this.txtcel);
            fd.append("pass", this.txtpass);
            fd.append("cedula", this.txtced);
            fd.append("id_especialidad", this.slesp);
            
            api
            .post("Medicos/registrarMedico", fd, {}).then((res) => {
              console.log(res);
              if (res.data!==null && res.data!=="") {
                Cookies.set("tokenLogged", res.data);
                $router.push({path: '/Pacientes'})
              } else {
                $q.notify({
                  type: "negative",
                  message:
                    "Ha ocurrido un error, vuelva a intentarlo",
                });
              }
            });
          }
        }
      }
    }

    return {
      isPwd: ref(false),
      isPwd2: ref(false),
      slesp,
      esp,
      espArray,
      fileLogo,
      fileFoto,
      txtnom,
      txtapp,
      txtapm,
      txtcel,
      txtced,
      txtmail,
      txtpass,
      txtpass2,
      consultarEspecialidades,
      agregarLogo,
      agregarFoto,
      registrarMedico,

      filterFn (val, update) {
        if (val === '') {
          update(() => {
            esp.value = espArray.value
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          esp.value = espArray.value.filter(v => v.nom_especialidad.toLowerCase().indexOf(needle) > -1)
        })
      }
    }
  },

  mounted: function (){
    this.consultarEspecialidades();
  },
}
</script>
