<template>
  <q-page padding>
    <!-- content -->
    <div class="q-pa-md">
      <q-card class="my-card">
        <q-card-section>
          <div class="q-pa-md q-gutter-sm">
            <q-btn color="negative" rounded label="Nuevo paciente" icon="person_add"  @click="mdlnvopac = true"  />
          </div>
          <div class="row">
                <div class="col-md-12">
                  <q-table
                    :grid="$q.screen.xs"
                    title="Tus pacientes"
                    dense
                    :rows="pacientes"
                    :columns="columns"
                    row-key="name"
                    :filter="filter"
                  >
                    <template v-slot:body-cell-id_paciente="props">
                      <q-td :props="props">
                        <q-btn
                          type="button"
                          flat
                          icon="edit"
                          color="positive"
                          @click="verPaciente(props.value)"
                        ></q-btn>
                        <q-btn
                          type="button"
                          flat
                          icon="description"
                          color="deep-orange"
                          @click="nuevoEstudio(props.value)"
                        ></q-btn>
                        <q-btn
                          type="button"
                          flat
                          icon="delete"
                          color="negative"
                          @click="comprobarEliminacion(props.value)"
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
                        <q-card class="col-xs-12 text-center" style="width:250px;">
                        <q-card-section>
                          <div class="text-left">
                            <p>Nombre Completo: {{props.row.nom_paciente}}</p>
                          </div>
                          <div class="text-left">
                            <p>CURP: {{props.row.curp}}</p>
                          </div>
                          <hr>
                          <div class="text-center">
                            <q-btn
                          type="button"
                          flat
                          icon="edit"
                          color="positive"
                          @click="verPaciente(props.row.id_paciente)"
                        ></q-btn>
                        <q-btn
                          type="button"
                          flat
                          icon="description"
                          color="deep-orange"
                          @click="nuevoEstudio(props.row.id_paciente)"
                        ></q-btn>
                        <q-btn
                          type="button"
                          flat
                          icon="delete"
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

<!-- Consultar Paciente -->

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

    <q-dialog
      v-model="mdlComp"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Eliminar paciente</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          ¿Desea eliminar al paciente {{txtnomEd}} {{txtappEd}} {{txtapmEd}}?
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn icon="check" flat rounded color="green-13" label="Sí" @click="eliminarPaciente()" />
          <q-btn icon="clear" flat rounded color="negative" label="No" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="mdlEstudio"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Nuevo estudio</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-tabs
            v-model="tabEst"
            no-caps
            class="bg-grey-1 text-black"
          >
        <q-tab name="nEstudio" label="Nuevo Estudio" />
        <q-tab name="rEstudios" label="Estudios" />
      </q-tabs>

      <q-tab-panels v-model="tabEst" animated>
        <q-tab-panel name="nEstudio">
           <div class="row justify-center">
            <div class="col-md-6 q-pa-sm">
             <q-input
                v-model="txtnomEst"
                label="Nombre del Estudio"
                :error="errornomEst" :error-message="msjErrorNomEst"
              >
              <template v-slot:prepend>
                    <q-icon name="description" />
                  </template>
             </q-input>
          </div>
          <div class="col-md-6 q-pa-sm">
            <q-uploader
                      v-model="txtEstudio"
                      label="Subir estudio"
                      dark
                      style="max-width: 250px"
                      hide-upload-btn
                      @added="agregarEstudio"
                      :auto-upload="false"
                    />
          </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>

        <q-tab-panels v-model="tabEst" animated>
           <q-tab-panel name="rEstudios">
            <div class="row">
              <div class="col-md-12">
                <q-table
                    :grid="$q.screen.xs"
                    title="Estudios"
                    dense
                    :rows="estudios"
                    :columns="columnsEst"
                    row-key="name"
                    :filter="filterEst"
                  >
                    <template v-slot:body-cell-id_estudio="props">
                      <q-td :props="props">
                        <q-btn
                          type="button"
                          flat
                          icon="visibility"
                          color="positive"
                          @click="verEstudio(props.value)"
                        ></q-btn>
                        <q-btn
                          type="button"
                          flat
                          icon="delete"
                          color="negative"
                          @click="desactivarEstudio(props.value)"
                        ></q-btn>
                      </q-td>
                    </template>
                    <template v-slot:top-right>
                      <q-input
                        borderless
                        dense
                        debounce="300"
                        v-model="filterEst"
                        placeholder="Buscar"
                      >
                        <template v-slot:append>
                          <q-icon name="search" />
                        </template>
                      </q-input>
                    </template>
                    <template v-slot:item="props">
                    <div class="q-pa-sm row items-start q-gutter-md">
                        <q-card class="text-center" style="width:250px;">
                        <q-card-section>
                          <div class="text-left">
                            <p>Nombre Estudio: {{props.row.nom_estudio}}</p>
                          </div>
                          <div class="text-left">
                            <p>Fecha: {{props.row.fecha_estudio}}</p>
                          </div>
                          <hr>
                          <div class="text-center">
                            <q-btn
                              type="button"
                              flat
                              icon="visibility"
                              color="positive"
                              @click="verEstudio(props.row.id_estudio)"
                        ></q-btn>
                        <q-btn
                          type="button"
                          flat
                          icon="delete"
                          color="negative"
                          @click="desactivarEstudio(props.row.id_estudio)"
                        ></q-btn>
                          </div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </template>
                  </q-table>
              </div>
            </div>
           </q-tab-panel>
        </q-tab-panels>
      </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn icon="check" flat rounded color="green-13" label="Registrar" @click="registrarEstudio()" />
          <q-btn icon="clear" flat rounded  color="negative" label="Cancelar" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import { api } from 'boot/axios'
import { ruta } from 'boot/rutas'
import { ref, defineComponent } from 'vue'
import { date } from 'quasar'
import Cookies from "js-cookie"
import { useQuasar, EventBus } from 'quasar'
import pacFile from 'src/mixins/paciente';

export default defineComponent ({
  name: 'PacientesPage',
  mixins:[pacFile],

  setup() {
    const bus = ref(null)
    const $q = useQuasar()
    const sangre = ref([{}])
    const slsangre=ref(1)
    const slsangreEd=ref(1)
    const errornom=ref(false)
    const errorapp=ref(false)
    const errornomEst=ref(false)
    const msjErrorNom=ref("")
    const msjErrorAp=ref("")
    const msjErrorNomEst=ref("")
    const idpac=ref(0)
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
    const txtnomEst=ref("")
    const fecha = new Date()
    const fechanacEd=ref("")
    const urlFoto=ref("")
    const fileFoto=ref(null)
    const fileEstudio=ref(null)
    const columns= ref([{
          name: "nom_paciente",
          required: true,
          label: "Nombre Completo",
          align: "center",
          field: "nom_paciente",
          sortable: true,
        },
        {
          name: "curp",
          align: "center",
          label: "CURP",
          field: "curp",
          sortable: true,
        },
        {
          name: "id_paciente",
          label: "",
          field: "id_paciente",
          align: "center",
        }
      ])

      const pacientes=ref([]);

       const columnsEst= ref([{
          name: "nom_estudio",
          required: true,
          label: "Nombre del estudio",
          align: "center",
          field: "nom_estudio",
          sortable: true,
        },
        {
          name: "fecha_estudio",
          align: "center",
          label: "Fecha",
          field: "fecha_estudio",
          sortable: true,
        },
        {
          name: "id_estudio",
          label: "",
          field: "id_estudio",
          align: "center",
        }
      ])

      const estudios=ref([]);

        function consultarTiposSangre(){
          api.get("Paciente/consultarTiposSangre", {}).then((res) => {
            console.log(res.data);
            sangre.value=res.data;
            this.$emit("consultarTiposSangre");
          });
        }

        function agregarFoto(file){
          console.log(file)
          fileFoto.value=file[0];
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
          }
        }

        function consultarPacientes(){
          api.post("Paciente/consultarPacientes", {
            token:Cookies.get("tokenLogged")
          }).then((res) => {
            console.log(res.data)
            this.pacientes=res.data;
          });
        }

        async function verPaciente(idpac){
          await this.verPacienteMix(idpac).then(data => {
             console.log(data)
              this.idpac=idpac
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
                  this.consultarPacientes()
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

        function comprobarEliminacion(idpac){
           api.post("Paciente/verPaciente", {
            id_paciente:idpac
          }).then((res) => {
            this.idpac=idpac
            this.txtnomEd=res.data.nom_paciente
            this.txtappEd=res.data.app_paciente
            this.txtapmEd=res.data.apm_paciente
            this.mdlComp=true;
          });
        }

        function eliminarPaciente(){
          api.put("Paciente/desactivarPaciente", {
            id_paciente:this.idpac
          }).then((res) => {
            if(res.data){
               $q.notify({
                    type: "positive",
                    message:
                      "Se ha eliminado al paciente con éxito",
                  });
              this.mdlComp=false;
              this.consultarPacientes()
            }
            else{
              $q.notify({
                    type: "negative",
                    message:
                      "Ha ocurrido un error al eliminar al paciente",
                  });
            }
          });
        }

        function agregarEstudio(file){
          fileEstudio.value=file[0];
        }

        function registrarEstudio(){
          let fd = new FormData();
          if(this.txtnomEst==null || this.txtnomEst==""){
            this.errornomEst=true;
            this.msjErrorNomEst="Ingrese el nombre del estudio"
          }
          else{
            if(this.fileEstudio!=null) {
              fd.append("estudio", this.fileEstudio);
              fd.append("nom_estudio", this.txtnomEst);
              fd.append("id_paciente", this.idpac);
              fd.append("token", Cookies.get("tokenLogged"))

              api.post("Estudios/registrarEstudio", fd, {}).then((res) => {
              if(res.data){
                $q.notify({
                    type: "positive",
                    message:
                      "Se ha registrado el estudio con éxito",
                  });
                  this.mdlEstudio=false
              }
              else{
                $q.notify({
                    type: "negative",
                    message:
                      "No se ha podido registrar el estudio. Intente en unos minutos",
                  });
              }
            });
            }
          }
        }

        function consultarEstudios(idpac){
          api.post("Estudios/consultarEstudios", {
            id_paciente:idpac
          }).then((res) => {
              this.estudios=res.data;
              console.log(this.estudios);
          });
        }

        function verEstudio(idest){
          api.post("Estudios/consultarUrlEstudio", {
            id_estudio:idest
          }).then((res) => {
              if(res.data!=null && res.data!=""){
                window.open(ruta + res.data.substring(10, res.data.length), '_blank')
              }
              else {
                $q.notify({
                    type: "negative",
                    message:
                      "El enlace está roto",
                  });
              }
          });
        }

        function nuevoEstudio(idpac){
          this.idpac=idpac
          this.mdlEstudio=true
          this.consultarEstudios(idpac)
        }
        
    return {
      bus: new EventBus(),
      mdlnvopac: ref(false),
      mdledit: ref(false),
      mdlComp: ref(false),
      mdlEstudio: ref(false),
      tabEst: ref('nEstudio'),
      fechanac: ref(fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear()),
      filter: ref(''),
      filterEst: ref(''),
      columns,
      columnsEst,
      fileFoto,
      fileEstudio,
      pacientes,
      estudios,
      sangre,
      slsangre,
      slsangreEd,
      idpac,
      txtnom,
      txtapp,
      txtapm,
      txtcurp,
      txtobs,
      txtnomEd,
      txtappEd,
      txtapmEd,
      txtcurpEd,
      txtnomEst,
      fechanacEd,
      txtobsEd,
      urlFoto,
      errornom,
      errorapp,
      errornomEst,
      msjErrorNom,
      msjErrorAp,
      msjErrorNomEst,
      agregarFoto,
      consultarTiposSangre,
      consultarPacientes,
      registrarPaciente,
      actualizarPaciente,
      comprobarEliminacion,
      eliminarPaciente,
      verPaciente,
      nuevoEstudio,
      agregarEstudio,
      registrarEstudio,
      consultarEstudios,
      verEstudio
    }
  },

  mounted: function (){ 
    this.consultarTiposSangre();
    this.consultarPacientes();
  },

  created: function (){
    this.bus.on('consultarTiposSangre', this.consultarTiposSangre())
  }
})

</script>

