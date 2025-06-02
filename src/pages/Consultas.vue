<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page>
    <!-- content -->
    <q-tabs v-model="tab" indicator-color="yellow" class="bg-blue-6 text-white">
      <q-tab name="nConsulta" icon="medical_services" label="Nueva consulta" />
      <q-tab name="rConsultas" icon="wysiwyg" label="Tus consultas" />
    </q-tabs>
    <div class="q-pa-md">
      <q-card class="my-card">
        <q-card-section>
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="nConsulta" padding>
              <div class="row q-pa-xs">
                <div class="col-xs-12 col-md-4 q-pa-xs">
                  <q-select
                    color="primary"
                    v-model="slpac"
                    use-input
                    ref="slPaciente"
                    label="Selecciona el paciente"
                    option-value="id_paciente"
                    option-label="nom_paciente"
                    :disable="disable"
                    :options="pacientes"
                    @filter="filterFn"
                    emit-value
                    map-options
                    behavior="menu"
                  >
                    <template v-slot:prepend>
                      <q-icon name="account_circle" />
                    </template>
                  </q-select>
                </div>
                <div class="col-xs-12 col-md-2 q-pa-xs">
                  <q-input
                    color="primary"
                    v-model.number="txtpeso"
                    label="Peso (kg)"
                  >
                    <template v-slot:prepend>
                      <q-icon name="monitor_weight" />
                    </template>
                  </q-input>
                </div>
                <div class="col-xs-12 col-md-2 q-pa-xs">
                  <q-input color="primary" v-model="txtest" label="Estatura">
                    <template v-slot:prepend>
                      <q-icon name="height" />
                    </template>
                  </q-input>
                </div>
                <div class="col-xs-12 col-md-2 q-pa-xs">
                  <q-input color="primary" v-model="txtpre" label="Presión">
                    <template v-slot:prepend>
                      <q-icon name="favorite" />
                    </template>
                  </q-input>
                </div>
                <div class="col-xs-12 col-md-2 q-pa-xs">
                  <q-input color="primary" v-model="txtimc" label="IMC">
                    <template v-slot:prepend>
                      <q-icon name="accessibility" />
                    </template>
                  </q-input>
                </div>
                <div class="col-xs-12 col-md-2 q-pa-xs">
                  <q-input color="primary" v-model="txtcin" label="Cintura">
                    <template v-slot:prepend>
                      <q-icon name="straighten" />
                    </template>
                  </q-input>
                </div>
                <div class="col-xs-12 col-md-2 q-pa-xs">
                  <q-input
                    color="primary"
                    v-model="txttemp"
                    label="Temperatura"
                  >
                    <template v-slot:prepend>
                      <q-icon name="device_thermostat" />
                    </template>
                  </q-input>
                </div>
                <div class="col-xs-12 col-md-2 q-pa-xs" v-if="visible">
                  <q-input color="primary" v-model="txtpcb" label="PCB">
                    <template v-slot:prepend>
                      <q-icon name="device_thermostat" />
                    </template>
                  </q-input>
                </div>
                <div class="col-xs-12 col-md-2 q-pa-xs" v-if="visible">
                  <q-input color="primary" v-model="txtpct" label="PCT">
                    <template v-slot:prepend>
                      <q-icon name="device_thermostat" />
                    </template>
                  </q-input>
                </div>
                <div class="col-xs-12 col-md-2 q-pa-xs" v-if="visible">
                  <q-input color="primary" v-model="txtcmb" label="CMB">
                    <template v-slot:prepend>
                      <q-icon name="fastfood" />
                    </template>
                  </q-input>
                </div>
              </div>
              <div>
                <div class="col-md-12 text-center q-pa-md">
                  <q-input
                    v-model="txtobs"
                    label="Diágnóstico y/o observaciones"
                    filled
                    type="textarea"
                  />
                </div>
              </div>
              <q-card-section>
                <div class="row">
                  <div class="col-md-6 q-pa-xs">
                    <div class="col-xs-12 col-md-4 q-pa-md text-center">
                      <q-btn
                        label="Nuevo Medicamento"
                        icon="medication"
                        rounded
                        color="dark"
                        @click="mdlrec = true"
                        v-close-popup
                      />
                    </div>
                    <q-table
                      :grid="$q.screen.xs"
                      title="Receta Médica"
                      dense
                      :rows="medTabla"
                      :columns="columns"
                      row-key="name"
                      :filter="filter"
                    >
                      <template v-slot:body-cell-id_medicamento="props">
                        <q-td :props="props">
                          <q-btn
                            type="button"
                            flat
                            icon="delete"
                            color="negative"
                            @click="eliminarRegistro(props.value)"
                          ></q-btn>
                        </q-td>
                      </template>
                      <template v-slot:top-right>
                        <q-input
                          borderless
                          dense
                          debounce="300"
                          v-model="filter"
                          placeholder="Search"
                        >
                          <template v-slot:append>
                            <q-icon name="search" />
                          </template>
                        </q-input>
                      </template>
                    </q-table>
                  </div>
                  <div class="col-xs-12 col-md-6 q-pa-xs">
                    <div class="col-xs-12 col-md-4 q-pa-md text-center">
                      <q-btn
                        label="Nuevo Ejercicio"
                        icon="fitness_center"
                        rounded
                        color="dark"
                        @click="mdlEjer = true"
                        v-close-popup
                      />
                    </div>
                    <q-table
                      :grid="$q.screen.xs"
                      title="Rutina de Ejercicio"
                      dense
                      :rows="ejerTabla"
                      :columns="columnsEjer"
                      row-key="name"
                      :filter="filter"
                    >
                      <template v-slot:body-cell-id_ejercicio="props">
                        <q-td :props="props">
                          <q-btn
                            type="button"
                            flat
                            icon="delete"
                            color="negative"
                            @click="eliminarRegistroEjercicio(props.value)"
                          ></q-btn>
                        </q-td>
                      </template>
                      <template v-slot:top-right>
                        <q-input
                          borderless
                          dense
                          debounce="300"
                          v-model="filter"
                          placeholder="Search"
                        >
                          <template v-slot:append>
                            <q-icon name="search" />
                          </template>
                        </q-input>
                      </template>
                      <template v-slot:item="props">
                        <div class="q-pa-sm row items-start q-gutter-md">
                          <q-card
                            class="col-xs-12 text-center"
                            style="width: 250px"
                          >
                            <q-card-section>
                              <div class="text-left">
                                <p>
                                  <b>Ejercicio: </b>
                                  {{ props.row.nom_ejercicio }}
                                </p>
                              </div>
                              <div class="text-left">
                                <p><b>Series:</b> {{ props.row.series }}</p>
                              </div>
                              <div class="text-left">
                                <p>
                                  <b>Repeticiones:</b>
                                  {{ props.row.repeticiones }}
                                </p>
                              </div>
                              <hr />
                              <div class="text-center">
                                <q-btn
                                  type="button"
                                  flat
                                  icon="delete"
                                  color="negative"
                                  @click="
                                    eliminarRegistroEjercicio(
                                      props.row.id_ejercicio
                                    )
                                  "
                                ></q-btn>
                              </div>
                            </q-card-section>
                          </q-card>
                        </div>
                      </template>
                    </q-table>
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
              </q-card-section>
            </q-tab-panel>
            <q-tab-panel name="rConsultas" padding>
              <div class="row">
                <div class="col-xs-12 col-md-4">
                  <q-select
                    color="primary"
                    v-model="slpacFil"
                    use-input
                    label="Selecciona el paciente"
                    option-value="id_paciente"
                    option-label="nom_paciente"
                    :options="pacientesFil"
                    @filter="filterFn"
                    emit-value
                    map-options
                    @update:model-value="cargarConsultasPaciente()"
                    behavior="menu"
                  >
                    <template v-slot:prepend>
                      <q-icon name="account_circle" />
                    </template>
                  </q-select>
                </div>
                <div class="col-md-4"></div>
                <div class="col-xs-12 col-md-4 q-pa-xs">
                  <q-input filled readonly v-model="fechanac">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="fechanac"
                            mask="DD/MM/YYYY"
                            dark
                            @update:model-value="cargarConsultasFecha()"
                          >
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="row q-pa-md">
                <div class="col-md-12">
                  <q-table
                    :grid="$q.screen.xs"
                    title="Tus consultas"
                    dense
                    :rows="consultas"
                    :columns="colCon"
                    row-key="name"
                    :filter="filterCon"
                  >
                    <template v-slot:body-cell-id_consulta="props">
                      <q-td :props="props">
                        <q-btn
                          type="button"
                          flat
                          icon="visibility"
                          color="positive"
                          @click="verConsulta(props.value)"
                        ></q-btn>
                        <q-btn
                          type="button"
                          flat
                          icon="medical_information"
                          color="warning"
                          @click="verReceta(props.value)"
                        ></q-btn>
                      </q-td>
                    </template>
                    <template v-slot:item="props">
                      <div class="q-pa-sm row items-start q-gutter-md">
                        <q-card
                          class="col-xs-12 text-center"
                          style="width: 250px"
                        >
                          <q-card-section>
                            <div class="text-left">
                              <p>
                                <b>Nombre Completo:</b>
                                {{ props.row.paciente.nom_paciente }}
                              </p>
                            </div>
                            <div class="text-left">
                              <p>
                                <b>Fecha:</b>
                                {{ props.row.consulta.fecha_consulta }}
                              </p>
                            </div>
                            <hr />
                            <div class="text-center">
                              <q-btn
                                type="button"
                                flat
                                icon="visibility"
                                color="positive"
                                @click="
                                  verConsulta(props.row.consulta.id_consulta)
                                "
                              ></q-btn>
                              <q-btn
                                type="button"
                                flat
                                icon="medical_information"
                                color="warning"
                                @click="
                                  verReceta(props.row.consulta.id_consulta)
                                "
                              ></q-btn>
                            </div>
                          </q-card-section>
                        </q-card>
                      </div>
                    </template>
                    <template v-slot:top-right>
                      <q-input
                        borderless
                        dense
                        debounce="300"
                        v-model="filterCon"
                        placeholder="Buscar"
                      >
                        <template v-slot:append>
                          <q-icon name="search" />
                        </template>
                      </q-input>
                    </template>
                  </q-table>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </q-card>
    </div>
    <q-dialog v-model="mdlrec">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Ingreso de medicamentos</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col-xs-12 col-md-6 q-pa-md">
              <q-select
                color="primary"
                v-model="slmedi"
                use-input
                use-chips
                label="Medicamento"
                option-value="id_medicamento"
                option-label="nom_medicamento"
                :options="medicamentos"
                @new-value="addMedicamento"
                @filter="filterFnMed"
                behavior="menu"
              >
                <template v-slot:prepend>
                  <q-icon name="medication" />
                </template>
              </q-select>
            </div>
            <div class="col-xs-6 col-md-3 q-pa-md">
              <q-select
                color="primary"
                v-model="slper"
                label="Cada"
                :options="periodo"
                emit-value
                map-options
                behavior="menu"
              >
              </q-select>
            </div>
            <div class="col-xs-6 col-md-3 q-pa-md">
              <q-select
                color="primary"
                v-model="slap"
                label="Lapso"
                :options="lapso"
                emit-value
                map-options
                behavior="menu"
              >
              </q-select>
            </div>
          </div>
          <div>
            <div class="col-md-12 q-pa-xs">
              <q-input
                v-model="txtobsmed"
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
    </q-dialog>

    <!--Modal para agregar los ejercicios-->
    <q-dialog v-model="mdlEjer">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Ingreso de ejercicios</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col-xs-12 col-md-6 q-pa-md">
              <q-select
                color="primary"
                v-model="slejer"
                use-input
                use-chips
                label="Ejercicio"
                option-value="id_ejercicio"
                option-label="nom_ejercicio"
                :options="ejercicios"
                @new-value="addEjercicio"
                @filter="filterFnEjer"
                behavior="menu"
              >
                <template v-slot:prepend>
                  <q-icon name="fitness_center" />
                </template>
              </q-select>
            </div>
            <div class="col-xs-6 col-md-3 q-pa-md">
              <q-select
                color="primary"
                v-model="slser"
                label="Series"
                :options="series"
                emit-value
                map-options
                behavior="menu"
              >
              </q-select>
            </div>
            <div class="col-xs-6 col-md-3 q-pa-md">
              <q-select
                color="primary"
                v-model="slrep"
                label="Repeticiones"
                :options="repeticiones"
                emit-value
                map-options
                behavior="menu"
              >
              </q-select>
            </div>
          </div>
          <div>
            <div class="col-md-12 q-pa-xs">
              <q-input
                v-model="txtobsejer"
                label="Notas del ejercicio"
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
            label="Agregar Ejercicio"
            @click="agregarEjercicio()"
            color="green-13"
          />
          <q-btn
            flat
            icon="check_circle"
            label="Terminar rutina"
            color="blue-6"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!--Modal para ver la consulta-->
    <q-dialog v-model="modalConsulta" full-width>
      <q-card>
        <q-card-section>
          <div class="text-h6">Detalles de la consulta</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col-xs-12 col-md-2 q-pa-xs">
              <q-input color="primary" v-model="txtpesomdl" label="Peso (kg)">
                <template v-slot:prepend>
                  <q-icon name="monitor_weight" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-md-2 q-pa-xs">
              <q-input color="primary" v-model="txtestmdl" label="Estatura">
                <template v-slot:prepend>
                  <q-icon name="height" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-md-2 q-pa-xs">
              <q-input color="primary" v-model="txtpremdl" label="Presión">
                <template v-slot:prepend>
                  <q-icon name="favorite" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-md-2 q-pa-xs">
              <q-input color="primary" v-model="txtimcmdl" label="IMC">
                <template v-slot:prepend>
                  <q-icon name="accessibility" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-md-2 q-pa-xs">
              <q-input color="primary" v-model="txtcinmdl" label="Cintura">
                <template v-slot:prepend>
                  <q-icon name="straighten" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-md-2 q-pa-xs">
              <q-input color="primary" v-model="txttempmdl" label="Temperatura">
                <template v-slot:prepend>
                  <q-icon name="device_thermostat" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-md-2 q-pa-xs" v-if="visible">
              <q-input color="primary" v-model="txtpcbmdl" label="PCB">
                <template v-slot:prepend>
                  <q-icon name="device_thermostat" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-md-2 q-pa-xs" v-if="visible">
              <q-input color="primary" v-model="txtpctmdl" label="PCT">
                <template v-slot:prepend>
                  <q-icon name="device_thermostat" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-md-2 q-pa-xs" v-if="visible">
              <q-input color="primary" v-model="txtcmbmdl" label="CMB">
                <template v-slot:prepend>
                  <q-icon name="fastfood" />
                </template>
              </q-input>
            </div>
            <div class="col-md-12 text-center q-pa-md">
              <q-input
                v-model="txtobsmdl"
                label="Diágnóstico y/o observaciones"
                filled
                type="textarea"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <q-table
                :grid="$q.screen.xs"
                title="Receta Médica"
                dense
                :rows="medTablaDialog"
                :columns="columnsDialog"
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
              </q-table>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Cerrar" color="green-13" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalReceta" full-width>
      <q-card>
        <q-card-section>
          <div class="text-h6">Receta Médica</div>
        </q-card-section>
        <q-card-section>
          <div class="q-pa-md">
            <q-video :ratio="3 / 2" :src="rutaReceta" frameborder="0" />
          </div>
        </q-card-section>
        <q-card-actions align="center" class="bg-white text-teal">
          <q-btn
            flat
            icon="check_circle"
            label="Cerrar"
            color="green-13"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { api } from "boot/axios";
import { ruta } from "boot/rutas";
import { ref } from "vue";
import { useQuasar, EventBus } from "quasar";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";

export default {
  // name: 'PageName',
  setup() {
    const progress = ref([{ loading: false, percentage: 0 }]);
    const bus = ref(null);
    const $q = useQuasar();
    const $router = useRouter();
    const url = window.location.href;
    const idcita = ref(url.match(/\/([^/]+)$/)[1].split(":")[1]);
    const fecha = new Date();
    const idMedico = ref(0);
    const slpac = ref(null);
    const slpacFil = ref(null);
    const slmed = ref(null);
    const disable = ref(false);
    const pacArray = ref([]);
    const slmedi = ref(null);
    const slejer = ref(null);
    const nomMed = ref(null);
    const txtpeso = ref("");
    const txtest = ref("");
    const txtpre = ref("");
    const txtimc = ref("");
    const txtcin = ref("");
    const txttemp = ref("");
    const txtpct = ref(0);
    const txtpcb = ref(0);
    const txtcmb = ref(0);
    const txtobs = ref("");
    const txtobsmed = ref("");
    const txtpesomdl = ref("");
    const txtestmdl = ref("");
    const txtpremdl = ref("");
    const txtimcmdl = ref("");
    const txtcinmdl = ref("");
    const txttempmdl = ref("");
    const txtobsmdl = ref("");
    const txtobsejer = ref("");
    const medArray = ref([]);
    const ejerArray = ref([]);
    const medicamentos = ref([]);
    const ejercicios = ref([]);
    const medTabla = ref([]);
    const ejerTabla = ref([]);
    const medTablaDialog = ref([]);
    const pacientes = ref([]);
    const pacientesFil = ref([]);
    const consultas = ref([]);
    const rutaReceta = ref("");
    const slper = ref(null);
    const slser = ref(null);
    const slrep = ref(null);
    const slap = ref(null);
    const columns = ref([
      {
        name: "nom_medicamento",
        required: true,
        label: "Medicamento",
        align: "center",
        field: "nom_medicamento",
        sortable: true,
      },
      {
        name: "periodoTiempo",
        align: "center",
        label: "Cada",
        field: "periodoTiempo",
        sortable: true,
      },
      {
        name: "unidadTiempo",
        align: "center",
        label: "",
        field: "unidadTiempo",
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

    const columnsEjer = ref([
      {
        name: "nom_ejercicio",
        required: true,
        label: "Ejercicio",
        align: "center",
        field: "nom_ejercicio",
        sortable: true,
      },
      {
        name: "series",
        align: "center",
        label: "Series",
        field: "series",
        sortable: true,
      },
      {
        name: "repeticiones",
        align: "center",
        label: "Repeticiones",
        field: "repeticiones",
        sortable: true,
      },
      {
        name: "id_ejercicio",
        label: "",
        field: "id_ejercicio",
        align: "center",
        sortable: true,
      },
    ]);

    const columnsDialog = ref([
      {
        name: "nom_medicamento",
        required: true,
        label: "Medicamento",
        align: "center",
        field: "nom_medicamento",
        sortable: true,
      },
      {
        name: "periodoTiempo",
        align: "center",
        label: "Cada",
        field: "periodoTiempo",
        sortable: true,
      },
      {
        name: "unidadTiempo",
        align: "center",
        label: "",
        field: "unidadTiempo",
        sortable: true,
      },
    ]);

    const colCon = ref([
      {
        name: "nom_paciente",
        required: true,
        label: "Nombre del paciente",
        align: "center",
        field: (row) => row.paciente.nom_paciente,
        sortable: true,
      },
      {
        name: "fecha_consulta",
        align: "center",
        label: "Fecha y Hora",
        field: (row) => row.consulta.fecha_consulta,
        sortable: true,
      },
      {
        name: "id_consulta",
        align: "center",
        label: "",
        field: (row) => row.consulta.id_consulta,
        sortable: true,
      },
    ]);

    async function validarCita() {
      console.log("Prueba de URL: " + this.idcita);
      if (this.idcita != 0 && this.idcita != null) {
        await api
          .post("Citas/consultarCitaPaciente", {
            citas: {
              id_cita: parseInt(this.idcita),
            },
          })
          .then((res) => {
            console.log("Paciente Cita: " + res.data.nom_paciente);
            this.slpac =
              res.data.nom_paciente +
              " " +
              res.data.app_paciente +
              " " +
              res.data.apm_paciente;
            this.disable = true;
            this.$refs.slPaciente.focus();
          });
      }
    }

    async function consultarPacientes() {
      await api
        .post("Paciente/consultarPacientes", {
          token: Cookies.get("tokenLogged"),
        })
        .then((res) => {
          console.log(res.data);
          pacArray.value = res.data;
          this.pacientes = this.pacArray;
          this.pacientesFil = this.pacArray;
        });
    }

    function consultarMedicamentos() {
      api
        .post("Medicamentos/consultarMedicamentos", {
          token: Cookies.get("tokenLogged"),
        })
        .then((res) => {
          console.log(res.data);
          medArray.value = res.data;
          this.medicamentos = this.medArray;
        });
    }

    function consultarEjercicios() {
      api
        .post("Ejercicios/consultarEjercicios", {
          token: Cookies.get("tokenLogged"),
        })
        .then((res) => {
          console.log(res.data);
          ejerArray.value = res.data;
          this.ejercicios = this.ejerArray;
        });
    }

    function agregarMedicamento() {
      let id_medicamento = 0;
      if (this.slmedi.id_medicamento == null) id_medicamento = 0;
      else id_medicamento = this.slmedi.id_medicamento;

      console.log(id_medicamento);
      console.log(this.slmedi.nom_medicamento);
      this.medTabla.push({
        id_medicamento: parseInt(id_medicamento),
        nom_medicamento: this.slmedi.nom_medicamento,
        periodoTiempo: parseInt(this.slper),
        unidadTiempo: this.slap,
        obs_medicamento: this.txtobsmed,
      });
    }

    function agregarEjercicio() {
      let id_ejercicio = 0;
      if (this.slejer.id_ejercicio == null) id_ejercicio = 0;
      else id_ejercicio = this.slejer.id_ejercicio;

      console.log(id_ejercicio);
      console.log(this.slejer.nom_ejercicio);
      this.ejerTabla.push({
        id_ejercicio: parseInt(id_ejercicio),
        nom_ejercicio: this.slejer.nom_ejercicio,
        series: parseInt(this.slser),
        repeticiones: parseInt(this.slrep),
        obs_ejercicio: this.txtobsejer,
      });
    }

    function eliminarRegistro(idmed) {
      console.log(idmed);
      console.log(this.medTabla);
      const indice = this.medTabla.findIndex(
        (obj) => obj.id_medicamento === idmed
      );
      console.log(indice);
      this.medTabla.splice(indice, 1);
    }

    function eliminarRegistroEjercicio(idEjer) {
      console.log(idEjer);
      console.log(this.ejerTabla);
      const indice = this.ejerTabla.findIndex(
        (obj) => obj.id_ejercicio === idEjer
      );
      console.log(indice);
      this.ejerTabla.splice(indice, 1);
    }

    function terminarConsulta() {
      progress.value[0].loading = true;
      if (this.txtpeso == null || this.txtpeso == "") this.txtpeso = 0;

      if (this.txtest == null || this.txtest == "") this.txtest = 0;

      if (this.txtimc == null || this.txtimc == "") this.txtimc = 0;

      if (this.txtcin == null || this.txtcin == "") this.txtcin = 0;

      if (this.txttemp == null || this.txttemp == "") this.txttemp = 0;

      if (this.slpac == null || this.slpac == 0) {
        $q.notify({
          type: "negative",
          message: "Seleccione al paciente al que se le va a hacer la receta",
        });
        progress.value[0].loading = false;
      } else {
        api
          .post("Consultas/registrarConsulta", {
            consulta: {
              peso: parseFloat(this.txtpeso),
              estatura: parseFloat(this.txtest),
              presion: this.txtpre,
              imc: parseFloat(this.txtimc),
              cintura: parseFloat(this.txtcin),
              temperatura: parseFloat(this.txttemp),
              pct: parseFloat(this.txtpct),
              pcb: parseFloat(this.txtpcb),
              cmb: parseFloat(this.txtcmb),
              obs_consulta: this.txtobs,
            },
            receta: {
              listmed: this.medTabla,
            },
            rutina: {
              listejer: this.ejerTabla,
            },
            paciente: {
              id_paciente: this.slpac,
            },
            med: {
              id_medico: this.idMedico,
            },
          })
          .then((res) => {
            console.log(res.data);
            this.consultarConsultas();
            progress.value[0].loading = false;
            this.tab = "rConsultas";
          });
      }
    }

    function addMedicamento(val, done) {
      if (val.length > 0) {
        if (!medicamentos.value.includes(val)) {
          console.log(val);
          api
            .post("Medicamentos/insertarMedicamento", {
              medicamento: {
                nom_medicamento: val,
              },
              med: {
                token: Cookies.get("tokenLogged"),
              },
              existencia_det: 0,
              estatus_det: 1,
            })
            .then((res) => {
              console.log(res.data);
              medArray.value.push({
                id_medicamento: res.data,
                nom_medicamento: val,
              });
              medicamentos.value = medArray.value;
            });
        }
        done(val, "addMedicamento");
      }
    }

    function addEjercicio(val, done) {
      if (val.length > 0) {
        if (!ejercicios.value.includes(val)) {
          console.log(val);
          api
            .post("Ejercicios/insertarEjercicio", {
              ejercicio: {
                nom_ejercicio: val,
              },
              med: {
                token: Cookies.get("tokenLogged"),
              },
              estatus_det: 1,
            })
            .then((res) => {
              console.log(res.data);
              ejerArray.value.push({
                id_ejercicio: res.data,
                nom_ejercicio: val,
              });
              ejercicios.value = ejerArray.value;
            });
        }
        done(val, "addEjercicio");
      }
    }

    function consultarIdMedico() {
      api
        .post("Medicos/consultarIdMedico", {
          token: Cookies.get("tokenLogged"),
        })
        .then((res) => {
          this.idMedico = res.data;
        });
    }

    function consultarConsultas() {
      api
        .post("Consultas/consultarConsultas", {
          token: Cookies.get("tokenLogged"),
        })
        .then((res) => {
          console.log(res.data);
          this.consultas = res.data;
        });
    }

    function cargarConsultasPaciente() {
      api
        .post("Consultas/cargarConsultasPaciente", {
          token: Cookies.get("tokenLogged"),
          id_paciente: this.slpacFil,
        })
        .then((res) => {
          this.consultas = res.data;
        });
    }

    function cargarConsultasFecha() {
      api
        .post("Consultas/cargarConsultasFecha", {
          med: {
            token: Cookies.get("tokenLogged"),
          },
          consulta: {
            fecha_consulta: this.fechanac,
          },
        })
        .then((res) => {
          this.consultas = res.data;
        });
    }

    function verConsulta(idcon) {
      api
        .post("Consultas/verConsulta", {
          id_consulta: idcon,
        })
        .then((res) => {
          console.log(res.data);
          this.txtpesomdl = res.data.peso;
          this.txtestmdl = res.data.estatura;
          this.txtpremdl = res.data.presion;
          this.txtimcmdl = res.data.imc;
          this.txtcinmdl = res.data.cintura;
          this.txttempmdl = res.data.temperatura;
          this.txtobsmdl = res.data.obs_consulta;
          this.modalConsulta = true;
          consultarReceta(idcon);
        });
    }

    function consultarReceta(idcon) {
      api
        .post("Consultas/consultarReceta", {
          id_consulta: idcon,
        })
        .then((res) => {
          console.log(res.data);
          medTablaDialog.value = res.data;
        });
    }

    function consultarEspecialidad() {
      api
        .post("Medicos/consultarEspecialidad", {
          token: Cookies.get("tokenLogged"),
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.id_especialidad == 7) {
            this.visible = true;
          }
        });
    }

    function verReceta(idcon) {
      api
        .post("Consultas/verReceta", {
          id_consulta: idcon,
        })
        .then((res) => {
          console.log(res.data);
          this.rutaReceta = ruta + res.data.substring(10, res.data.length);
          this.modalReceta = true;
        });
    }

    function limpiarReceta() {}
    return {
      idcita,
      disable,
      bus: new EventBus(),
      progress,
      modalConsulta: ref(false),
      filterCon: ref(""),
      fechanac: ref(
        fecha.getFullYear() +
          "/" +
          (fecha.getMonth() + 1) +
          "/" +
          fecha.getDate()
      ),
      idMedico,
      slpac,
      slpacFil,
      slmedi,
      slejer,
      nomMed,
      slper,
      slser,
      slrep,
      slap,
      txtpeso,
      txtest,
      txtpre,
      txtimc,
      txtcin,
      txttemp,
      txtpct,
      txtpcb,
      txtcmb,
      txtobs,
      txtpesomdl,
      txtestmdl,
      txtpremdl,
      txtimcmdl,
      txtcinmdl,
      txttempmdl,
      txtobsmdl,
      txtobsmed,
      txtobsejer,
      pacientes,
      pacientesFil,
      consultas,
      medicamentos,
      ejercicios,
      medTabla,
      medTablaDialog,
      ejerTabla,
      periodo: [
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
      series: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      repeticiones: [
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
      ],
      lapso: ["hrs", "día(s)"],
      mdlrec: ref(false),
      mdlEjer: ref(false),
      modalReceta: ref(false),
      visible: ref(false),
      rutaReceta,
      tab: ref("nConsulta"),
      columns,
      columnsEjer,
      columnsDialog,
      colCon,
      consultarPacientes,
      consultarIdMedico,
      limpiarReceta,
      consultarMedicamentos,
      consultarEjercicios,
      consultarConsultas,
      cargarConsultasPaciente,
      cargarConsultasFecha,
      agregarMedicamento,
      agregarEjercicio,
      eliminarRegistro,
      eliminarRegistroEjercicio,
      terminarConsulta,
      consultarReceta,
      verReceta,
      verConsulta,
      consultarEspecialidad,
      addMedicamento,
      addEjercicio,
      validarCita,

      filterFn(val, update) {
        if (val === "") {
          update(() => {
            pacientes.value = pacArray.value;
            pacientesFil.value = pacArray.value;
          });
          return;
        }

        update(() => {
          api
            .post("Paciente/consultarPacientesFiltro", {
              token: Cookies.get("tokenLogged"),
              nom_paciente: val.toLowerCase(),
            })
            .then((res) => {
              console.log(res.data);
              pacientes.value = res.data;
              pacientesFil.value = res.data;
            });
          // const needle = val.toLowerCase()
          // pacientes.value = pacArray.value.filter(v => v.nom_paciente.toLowerCase().indexOf(needle) > -1)
        });
      },

      filterFnMed(val, update) {
        if (val === "") {
          update(() => {
            medicamentos.value = medArray.value;
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

      filterFnEjer(val, update) {
        if (val === "") {
          update(() => {
            ejercicios.value = ejerArray.value;
          });
          return;
        }

        update(() => {
          api
            .post("Ejercicios/consultarTopEjercicios", {
              ejercicio: {
                nom_ejercicio: val,
              },
              med: {
                token: Cookies.get("tokenLogged"),
              },
            })
            .then((res) => {
              console.log(res.data);
              ejercicios.value = res.data;
            });
        });
      },
    };
  },

  mounted: function () {
    this.consultarPacientes();
    this.consultarMedicamentos();
    this.consultarEjercicios();
    this.consultarIdMedico();
    this.consultarConsultas();
    this.consultarEspecialidad();
  },

  created: function () {
    this.validarCita();
  },
};
</script>
