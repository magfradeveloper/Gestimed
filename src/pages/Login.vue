<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page padding>
    <!-- content -->
    <div class="q-pa-lg column items-center">
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card" elevated>
          <q-card-section>
            <q-img
              src="../img/Logo.png"
              class="q-gutter-sm"
              style="height: 150px"
            >
            </q-img>
          </q-card-section>
          <q-card-section>
            <div class="q-pa-md">
              <div class="text-center">
                <q-btn flat round icon="account_circle" />
              </div>
              <div class="q-gutter-md">
                <q-input
                  color="primary"
                  v-model="txtmail"
                  label="Correo electrónico"
                  :rules="[(val) => !!val || 'Ingresa tu email']"
                />
                <q-input
                  color="primary"
                  type="password"
                  v-model="txtpass"
                  label="Contraseña"
                  :rules="[(val) => !!val || 'Ingrese la contraseña']"
                />
              </div>
              <div class="q-pa-md q-gutter-sm text-center">
                <q-btn
                  color="dark"
                  :loading="progress[0].loading"
                  style="width: 200px"
                  @click="LogIn()"
                  rounded
                  >Ingresar
                  <template v-slot:loading>
                    <q-spinner-gears class="on-left" />
                    Ingresando
                  </template>
                </q-btn>
              </div>
              <p class="text-center">
                No tienes una cuenta,
                <router-link to="RegDoc">regístrate</router-link>
              </p>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { api } from "boot/axios";
import { ref } from "vue";
import { useQuasar } from "quasar";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";

export default {
  // name: 'PageName',
  setup() {
    const progress = ref([{ loading: false, percentage: 0 }]);
    const txtmail = ref("");
    const txtpass = ref("");
    const $q = useQuasar();
    const $router = useRouter();

    function LogIn() {
      progress.value[0].loading = true;
      if (this.txtmail !== "" || this.txtpass !== "") {
        api
          .post("Medicos/iniciarSesion", {
            email_med: this.txtmail,
            pass: this.txtpass,
          })
          .then((res) => {
            if (res.data !== null && res.data !== "") {
              progress.value[0].loading = false;
              Cookies.set("tokenLogged", res.data);
              $router.push({ path: "/" });
            } else {
              progress.value[0].loading = false;
              $q.notify({
                type: "negative",
                message:
                  "Ha ocurrido un error, corrobore sus datos y vuelva a intentarlo",
              });
            }
          });
      } else {
        progress.value[0].loading = false;
        $q.notify({
          type: "negative",
          message: "Ingrese los datos de acceso",
        });
      }
    }

    return {
      progress,
      txtmail,
      txtpass,
      LogIn,
    };
  },
};
</script>
