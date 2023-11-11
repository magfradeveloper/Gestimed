<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page padding>
    <!-- content -->
         <div class="q-pa-lg q-gutter-lg">
          <q-card class="my-card">
            <q-card-section>
              <div class="row text-center">
                <div class="col-xs-12 col-md-4 q-pa-md text-center">
                  <q-card class="my-card">
                    <q-card-section class="bg-dark">
                      <q-img :src="rutaImg">
                        <div class="absolute-bottom bg-transparent">
                          <q-avatar size="56px" class="q-mb-sm">
                            <img :src="rutaFoto">
                          </q-avatar>
                          <div class="text-weight-bold text-white">Dr. Oscar Magallón Franco</div>
                          <div class="text-weight-bold text-white">Cédula Profesional: 0987654321 </div> 
                          <div class="text-weight-bold text-white">Especialidad: Médico General</div>
                          <div class="text-weight-bold text-white">Teléfono: 3531347546</div> 
                        </div>
                      </q-img>
                    </q-card-section>
                      <q-card-section>
                        <q-date color="dark" class="q-pa-sm" v-model="fecha"/>
                        <p>{{fecha}}</p>
                        <br>
                        <br>
                          <q-btn
                            class="q-pa-sm"
                            @click="consultarHorarios()"
                            color="green-13"
                            style="width: 200px"
                            rounded
                              >Buscar horarios
                          </q-btn>

                        <div class="q-pa-md" style="max-width: 300px">  
                          <div class="q-gutter-md">
                            <q-select 
                              v-model="slhor" 
                              :options="horarios"
                              option-value="id_horario"
                              option-label="hora_inicio"
                              label="Horario" 
                              behavior="menu"/>
                          </div>
                        </div>
                      </q-card-section>
                  </q-card>
                </div>
              
                <div class="col-xs-12 col-md-8 text-center">
                   <q-card class="my-card">
                      <q-card-section>
                        <div class="row">
                          <div class="col-md-4 q-pa-sm">
                             <q-input color="primary" v-model="txtnom" label="Nombre" :error="errornom" :error-message="msjErrorNom">
                                <template v-slot:prepend>
                                  <q-icon name="account_circle" />
                                </template>
                              </q-input>
                          </div>
                          <div class="col-md-4 q-pa-sm">
                            <q-input
                            color="primary"
                            v-model="txtapp"
                            :error="errorapp"
                            :error-message="msjErrorAp"
                            label="Apellido Paterno"
                          >
                              <template v-slot:prepend>
                                <q-icon name="account_circle" />
                              </template>
                            </q-input>
                          </div>
                         <div class="col-md-4 q-pa-sm">
                          <q-input
                            color="primary"
                            v-model="txtapm"
                            label="Apellido Materno"
                          >
                            <template v-slot:prepend>
                              <q-icon name="account_circle" />
                            </template>
                          </q-input>
                         </div>
                          
                        </div>

                        <div class="row">
                          <div class="col-xs-12 col-md-4 q-pa-sm">
                            <q-input color="primary" v-model="txtcurp" label="CURP">
                              <template v-slot:prepend>
                                <q-icon name="account_circle" />
                              </template>
                            </q-input>
                          </div>
                          <div class="col-xs-12 col-md-8 q-pa-sm">
                            <q-select
                              color="primary"
                              v-model="slsangre"
                              label="Tipo de sangre"
                              option-value="id_sangre"
                              option-label="tipo_sangre"
                              :options="sangre"
                              emit-value
                              map-options
                              behavior="menu"
                            >
                            <template v-slot:prepend>
                              <q-icon name="bloodtype" />
                            </template>
                            </q-select>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-xs-12 col-md-12 q-pa-md">
                            <q-input
                              v-model="txtobs"
                              label="Observaciones"
                              filled
                              type="textarea"
                            />
                          </div>
                        </div>
                        
                      </q-card-section>
                    </q-card>
                </div>
              </div>
            </q-card-section>
            <div class="text-center">
                          <q-btn
                            color="dark"
                            style="width: 200px"
                            @click="insertarCitaPaciente()"
                            rounded
                            >Registrar Cita
                            <template v-slot:loading>
                              <q-spinner-hourglass class="on-left" />
                              Espere un momento
                            </template>
                          </q-btn>
                  </div>
                  <br>
          </q-card>
    </div>

   
  </q-page>
</template>

<script>

import { ref } from 'vue'
import { api } from 'boot/axios'

export default {
  // name: 'PageName',
  setup() {
    const horarios=ref([])
    const slhor=ref(null)

    function insertarCitaPaciente(){
      console.log("Prueba: " + this.slhor.id_horario)
      api.post("Citas/insertarCitaPaciente", {
            citas:{
              hora_inicioC:this.slhor.hora_inicio,
              hor: {
                id_horario:this.slhor.id_horario
              }
            },
          }).then((res) => {
            console.log(res.data)
          });
    }

    function consultarHorarios(){
      //console.log("Prueba " + this.$route.params.id)
          api.post("Citas/consultarHorarios", {
            fechaAux:this.fecha
          }).then((res) => {
            console.log(res.data)
            this.horarios=res.data
          });
    }

    return{
      horarios,
      slhor,
      fecha: ref('2019/02/01'),
      consultarHorarios,
      insertarCitaPaciente
    }
  },

  mounted: function(){
    this.consultarHorarios()
  }
}
</script>
