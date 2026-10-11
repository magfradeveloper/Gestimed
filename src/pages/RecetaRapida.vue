<template>
  <q-page>
    <div class="q-pa-md">
      <q-card class="my-card">
        <q-card-section>
          <div class="row q-pa-xs">
            <div class="col-xs-12 col-md-6 q-pa-xs">
              <q-input
                color="primary"
                v-model="txtnompacrecrap"
                label="Nombre del Paciente"
              >
                <template v-slot:prepend>
                  <q-icon name="account_circle" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-md-2 q-pa-xs">
              <q-input color="primary" v-model="txtedad" label="Edad">
                <template v-slot:prepend>
                  <q-icon name="account_circle" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-md-3 q-pa-xs">
              <q-toggle
                color="green"
                label="Incluir Observaciones en la Receta"
                v-model="includeObs"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-2 q-pa-xs">
              <q-input
                color="primary"
                v-model.number="txtpesoRecrap"
                label="Peso (kg)"
              >
                <template v-slot:prepend>
                  <q-icon name="monitor_weight" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-md-2 q-pa-xs">
              <q-input color="primary" v-model="txtestRecrap" label="Estatura">
                <template v-slot:prepend>
                  <q-icon name="height" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-md-2 q-pa-xs">
              <q-input color="primary" v-model="txtcinRecrap" label="Cintura">
                <template v-slot:prepend>
                  <q-icon name="straighten" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-md-2 q-pa-xs">
              <q-input
                color="primary"
                v-model="txtimcRecrap"
                disable
                label="IMC"
              >
                <template v-slot:prepend>
                  <q-icon name="accessibility" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-md-2 q-pa-xs">
              <q-input color="primary" v-model="txtpreRecrap" label="Presión">
                <template v-slot:prepend>
                  <q-icon name="favorite" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-md-2 q-pa-xs">
              <q-input
                color="primary"
                v-model="txttempRecrap"
                label="Temperatura"
              >
                <template v-slot:prepend>
                  <q-icon name="device_thermostat" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row q-pa-xs">
            <div class="col-md-12 col-xs-12 text-center q-pa-md">
              <q-input
                v-model="txtobsrecrap"
                label="Diágnóstico y/o observaciones"
                filled
                type="textarea"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-xs-12">
              <q-table
                :grid="$q.screen.xs"
                title="Receta Médica"
                dense
                :rows="medTablaRecrap"
                :columns="columns"
                row-key="name"
                :filter="filter"
              >
                <template #top-right>
                  <q-btn
                    color="dark"
                    icon-right="medication"
                    label="Nuevo Medicamento"
                    rounded
                    @click="mdlrecrap = true"
                    v-close-popup
                  />
                </template>
                <template v-slot:body-cell-id_medicamento="props">
                  <q-td :props="props">
                    <q-btn
                      type="button"
                      flat
                      icon="delete"
                      color="negative"
                      @click="eliminarRegistro(props.value)"
                    ></q-btn>
                  </q-td> </template
              ></q-table>
            </div>
          </div>
          <br />
          <div class="text-center">
            <q-btn
              color="dark"
              rounded
              :loading="progress[0].loading"
              @click="terminarConsulta()"
              >Terminar consulta
              <template v-slot:loading>
                <q-spinner-hourglass class="on-left" />
                Espere un momento
              </template>
            </q-btn>
          </div>
          <q-dialog v-model="mdlrecrap">
            <div class="row q-pa-xs">
              <div class="col-md-12 col-xs-12">
                <q-card>
                  <q-card-section>
                    <div class="text-h6">Medicamentos a recetar</div>
                  </q-card-section>
                  <q-card-section class="q-pt-none">
                    <div class="row">
                      <div class="col-xs-12 col-md-6 q-pa-sm">
                        <q-select
                          color="primary"
                          v-model="slmediRecrap"
                          use-input
                          label="Medicamento"
                          option-value="id_medicamento"
                          option-label="nom_medicamento"
                          :options="medicamentos"
                          @filter="filterFnMed"
                          @new-value="crearMedicamento"
                          behavior="menu"
                          clearable
                        >
                          <template v-slot:prepend>
                            <q-icon name="medication" />
                          </template>
                        </q-select>
                      </div>
                      <div class="col-xs-6 col-md-3 q-pa-sm">
                        <q-select
                          color="primary"
                          v-model="slCantidadRecrap"
                          label="Cantidad"
                          :options="cantidadRecrap"
                          emit-value
                          map-options
                          behavior="menu"
                        >
                        </q-select>
                      </div>
                      <div class="col-xs-6 col-md-3 q-pa-sm">
                        <q-select
                          color="primary"
                          v-model="slAdmonRecrap"
                          label="Vía Administración"
                          :options="vias"
                          option-value="idViaAdministracion"
                          option-label="nomViaAdministracion"
                          behavior="menu"
                        >
                        </q-select>
                      </div>
                      <div class="col-xs-6 col-md-4 q-pa-sm">
                        <q-input
                          color="primary"
                          v-model="txtdosisRecrap"
                          label="Dósis"
                        >
                        </q-input>
                      </div>
                      <div class="col-xs-6 col-md-4 q-pa-sm">
                        <q-select
                          color="primary"
                          v-model="slperRecrap"
                          label="Cada"
                          :options="periodoRecrap"
                          emit-value
                          map-options
                          behavior="menu"
                        >
                        </q-select>
                      </div>
                      <div class="col-xs-6 col-md-4 q-pa-sm">
                        <q-select
                          color="primary"
                          v-model="slapRecrap"
                          label="Lapso"
                          :options="lapso"
                          emit-value
                          map-options
                          behavior="menu"
                        >
                        </q-select>
                      </div>
                    </div>
                    <div class="row justify-center">
                      <div class="col-xs-6 col-md-4 q-pa-sm">
                        <q-input
                          color="primary"
                          v-model.number="txtdur"
                          label="Duración"
                        ></q-input>
                      </div>
                      <div class="col-xs-6 col-md-4 q-pa-sm">
                        <q-select
                          color="primary"
                          v-model="slTiempoDur"
                          label="Tiempo"
                          :options="tiempoDur"
                          emit-value
                          map-options
                          behavior="menu"
                        >
                        </q-select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 q-pa-xs">
                        <q-input
                          v-model="txtobsmedRecrap"
                          label="Notas del medicamento"
                          filled
                          type="textarea"
                        />
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-actions align="center" class="bg-white text-teal">
                    <q-btn
                      flat
                      icon="add_circle"
                      label="Agregar"
                      @click="agregarMedicamento()"
                      color="green-13"
                    />
                    <q-btn
                      flat
                      icon="check_circle"
                      label="Terminar receta"
                      color="blue-6"
                      v-close-popup
                    />
                  </q-card-actions>
                </q-card>
              </div>
            </div>
          </q-dialog>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { api } from "boot/axios";
import { ruta } from "boot/rutas";
import { ref, onMounted, computed } from "vue";
import { useQuasar, EventBus } from "quasar";
import Cookies from "js-cookie";

export default {
  setup() {
    const includeObs = ref(false);
    const idMedico = ref(0);
    const progress = ref([{ loading: false, percentage: 0 }]);
    const $q = useQuasar();
    const txtdur = ref(0);
    const slTiempoDur = ref(null);
    const txtpesoRecrap = ref("");
    const txtestRecrap = ref("");
    const txtpreRecrap = ref("");
    const txtcinRecrap = ref("");
    const txttempRecrap = ref("");
    const txtnompacrecrap = ref("");
    const txtobsrecrap = ref("");
    const txtedad = ref(0);
    const slmediRecrap = ref(null);
    const slperRecrap = ref(null);
    const slapRecrap = ref(null);
    const slCantidadRecrap = ref(null);
    const txtdosisRecrap = ref("");
    const medTablaRecrap = ref([]);
    const txtobsmedRecrap = ref("");
    const medicamentos = ref([]);
    const receta = ref(null);
    const slAdmonRecrap = ref([]);
    const vias = ref([{}]);
    const columns = ref([
      {
        name: "nom_medicamento",
        required: true,
        label: "Medicamento",
        align: "center",
        field: (row) => row.medicamento.nom_medicamento,
        sortable: true,
      },
      {
        name: "periodoTiempo",
        align: "center",
        label: "Cada",
        field: "periodoTiempoRecrap",
        sortable: true,
      },
      {
        name: "unidadTiempo",
        align: "center",
        label: "",
        field: "unidadTiempoRecrap",
        sortable: true,
      },
      {
        name: "dosis",
        align: "center",
        label: "",
        field: "dosis",
        sortable: true,
      },
      {
        name: "id_medicamento",
        label: "",
        field: "id_medicamento",
        align: "center",
        sortable: true,
      },
    ]);

    const txtimcRecrap = computed(() => {
      const peso = Number(txtpesoRecrap.value);
      const estatura = Number(txtestRecrap.value);

      if (
        txtpesoRecrap.value == null ||
        txtpesoRecrap.value === "" ||
        txtestRecrap.value == null ||
        txtestRecrap.value === "" ||
        !Number.isFinite(peso) ||
        !Number.isFinite(estatura) ||
        peso <= 0 ||
        estatura <= 0
      ) {
        return "";
      }

      return Number((peso / estatura ** 2).toFixed(2));
    });

    function consultarIdMedico() {
      api
        .post("Medicos/consultarIdMedico", {
          token: Cookies.get("tokenLogged"),
        })
        .then((res) => {
          idMedico.value = res.data;
        });
    }

    function getViasAdmon() {
      api.get("ViasAdministracion/getViasAdministracion", {}).then((res) => {
        vias.value = res.data;
      });
    }

    function crearMedicamento(valor, done) {
      const nombre = valor.trim();

      if (!nombre) {
        done();
        return;
      }

      done(
        {
          id_medicamento: null,
          nom_medicamento: nombre,
          esNuevo: true,
        },
        "add"
      );
    }

    function agregarMedicamento() {
      const seleccionado = this.slmediRecrap;
      let id_medicamento = 0;

      if (!seleccionado || !seleccionado.nom_medicamento) {
        return;
      }

      const esNuevo = seleccionado.esNuevo === true;

      if (this.slmediRecrap.id_medicamento == null) id_medicamento = null;
      else id_medicamento = this.slmediRecrap.id_medicamento;

      console.log(id_medicamento);
      console.log(this.slmediRecrap.nom_medicamento);

      this.medTablaRecrap.push({
        medicamento: {
          id_medicamento: esNuevo ? null : seleccionado.id_medicamento,
          nom_medicamento: seleccionado.nom_medicamento,
        },

        nomMedicamentoCapturado: esNuevo ? seleccionado.nom_medicamento : null,

        periodoTiempoRecrap: parseInt(this.slperRecrap),
        unidadTiempoRecrap: this.slapRecrap,
        duracionRecrap: this.txtdur,
        unidadTiempoDurRecrap: this.slTiempoDur,
        dosis: this.txtdosisRecrap,
        obsMedicamentoRecrap: this.txtobsmedRecrap,
        cantidadRecetaRapida: parseInt(this.slCantidadRecrap),
        viaAdministracion: this.slAdmonRecrap,
      });

      // this.limpiarControlesReceta();
    }

    function limpiarControlesReceta() {
      this.txtobsmedRecrap = "";
      this.txtdosisRecrap = "";
      this.slmediRecrap = null;
      this.slCantidadRecrap = null;
      this.slAdmonRecrap = null;
      this.slapRecrap = null;
      this.txtdur = 0;
      this.slTiempoDur = null;
    }

    function eliminarRegistro(idmed) {
      console.log(idmed);
      console.log(this.medTabla);
      const indice = this.medTablaRecrap.findIndex(
        (obj) => obj.id_medicamento === idmed
      );
      console.log(indice);
      this.medTablaRecrap.splice(indice, 1);
    }

    function terminarConsulta() {
      console.log("include ", this.includeObs);
      progress.value[0].loading = true;

      if (this.txtnompacrecrap == null || this.txtnompacrecrap == "") {
        $q.notify({
          type: "negative",
          message: "Ingrese el nombre del paciente",
        });
      } else {
        api
          .post("RecetaRapida/registrarReceta", {
            nomPaciente: this.txtnompacrecrap,
            edad: parseInt(this.txtedad),
            pesoRecrap: parseFloat(this.txtpesoRecrap) || 0,
            estaturaRecrap: parseFloat(this.txtestRecrap) || 0,
            presionRecrap: this.txtpreRecrap || "",
            imcRecrap: parseFloat(this.txtimcRecrap) || 0,
            cinturaRecrap: parseFloat(this.txtcinRecrap) || 0,
            temperaturaRecrap: parseFloat(this.txttempRecrap) || 0,
            observacionesRecetaRapida: this.txtobsrecrap,
            mostrarReceta: this.includeObs,
            medicamentos: this.medTablaRecrap,
            medico: {
              id_medico: this.idMedico,
            },
          })
          .then((res) => {
            progress.value[0].loading = false;

            // this.limpiarControles();

            window.open(
              ruta + res.data.substring(10, res.data.length),
              "_blank"
            );
          })
          .catch((error) => {
            progress.value[0].loading = false;

            $q.notify({
              type: "negative",
              message: "Ocurrió un error al generar la receta.",
            });
          });
      }
    }

    function limpiarControles() {
      this.txtnompacrecrap = "";
      this.txtedad = "";
      this.txtobsrecrap = "";
      this.medTablaRecrap = [];
    }

    onMounted(async () => {
      getViasAdmon();
      await consultarIdMedico();
    });

    return {
      txtpesoRecrap,
      txtestRecrap,
      txtpreRecrap,
      txtimcRecrap,
      txtcinRecrap,
      txttempRecrap,
      includeObs,
      receta,
      idMedico,
      progress,
      txtdur,
      slTiempoDur,
      txtnompacrecrap,
      txtobsrecrap,
      txtedad,
      slmediRecrap,
      slperRecrap,
      slapRecrap,
      slCantidadRecrap,
      txtobsmedRecrap,
      medicamentos,
      slAdmonRecrap,
      vias,
      periodoRecrap: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "22",
        "23",
        "24",
      ],
      cantidadRecrap: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      lapso: ["hrs", "día(s)"],
      tiempoDur: ["Dias", "Semanas", "Meses"],

      mdlrecrap: ref(false),
      medTablaRecrap,
      columns,
      txtdosisRecrap,

      agregarMedicamento,
      getViasAdmon,
      eliminarRegistro,
      terminarConsulta,
      consultarIdMedico,
      limpiarControles,
      limpiarControlesReceta,
      crearMedicamento,

      filterFnMed(val, update) {
        if (val === "") {
          update(() => {
            medicamentos.value = [];
          });
          return;
        }

        update(() => {
          api
            .post("Medicamentos/consultarTopMedicamentos", {
              medicamento: {
                nom_medicamento: val,
              },
              med: {
                token: Cookies.get("tokenLogged"),
              },
            })
            .then((res) => {
              console.log(res.data);
              medicamentos.value = res.data;
            });
        });
      },
    };
  },
};
</script>
