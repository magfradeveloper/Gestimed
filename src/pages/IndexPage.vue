<template>
  <q-page padding>
    <!-- <div class="row">
      <div class="col-md-12 text-center">
         <q-img src="../img/Logo.png" class="q-gutter-sm" style="height: 150px"></q-img>
        <h3>Página en construcción</h3>
      </div>
    </div> -->
    <div class="q-pa-md">
      <q-card class="my-card">
         <q-card-section>
          <div class="q-pa-md q-gutter-sm">
            <q-btn color="dark" rounded label="Crear Citas" icon="medication"  @click="mdlCita = true"  />
          </div>
            
              <div class="q-pa-md row items-start q-gutter-md">
                <div class="col-xs-12 col-md-4">
                  <q-card class="my-card">
                    <q-card-section class="bg-primary text-white">
                      <div class="row">
                        <div class="col-md-4">
                          <q-icon name="calendar_month" class="text-h3" />
                        </div>
                        <div class="col-md-6 text-left">
                           <div class="text-h6">Agenda</div>
                            <div class="text-subtitle2">Administra tu agenda</div>
                        </div>
                      </div>
                    </q-card-section>

                    <q-separator />

                    <q-card-actions align="right">
                      <q-btn flat color="positive" @click="mdlAgendar = true">Agendar Cita</q-btn>
                      <!-- <q-btn flat>Action 2</q-btn> -->
                    </q-card-actions>
                  </q-card>
                </div>
                <!-- <div class="col-xs-12 col-md-4">
                   <q-card class="my-card">
                    <q-card-section class="bg-blue-6 text-white">
                      <div class="row">
                        <div class="col-md-4">
                          <q-icon name="person" class="text-h3" />
                        </div>
                        <div class="col-md-6 text-left">
                           <div class="text-h6">Usuarios</div>
                            <div class="text-subtitle2">by John Doe</div>
                        </div>
                      </div>
                    </q-card-section>

                    <q-separator />

                    <q-card-actions align="right">
                      <q-btn flat color="positive" @click="mdlAgendar = true">Nuevo Usuario</q-btn>
                    </q-card-actions>
                  </q-card>
                </div> -->
                <!-- <div class="col-xs-12 col-md-4">
                   <q-card class="my-card">
                    <q-card-section class="bg-dark text-white">
                      <div class="row">
                        <div class="col-md-4">
                          <q-icon name="person" class="text-h3" />
                        </div>
                        <div class="col-md-6 text-left">
                           <div class="text-h6">Perfiles</div>
                            <div class="text-subtitle2">by John Doe</div>
                        </div>
                      </div>
                    </q-card-section>

                    <q-separator />

                    <q-card-actions align="right">
                      <q-btn flat color="positive" @click="mdlAgendar = true">Nuevo Perfil</q-btn>
                    </q-card-actions>
                  </q-card>
                </div> -->
            </div>

             <div class="row">
              <div class="col-md-12">
                <q-table
                    :grid="$q.screen.xs"
                    title="Tu Agenda"
                    dense
                    :rows="citas"
                    :columns="columns"
                    row-key="name"
                    :filter="filter"
                  >
                  <template v-slot:body-cell-id_cita="props">
                      <q-td :props="props">
                        <q-btn
                          type="button"
                          flat
                          icon="done"
                          color="positive"
                          @click="atenderConsulta(props.value)"
                        ></q-btn>
                        <q-btn
                          type="button"
                          flat
                          icon="close"
                          color="negative"
                          @click="comprobarEliminacionCita(props.value)"
                        ></q-btn>
                      </q-td>
                    </template>
                    <template v-slot:top-right>
                      <q-input
                        borderless
                        dense
                        debounce="300"
                        v-model="filter"
                        placeholder="Buscar"
                      >
                        <template v-slot:append>
                          <q-icon name="search" />
                        </template>
                      </q-input>
                    </template>
                     <template v-slot:item="props">
                    <div class="q-pa-sm row items-start q-gutter-md">
                        <q-card class="col-xs-12 text-center">
                        <q-card-section>
                          <div class="text-left">
                            <p>Nombre Completo: {{props.row.pac.nom_paciente}}</p>
                          </div>
                          <div class="text-left">
                            <p>Fecha: {{props.row.citas.hor.fechaAux}}</p>
                          </div>
                          <div class="text-left">
                            <p>Hora Inicio: {{props.row.citas.hora_inicioC}}</p>
                          </div>
                          <div class="text-left">
                            <p>Hora Inicio: {{props.row.citas.hora_inicioF}}</p>
                          </div>
                          <hr>
                          <div class="text-center">
                            <q-btn
                          type="button"
                          flat
                          icon="done"
                          color="positive"
                          @click="verPaciente(props.row.id_paciente)"
                        ></q-btn>
                        <q-btn
                          type="button"
                          flat
                          icon="close"
                          color="negative"
                          @click="comprobarEliminacion(props.row.id_paciente)"
                        ></q-btn>
                          </div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </template>
                  </q-table>
              </div>
             </div>
         </q-card-section>
      </q-card>
    </div>
     <q-dialog
      v-model="mdlCita"
      full-width
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Crear nuevas citas</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
           <div class="q-pa-sm">
              <div class="row">
                <div class="col-md-5">
                </div>
                <div class="col-xs-12 col-md-2">
                  <q-select
                    color="primary"
                    v-model="sldur"
                    label="Duración de las citas (Min.)"
                    :options="mins"
                    emit-value
                    map-options
                    behavior="menu"
                  >
                  </q-select>
                </div>
                <div class="col-md-5">
                </div>
              </div>
              <br>
              <div class="row text-center">
                <div class="col-xs-12 col-md-4 text-center">
                  <p>Fechas a escoger</p>
                  <q-date color="dark" v-model="fechas" today-btn multiple />
                </div>

                
                <div class="col-xs-12 col-md-4 text-center">
                  <p>Hora inicial</p>
                    <q-time color="dark" v-model="time" />
                </div>

                 <div class="col-xs-12 col-md-4 text-center">
                  <p>Hora final</p>
                    <q-time color="dark" v-model="timeFinal" />
                </div>
               
              </div>
            </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup @click="insertarCitas()" />
        </q-card-actions>
      </q-card>
    </q-dialog>


    <q-dialog
      v-model="mdlAgendar"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Nueva Cita a Agendar</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col-md-6 text-center">
              <q-select
                filled
                v-model="slpacientes"
                use-input
                label="Selecciona el paciente"
                option-value="id_paciente"
                option-label="nom_paciente"
                input-debounce="0"
                :options="pacientes"
                @filter="filterFn"
                emit-value
                map-options
                behavior="menu"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-xs-6 col-md-3 text-center">
              <q-btn color="positive" flat rounded label="Nvo. paciente" @click="mdlnvopac=true" icon="person_add" />
            </div>
            <div class="col-xs-6 col-md-3 text-center">
              <q-btn color="blue-6" flat rounded label="Act. paciente" @click="verPaciente()" icon="edit" />
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col-xs-12 col-md-6 text-center">
                  <q-date
                    color="dark"
                    v-model="fechaCita"
                    today-btn
                  />
                  <br>
                  <br>
                  <q-btn color="dark" rounded label="Buscar horarios" @click="consultarHorarios()" icon="search" />
            </div>
            <div class="col-xs-12 col-md-6">
              <div class="q-pa-md">
                <div class="q-gutter-md">
                  <q-select v-model="slhor" 
                      :options="horarios"
                      option-value="id_horario"
                      option-label="hora_inicio"
                      label="Horarios Disponibles"
                      behavior="menu"  />
                </div>
              </div>
              <q-input
                v-model="txtobscita"
                label="Notas previas a la consulta"
                filled
                type="textarea"
              />
              <p>{{fechaCita}}</p>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Crear Cita" color="positive" @click="insertarCitaPaciente()" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

<!-- Modal para agregar un nuevo paciente -->
      <q-dialog v-model="mdlnvopac">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Nuevo paciente</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
         <div class="row">
          <div class="col-xs-12 col-md-6 q-pa-xs">
            <q-uploader
                      v-model="txtimg"
                      label="Foto del paciente"
                      dark
                      style="max-width: 250px"
                      hide-upload-btn
                      @added="agregarFoto"
                      :auto-upload="false"
                    />
          </div>
          <div class="col-xs-12 col-md-6 q-pa-xs">
                <q-input color="primary" v-model="txtnom" label="Nombre" :error="errornom" :error-message="msjErrorNom">
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
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
            <div class="col-xs-12 col-md-8 q-pa-xs">
            <q-input color="primary" v-model="txtcurp" label="CURP">
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
          </div>
          <div class="col-xs-12 col-md-4 q-pa-xs">
            <q-input filled v-model="fechanac">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="fechanac" mask="DD/MM/YYYY" dark>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
            </q-input>
          </div>
        
         </div>
         <div class="row">
          <div class="col-xs-12 col-md-12 q-pa-xs">
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
        <div>
          <div class="col-xs-12 col-md-12 q-pa-xs">
             <q-input
              v-model="txtobs"
              label="Observaciones del paciente"
              filled
              type="textarea"
            />
          </div>
        </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Registrar" icon="check" rounded flat color="green-13" @click="registrarPaciente()" />
          <q-btn label="Cancelar" icon="clear" rounded flat color="negative" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
<!-- Termina el modal para agregar un nuevo paciente -->

     <q-dialog v-model="mdledit">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Consulta de paciente</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
         <div class="row">
          <div class="col-md-6 q-pa-xs text-center">
            <q-img
              :src="urlFoto"
              spinner-color="red"
              style="height: 154px; max-width: 175px"
            />
          </div>
          <div class="col-xs-12 col-md-6 q-pa-xs">
                <q-input color="primary" v-model="txtnomEd" label="Nombre" :error="errornomEd" :error-message="msjErrorNomEd">
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
                <q-input
                  color="primary"
                  v-model="txtappEd"
                  :error="errorappEd"
                  :error-message="msjErrorApEd"
                  label="Apellido Paterno"
                >
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
                <q-input
                  color="primary"
                  v-model="txtapmEd"
                  label="Apellido Materno"
                >
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
          </div>
          
         </div>
         <div class="row">
            <div class="col-xs-12 col-md-8 q-pa-xs">
            <q-input color="primary" v-model="txtcurpEd" label="CURP">
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
          </div>
          <div class="col-xs-12 col-md-4 q-pa-xs">
            <q-input filled v-model="fechanacEd">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="fechanacEd" mask="DD/MM/YYYY" dark>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Cerrar" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
            </q-input>
          </div>
        
         </div>
         <div class="row">
          <div class="col-xs-12 col-md-12 q-pa-xs">
            <q-select
                  color="primary"
                  v-model="slsangreEd"
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
        <div>
          <div class="col-xs-12 col-md-12 q-pa-xs">
             <q-input
                v-model="txtobsEd"
                label="Observaciones del paciente"
                filled
                type="textarea"
              />
          </div>
        </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Actualizar" icon="check" rounded flat color="green-13" @click="actualizarPaciente()" />
          <q-btn label="Cancelar" icon="clear" rounded flat color="negative" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>


    <q-dialog v-model="mdlConfirm">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Cancelar cita</div>
        </q-card-section>

        <q-card-section>
          <p>¿Esta seguro que desea cancelar la cita de las {{horaInicio}}?</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" icon="check" rounded flat color="green-13" @click="cancelarCita()" />
          <q-btn label="Cerrar" icon="clear" rounded flat color="negative" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import { api } from 'boot/axios'
import { ruta } from 'boot/rutas'
import { defineComponent } from 'vue'
import { ref } from 'vue'
import Cookies from "js-cookie";
import { useQuasar, EventBus } from 'quasar'
import paciente from 'src/mixins/paciente';
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'IndexPage',

  mixins:[paciente],

  setup() {
    const bus = ref(null)
    const $q = useQuasar()
    const $router = useRouter()
    const respuesta = ref(false)
    const fecha = new Date()
    const horarios=ref([])
    const slhor=ref(null)
    const sldur=ref(null)
    const slpacientes=ref(null)
    const txtobscita=ref('')

    const pacientes=ref([]);
    const citas=ref([]);
    const idCitaDash=ref(0);

    const sangre = ref([{}])
    const slsangre=ref(1)
    const slsangreEd=ref(1)
    const txtnom=ref("")
    const txtapp=ref("")
    const txtapm=ref("")
    const txtcurp=ref("")
    const txtobs=ref("")
    const txtnomEd=ref("")
    const txtappEd=ref("")
    const txtapmEd=ref("")
    const txtcurpEd=ref("")
    const txtobsEd=ref("")
    const fechanacEd=ref("")

    const horaInicio=ref("")
    const fileFoto=ref(null)

    const columns = ref([{
          name: "nom_paciente",
          required: true,
          label: "Nombre Completo",
          align: "center",
          field: row => row.pac.nom_paciente,
          sortable: true,
        },
        {
          name: "fechaAux",
          align: "center",
          label: "Fecha",
          field: row => row.citas.hor.fechaAux,
          sortable: true,
        },
        {
          name: "hora_inicioC",
          align: "center",
          label: "Hora Inicio",
          field: row => row.citas.hora_inicioC,
          sortable: true,
        },
        {
          name: "hora_finalC",
          align: "center",
          label: "Hora Final",
          field: row => row.citas.hora_finalC,
          sortable: true,
        },
        {
          name: "id_cita",
          label: "",
          field: row => row.citas.id_cita,
          align: "center",
        }
      ])

      function agregarFoto(file){
          console.log(file)
          fileFoto.value=file[0];
        }

    function consultarPacientes(){
          api.post("Paciente/consultarPacientes", {
            token:Cookies.get("tokenLogged")
          }).then((res) => {
            console.log(res.data)
            this.pacientes=res.data;
          });
    }

    function consultarHorarios(){
      //console.log("Prueba " + this.$route.params.id)
          api.post("Citas/consultarHorarios", {
            fechaAux:this.fechaCita
          }).then((res) => {
            console.log(res.data)
            this.horarios=res.data
          });
    }

    function consultarTopCitas(){
      api.get("Citas/consultarTopCitas", {
          }).then((res) => {
            console.log(res.data)
            this.citas=res.data
          });
    }

    function insertarCitaPaciente(){
      console.log("Prueba: " + this.slhor.id_horario)
      api.post("Citas/insertarCitaPaciente", {
            citas:{
              hora_inicioC:this.slhor.hora_inicio,
              hor: {
                id_horario:this.slhor.id_horario
              },
              obs_cita:this.txtobscita
            },
            pac:{
              id_paciente:this.slpacientes
            }
          }).then((res) => {
            console.log(res.data)
          });
    }

    function insertarCitas(){
      api.post("Citas/insertarCitas", {
           med:{
              token:Cookies.get("tokenLogged"),
            },
              fecha:this.fechas,
              hora_inicio:this.time,
              hora_final:this.timeFinal,
              duracion_cita:this.sldur
          }).then((res) => {
            console.log(res.data)
          });
    }

    function cancelarCita(){
       api.post("Citas/cancelarCita", {
           id_cita:this.idCitaDash
          }).then((res) => {
            console.log(res.data)
            if(res.data){
              $q.notify({
                type: "positive",
                message:
                  "Se cancelado la cita de manera exitosa.",
              });
            }
            else{
              $q.notify({
                type: "negative",
                message:
                  "Ha ocurrido un error al cancelar la cita, vuelva a intentar más tarde.",
              });
            }
      });
    }

    function atenderConsulta(idcita){
      this.idCitaDash=idcita
      api.post("Citas/atenderConsulta", {
        citas:{
          id_cita:parseInt(this.idCitaDash)
        }
      }).then((res) => {
          console.log(res.data)
          if(res.data){
            $router.push({path: '/Consultas/:' + this.idCitaDash})
          }
          else{
            $q.notify({
              type: "negative",
              message:
                "Ha ocurrido un error, vuelva a intentar más tarde.",
            });
          }
      });
      //$router.push({path: '/Consultas/:' + this.idCitaDash})
    }

    async function registrarPaciente(){
           let fd = new FormData();
          if(this.fileFoto!=null) {
            fd.append("foto", this.fileFoto);
          }
          if(this.txtnom=="" || this.txtapp==""){
            this.errornom=true;
            this.errorapp=true;
            this.msjErrorNom="Ingrese el nombre del paciente";
            this.msjErrorAp="Ingrese el apellido del paciente";
          }
          else{
            fd.append("nom_paciente", this.txtnom);
            fd.append("app_paciente", this.txtapp);
            fd.append("apm_paciente", this.txtapm);
            fd.append("curp", this.txtcurp);
            fd.append("fecha_nac", this.fechanac);
            fd.append("observaciones", this.txtobs);
            fd.append("tipo_sangre", this.slsangre);
            fd.append("token", Cookies.get("tokenLogged"));
            console.log(fd.get("foto"));
            await this.registrarPacienteMix(fd).then(data => {
              if(data){
                   $q.notify({
                      type: "positive",
                      message:
                        "Se ha registrado el paciente con éxito",
                        });
                        this.mdlnvopac=false
                        this.consultarPacientes()
              }
              else{
                  $q.notify({
                    type: "negative",
                    message:
                      "No se ha podido registrar al paciente. Intente en unos minutos",
                  });
              }
            })
            console.log("Prueba de respuesta: " + this.respuesta)
          }
        }

         function consultarTiposSangre(){
          api.get("Paciente/consultarTiposSangre", {}).then((res) => {
            console.log(res.data);
            sangre.value=res.data;
            this.$emit("consultarTiposSangre");
          });
        }

        async function verPaciente(){
          await this.verPacienteMix(this.slpacientes).then(data => {
             console.log(data)
              this.idpac=this.slpacientes
              this.txtnomEd=data.nom_paciente
              this.txtappEd=data.app_paciente
              this.txtapmEd=data.apm_paciente
              this.slsangreEd=data.id_sangre
              this.txtcurpEd=data.curp
              this.fechanacEd=data.fecha_nac
              this.txtobsEd=data.observaciones
              this.urlFoto=ruta + data.foto_paciente.substring(10, data.foto_paciente.length);
              this.mdledit=true
          })
        }

        async function actualizarPaciente(){
          console.log(this.slsangreEd)
          await this.actualizarPacienteMix(this.idpac, this.txtnomEd, this.txtappEd, this.txtapmEd, this.txtcurpEd, this.fechanacEd, this.txtobsEd, this.slsangreEd).then(data => {
              if(data){
                $q.notify({
                    type: "positive",
                    message:
                      "Se ha actualizado el paciente con éxito",
                  });
                  this.mdledit=false
              }
              else{
                  $q.notify({
                    type: "negative",
                    message:
                      "No se ha podido actualizado al paciente. Intente en unos minutos",
                  });
              }
            })
        }

        function comprobarEliminacionCita(idcita){
          this.idCitaDash=idcita
          api.post("Citas/consultarCita", {
           citas:{
              id_cita:idcita
            },
          }).then((res) => {
            console.log(res.data.citas.hora_inicioC)
            this.horaInicio=res.data.citas.hora_inicioC
            this.mdlConfirm=true
          });
        }

    return{
      bus: new EventBus(),
      fechanac: ref(fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear()),
      horarios,
      slhor,
      horaInicio,
      mdlCita: ref(false),
      respuesta,
      mdlAgendar: ref(false),
      mdlnvopac: ref(false),
      mdledit: ref(false),
      mdlConfirm: ref(false),
      sangre,
      fileFoto,
      slsangre,
      slsangreEd,
      txtnom,
      txtapp,
      txtapm,
      txtcurp,
      txtobs,
      txtnomEd,
      txtappEd,
      txtapmEd,
      txtcurpEd,
      columns,
      txtobscita,
      sldur,
      slpacientes,
      pacientes,
      citas,
      idCitaDash,
      fechas: ref([]),
      fechaCita: ref('2019/02/01'),
      time: ref('08:00'),
      timeFinal: ref('16:00'),
      mins:[15, 30, 45, 60, 120],
      agregarFoto,
      insertarCitas,
      insertarCitaPaciente,
      consultarTiposSangre,
      comprobarEliminacionCita,
      registrarPaciente,
      actualizarPaciente,
      consultarTopCitas,
      consultarHorarios,
      consultarPacientes,
      verPaciente,
      cancelarCita,
      atenderConsulta
    }
  },

  mounted: function (){
    this.consultarPacientes()
    this.consultarTopCitas()
    this.consultarTiposSangre()
  },

  created: function() {
    this.bus.emit('consultarTiposSangre')
  }
})
</script>
