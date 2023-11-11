<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page padding>
    <!-- content -->
    <div class="q-pa-md">
      <q-card class="my-card">
        <q-card-section>
          <div class="q-pa-md q-gutter-sm">
            <q-btn color="green-13" glossy rounded label="Nuevo medicamento" icon="medication"  @click="mdlnvomed = true"  />
          </div>
          <div class="row">
            <div class="col-md-12">
              <q-table
                    :grid="$q.screen.xs"
                    title="Tus medicamentos"
                    dense
                    :rows="medicamentos"
                    :columns="columns"
                    row-key="name"
                    :filter="filter"
                  >
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
                    <template v-slot:body-cell-id_medicamento="props">
                      <q-td :props="props">
                        <q-btn
                          type="button"
                          flat
                          icon="edit"
                          color="positive"
                          @click="verMedicamento(props.value)"
                        ></q-btn>
                        <q-btn
                          type="button"
                          flat
                          icon="delete"
                          color="negative"
                          @click="eliminarMedicamento(props.value)"
                        ></q-btn>
                      </q-td>
                    </template>
              </q-table>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <q-dialog v-model="mdlnvomed">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">Nuevo medicamento</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
         <div class="row">
          <div class="col-xs-12 col-md-12 q-pa-xs">
                <q-input color="primary" v-model="txtnommed" label="Nombre del medicamento" :error="errornom" :error-message="msjErrorNom">
                  <template v-slot:prepend>
                    <q-icon name="medication" />
                  </template>
                </q-input>
          </div>
          
         </div>
        <div>
          <div class="col-xs-12 col-md-12 q-pa-xs">
             <q-input
              v-model="txtobsmed"
              label="Observaciones del medicamento"
              filled
              type="textarea"
            />
          </div>
        </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Registrar" icon="check" rounded flat color="green-13" @click="addMedicamento()" />
          <q-btn label="Cancelar" icon="clear" rounded flat color="negative" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="mdlupdmed">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">Modificar medicamento</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
         <div class="row">
          <div class="col-xs-12 col-md-12 q-pa-xs">
                <q-input color="primary" v-model="txtnommedupd" label="Nombre del medicamento" :error="errornom" :error-message="msjErrorNom">
                  <template v-slot:prepend>
                    <q-icon name="medication" />
                  </template>
                </q-input>
          </div>
          
         </div>
        <div>
          <div class="col-xs-12 col-md-12 q-pa-xs">
             <q-input
              v-model="txtobsmedupd"
              label="Observaciones del medicamento"
              filled
              type="textarea"
            />
          </div>
        </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Actualizar" icon="check" rounded flat color="green-13" @click="actualizarMedicamento()" />
          <q-btn label="Cancelar" icon="clear" rounded flat color="negative" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import { api } from 'boot/axios'
import { ruta } from 'boot/rutas'
import { ref } from 'vue'
import Cookies from "js-cookie";
import { useQuasar, EventBus } from 'quasar'

export default {
  // name: 'PageName',
  setup(){
    const columns= ref([{
          name: "nom_medicamento",
          required: true,
          label: "Nombre del medicamento",
          align: "center",
          field: "nom_medicamento",
          sortable: true,
        },
        {
          name: "id_medicamento",
          label: "",
          field: "id_medicamento",
          align: "center",
        }
      ])

      const $q = useQuasar()
      const medicamentos=ref([])
      const medArray=ref([])

      const txtnommed=ref("")
      const txtobsmed=ref("")
      const txtnommedupd=ref('')
      const txtobsmedupd=ref('')
      const idmed=ref(0)

      function addMedicamento(){
        if (this.txtnommed.length > 0) {
            api.post("Medicamentos/insertarMedicamento", {
              medicamento:{
                nom_medicamento:this.txtnommed,
                obs_medicamento:this.txtobsmed,
              },
              med:{
                token:Cookies.get("tokenLogged")
              },
              existencia_det:0,
              estatus_det:1
            }).then((res) => {
              if(res.data){
                $q.notify({
                    type: "positive",
                    message:
                      "Se ha registrado el medicamento con éxito",
                  });
                  this.consultarMedicamentos()
              }
              else {
                $q.notify({
                    type: "negative",
                    message:
                      "No se pudo registrar el medicamento. Inténtelo más tarde",
                  });
              }
               this.mdlnvomed=false
            });
        }
      }

      function verMedicamento(idmed){
          this.idmed=idmed
          api.post("Medicamentos/verMedicamento", {
            id_medicamento:idmed
          }).then((res) => {
            console.log(res.data)
            this.txtnommedupd=res.data.nom_medicamento
            this.txtobsmedupd=res.data.obs_medicamento
            this.mdlupdmed=true
          });
        }

        function actualizarMedicamento(){
          api.post("Medicamentos/actualizarMedicamento", {
                id_medicamento:this.idmed,
                nom_medicamento:this.txtnommedupd,
                obs_medicamento:this.txtobsmedupd,
          }).then((res) => {
            if(res.data){
                $q.notify({
                    type: "positive",
                    message:
                      "Se ha actualizado el medicamento con éxito",
                  });
                  this.consultarMedicamentos()
                  this.mdlupdmed=false
              }
              else{
                 $q.notify({
                    type: "negative",
                    message:
                      "Hubo un error al actualizar el medicamento. Inténtelo más tarde",
                  });
              }
          });
        }

      function consultarMedicamentos(){
         api.post("Medicamentos/consultarMedicamentos", {
            token:Cookies.get("tokenLogged")
          }).then((res) => {
            console.log(res.data)
            this.medicamentos=res.data;
          });
      }

      return {
        columns,
        txtnommed,
        txtobsmed,
        txtnommedupd,
        txtobsmedupd,
        mdlnvomed: ref(false),
        mdlupdmed: ref(false),
        idmed,
        medicamentos,
        filter: ref(''),
        addMedicamento,
        consultarMedicamentos,
        verMedicamento,
        actualizarMedicamento
      }
  },

  mounted: function (){ 
    this.consultarMedicamentos();
  }
}
</script>
